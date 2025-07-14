// // app/api/data/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // Server-side cookie access
import { auth, signIn, signOut } from "@/auth";
import { getToken } from "next-auth/jwt";


export async function GET() {
  let session: any = await auth();
  console.log(session.accessToken);
  let accessToken = session.accessToken;
  //return session?.user;
  return NextResponse.json({ accessToken });

  //   const token = await getToken({
  //     req,
  //     secret: process.env.AUTH_SECRET,
  //   });

  //   if (!token) {
  //     return new Response("Unauthorized", { status: 401 });
  //   }

  //   console.log("Server-side access token:", token.accessToken);

  //   return new Response(JSON.stringify({ accessToken: token.accessToken }), {
  //     status: 200,
  //     headers: { "Content-Type": "application/json" },
  //   });
}
