// // app/api/data/route.ts
import { NextResponse } from "next/server";
import { auth, signIn, signOut } from "@/auth";

export async function GET() {
  let session: any = await auth();
  console.log(session.accessToken);
  let accessToken = session.accessToken;

  const response = await fetch("http://127.0.0.1:5001/Books/", {
    method: "GET",
    headers: {
      Authorization: accessToken,
      //  Accept: "application/json",
    },
    mode: "cors",
  });

  const array = await response.json();
  console.log(array);
  return NextResponse.json(array);
}
