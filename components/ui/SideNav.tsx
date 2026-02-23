import Link from 'next/link';
import NavLinks from './NavLink';
import { BookOpen } from "lucide-react";

export default function SideNav() {
  return (
    <>
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-slate-800">
      <Link
        className="mb-2 flex h-10 items-center justify-start rounded-md bg-slate-800 p-4 md:h-20"
        href="/dashboard"
      >
        <div className="w-15 text-blue-500 md:w-10 mr-1">
          <BookOpen size={40} />
        </div>
        <div className='font-bold text-2xl text-white'>BookStore</div>
      </Link>
      <div className="flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />

      </div>
    </div>
    </>
  );
}
