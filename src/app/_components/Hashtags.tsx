import { cache } from "@/lib/cache";
import React, { Suspense } from "react";
import db from "../../../prisma/db/db";

export default function Hashtags() {
  return (
    <div className="w-full">
      <div className="mx-2 my-3 w-full border-[0.5px] border-white p-3 rounded-md">
        <p className="text-md mb-3 ">Trending Hashtags</p>
        <Suspense fallback={<div>Loading...</div>}>
          <GetHashtags />
        </Suspense>
      </div>
    </div>
  );
}
interface HashtagCount {
  [key: string]: number;
}
const getHashtags = cache(
  async () => {
    const posts = await db.post.findMany({
      select: {
        tags: true,
      },
    });

    // Create a map to count hashtag occurrences
    const hashtagCounts: HashtagCount = {};

    // Iterate over each post to count hashtags
    posts.forEach((post) => {
      post.tags.forEach((hashtag: string) => {
        if (hashtagCounts[hashtag]) {
          hashtagCounts[hashtag]++;
        } else {
          hashtagCounts[hashtag] = 1;
        }
      });
    });
    console.log(hashtagCounts);
    return hashtagCounts;
  },
  ["/", "gethashtags"],
  { revalidate: 60 }
);

async function GetHashtags() {
  const hashtags = await getHashtags();
  const keys = Object.keys(hashtags).slice(0, 5);

  return (
    <ul className="flex flex-col gap-2 ml-2">
      {keys.map((key, index) => {
        return (
          <li className="text-blue-300" key={index}>
            {key}
          </li>
        );
      })}
    </ul>
  );
}
