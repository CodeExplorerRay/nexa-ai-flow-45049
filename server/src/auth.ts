import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { createGithubProvider, createGoogleProvider } from "./lib/oauthFallback";
import { PrismaClient } from "@prisma/client";

// Create and export a shared Prisma client instance for the server to reuse.
export const prisma = new PrismaClient();

// Initialize the Prisma adapter with the Prisma client. The adapter expects
// to be constructed with `new`.
const adapter = new PrismaAdapter(prisma as any);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		// this sets cookies with super long expiration
		// since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
		expires: false,
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production"
		}
	},
    getUserAttributes: (attributes) => {
        return {
            username: attributes.username,
            githubId: attributes.github_id,
            googleId: attributes.google_id,
            name: attributes.name,
            email: attributes.email
        };
    }
});

export const githubAuth = createGithubProvider(
    process.env.GITHUB_CLIENT_ID,
    process.env.GITHUB_CLIENT_SECRET
);

export const googleAuth = createGoogleProvider(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3000/api/auth/google/callback"
);

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
        DatabaseUserAttributes: {
            username: string;
            name: string | null;
            email: string | null;
            github_id: string | null;
            google_id: string | null;
        }
	}
}