// import { NextResponse } from "next/server";
import { NextResponse, NextRequest } from "next/server";
import { auth, signIn, signOut } from "@/auth";

// DELETE: Delete book
export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  //   console.log("params");
  const { slug } = params;
  //   console.log(params);

  let session: any = await auth();
  console.log(session.accessToken);
  let accessToken = session.accessToken;

  const response = await fetch(
    "http://127.0.0.1:5001/Interests/accept/" + slug,
    {
      method: "DELETE",
      headers: {
        Authorization: accessToken,
        //  Accept: "application/json",
      },
      mode: "cors",
    }
  );

  //   const array = await response.json();
  //   console.log(array);
  //   return NextResponse.json(array);
  return NextResponse.json("success");

  //   if (!books[slug]) {
  //     return NextResponse.json({ error: "Book not found" }, { status: 404 });
  //   }

  //   delete books[slug];
  //   return NextResponse.json({ message: `Book '${slug}' deleted.` });
}
