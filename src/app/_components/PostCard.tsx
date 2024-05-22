"use client";

import { LikePost } from "@/actions/LikePost";

import { HeartIcon, ShareIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PostCardItem({ post }: { post: any }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    for (let i = 0; i < post.likes.length; i++) {
      if (post.likes[i].userId === post.CurUser.id) {
        setLiked(true);
        break;
      }
    }
  }, []);
  const handleLike = async () => {
    const args = {
      userId: post.CurUser.id,
      postId: post.id,
    };
    const like = await LikePost(args);
    setLiked(like);
  };

  return (
    <div className="w-full p-2 border-b-[0.5px] border-gray-500 relative">
      <div className="flex flex-row items-center gap-5">
        <Image
          src={post.user.photoUrl}
          width={50}
          height={50}
          alt="profile"
          className="rounded-[50%] border-gray-500 border-2"
        />
        <div>
          <p className="font-semibold">{post.user.username} </p>
          <p className="text-sm text-gray-400">
            {new Date(post.createdAt).toDateString()}
          </p>
        </div>
      </div>
      <p className="ml-10 mt-5"> {post.content}</p>

      <div className="flex flex-row items-center m-5">
        <ShareIcon size={22} className="m-2" />
        {liked ? (
          <HeartIcon
            size={22}
            color="red"
            className="m-2 cursor-pointer hover:text-red-300   transition-all"
            onClick={handleLike}
          ></HeartIcon>
        ) : (
          <HeartIcon
            size={22}
            className="m-2 cursor-pointer hover:text-red-300 hover:scale-110 transition-all"
            onClick={handleLike}
          />
        )}
        <span>{post.likes.length}</span>
      </div>
    </div>
  );
}
