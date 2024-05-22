import { currentUser } from "@clerk/nextjs/server";
import React, { Suspense } from "react";
import db from "../../../../prisma/db/db";
import GoBackBtn from "@/app/_components/GoBackBtn";
import Image from "next/image";
import { Share2 } from "lucide-react";
import { cache } from "@/lib/cache";
import PostCardItem from "@/app/_components/PostCard";
import { UserType } from "@/lib/types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function UserProfile({
  params,
}: {
  params: {
    user: string;
  };
}) {
  const SignedInUser = await currentUser();
  if (!SignedInUser) {
    redirect("/sign-in");
  }
  const signedInUserUsername = SignedInUser?.username?.toLocaleLowerCase();
  const username = params.user.toLocaleLowerCase(); // donewithwork2
  const user = await db.user.findFirst({
    where: {
      username: username,
    },
  });
  if (!user) {
    return <div>User not found</div>;
  }
  const SerializedUser = {
    username: user.username!,
    unknownUserId: user.id!,
    imageUrl: user.photoUrl!,
    id: SignedInUser.id,
  };
  return (
    <div>
      <div className="w-full flex flex-row items-center mx-2 my-3 gap-5 ">
        <GoBackBtn />
        <div>
          <p className="font-semibold text-xl">@{user.username}</p>
        </div>
      </div>
      <div className="w-full mt-20 border-b-[0.5px] py-5 border-gray-500">
        <div className="mx-auto flex flex-col items-center">
          <Image
            src={user!.photoUrl}
            width={100}
            height={100}
            alt="profile"
            className="rounded-[50%]"
          />

          <p>Some Bio text</p>
          <p>{user.email}</p>
          <div className="flex flex-row items-center gap-5 justify-between">
            <p>Joined {new Date(user.createdAt).toDateString()}</p>
            <Share2 size={20} />
          </div>
        </div>
      </div>
      <div>
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
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },
  ["/profile", "userpost"],
  { revalidate: 5 }
);
async function PostCard({ CurUser }: { CurUser: UserType }) {
  const posts = await getPosts({ userId: CurUser.unknownUserId });

  //return all post belonging to the use based on the user params
  //not based on the login user
  //allows for single route to be used for multiple seaching of users
  const data = posts.map((post) => {
    return {
      ...post,
      CurUser,
    };
  });

  return data.map((post) => <PostCardItem key={post.id} post={post} />);
}
