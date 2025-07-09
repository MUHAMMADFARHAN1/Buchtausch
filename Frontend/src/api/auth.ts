"use server";

import { auth, signIn, signOut } from "@/auth";

//import { auth, signIn, signOut } from "./../../auth";

export const signup = async () => {};

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
