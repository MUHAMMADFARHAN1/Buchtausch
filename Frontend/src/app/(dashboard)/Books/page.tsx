"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Card from "@/components/card";
import fetchDataFromApi from "../../../api/fetchAuth";

import { useEffect, useState } from "react";

// async function x() {
//   try {
//     const response = await fetch(
//       "http://127.0.0.1:5001/Books/"
//       // , {
//       //   method: "GET",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //   },
//       //   // body: JSON.stringify({
//       //   //   name: "John Doe",
//       //   //   email: "john@example.com",
//       //   // }),
//       // }
//     );

//     const data = await response.json();
//     console.log("Response:", data);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

function page() {
  let jsona: any;
  let listItems: any;

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/api/data");
      jsona = await res.json();
      console.log(jsona);
      listItems = jsona.map((jsona: any) => (
        <Card name={jsona.title} button={"check"} />
      ));
    }

    fetchData();
  }, []);

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
          {/* <p>all my books</p>
          <p>sfdsfdsfds</p>
          <p>sfwqer</p>
          <p> qe32ewqre</p> */}
          {/* {listItems} */}
        </div>
      </div>
    </>
  );
}

export default page;
