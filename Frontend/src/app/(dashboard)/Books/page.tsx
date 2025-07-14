"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Card from "@/components/card";

function page() {
  return (
    <>
      <div className="flex flex-col justify-between mx-8 pt-2">
        <div className="flex flex-row justify-between pt-2">
          <div>
            <p>My Books</p>
          </div>
          <Link href="/Books/create">
            <Button className=" bg-lime-600 rounded">Create Book</Button>
          </Link>
        </div>
        <div className="flex flex-col justify-between pt-2">
          <Card name={"books"} button={"check"} />
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
