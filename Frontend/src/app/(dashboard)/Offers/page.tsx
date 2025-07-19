import React from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Menu from "../../../components/menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Edit } from "lucide-react";

// export async function getChallenges() {
//   const res = await fetch("http://localhost:2000/challenges");
//   const posts = await res.json();

//   return posts;
// }

//https://nextjs.org/docs/app/guides/migrating/app-router-migration#step-6-migrating-data-fetching-methods

export default async function page() {
  //  const challenges = await getChallenges();
  // console.log(challenges);
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
        <div className="flex flex-col justify-between pt-2">
          <p>all my books</p>
          <p>sfdsfdsfds</p>
          <p>sfwqer</p>
          <p> qe32ewqre</p>
        </div>
      </div>
    </>
  );
}

// {
//   projects.map((project) => <li key={project.id}>{project.name}</li>);
// }
