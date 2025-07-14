// // app/api/data/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // Server-side cookie access

export async function GET() {
  //   const res = await fetch("http://127.0.0.1:5001/Books/");
  //   const data = await res.json();

  //   return NextResponse.json(data);
  // }

  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  console.log(token);

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const externalRes = await fetch("http://127.0.0.1:5001/Books/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`, // 🔐 Add your token here
      },
    });

    if (!externalRes.ok) {
      const text = await externalRes.text();
      return NextResponse.json(
        { error: "Failed to fetch data", details: text },
        { status: externalRes.status }
      );
    }

    const data = await externalRes.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: "Unexpected error", message: err.message },
      { status: 500 }
    );
  }
}
