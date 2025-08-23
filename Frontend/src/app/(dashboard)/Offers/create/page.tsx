"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getBooks } from "@/app/actions/bookact";

function page() {
  // type Book = {
  //   _id: string;
  //   title: string;
  // };
  type User = {
    _id: string;
    name: string;
    email: string;
    city: string;
    phone: number;
    password: string;
    verified: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };

  type Book = {
    _id: string;
    title: string;
    author: string;
    genre: string;
    user: User;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [book, setSelectedBook] = useState("");

  // const [books, setBooks] = useState<Book[]>([]);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Initially true, so "loading" screen shows
  const [error, setError] = useState(null);

  const router = useRouter();
  const [options, setOptions] = useState<string[]>([]);

  let bookOptions = <option disabled>Loading books...</option>;

  useEffect(() => {
    getBooks()
      .then((jsonData: any) => {
        // console.log("Page Fetched");
        // let listItems = jsonData.map((item: any) => setBooks(item.data));
        // setBooks(jsonData);
        // setData(listItems);
        // console.log(books);
        setLoading(false); // Fetch done, so set loading to false
        // console.log(jsonData);

        // Create options list outside JSX
        // console.log("Hello");

        setOptions(
          jsonData.map((book: any) => (
            <option key={book._id} value={book._id}>
              {book.title}
            </option>
          ))
        );
        // console.log(options);

        // bookOptions =
        //   jsonData.length === 0 ? (
        //     <option disabled>Loading books...</option>
        //   ) : (
        //     jsonData.map((book: any) => (
        //       <option key={book._id} value={book._id}>
        //         {book.title}
        //       </option>
        //     ))
        //   );
        // setOptions(bookOptions);

        // console.log("Hello");
        // console.log(bookOptions);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:3000/api/books")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Fetch failed");
  //       return res.json();
  //     })
  //     .then((jsonData) => {
  //       // console.log("Page Fetched");
  //       // let listItems = jsonData.map((item: any) => setBooks(item.data));
  //       // setBooks(jsonData);
  //       // setData(listItems);
  //       // console.log(books);
  //       setLoading(false); // Fetch done, so set loading to false
  //       // console.log(jsonData);

  //       // Create options list outside JSX
  //       // console.log("Hello");

  //       setOptions(
  //         jsonData.map((book: any) => (
  //           <option key={book._id} value={book._id}>
  //             {book.title}
  //           </option>
  //         ))
  //       );
  //       // console.log(options);

  //       // bookOptions =
  //       //   jsonData.length === 0 ? (
  //       //     <option disabled>Loading books...</option>
  //       //   ) : (
  //       //     jsonData.map((book: any) => (
  //       //       <option key={book._id} value={book._id}>
  //       //         {book.title}
  //       //       </option>
  //       //     ))
  //       //   );
  //       // setOptions(bookOptions);

  //       // console.log("Hello");
  //       // console.log(bookOptions);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //       setLoading(false);
  //     });
  // }, []);

  // console.log("Books state:", books);
  // console.log("Options state:", options);

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handleSelectedBookChange = (e: any) => {
    setSelectedBook(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault(); // Prevents page reload

    // Access the input values from state
    console.log("Submitted title:", title);
    console.log("Submitted author:", description);
    console.log("Submitted genre:", book);

    // You can send this data to a backend like this:

    fetch("http://localhost:3000/api/offers/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, book }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response:", data);
      });
    router.push("/Offers");
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
        <form onSubmit={handleSubmit}>
          <h1>Offer Details</h1>
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
            Description:
            <br />
            <input
              type="text"
              name="profileUrl"
              value={description}
              onChange={handleDescriptionChange}
            />
          </label>
          {/* <br /> */}
          <br />

          <label>
            Book:
            <br />
            <select
              name="bookdropdown"
              id="book"
              onChange={handleSelectedBookChange}
            >
              <option value="">-- Select a book --</option>
              {options}
            </select>
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
