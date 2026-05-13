import { prisma } from "@/lib/prisma";

import bcrypt from "bcryptjs";

import {
  NextAuthOptions,
} from "next-auth";

import CredentialsProvider
from "next-auth/providers/credentials";

export const authOptions:
  NextAuthOptions = {

  providers: [

    CredentialsProvider({

      name: "Credentials",

      credentials: {

        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {

        if (!credentials) {
          return null;
        }

        const user =
          await prisma.user.findUnique({
            where: {
              email:
                credentials.email,
            },
          });

        if (!user) {
          return null;
        }

        const isPasswordCorrect =
          await bcrypt.compare(
            credentials.password,
            user.password
          );

        if (!isPasswordCorrect) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.username,
        };
      },
    }),
  ],

  secret:
    process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {

    async jwt({
      token,
      user,
    }) {

      if (user) {
        token.id = user.id;
      }

      return token;
    },

    async session({
      session,
      token,
    }) {

      if (session.user) {
        session.user.id =
          token.id as string;
      }

      return session;
    },
  },
};