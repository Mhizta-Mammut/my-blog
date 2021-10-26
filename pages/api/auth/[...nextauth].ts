import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from '@lib/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "hamisu@example.com"
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password"
        }
      },
      authorize: (c) => {
        if(c.email === 'hm@email.com' && c.password === 'test'){
          return {
            id: 2,
            name: "Hamisu Muhammad",
            email: "hm@email.com"
          }
        }
        return null;
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  jwt: {
    encryption: true,
    secret: process.env.SECRET,
  },
  session: {
    jwt: true,
    
  },
  callbacks: {
    jwt: ({token, user}) => {
      if(user){
        token.id = user.id
      }
      return token;
    },
    session: ({ session, token }) => {
      if(token){
        session.id = token.id;
      }
      return session;
    }
  },
  secret: process.env.SECRET,

};