import Link from 'next/link';
import type { FC } from 'react';

/** Application navigation bar */
const NavBar: FC = () => (
  <nav className="flex justify-between py-4">
    <Link href="/" passHref>
      <a>
        <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-200">minurl 💎</h1>
      </a>
    </Link>

    <div className="flex">
      <button className="mr-2 rounded px-3 text-slate-600 dark:text-white text-xs uppercase font-medium tracking-wider transition-colors hover:bg-slate-200 hover:dark:bg-slate-800">
        Login
      </button>
      <button className="bg-purple-600 rounded px-3 text-white text-xs uppercase font-medium tracking-wider transition-colors hover:bg-purple-500">
        Sign Up
      </button>
    </div>
  </nav>
);

export default NavBar;
