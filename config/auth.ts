import axios from "axios";
import NextAuth, { NextAuthConfig } from "next-auth";
import { Provider } from "next-auth/providers";

export const providers: Array<Provider> = [
  {
    id: "admin",
    name: "Admin",
    type: "oidc",
    issuer: "http://localhost:3000/oidc",
    authorization: {
      url: "http://localhost:3000/oidc/auth",
      params: { scope: "openid email profile policy" },
    },
    clientId: "Admin",
    clientSecret:
      "46a9d288abdaeae2c3c6534bede0dd6d1f9abc01e781c1647677cdc9f178c3ec",
    wellKnown: "http://localhost:3000/oidc/.well-known/openid-configuration",
    async profile(_profile: any, token) {
      const profile = await axios
        .get("http://localhost:3000/oidc/me", {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        })
        .then((res) => res.data);

      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
        roles: profile.roles,
        permissions: profile.permissions,
      } as any;
    },
    idToken: true,
  },
];

export const authOptions: NextAuthConfig = {
  providers,
  debug: true, // 🔥 Enables internal debug logging to console
  pages: {
    error: "/sign-in", // Redirect to the home page (or other page) on error
    signIn: "/sign-in", // Redirect to the home page (or other page) for sign-in
    signOut: "/sign-in", // Redirect to the home page (or other page) after sign-out
  },
  callbacks: {
    jwt({ token, user, account }) {
      if (user) token.username = user.username;
      if (account?.id_token) {
        token.idToken = account.id_token;
      }

      return token;
    },
    session({ session, token }) {
      session.user.username = token.username;
      session.idToken = token.idToken as string;

      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
