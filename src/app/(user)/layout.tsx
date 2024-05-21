import React from "react";
import Sidenav from "../_components/Sidenav";
import Follow from "../_components/Follow";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-4  justify-center">
      <div className="col-span-1">
        <Sidenav />
      </div>
      <div className="col-span-2 border-l-[0.5px]  border-r-[0.5px] h-full  border-gray-500">
        {children}
      </div>
      <div className="">
        <Follow />
      </div>
    </div>
  );
}
