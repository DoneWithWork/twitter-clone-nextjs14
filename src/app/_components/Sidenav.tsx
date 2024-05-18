import { navbar } from "@/lib/constants";
import {
  SignIn,
  SignedIn,
  SignedOut,
  UserButton,
  UserProfile,
} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

export default async function Sidenav() {
  const user = await currentUser();
  return (
    <nav className="w-[200px] h-screen flex flex-col justify-between text-white">
      <h1 className="font-semibold text-2xl mx-auto mt-4">Twitter</h1>
      <div className="flex flex-col gap-10 mx-auto">
        {navbar.map((item) => (
          <Link href={item.href} key={item.name}>
            <div className="flex flex-row gap-5">
              <item.icon size={25} />
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
      <div>
        <SignedOut>
          <Link href="/sign-in">Sign in</Link>
        </SignedOut>
        <SignedIn>
          <div className="flex mx-auto flex-row items-start gap-5 text-gray-300 p-5">
            <div className="mx-auto">
              <UserButton afterSignOutUrl="/" />
            </div>
            <div className="hidden md:block">
              <p className="font-semibold">{user?.firstName}</p>
              <p className="text-sm">{user?.emailAddresses[0].emailAddress}</p>
            </div>
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
