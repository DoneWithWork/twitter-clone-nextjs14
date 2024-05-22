import React, { Suspense } from "react";
import db from "../../../prisma/db/db";
import { cache } from "@/lib/cache";

import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import FollowBtn from "./FollowBtn";
import { User } from "@prisma/client";
import { User as UserType } from "@clerk/nextjs/server";
import { FollowBtnProps } from "@/lib/types";
const getUsers = cache(
  (excludedUserId) => {
    return db.user.findMany({
      where: {
        NOT: {
          id: excludedUserId,
          following: { some: { followerId: excludedUserId } },
        },
      },
    });
  },
  ["/", "getUsers"],
  { revalidate: 60 }
);
export default async function Follow() {
  return (
    <div className="w-full">
      <div className="mx-2 my-3 w-full border-[0.5px] border-white p-3 rounded-md">
        <p className="text-md ">Who To Follow</p>
        <Suspense fallback={<div>Loading...</div>}>
          <GetUsersList />
        </Suspense>
      </div>
    </div>
  );
}

const GetUsersList = async () => {
  const SignedInUser = await currentUser();
  const users = await getUsers(SignedInUser!.id);
  return (
    <div className="w-full">
      {users.map((user: User, index: number) => (
        <Link
          className="px-2 py-3 flex flex-row items-center gap-2"
          key={index}
          href={`/${user.username}`}
        >
          <Image
            src={user.photoUrl}
            width={45}
            height={45}
            alt="profile"
            className="rounded-[50%]"
          />
          <span>@{user.username}</span>
          <FollowBtn
            props={{ currentUserId: SignedInUser!.id, followUserId: user.id }}
          />
        </Link>
      ))}
    </div>
  );
};
