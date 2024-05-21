import { User } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";
import TweetForm from "./TweetForm";

export default function TweetCard({ user }: { user: User }) {
  return (
    <div className="w-full h-[150px] border-b-[0.5px] px-3 py-4 border-b-gray-500 relative">
      <div className="flex flex-row items-center gap-5">
        <Image
          src={user.imageUrl}
          alt="Profile Image"
          width={40}
          height={40}
          className="rounded-full"
        />
        <TweetForm />
      </div>
    </div>
  );
}
