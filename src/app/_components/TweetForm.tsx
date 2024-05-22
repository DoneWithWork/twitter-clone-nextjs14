"use client";
import { NewPost } from "@/actions/NewPost";
import React, { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
  message: "",
};

export default function TweetForm() {
  const [state, formAction] = useFormState(NewPost, initialState);
  const [content, SetContent] = useState("");

  useEffect(() => {
    if (state && state.message === "Post Created!") {
      console.log("reset");
      SetContent("");
    }
  }, []);
  return (
    <form
      action={async (formData) => {
        await formAction(formData);
        console.log(state.message.toString());
        SetContent("");
      }}
    >
      <div className="flex flex-row gap-4 items-center">
        <input
          className="text-xl placeholder:text-gray-600 bg-transparent outline-none hover:bg-transparent"
          placeholder="What is happening?!"
          name="content"
          id="content"
          value={content}
          onChange={(e) => {
            SetContent(e.target.value);
          }}
        ></input>
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      aria-disabled={pending}
      className={`absolute right-6 bottom-2 rounded-md font-semibold px-5 py-2 ${
        pending ? "bg-blue-300" : "bg-blue-500"
      }`}
    >
      Post
    </button>
  );
}
