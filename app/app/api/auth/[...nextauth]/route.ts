import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID ?? "",  //?? "" means default to empty string to remove the cause of err
          clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
      ]
})

export {handler as GET, handler as POST}