'use client';
import {
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Dashboard', href: '/dashboard/home', icon: Squares2X2Icon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-10 grow items-center justify-center gap-2 rounded-md text-white p-3 text-16px font-medium hover:bg-slate-50 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-slate-500 text-white': pathname === link.href,
              },
            )}
          > 
            <LinkIcon className="w-5" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
