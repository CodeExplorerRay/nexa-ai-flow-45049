import { randomBytes } from "crypto";

export class OAuth2RequestError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "OAuth2RequestError";
  }
}

function base64Url(buffer: Buffer) {
  return buffer.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

export function generateState() {
  return base64Url(randomBytes(16));
}

export function generateCodeVerifier() {
  return base64Url(randomBytes(32));
}

// Minimal placeholder provider factories. These don't perform real OAuth but
// provide the methods the routes expect so the server won't crash if the
// external package is unavailable. For production you should use the official
// `@lucia-auth/oauth` package/providers.
export function createGithubProvider(clientId?: string, clientSecret?: string) {
  return {
    async getAuthorizationUrl(state: string, opts?: { scopes?: string[] }) {
      // Return a dummy URL that includes the state so redirects won't blow up.
      return new URL(`https://example.com/github/oauth?state=${encodeURIComponent(state)}`);
    },
    async validateAuthorizationCode(_code: unknown) {
      // Indicate the OAuth flow isn't configured; routes will handle this.
      throw new OAuth2RequestError("GitHub OAuth is not configured in this environment.");
    }
  };
}

export function createGoogleProvider(clientId?: string, clientSecret?: string, callbackUrl?: string) {
  return {
    async getAuthorizationUrl(state: string, _codeVerifier?: string, opts?: { scopes?: string[] }) {
      return new URL(`https://example.com/google/oauth?state=${encodeURIComponent(state)}`);
    },
    async validateAuthorizationCode(_code: unknown, _codeVerifier?: string) {
      throw new OAuth2RequestError("Google OAuth is not configured in this environment.");
    }
  };
}

export default {
  generateState,
  generateCodeVerifier,
  createGithubProvider,
  createGoogleProvider,
  OAuth2RequestError,
};
