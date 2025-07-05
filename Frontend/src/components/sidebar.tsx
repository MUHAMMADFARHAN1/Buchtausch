import React from "react";
import { Button } from "@/components/ui/button";

function Sidebar() {
  return (
    <div className=" py-4 w-full h-screen max-h-screen min-h-[500px] min-w-[190px] col-span-1 bg-emerald-500">
      <div className="flex flex-col ml-2 w-20 gap-10 mt-1">
        <Button className="bg-lime-600">Books</Button>
        <Button className="bg-lime-600">Offers</Button>
        <Button className="bg-lime-600">Profile</Button>
      </div>
    </div>
  );
}

export default Sidebar;
