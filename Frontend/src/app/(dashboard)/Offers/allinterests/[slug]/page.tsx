"use client";

import React from "react";
import InterestCard from "@/components/InterestCard";

import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Card from "@/components/card";

import { useEffect, useState } from "react";

function page() {
  //   return (
  //     <div>
  //       <p>All the Interests for the offer</p>
  //       <InterestCard />
  //     </div>
  //   );
  // }

  // export default page;

  const params = useParams();
  const slug = params.slug; // returns '123' from /profile/123
  // console.log(slug);
  const router = useRouter();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Initially true, so "loading" screen shows
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/interests/" + slug)
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((jsonData) => {
        let listItems = jsonData.map((item: any) => (
          <Link href={`/interests/details/${item._id}`}>
            <InterestCard
              name={item.title}
              author={item.author}
              genre={item.genre}
              button={"check"}
            />
          </Link>
        ));
        setData(listItems);
        console.log(jsonData);
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
            <p>All Interests</p>
          </div>
          {/* <Link href="/Books/create">
            <Button className=" bg-lime-600 rounded">Create Book</Button>
          </Link> */}
        </div>
        <div className="flex flex-col justify-between pt-2">{data}</div>
      </div>
    </>
  );
}

export default page;
