"use server";
import db from "../../prisma/db/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

const NewPostSchema = z.object({
  content: z.string().min(1),
});

export async function NewPost(prevState: unknown, formData: FormData) {
  const user = await currentUser();
  if (!user) {
    return { message: "You are not logged in!" };
  }
  const result = NewPostSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (result.success === false) {
    return { message: result.error.formErrors.fieldErrors };
  }
  const data = result.data;
  let hashtagRegex = /#[a-zA-Z0-9_]+/g;
  let textWithoutHashtags = data.content.replace(hashtagRegex, "");
  const tags = data.content.match(hashtagRegex);
  const newpost = await db.post.create({
    data: {
      content: textWithoutHashtags,
      tags: tags || [],
      userId: user!.id,
    },
  });
  if (!newpost) {
    return { message: "Post Creation Failed!" };
  }

  revalidatePath("/");
  revalidatePath("/*");
  return { message: "Post Created!" };
}
