"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Card from "@/components/InterestCard";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

//https://nextjs.org/docs/app/guides/migrating/app-router-migration#step-6-migrating-data-fetching-methods

function page() {
  const params = useParams();
  const slug = params.slug; // returns '123' from /profile/123
  // console.log(slug);
  const router = useRouter();

  const [title, setTitle] = useState("empty");
  const [description, setDescription] = useState("empty");
  const [book, setBook] = useState("empty");

  // const router = useRouter();

  const [loading, setLoading] = useState(true); // Initially true, so "loading" screen shows
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/interests/details/" + slug)
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((jsonData) => {
        setLoading(false); // Fetch done, so set loading to false
        console.log(jsonData);
        setTitle(jsonData.title);
        setDescription(jsonData.description);
        setBook(jsonData.book.title);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const Delete_Offer = () => {
    fetch("http://localhost:3000/api/interests/accept/" + slug, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ title, author, }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response:", data);
      });
    router.push("/Books");
  };

  if (loading) {
    // Render this while loading (this blocks showing the rest)
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-2 pl-8 pt-4">
      <div className="mt-10">
        <p>Offer</p>
      </div>
      <div className="flex flex-col gap-10 mt-20">
        {/* <form onSubmit={}> */}
        <h1>Offer Details</h1>
        <label>
          Title:
          <br />
          <input
            id="name"
            type="text"
            name="username"
            value={title}
            readOnly
            // onChange={handleNameChange}
          />
        </label>
        {/* <br /> */}
        {/* <br /> */}

        <label>
          Description:
          <br />
          <input
            type="text"
            name="profileUrl"
            value={description}
            readOnly
            // onChange={handleEmailChange}
          />
        </label>
        {/* <br /> */}
        {/* <br /> */}

        <label>
          Book:
          <br />
          <input
            type="text"
            name="fullProfileUrl"
            value={book}
            readOnly
            // onChange={handleCityChange}
          />
        </label>
        {/* <br /> */}
        {/* <br /> */}
        <div>
          <Button onClick={Delete_Offer} className="mr-2 bg-lime-600">
            Accept Interest
          </Button>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
}

export default page;
