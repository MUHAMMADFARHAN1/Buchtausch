import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Card from "@/components/InterestCard";

//https://nextjs.org/docs/app/guides/migrating/app-router-migration#step-6-migrating-data-fetching-methods

export default async function page() {
  return (
    <>
      <div className="flex flex-col justify-between mx-8 pt-2">
        {/* <div className="flex flex-row justify-between pt-2">
          <Button className=" bg-lime-600 rounded">All (not my) Offers</Button>
          <div className="flex flex-row justify-between gap-2">
            <Link href={`/Offers/create`}>
              <Button className=" bg-lime-600 rounded">Create Offer</Button>
            </Link>
            <Button className=" bg-lime-600 rounded">My Offers</Button>
          </div>
        </div> */}
        <div className="flex flex-col justify-between pt-8">
          <Card offer="Offer id" interest="Show Interest"></Card>
          <Card offer="Offer id" interest="All Interests"></Card>
        </div>
      </div>
    </>
  );
}
