'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { CircleUserRound } from 'lucide-react';
import clsx from 'clsx';
import 'react-quill/dist/quill.snow.css';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/new', label: 'Create Post' },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-800 text-white flex flex-col">
        <div className="text-2xl font-bold p-4 border-b border-gray-200">MyBlog Admin</div>
        <nav className="flex flex-col p-4 gap-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant={pathname === link.href ? 'secondary' : 'ghost'}
                className={clsx(
                  'justify-start w-full font-semibold cursor-pointer',
                  pathname === link.href ? 'bg-gray-200 text-black' : 'text-white'
                )}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 bg-gray-50">
        {/* Top Navbar */}
        <header className="h-16 bg-white text-gray-600 border-b border-gray-200 flex items-center justify-end px-4">
          <div><CircleUserRound/></div>
        </header>

        <main className="p-8 h-[90%] overflow-auto ">{children}</main>
      </div>
    </div>
  );
}
