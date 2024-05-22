import React from "react";
import Sidenav from "../_components/Sidenav";
import Follow from "../_components/Follow";
import Hashtags from "../_components/Hashtags";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-4  justify-center">
      <div className="col-span-1 sm:col-span-1">
        <Sidenav />
      </div>
      <div className="md:col-span-2 border-l-[0.5px] overflow-auto overflow-x-hidden max-h-screen sm:col-span-3 sm:mx-2 border-r-[0.5px] h-full  border-gray-500">
        {children}
      </div>
      <div className="hidden  md:block">
        <Hashtags />
      </div>
    </div>
  );
}
