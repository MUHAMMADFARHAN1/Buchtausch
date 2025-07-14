"use client";

import React from "react";
import { useEffect, useState } from "react";

function page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Initially true, so "loading" screen shows
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/profile")
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        let { city, email, name, phone } = jsonData[0];
        setLoading(false); // Fetch done, so set loading to false
        console.log(jsonData);
        console.log(city);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="grid grid-cols-2 mx-4">
      <div>
        {/* <img src="" alt="" /> */}
        <p>hello</p>
      </div>
      <div className="flex flex-col gap-10 mt-20">
        <label>
          Name:
          <input
            type="text"
            name="username"
            // value={baseData.username}
            readOnly
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="text"
            name="profileUrl"
            // value={baseData.profileUrl}
            readOnly
          />
        </label>
        <br />

        <label>
          City:
          <input
            type="text"
            name="fullProfileUrl"
            // value={fullProfileUrl}
            readOnly
          />
        </label>
        <br />

        <label>
          Phone:
          <input
            type="text"
            name="fullProfileUrl"
            // value={fullProfileUrl}
            readOnly
          />
        </label>
        <br />
      </div>
    </div>
  );
}

export default page;
