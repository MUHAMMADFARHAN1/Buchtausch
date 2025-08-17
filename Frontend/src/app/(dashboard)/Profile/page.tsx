"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getProfile, updateProfile } from "@/app/actions/profile";

function page() {
  // const [data, setData] = useState({
  //   // _id: "68723b927d91b3dd1337ca35",
  //   // name: "Muhammad Farhan",
  //   // email: "farhan_75230@hotmail.com",
  //   // city: "Coburg, Deutschland",
  //   // phone: 1745277296,
  //   // password: "$2b$10$3gy1BqpfcwnXtoiafNiCmO.7ER2qEA1n.DWcXBFJxnqGMuX2AvgV.",
  //   // verified: false,
  //   // createdAt: "2025-07-12T10:40:18.320Z",
  //   // updatedAt: "2025-07-12T10:40:18.320Z",
  //   // __v: 0,
  // });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState(
    "https://api.dicebear.com/9.x/avataaars/svg?seed="
  );
  const [loading, setLoading] = useState(true); // Initially true, so "loading" screen shows
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getProfile();
        setName(data.name);
        setEmail(data.email);
        setCity(data.city);
        setPhone(data.phone);
        setAvatar(avatar + data.name); // Adjust as needed
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const result = await updateProfile({ city, name, email, phone });
      console.log("Profile updated:", result);
      router.push("/Books");
    } catch (err: any) {
      setError(err.message);
    }
  };

  // useEffect(() => {
  //   fetch("http://localhost:3000/api/profile")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Fetch failed");
  //       return res.json();
  //     })
  //     .then((jsonData) => {
  //       setLoading(false); // Fetch done, so set loading to false
  //       // let { city: string, name, phone, email } = jsonData;
  //       // setData({
  //       //   _id: "68723b927d91b3dd1337ca35",
  //       //   name: "Muhammad Farhan",
  //       //   email: "farhan_75230@hotmail.com",
  //       //   city: "Coburg, Deutschland",
  //       //   phone: 1745277296,
  //       //   password:
  //       //     "$2b$10$3gy1BqpfcwnXtoiafNiCmO.7ER2qEA1n.DWcXBFJxnqGMuX2AvgV.",
  //       //   verified: false,
  //       //   createdAt: "2025-07-12T10:40:18.320Z",
  //       //   updatedAt: "2025-07-12T10:40:18.320Z",
  //       //   __v: 7,
  //       // });
  //       console.log(jsonData);
  //       setName(jsonData.name);
  //       setEmail(jsonData.email);
  //       setCity(jsonData.city);
  //       setPhone(jsonData.phone);
  //       setAvatar(avatar + jsonData.name);
  //       // console.log(jsonData);
  //       // console.log(data);
  //       // console.log(jsonData.name);
  //       // console.log(loading);
  //       // document.getElementById("name").name = jsonData[0].name;
  //       // console.log(data);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //       setLoading(false);
  //     });
  // }, []);

  // const handleChange = (e) => {
  //   // let val = target.value;
  //   // console.log(val);
  //   // setMyInput(val);
  //   // setOtherBox(val);
  // };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleCityChange = (e: any) => {
    setCity(e.target.value);
  };

  const handlePhoneChange = (e: any) => {
    setPhone(e.target.value);
  };

  if (loading) {
    // Render this while loading (this blocks showing the rest)
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // const handleSubmit = (e: any) => {
  //   e.preventDefault(); // Prevents page reload

  //   // Access the input values from state
  //   console.log("Submitted name:", name);
  //   console.log("Submitted email:", email);

  //   // You can send this data to a backend like this:

  //   fetch("http://localhost:3000/api/profile/update", {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ city, name, email, phone }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Response:", data);
  //     });

  //   router.push("/Books");
  // };

  return (
    <div className="grid grid-cols-2 mx-4">
      <div>
        {/* <img src="" alt="" /> */}
        <img
          src={avatar}
          alt="Profile"
          className="w-4/5"
          onError={(e) => (e.currentTarget.style.display = "none")} // Hide if invalid URL/image
        />
      </div>
      <div className="flex flex-col gap-10 mt-20">
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <br />
            <input
              id="name"
              type="text"
              name="username"
              value={name}
              onChange={handleNameChange}
            />
          </label>
          <br />
          <br />

          <label>
            Email:
            <br />
            <input
              type="text"
              name="profileUrl"
              value={email}
              onChange={handleEmailChange}
            />
          </label>
          <br />
          <br />

          <label>
            City:
            <br />
            <input
              type="text"
              name="fullProfileUrl"
              value={city}
              onChange={handleCityChange}
            />
          </label>
          <br />
          <br />

          <label>
            Phone:
            <br />
            <input
              type="text"
              name="fullProfileUrl"
              value={phone}
              onChange={handlePhoneChange}
            />
          </label>
          <br />
          <br />
          <Button type="submit" className="mr-2 bg-lime-600">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default page;
