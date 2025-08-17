"use server";

export default async function fetchAuth() {
  //   const res = await fetch("http://127.0.0.1:5001/Books/");
  const response = await fetch("http://127.0.0.1:5001/Books/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({
    //   name: "John Doe",
    //   email: "john@example.com",
    // }),
  });

  return response.json();
}
