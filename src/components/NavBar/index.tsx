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
  </nav>
);

export default NavBar;
