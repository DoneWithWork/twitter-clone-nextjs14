"use client";

import { LikePost } from "@/actions/LikePost";

import { HeartIcon, ShareIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PostCardItem({ post }: { post: any }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);
  useEffect(() => {
    for (let i = 0; i < post.likes.length; i++) {
      if (post.likes[i].userId === post.CurUser.id) {
        setLiked(true);
        break;
      }
    }
  }, []);
  const handleLike = async () => {
    setLikes(liked ? likes - 1 : likes + 1);
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
          <Link
            href={`/${post.user.username}`}
            className="font-semibold hover:cursor-pointer hover:text-blue-200"
          >
            @{post.user.username}
          </Link>
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
        <span>{likes}</span>
        {post.tags.length > 0 &&
          post.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="p-1 rounded-md text-sm ml-2 text-blue-400"
            >
              {tag}
            </span>
          ))}
      </div>
    </div>
  );
}
