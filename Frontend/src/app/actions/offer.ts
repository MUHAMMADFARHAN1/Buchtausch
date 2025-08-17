"use server";
import { auth } from "@/auth";

interface OfferCreate {
  title: string;
  description: string;
  book: string;
}

async function parseResponse(response: Response) {
  const contentType = response.headers.get("content-type") || "";
  if (!response.ok) {
    const errorText = contentType.includes("application/json")
      ? await response.json()
      : await response.text();
    throw new Error(`Request failed: ${JSON.stringify(errorText)}`);
  }
  return contentType.includes("application/json")
    ? await response.json()
    : await response.text();
}

export async function getMyOffers() {
  const session: any = await auth();
  const accessToken = session?.accessToken;
  if (!accessToken) throw new Error("User not authenticated");

  const response = await fetch("http://127.0.0.1:5001/MyOffers", {
    method: "GET",
    headers: { Authorization: accessToken },
    mode: "cors",
  });

  return parseResponse(response);
}

export async function createOffer({ title, description, book }: OfferCreate) {
  const session: any = await auth();
  const accessToken = session?.accessToken;
  if (!accessToken) throw new Error("User not authenticated");

  const response = await fetch("http://127.0.0.1:5001/MyOffers/create", {
    method: "POST",
    headers: {
      Authorization: accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, book }),
    mode: "cors",
  });

  return parseResponse(response);
}

export async function getAllOffers() {
  const session: any = await auth();
  const accessToken = session?.accessToken;
  if (!accessToken) throw new Error("User not authenticated");

  const response = await fetch("http://127.0.0.1:5001/MyOffers/all", {
    method: "GET",
    headers: { Authorization: accessToken },
    mode: "cors",
  });

  return parseResponse(response);
}

export async function getOfferBySlug(slug: string) {
  const session: any = await auth();
  const accessToken = session?.accessToken;
  if (!accessToken) throw new Error("User not authenticated");

  const response = await fetch(`http://127.0.0.1:5001/MyOffers/${slug}`, {
    method: "GET",
    headers: { Authorization: accessToken },
    mode: "cors",
  });

  return parseResponse(response);
}
