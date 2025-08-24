"use server";
import { auth } from "@/auth";
import { BACKEND_API } from "./variables.js";

// Helper to fetch with authentication
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const session: any = await auth();
  const accessToken = session?.accessToken;
  if (!accessToken) throw new Error("User not authenticated");

  const headers = {
    Authorization: accessToken,
    ...(options.headers || {}),
  };

  const response = await fetch(url, { ...options, headers, mode: "cors" });
  return response;
}

// Helper to safely parse response as JSON if possible
async function parseResponse(response: Response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return await response.json();
  } else {
    return await response.text();
  }
}

// POST: Show interest
export async function postInterest(slug: string, body: any) {
  const response = await fetchWithAuth(
    BACKEND_API + `/Interests/showInterest/${slug}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
  return await parseResponse(response);
}

// GET: Interest details by slug
export async function getInterestDetails(slug: string) {
  const response = await fetchWithAuth(
    BACKEND_API + `/Interests/details/${slug}`,
    { method: "GET", headers: { Accept: "application/json" } }
  );
  return await parseResponse(response);
}

// DELETE: Accept/Remove interest by slug
export async function deleteInterest(slug: string) {
  const response = await fetchWithAuth(
    BACKEND_API + `/Interests/accept/${slug}`,
    { method: "DELETE" }
  );
  return await parseResponse(response);
}

// GET: Generic interest fetch by slug
export async function getInterest(slug: string) {
  const response = await fetchWithAuth(BACKEND_API + `/Interests/${slug}`, {
    method: "GET",
  });
  return await parseResponse(response);
}
