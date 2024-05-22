"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import db from "../../prisma/db/db";

type LikePostArgs = {
  userId: string;
  postId: string;
};
export async function LikePost(args: LikePostArgs) {
  const { userId, postId } = args;
  const like = await db.like.findFirst({
    where: {
      postId: postId,
      userId: userId,
    },
  });
  if (!like) {
    const newLike = await db.like.create({
      data: {
        userId: userId,
        postId: postId,
      },
    });

    revalidateTag("userpost");
    revalidatePath("/(user)/[user]", "page");
    revalidatePath("/profile");
    return true;
  } else {
    await db.like.delete({
      where: {
        id: like.id,
      },
    });
    revalidatePath("/(user)/[user]", "page");

    revalidateTag("userpost");
    revalidatePath("/profile");
    return false;
  }
}
