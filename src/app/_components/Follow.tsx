import React from "react";
import db from "../../../prisma/db/db";
import { cache } from "@/lib/cache";
import { User } from "@prisma/client";

const getPosts = cache(
  (excludedUserId) => {
    return db.user.findMany({
      where: {
        id: {
          not: excludedUserId,
        },
      },
    });
  },
  ["/", "getUsers"],
  { revalidate: 60 }
);
export default function Follow() {
  return (
    <div className="w-full">
      <div className="mx-2 my-3 w-full border-[0.5px] border-white p-3 rounded-md">
        <p className="text-md ">Who To Follow</p>
      </div>
    </div>
  );
}

function FollowCard({ user }: User) {}
