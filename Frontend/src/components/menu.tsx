import React from "react";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/actions/auth";
import Image from "next/image";
import favicon from "./../../../Assests/favicon_io/favicon12.png";

function menu() {
  return (
    <div className=" py-4 max-w-screen min-w-[1500px] flex flex-row justify-between  bg-emerald-500">
      <p className="ml-8 py-1 font-medium ">
        <Image src={favicon} className="m-auto" alt="" />
      </p>
      <form action={logout}>
        <Button className="mr-2 bg-lime-600">Logout</Button>
      </form>
    </div>
  );
}

export default menu;
