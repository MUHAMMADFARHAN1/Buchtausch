"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

function page() {
  const params = useParams();
  const slug = params.slug; // returns '123' from /profile/123
  // console.log(slug);

  const [title, setTitle] = useState("empty");
  const [author, setAuthor] = useState("empty");
  const [genre, setGenre] = useState("empty");

  // const router = useRouter();

  const [loading, setLoading] = useState(true); // Initially true, so "loading" screen shows
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/books/" + slug)
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((jsonData) => {
        setLoading(false); // Fetch done, so set loading to false
        console.log(jsonData);
        setTitle(jsonData.title);
        setAuthor(jsonData.author);
        setGenre(jsonData.genre);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const Delete_Book = () => {
    fetch("http://localhost:3000/api/books/" + slug, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ title, author, }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response:", data);
      });
    // router.push("/Books");
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
        <p>Book Picture</p>
      </div>
      <div className="flex flex-col gap-10 mt-20">
        {/* <form onSubmit={}> */}
        <h1>Book Details</h1>
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
          Author:
          <br />
          <input
            type="text"
            name="profileUrl"
            value={author}
            readOnly
            // onChange={handleEmailChange}
          />
        </label>
        {/* <br /> */}
        {/* <br /> */}

        <label>
          Genre:
          <br />
          <input
            type="text"
            name="fullProfileUrl"
            value={genre}
            readOnly
            // onChange={handleCityChange}
          />
        </label>
        {/* <br /> */}
        {/* <br /> */}
        <div>
          <Button onClick={Delete_Book} className="mr-2 bg-lime-600">
            Delete
          </Button>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
}

export default page;
