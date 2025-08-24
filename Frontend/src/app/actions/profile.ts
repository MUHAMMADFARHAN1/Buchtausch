"use server";

import { auth } from "@/auth";
import { BACKEND_API } from "./variables.js";

export async function getProfile() {
  const session: any = await auth();
  const accessToken = session?.accessToken;

  if (!accessToken) {
    throw new Error("User is not authenticated");
  }

  const response = await fetch(BACKEND_API + "/Profile/", {
    method: "GET",
    headers: {
      Authorization: accessToken,
    },
    mode: "cors",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch profile: ${text}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return await response.json();
  } else {
    return await response.text();
  }
}

interface ProfileUpdate {
  city: string;
  name: string;
  phone: string;
  email: string;
}

export async function updateProfile({
  city,
  name,
  phone,
  email,
}: ProfileUpdate) {
  const session: any = await auth();
  const accessToken = session?.accessToken;

  if (!accessToken) {
    throw new Error("User is not authenticated");
  }

  const response = await fetch(BACKEND_API + "/Profile/update", {
    method: "PUT",
    headers: {
      Authorization: accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ city, name, phone, email }),
    mode: "cors",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to update profile: ${text}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return await response.json();
  } else {
    return await response.text();
  }
}
