"use server";

import { auth, signIn, signOut } from "@/auth";

export async function getBooks() {
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
  return array;
}

interface CreateBookInput {
  title: string;
  author: string;
  genre: string;
}

export async function createBook({ title, author, genre }: CreateBookInput) {
  const session: any = await auth();
  const accessToken = session?.accessToken;

  if (!accessToken) {
    throw new Error("User is not authenticated");
  }

  const response = await fetch("http://127.0.0.1:5001/books/create", {
    method: "POST",
    headers: {
      Authorization: accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, author, genre }),
    mode: "cors",
  });

  if (!response.ok) {
    throw new Error(`Failed to create book: ${response.statusText}`);
  }

  // Handle backend that returns plain text instead of JSON
  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return await response.json();
  } else {
    return await response.text(); // e.g., "Book created successfully"
  }
}

// GET a single book by slug
export async function getBook(slug: string) {
  const session: any = await auth();
  const accessToken = session?.accessToken;

  if (!accessToken) {
    throw new Error("User is not authenticated");
  }

  const response = await fetch(`http://127.0.0.1:5001/Books/${slug}`, {
    method: "GET",
    headers: {
      Authorization: accessToken,
    },
    mode: "cors",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch book: ${text}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return await response.json();
  } else {
    return await response.text();
  }
}

// DELETE a book by slug
export async function deleteBook(slug: string) {
  const session: any = await auth();
  const accessToken = session?.accessToken;

  if (!accessToken) {
    throw new Error("User is not authenticated");
  }

  const response = await fetch(`http://127.0.0.1:5001/books/delete/${slug}`, {
    method: "DELETE",
    headers: {
      Authorization: accessToken,
    },
    mode: "cors",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to delete book: ${text}`);
  }

  return "success"; // backend returns a simple success message
}
