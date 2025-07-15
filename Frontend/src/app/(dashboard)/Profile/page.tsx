"use client";

import React from "react";
import { useEffect, useState } from "react";

function page() {
  const [data, setData] = useState({
    // _id: "68723b927d91b3dd1337ca35",
    // name: "Muhammad Farhan",
    // email: "farhan_75230@hotmail.com",
    // city: "Coburg, Deutschland",
    // phone: 1745277296,
    // password: "$2b$10$3gy1BqpfcwnXtoiafNiCmO.7ER2qEA1n.DWcXBFJxnqGMuX2AvgV.",
    // verified: false,
    // createdAt: "2025-07-12T10:40:18.320Z",
    // updatedAt: "2025-07-12T10:40:18.320Z",
    // __v: 0,
  });
  const [loading, setLoading] = useState(true); // Initially true, so "loading" screen shows
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/profile")
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((jsonData) => {
        setLoading(false); // Fetch done, so set loading to false
        // let { city: string, name, phone, email } = jsonData;
        setData({
          _id: "68723b927d91b3dd1337ca35",
          name: "Muhammad Farhan",
          email: "farhan_75230@hotmail.com",
          city: "Coburg, Deutschland",
          phone: 1745277296,
          password:
            "$2b$10$3gy1BqpfcwnXtoiafNiCmO.7ER2qEA1n.DWcXBFJxnqGMuX2AvgV.",
          verified: false,
          createdAt: "2025-07-12T10:40:18.320Z",
          updatedAt: "2025-07-12T10:40:18.320Z",
          __v: 7,
        });
        console.log(jsonData);
        console.log(data);
        console.log(loading);
        console.log(data);
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
    <div className="grid grid-cols-2 mx-4">
      <div>
        {/* <img src="" alt="" /> */}
        <img
          src="https://api.dicebear.com/9.x/avataaars/svg?seed=Farhan"
          alt="Profile"
          className="w-4/5"
          onError={(e) => (e.currentTarget.style.display = "none")} // Hide if invalid URL/image
        />
      </div>
      <div className="flex flex-col gap-10 mt-20">
        <label>
          Name:
          <br />
          <input type="text" name="username" value={data.name} readOnly />
        </label>
        <br />

        <label>
          Email:
          <br />
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
          <br />
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
          <br />
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
