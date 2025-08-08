// import { NextResponse } from "next/server";
import { NextResponse, NextRequest } from "next/server";
import { auth, signIn, signOut } from "@/auth";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  //   const book = books[slug];

  //   if (!book) {
  //     return NextResponse.json({ error: "Book not found" }, { status: 404 });
  //   }

  let session: any = await auth();
  console.log(session.accessToken);
  let accessToken = session.accessToken;

  const response = await fetch(
    "http://127.0.0.1:5001/Interests/details" + slug,
    {
      method: "GET",
      headers: {
        Authorization: accessToken,
        //  Accept: "application/json",
      },
      mode: "cors",
    }
  );

  const array = await response.json();
  console.log(array);
  return NextResponse.json(array);

  //   return NextResponse.json(book);
}
