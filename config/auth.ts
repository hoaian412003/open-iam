import { host } from "@/utils/host";
import axios from "axios";
import NextAuth, { NextAuthConfig } from "next-auth";
import { Provider } from "next-auth/providers";

export const providers: Array<Provider> = [
  {
    id: "admin",
    name: "Admin",
    type: "oidc",
    issuer: `${host}/oidc`,
    authorization: {
      url: `${host}/oidc/auth`,
      params: { scope: "openid email profile policy" },
    },
    clientId: "Admin",
    clientSecret:
      "3cd856fe761342acd9aef52c17171bf7c368c5f6075cefdd1f220f0a66e1221b",
    wellKnown: `${host}/oidc/.well-known/openid-configuration`,
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
        username: profile.sub,
        name: profile.name,
        email: profile.email,
        avatar: profile.avatar,
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
      if (user) {
        // Add field to jwt token here to bind to useSession;
        token.username = user.username;
        token.avatar = (user as any).avatar;
      };
      if (account?.id_token) {
        token.idToken = account.id_token;
      }

      return token;
    },
    session({ session, token }) {
      session.user.username = token.username;
      session.user.avatar = token.avatar as string;
      session.idToken = token.idToken as string;

      return session;
    },
  },
  trustHost: true
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
