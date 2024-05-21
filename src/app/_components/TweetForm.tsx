"use client";
import { NewPost } from "@/actions/NewPost";
import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function TweetForm() {
  const [error, action] = useFormState(NewPost, {});
  const [content, SetContent] = useState("");
  const { pending } = useFormStatus();

  return (
    <form action={action}>
      <div className="flex flex-row gap-4 items-center">
        <input
          className="text-xl placeholder:text-gray-600 bg-transparent outline-none"
          placeholder="What is happening?!"
          name="content"
          id="content"
          value={content}
          onChange={(e) => SetContent(e.target.value)}
        ></input>
      </div>
      {error && <p className="text-red-500">{error.content}</p>}
      <button
        type="submit"
        disabled={pending}
        className="absolute right-6 bottom-2 rounded-md bg-blue-500 font-semibold px-5 py-2"
      >
        Post
      </button>
    </form>
  );
}
