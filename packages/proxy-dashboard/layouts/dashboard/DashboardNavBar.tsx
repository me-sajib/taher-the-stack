import Link from 'next/link';
// components
import AccountPopover from './AccountPopover';

const DashboardNavbar = () => (
  <header className="navbar navbar-sticky bg-transparent navbar-glass shadow-sm">
    <div className="navbar-start">
      <Link href="/proxy-list">
        <span className="cursor-pointer font-semibold text-2xl">
          Easy Proxy Manager
        </span>
      </Link>
    </div>

    {/* nav end Profile details*/}
    <div className="navbar-end">
      <AccountPopover />
    </div>
  </header>
);

export default DashboardNavbar;
