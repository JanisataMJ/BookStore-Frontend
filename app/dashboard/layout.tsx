"use client";
import SideNav from "@/components/ui/SideNav";
import TopNav from "@/components/ui/TopNav";
import { App } from "antd";

export default function LayoutHome({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row ">
      <div className="w-full flex-none md:w-64 ">
        <SideNav />
      </div>
      <div className="grow flex flex-col">
        <div className="sticky top-0 z-50 w-full bg-white shadow-md h-12 flex items-center p-5">
          <TopNav />
        </div>
        <App>
          <div className="flex-1 h-full overflow-y-auto p-4 bg-gray-100">
            {children}
          </div>
        </App>
      </div>
    </div>
  );
}
