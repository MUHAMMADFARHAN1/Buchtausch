import React from "react";
import { Button } from "@/components/ui/button";

function menu() {
  return (
    <div className=" py-4 max-w-screen min-w-[1500px] flex flex-row justify-between  bg-emerald-500">
      <p className="ml-2 py-1 font-medium ">Buchtausch</p>
      <Button className="mr-2 bg-lime-600">Logout</Button>
    </div>
  );
}

export default menu;
