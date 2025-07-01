import React from "react";
import { Button } from "@/components/ui/button";

function menu() {
  return (
    <div className=" py-4 w-screen bg-[#f4f4f4] flex flex-row justify-between">
      <p className="ml-2 py-1 font-medium ">Challenges</p>
      <Button className="mr-2 bg-blue-600">Logout</Button>
    </div>
  );
}

export default menu;
