import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import db from "../../../../prisma/db/db";

export default async function UserProfile({
  params,
}: {
  params: {
    user: string;
  };
}) {
  const user = await currentUser();

  return <div>UserProfile</div>;
}
