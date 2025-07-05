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
      <p>Your challenges</p>
      <Button>
        <Link href="/Challenge">New Challenge</Link>
      </Button>
      <div></div>
    </>
  );
}

// {
//   projects.map((project) => <li key={project.id}>{project.name}</li>);
// }
