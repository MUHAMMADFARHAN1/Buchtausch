"use client";
//https://strapi.io/blog/form-validation-in-typescipt-projects-using-zod-and-react-hook-forma
import React from "react";
//import coding from "./../assets/coding.png";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { login, loginWithGoogle } from "./../../api/auth";
import { signIn } from "next-auth/react";

export default function page() {
  const FormSchema = z.object({
    email: z
      .string()
      .email("Invalid email. Email must be a valid email address"),
    password: z
      .string()
      .min(6, "Password must not be lesser than 6 characters"),
  });

  type IFormInput = z.infer<typeof FormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: IFormInput) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false, // <- IMPORTANT: prevent auto-redirect
    });

    if (result?.error) {
      console.error("Login failed:", result.error);
      alert("Wrong Credentials");
    } else {
      console.log("Login successful:", result);
      // Manually redirect
      window.location.href = "/Books";
    }
  };

  return (
    <>
      <div className=" bg-white w-1/3 flex flex-col mx-auto mt-40 text-center gap-2 rounded py-8 px-2 min-w-min">
        <p className="pb-4">Join Buchwurms Now!</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <input
            {...register("email")}
            placeholder="Email"
            className=" bg-emerald-800  rounded py-1 text-white placeholder:p-1"
          />
          {errors?.email?.message && (
            <p className="text-red-700 mb-4">{errors.email.message}</p>
          )}
          <input
            {...register("password")}
            placeholder="Password"
            className=" bg-emerald-800  rounded py-1 text-white placeholder:p-1"
          />
          {errors?.password?.message && (
            <p className="text-red-700 mb-4">{errors.password.message}</p>
          )}
          <button type="submit" className=" bg-lime-600 rounded">
            Login
          </button>
        </form>
        <button className=" bg-lime-600 rounded">Login with Google</button>
        <div>
          <p>
            New to BuchTausch? <Link href="/signup">Signup</Link>
          </p>
        </div>
      </div>
    </>
  );
}
