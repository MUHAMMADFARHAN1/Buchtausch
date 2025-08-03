"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Card from "@/components/MofferCard";
import { useEffect, useState } from "react";

//https://nextjs.org/docs/app/guides/migrating/app-router-migration#step-6-migrating-data-fetching-methods

function page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Initially true, so "loading" screen shows
  const [error, setError] = useState(null);

  const [dataA, setDataA] = useState([]);
  const [dataB, setDataB] = useState([]);
  const [activeList, setActiveList] = useState(null); // 'A' or 'B'

  useEffect(() => {
    fetch("http://localhost:3000/api/offers")
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((jsonData) => {
        // let listItems = jsonData.map((item: any) => (
        //   <Link href={`/Books/${item._id}`}>
        //     <Card
        //       name={item.title}
        //       author={item.author}
        //       genre={item.genre}
        //       button={"check"}
        //     />
        //   </Link>
        // ));
        // setData(listItems);
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
          <Button className=" bg-lime-600 rounded">All (not my) Offers</Button>
          <div className="flex flex-row justify-between gap-2">
            <Link href={`/Offers/create`}>
              <Button className=" bg-lime-600 rounded">Create Offer</Button>
            </Link>
            <Button className=" bg-lime-600 rounded">My Offers</Button>
          </div>
        </div>
        <div className="flex flex-col justify-between pt-8">
          <Card offer="Offer" interest="Show Interest"></Card>
          <Card offer="Offer" interest="All Interests"></Card>
        </div>
      </div>
    </>
  );
}

export default page;
// {
//   projects.map((project) => <li key={project.id}>{project.name}</li>);
// }
