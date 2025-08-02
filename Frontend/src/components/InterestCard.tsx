import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Card(props: any) {
  return (
    <div className=" bg-white h-12 my-2 rounded flex flex-row justify-between">
      <div className="flex flex-row justify-between gap-10 ml-5">
        <div className=" py-2 pl-2 w-45 border-4">{props.offer}</div>
      </div>
      <div className="py-1 pr-4">
        <Link href={`/Books/${props._id}`}>
          <Button className=" bg-lime-600 rounded">Details </Button>
        </Link>
      </div>
    </div>
  );
}
