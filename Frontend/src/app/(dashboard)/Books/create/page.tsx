"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function page() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  const router = useRouter();

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleAuthorChange = (e: any) => {
    setAuthor(e.target.value);
  };

  const handleGenreChange = (e: any) => {
    setGenre(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault(); // Prevents page reload

    // Access the input values from state
    console.log("Submitted title:", title);
    console.log("Submitted author:", author);
    console.log("Submitted genre:", genre);

    // You can send this data to a backend like this:

    fetch("http://localhost:3000/api/books/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, genre }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response:", data);
      });
    router.push("/Books");
  };

  return (
    <div className="grid grid-cols-2 pl-8 pt-4">
      <div className="mt-10">
        <p>Book Picture</p>
      </div>
      <div className="flex flex-col gap-10 mt-20">
        <form onSubmit={handleSubmit}>
          <h1>Book Details</h1>
          <br />
          <label>
            Title:
            <br />
            <input
              id="name"
              type="text"
              name="username"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {/* <br /> */}
          <br />

          <label>
            Author:
            <br />
            <input
              type="text"
              name="profileUrl"
              value={author}
              onChange={handleAuthorChange}
            />
          </label>
          {/* <br /> */}
          <br />

          <label>
            Genre:
            <br />
            <input
              type="text"
              name="fullProfileUrl"
              value={genre}
              onChange={handleGenreChange}
            />
          </label>
          <br />
          <br />
          <div>
            <Button type="submit" className="mr-2 bg-lime-600">
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;
