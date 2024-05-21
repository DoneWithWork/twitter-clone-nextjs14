import React, { Suspense } from "react";
import TweetCard from "../_components/TweetCard";
import { User, currentUser } from "@clerk/nextjs/server";
import db from "../../../prisma/db/db";
import { cache } from "@/lib/cache";
import Image from "next/image";
import { HeartIcon, Share, ShareIcon } from "lucide-react";
import { redirect } from "next/navigation";
import PostCardItem from "../_components/PostCard";
import { UserType } from "@/lib/types";
import { Metadata, ResolvingMetadata } from "next";

const getPosts = cache(
  () => {
    return db.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        likes: true,
      },
    });
  },
  ["/", "getPosts"],
  { revalidate: 60 }
);
export default async function Home() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }
  const SerializedUser = {
    username: user.firstName!,

    imageUrl: user.imageUrl!,
    id: user.id!,
  };

  return (
    <>
      <div>{user ? <TweetCard user={user!} /> : <div>Loading...</div>}</div>
      <div className="grid col-span-1 gap-5">
        <Suspense fallback={<div>Loading...</div>}>
          <PostCard CurUser={SerializedUser} />
        </Suspense>
      </div>
    </>
  );
}
export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const user = await currentUser();
  return {
    title: user?.firstName || "User",
    openGraph: {
      title: user?.firstName || "User",
      description: "Profile Page",

      locale: "en_US",
      type: "website",
    },
  };
}
async function PostCard({ CurUser }: { CurUser: UserType }) {
  const posts = await getPosts();
  const data = posts.map((post) => {
    return {
      ...post,
      CurUser,
    };
  });

  return data.map((post) => <PostCardItem key={post.id} post={post} />);
}
