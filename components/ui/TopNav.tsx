"use client";
import DropdownProfile from "./DropdownProfile";
import { BookText } from "lucide-react";

const TopNav = () => {
  return (
    <div className="w-full">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <BookText size={30} strokeWidth={1.75} className="text-blue-900 mr-2"/>
        <div className="font-bold text-base">Book Store Management </div>
      </div>
      <div>
        <DropdownProfile />
      </div>
    </div>
    </div>
  );
};

export default TopNav;
