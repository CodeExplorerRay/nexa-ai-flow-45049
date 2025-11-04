import { Router, Request, Response } from "express";
import { lucia, githubAuth, googleAuth, prisma } from "../auth";
import bcrypt from "bcryptjs";
import { generateId, LuciaError } from "lucia";
import { OAuth2RequestError, generateState, generateCodeVerifier } from "../lib/oauthFallback";

const router = Router();
const db = prisma;

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user with username and password
 * @access  Public
 */
router.post("/signup", async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    // --- Basic Input Validation for new fields ---
    if (!name || typeof name !== "string" || name.length < 2) {
        return res.status(400).json({ ok: false, error: "Name must be at least 2 characters long" });
    }

    if (!password || typeof password !== "string" || password.length < 6) {
        return res.status(400).json({ ok: false, error: "Password must be at least 6 characters long" });
    }

    // Very basic email validation
    if (!email || typeof email !== "string" || !email.includes("@")) {
        return res.status(400).json({ ok: false, error: "Please provide a valid email" });
    }

    try {
        // --- Check if email already exists ---
        const existingEmail = await db.user.findUnique({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ ok: false, error: "An account with this email already exists" });
        }

    // --- Hash the password ---
    const passwordHash = bcrypt.hashSync(password, 12);
        const userId = generateId(15);

        // --- Create user in the database ---
        await db.user.create({
            data: {
                id: userId,
                username: email.split('@')[0] + generateId(4), // Auto-generate a unique username
                name: name,
                email: email,
                password_hash: passwordHash
            }
        });

        // --- Create a session ---
        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        // --- Set session cookie and respond ---
        res.setHeader("Set-Cookie", sessionCookie.serialize());
        return res.status(201).json({ ok: true, message: "User created successfully" });

    } catch (error) {
        console.error("Signup Error:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return res.status(500).json({ ok: false, error: errorMessage });
    }
});

/**
 * @route   POST /api/auth/login
 * @desc    Login a user with username and password
 * @access  Public
 */
router.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // --- Basic Input Validation ---
    if (!email || typeof email !== "string" || !password || typeof password !== "string") {
        return res.status(400).json({ ok: false, error: "Email and password are required" });
    }

    try {
        // --- Find the user ---
        const user = await db.user.findUnique({ where: { email } });
        if (!user || !user.password_hash) {
            return res.status(400).json({ ok: false, error: "Incorrect email or password" });
        }

    // --- Verify the password ---
    const validPassword = bcrypt.compareSync(password, user.password_hash || "");
        if (!validPassword) {
            return res.status(400).json({ ok: false, error: "Incorrect email or password" });
        }

        // --- Create a session ---
        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        // --- Set session cookie and respond ---
        res.setHeader("Set-Cookie", sessionCookie.serialize());
        return res.status(200).json({ ok: true, message: "Logged in successfully" });

    } catch (error) {
        console.error("Login Error:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return res.status(500).json({ ok: false, error: errorMessage });
    }
});

/**
 * @route   POST /api/auth/logout
 * @desc    Logout the current user
 * @access  Private (requires valid session)
 */
router.post("/logout", async (req: Request, res: Response) => {
    const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
    if (!sessionId) {
        return res.status(401).json({ ok: false, error: "Not authenticated" });
    }

    // --- Invalidate the session ---
    await lucia.invalidateSession(sessionId);

    // --- Create a blank cookie to clear the client's cookie ---
    const sessionCookie = lucia.createBlankSessionCookie();
    res.setHeader("Set-Cookie", sessionCookie.serialize());

    return res.status(200).json({ ok: true, message: "Logged out successfully" });
});

/**
 * @route   GET /api/auth/profile
 * @desc    Get the current user's profile from session
 * @access  Private (requires valid session)
 */
router.get("/profile", async (req: Request, res: Response) => {
    const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
    if (!sessionId) {
        return res.status(401).json({ ok: false, error: "Not authenticated" });
    }

    const { session, user } = await lucia.validateSession(sessionId);

    if (session && session.fresh) {
        const sessionCookie = lucia.createSessionCookie(session.id);
        res.setHeader("Set-Cookie", sessionCookie.serialize());
    }

    if (!user) return res.status(401).json({ ok: false, error: "Not authenticated" });

    return res.status(200).json({ ok: true, user: { id: user.id, username: user.username, name: user.name, email: user.email } });
});

/**
 * @route   GET /api/auth/github/login
 * @desc    Redirects user to GitHub for authentication
 * @access  Public
 */
router.get("/github/login", async (req, res) => {
    const state = generateState();
    const url = await githubAuth.getAuthorizationUrl(state, {
        scopes: ["user:email"] // request user's email
    });

    // Store state in a secure, http-only cookie
    res.cookie("github_oauth_state", state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60000 // 1 minute
    });

    res.redirect(url.toString());
});

/**
 * @route   GET /api/auth/github/callback
 * @desc    Handles the callback from GitHub after authentication
 * @access  Public
 */
router.get("/github/callback", async (req, res) => {
    const storedState = req.cookies.github_oauth_state;
    const state = req.query.state;
    const code = req.query.code;

    // Validate state to prevent CSRF attacks
    if (!storedState || !state || storedState !== state || typeof code !== "string") {
        return res.status(400).send("Invalid state or code");
    }

    try {
        const { getExistingUser, githubUser, createUser } = await githubAuth.validateAuthorizationCode(code);

        const existingUser = await getExistingUser();

        if (existingUser) {
            const session = await lucia.createSession(existingUser.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            res.setHeader("Set-Cookie", sessionCookie.serialize());
            return res.redirect("/");
        }

        const user = await createUser({
            attributes: {
                username: githubUser.login,
                github_id: githubUser.id.toString(),
                name: githubUser.name,
                email: githubUser.email
            }
        });

        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        res.setHeader("Set-Cookie", sessionCookie.serialize());
        return res.redirect("/");

    } catch (e) {
        if (e instanceof OAuth2RequestError) {
            // invalid code
            return res.status(400).send("Invalid authorization code");
        }
        if (e instanceof LuciaError && e.message === 'AUTH_DUPLICATE_KEY_ID') {
            return res.status(400).send("A user with this GitHub account already exists.");
        }
        console.error("GitHub OAuth Error:", e);
        return res.status(500).send("An unknown error occurred");
    }
});

/**
 * @route   GET /api/auth/google/login
 * @desc    Redirects user to Google for authentication
 * @access  Public
 */
router.get("/google/login", async (req, res) => {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    const url = await googleAuth.getAuthorizationUrl(state, codeVerifier, {
        scopes: ["profile", "email"]
    });

    res.cookie("google_oauth_state", state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60000
    });
    res.cookie("google_code_verifier", codeVerifier, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60000
    });

    res.redirect(url.toString());
});

/**
 * @route   GET /api/auth/google/callback
 * @desc    Handles the callback from Google after authentication
 * @access  Public
 */
router.get("/google/callback", async (req, res) => {
    const storedState = req.cookies.google_oauth_state;
    const codeVerifier = req.cookies.google_code_verifier;
    const state = req.query.state;
    const code = req.query.code;

    if (!storedState || !codeVerifier || !state || storedState !== state || typeof code !== "string") {
        return res.status(400).send("Invalid state or code");
    }

    try {
        const { getExistingUser, googleUser, createUser } = await googleAuth.validateAuthorizationCode(code, codeVerifier);

        const existingUser = await getExistingUser();
        if (existingUser) {
            const session = await lucia.createSession(existingUser.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            res.setHeader("Set-Cookie", sessionCookie.serialize());
            return res.redirect("/");
        }

        const user = await createUser({
            attributes: {
                username: googleUser.name, // Or googleUser.email
                google_id: googleUser.sub,
                name: googleUser.name,
                email: googleUser.email
            }
        });

        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        res.setHeader("Set-Cookie", sessionCookie.serialize());
        return res.redirect("/");

    } catch (e) {
        console.error("Google OAuth Error:", e);
        return res.status(500).send("An unknown error occurred");
    }
});

/**
 * @route   PATCH /api/auth/profile
 * @desc    Update the current user's profile information
 * @access  Private (requires valid session)
 */
router.patch("/profile", async (req: Request, res: Response) => {
    const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
    if (!sessionId) {
        return res.status(401).json({ ok: false, error: "Not authenticated" });
    }

    const { session, user } = await lucia.validateSession(sessionId);
    if (!user) {
        return res.status(401).json({ ok: false, error: "Not authenticated" });
    }

    const { name, email } = req.body;

    // --- Basic Input Validation ---
    if (name !== undefined && (typeof name !== "string" || name.length < 2)) {
        return res.status(400).json({ ok: false, error: "Name must be at least 2 characters long" });
    }
    if (email !== undefined && (typeof email !== "string" || !email.includes("@"))) {
        return res.status(400).json({ ok: false, error: "Please provide a valid email" });
    }

    try {
        // If email is being changed, check if it's already taken
        if (email && email !== user.email) {
            const existingEmail = await db.user.findUnique({ where: { email } });
            if (existingEmail && existingEmail.id !== user.id) {
                return res.status(400).json({ ok: false, error: "Email is already in use" });
            }
        }

        // --- Update user in the database ---
        const updatedUser = await db.user.update({
            where: { id: user.id },
            data: { name, email },
            select: { id: true, name: true, username: true, email: true }
        });

        return res.status(200).json({ ok: true, user: updatedUser, message: "Profile updated successfully" });
    } catch (error) {
        console.error("Profile Update Error:", error);
        return res.status(500).json({ ok: false, error: "An unknown error occurred during profile update." });
    }
});

export { router as authRoute };

// --- Dev helper: create a session for the first user (only in non-production) ---
if (process.env.NODE_ENV !== "production") {
    router.post('/dev-create-session', async (req: Request, res: Response) => {
        try {
            const firstUser = await db.user.findFirst();
            if (!firstUser) return res.status(404).json({ ok: false, error: 'No users' });
            // try to create a session for the first user and return the cookie
            const session = await lucia.createSession(firstUser.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            res.setHeader('Set-Cookie', sessionCookie.serialize());
            return res.status(200).json({ ok: true, userId: firstUser.id, sessionId: session.id });
        } catch (err) {
            console.error('Dev create-session error:', err);
            return res.status(500).json({ ok: false, error: err instanceof Error ? err.message : String(err) });
        }
    });
}