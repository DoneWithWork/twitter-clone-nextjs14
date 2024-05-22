"use server";

import { FollowBtnProps } from "@/lib/types";
import db from "../../prisma/db/db";
import { revalidatePath } from "next/cache";

export default async function Follow(args: FollowBtnProps) {
  const { currentUserId, followUserId } = args;
  console.log(args);
  revalidatePath("/");
  revalidatePath("/(users)/[user]", "page");
  const isFollowing = await db.follows.findUnique({
    where: {
      followerId_followingId: {
        followerId: currentUserId,
        followingId: followUserId,
      },
    },
  });
  if (isFollowing) {
    const result = await db.follows.delete({
      where: {
        followerId_followingId: {
          followerId: currentUserId,
          followingId: followUserId,
        },
      },
    });
    return false;
  } else {
    const result = await db.follows.create({
      data: {
        followerId: currentUserId,
        followingId: followUserId,
      },
    });
    return true;
  }
}
