import GoBackBtn from "@/app/_components/GoBackBtn";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowLeft, HeartIcon, Share2, ShareIcon } from "lucide-react";
import { Share } from "next/font/google";
import Image from "next/image";
import React, { Suspense } from "react";
import db from "../../../../prisma/db/db";
import { cache } from "@/lib/cache";
import PostCardItem from "@/app/_components/PostCard";
import { UserType } from "@/lib/types";
import { Metadata, ResolvingMetadata } from "next";
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
export default async function Profile() {
  const user = await currentUser();
  if (!user) {
    return <div>Loading...</div>;
  }
  const SerializedUser = {
    username: user.firstName!,

    imageUrl: user.imageUrl!,
    id: user.id!,
  };
  return (
    <div>
      <div className="w-full flex flex-row items-center mx-2 my-3 gap-5 ">
        <GoBackBtn />
        <div>
          <p className="font-semibold text-xl">@{user?.firstName}</p>
        </div>
      </div>
      <div className="w-full mt-20 border-b-[0.5px] py-5 border-gray-500">
        <div className="mx-auto flex flex-col items-center">
          <Image
            src={user!.imageUrl}
            width={100}
            height={100}
            alt="profile"
            className="rounded-[50%]"
          />
          <p className="font-semibold mt-5 text-xl">{user!.firstName}</p>
          <p>Some Bio text</p>
          <p>{user!.emailAddresses[0].emailAddress}</p>
          <div className="flex flex-row items-center gap-5 justify-between">
            <p>Joined {new Date(user!.createdAt).toDateString()}</p>
            <Share2 size={20} />
          </div>
        </div>
      </div>
      <div className="">
        <Suspense fallback={<div>Loading...</div>}>
          <PostCard CurUser={SerializedUser} />
        </Suspense>
      </div>
    </div>
  );
}
const getPosts = cache(
  ({ userId }: { userId: string }) => {
    return db.post.findMany({
      where: {
        userId: userId,
      },
      include: {
        likes: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },
  ["/profile", "userpost"],
  { revalidate: 5 }
);
async function PostCard({ CurUser }: { CurUser: UserType }) {
  const posts = await getPosts({ userId: CurUser.id });
  const data = posts.map((post) => {
    return {
      ...post,
      CurUser,
    };
  });

  return data.map((post) => <PostCardItem key={post.id} post={post} />);
}
