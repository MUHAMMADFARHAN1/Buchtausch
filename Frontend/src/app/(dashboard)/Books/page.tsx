"use client";

import React from "react";
import { Button } from "@/components/ui/button";

function page() {
  return (
    <>
      <div className="flex flex-col justify-between mx-8 pt-2">
        <div className="flex flex-row justify-between pt-2">
          <p>My Books</p>
          <Button className=" bg-lime-600 rounded">Create Book</Button>
        </div>
        <div className="flex flex-col justify-between pt-2">
          <p>all my books</p>
          <p>sfdsfdsfds</p>
          <p>sfwqer</p>
          <p> qe32ewqre</p>
        </div>
      </div>
    </>
  );
}

export default page;
