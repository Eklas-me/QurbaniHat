import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: window.location.origin // Points to the same domain (Vercel)
});

export const { signIn, signUp, signOut, useSession, updateUser } = authClient;
