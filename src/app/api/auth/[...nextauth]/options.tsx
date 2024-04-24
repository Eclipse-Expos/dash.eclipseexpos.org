import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import type { GetServerSidePropsContext } from "next";

const useSecureCookies = (process.env.NEXTAUTH_URL as string).startsWith(
  "https://"
);
const cookiePrefix = useSecureCookies ? "__Secure-" : "";
const hostName = new URL(process.env.NEXTAUTH_URL as string).hostname;
const rootDomain = process.env.NEXTAUTH_ROOT_DOMAIN as string;

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Password",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        try {
          const res = await fetch(
            process.env.NEXTAUTH_URL + "/api/auth/validate-credentials",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
            }
          );

          // console.log(await res.json());

          const data = await res.json();

          if (data.user) {
            return data.user;
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/logout",
    newUser: "/setup-account",
  },

  session: {
    strategy: "jwt",
  },

  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        domain: hostName === "localhost" ? hostName : `.${rootDomain}`,
      },
    },
  },
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, options);
};
