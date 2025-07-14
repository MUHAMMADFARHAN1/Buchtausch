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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Initially true, so "loading" screen shows
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/books")
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((jsonData) => {
        let listItems = jsonData.map((item) => (
          <Card name={item.title} button={"check"} />
        ));
        setData(listItems);
        setLoading(false); // Fetch done, so set loading to false
        console.log(jsonData);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    // Render this while loading (this blocks showing the rest)
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
        <div className="flex flex-col justify-between pt-2">{data}</div>
      </div>
    </>
  );
}

export default page;
