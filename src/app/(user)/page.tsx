import React, { Suspense } from "react";
import TweetCard from "../_components/TweetCard";
import { User, auth, currentUser } from "@clerk/nextjs/server";
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
        user: true,
      },
    });
  },
  ["/", "getPosts"],
  { revalidate: 60 }
);
export default async function Home() {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const SerializedUser = {
    username: user.username!,
    unknownUserId: "",
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

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Twitter Clone",
    openGraph: {
      type: "website",
      title: "Twitter Clone",
      url: "https://twitter-clone-nextjs14.vercel.app",
      description: "A Twitter Clone made by DoneWithWork",
      countryName: "Malaysia",
      locale: "en_MY",
    },
  };
}
