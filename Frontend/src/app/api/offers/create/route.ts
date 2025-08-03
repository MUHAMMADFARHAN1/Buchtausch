// // app/api/data/route.ts
import { NextResponse, NextRequest } from "next/server";
import { auth, signIn, signOut } from "@/auth";

export async function POST(request: NextRequest) {
  let session: any = await auth();
  console.log(session.accessToken);
  let accessToken = session.accessToken;

  const body = await request.json();
  console.log(body);
  const { title, description, selectedBook } = body;
  console.log("THIS IS THE BODY HERE");

  const response = await fetch("http://127.0.0.1:5001/MyOffers/create", {
    method: "POST",
    headers: {
      Authorization: accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, selectedBook }),
    mode: "cors",
  });

  console.log(response);
  //   const array = await response.json();
  //   console.log(array);
  console.log("sdgdsfdsfsdfd");
  //   return NextResponse.json(array);
  return NextResponse.json(response);
}
