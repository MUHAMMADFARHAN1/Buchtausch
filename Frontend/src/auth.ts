import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import jwt from "jsonwebtoken";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // let user: any = loginUserInBackend(
        // 	credentials.email as string,
        // 	credentials.password as string
        // );
        try {
          let response = await fetch(process.env.BACKEND_API + "/auth/login", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
              "Content-Type": "application/json",
            },
          });
          let data = await response.json();

          if (!response.ok) throw new Error(data.message);

          return data;
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
    Google,
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  // trustHost: process.env.NODE_ENV === "development",
  trustHost: true,
  jwt: {
    async encode(params) {
      // params.token is the token returned in the jwt callback
      return jwt.sign(
        { id: params.token?.id, accessToken: params.token?.accessToken } as any,
        process.env.AUTH_SECRET as string
      );
    },
    async decode(params) {
      return jwt.verify(
        params.token as any,
        process.env.AUTH_SECRET as string
      ) as any;
    },
  },
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (user) {
        // assigning properties that are required in backend when decoding the token
        token.id = user.id;
        token.accessToken = user.token;
      }
      if (account?.provider === "google") {
        const res = await fetch("http://localhost:5001/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_token: account.id_token }),
        });
        const data = await res.json();

        token.id = data.id;
        token.accessToken = data.token;
      }
      return token;
    },
    // encode function is called between jwt and session
    // token is the encoded object in the encode function
    session({ session, token }: any) {
      // session.access_token is the token generated in our custom api
      session.accessToken = token.accessToken;
      session.id = token.id;
      return session;
    },
  },
});

function loginUserInBackend(email: string, password: string) {
  if (email == "omar@gmail.com") return { data: { email }, token: "" };
  jwt;
  return null;
}
