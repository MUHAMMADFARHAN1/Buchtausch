"use server";

import { auth, signIn, signOut } from "@/auth";
//import axios from "axios";
//import { redirect } from "next/dist/server/api-utils";
import { redirect } from "next/navigation";
import { BACKEND_API } from "./variables.js";

//import { auth, signIn, signOut } from "./../../auth";

export const signup = async (data: any) => {
  // console.log("hello");
  let { name, email, city, phone, password } = data;
  try {
    const response: any = await fetch(BACKEND_API + "/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        city,
        phone,
        password,
      }),
    });

    const data = await response.json();
    console.log("Response:", data);
  } catch (error) {
    console.error("Error:", error);
  }
  redirect("/");
};

export const login = async ({ email, password }: any) => {
  await signIn("credentials", {
    email,
    password,
    redirectTo: "/Books",
  });
};

export const loginWithGoogle = async () => {
  console.log("AUTH_GOOGLE_ID:", process.env.AUTH_GOOGLE_ID);
  console.log("AUTH_GOOGLE_SECRET:", process.env.AUTH_GOOGLE_SECRET);
  await signIn("google", { redirectTo: "/dashboard" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

export const isAuthenticated = async () => {
  let session = await auth();
  console.log(session);
  return session?.user;
};
