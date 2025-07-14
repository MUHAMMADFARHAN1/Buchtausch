import React from "react";
import { Button } from "./ui/button";

export default function Card(props: any) {
  return (
    <div className=" bg-white h-12 my-2 rounded flex flex-row justify-between">
      <div className=" py-2 pl-2">{props.name}</div>
      <div className="py-1 pr-4">
        <Button className=" bg-lime-600 rounded">{props.button} </Button>
      </div>
    </div>
  );
}
