"use server";

import { auth, signIn, signOut } from "@/auth";
//import axios from "axios";
//import { redirect } from "next/dist/server/api-utils";
import { redirect } from "next/navigation";

//import { auth, signIn, signOut } from "./../../auth";

export const signup = async (data: any) => {
  // console.log("hello");
  let { name, email, city, phone, password } = data;
  try {
    const response: any = await fetch("http://localhost:5001/auth/signup", {
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
