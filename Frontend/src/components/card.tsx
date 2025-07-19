import React from "react";
import { Button } from "./ui/button";

export default function Card(props: any) {
  return (
    <div className=" bg-white h-12 my-2 rounded flex flex-row justify-between">
      <div className="flex flex-row justify-between gap-10 ml-5">
        <div className=" py-2 pl-2 w-45">{props.name}</div>
        <div className=" py-2 pl-2 w-45">{props.author}</div>
        <div className=" py-2 pl-2 w-45">{props.genre}</div>
      </div>
      <div className="py-1 pr-4">
        <Button className=" bg-lime-600 rounded">{props.button} </Button>
      </div>
    </div>
  );
}
