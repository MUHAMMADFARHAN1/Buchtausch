"use client";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signup } from "../../actions/auth";
import * as z from "zod";

export default function page() {
  const FormSchema = z.object({
    name: z.string().min(2, "First name must be atleast 2 characters"),
    email: z
      .string()
      .email("Invalid email. Email must be a valid email address"),
    city: z.string().min(2, "City must be atleast 2 characters"),
    // phone: z.number().min(4, "Phone must be atleast 2 numbers"),
    phone: z.string(),
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

  const onSubmit = (data: IFormInput) => {
    console.log(data);
    signup(data);
  };

  return (
    <div className=" bg-white w-1/3 flex flex-col mx-auto mt-40 text-center gap-2 rounded py-8 px-2 min-w-min">
      <p className="pb-4">Join Buchwurms Now!</p>
      <form
        action=""
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("name")}
          placeholder="Name"
          className=" bg-emerald-800 rounded py-1 text-white placeholder:p-2"
        />
        {errors?.name?.message && (
          <p className="text-red-700 mb-4">{errors.name.message}</p>
        )}
        <input
          {...register("email")}
          placeholder="Email"
          className=" bg-emerald-800 rounded py-1 text-white placeholder:p-2"
        />
        {errors?.email?.message && (
          <p className="text-red-700 mb-4">{errors.email.message}</p>
        )}
        <input
          {...register("city")}
          placeholder="City"
          className=" bg-emerald-800 rounded py-1 text-white placeholder:p-2"
        />
        {errors?.city?.message && (
          <p className="text-red-700 mb-4">{errors.city.message}</p>
        )}
        <input
          {...register("phone")}
          placeholder="Phone"
          className=" bg-emerald-800 rounded py-1 text-white placeholder:p-2"
        />
        {errors?.phone?.message && (
          <p className="text-red-700 mb-4">{errors.phone.message}</p>
        )}
        <input
          {...register("password")}
          placeholder="Password"
          className=" bg-emerald-800 rounded py-1 text-white placeholder:p-2"
        />
        {errors?.password?.message && (
          <p className="text-red-700 mb-4">{errors.password.message}</p>
        )}
        <button type="submit" className="bg-lime-600">
          Sign Up
        </button>
      </form>
      <div>
        <p>
          Already have an account? <Link href="/">Login</Link>
        </p>
      </div>
    </div>
  );
}
