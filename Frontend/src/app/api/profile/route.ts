// // app/api/data/route.ts
import { NextResponse, NextRequest } from "next/server";
import { auth, signIn, signOut } from "@/auth";

export async function GET() {
  let session: any = await auth();
  console.log(session.accessToken);
  let accessToken = session.accessToken;

  const response = await fetch("http://127.0.0.1:5001/Profile/", {
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

// export async function PUT(request: NextRequest) {
//   let session: any = await auth();
//   console.log(session.accessToken);
//   let accessToken = session.accessToken;

//   const body = await request.json();
//   console.log(body);
//   console.log("THIS IS THE BODY HERE");

//   const response = await fetch("http://127.0.0.1:5001/Profile/update", {
//     method: "PUT",
//     headers: {
//       Authorization: accessToken,
//       // Accept: "application/json",
//       "Content-Type": "application/json",
//       body: JSON.stringify(body),
//     },
//     mode: "cors",
//   });

//   const array = await response.json();
//   console.log(array);
//   console.log("sdgdsfdsfsdfd");
//   return NextResponse.json(array);
// }
