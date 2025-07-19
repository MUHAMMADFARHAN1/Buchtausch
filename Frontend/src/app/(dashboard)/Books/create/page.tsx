"use client";

import React from "react";
import { Button } from "@/components/ui/button";

function page() {
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
            // value={name}
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
            // value={email}
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
            // value={city}
            // onChange={handleCityChange}
          />
        </label>
        {/* <br /> */}
        {/* <br /> */}
        <div>
          <Button type="submit" className="mr-2 bg-lime-600">
            Create
          </Button>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
}

export default page;
