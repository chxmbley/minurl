import Link from 'next/link';
import Button from '~components/Button';
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
      <Button className="mr-2">Log In</Button>
      <Button variant="primary">Sign Up</Button>
    </div>
  </nav>
);

export default NavBar;
