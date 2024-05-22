"use client";
import { FollowBtnProps } from "@/lib/types";
import React, { useState } from "react";
import Follow from "@/actions/Follow";

export default function FollowBtn({ props }: { props: FollowBtnProps }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const info = {
    currentUserId: props.currentUserId,
    followUserId: props.followUserId,
  };
  return (
    <button
      onClick={async () => {
        const thestate = await Follow(info);
        setIsFollowing(thestate);
      }}
      className={`bg-white text-sm text-black font-semibold px-3 py-2 ml-2 hover:bg-gray-300 transition-all rounded-xl ${
        isFollowing ? "bg-white text-white" : ""
      }`}
    >
      Follow
    </button>
  );
}
