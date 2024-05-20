import NextAuth from 'next-auth';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import prisma from '@/prisma/index';
import GoogleProvider  from 'next-auth/providers/google';




export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [ GoogleProvider({
        authorization: {
          
          params: {
            access_type: "offline",
            prompt: "consent",
            scope: [
                "openid",
                "https://www.googleapis.com/auth/userinfo.email",
                "https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/youtube",
                "https://www.googleapis.com/auth/youtube.upload",
              ].join(" "), // Add additional scopes here
              response: 'code'
          }
        }
      })],
})