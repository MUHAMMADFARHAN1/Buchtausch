// // app/api/data/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // Server-side cookie access
import { auth, signIn, signOut } from "@/auth";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

export async function GET() {
  let session: any = await auth();
  console.log(session.accessToken);
  let accessToken = session.accessToken;

  const response = await fetch("http://127.0.0.1:5001/Books/", {
    method: "GET",
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzIzYjkyN2Q5MWIzZGQxMzM3Y2EzNSIsImlhdCI6MTc1MjQ5MjI4OCwiZXhwIjoxNzUzMDk3MDg4fQ.jreLeoegO6BI8hKYBqy869lfK2oHxWRIK_0ffdFwawg",
      //  Accept: "application/json",
    },
    mode: "cors",
  });

  const array = await response.json();
  console.log(array);
  return NextResponse.json({ response });

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
