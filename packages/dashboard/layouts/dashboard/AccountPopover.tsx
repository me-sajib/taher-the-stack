import { User } from '@prisma/client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getUser } from 'packages/dashboard/store/userSlice';
import { useSelector } from 'react-redux';

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    linkTo: '/proxy-list'
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    linkTo: '/profile'
  }
];

const AccountPopover = () => {
  const profile: User =
    useSelector(getUser);
  const router = useRouter();

  const logoutHandler = async () => {
    await axios.delete(
      '/api/auth/sign-out'
    );
    router.push('/auth/sign-in');
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown">
        <label
          className="btn flex bg-transparent text-semibold text-2xl border-none text-blue-600"
          tabIndex={0}
        >
          <span>
            {profile.username}
          </span>
          <svg
            className="ml-2 -mr-1 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </label>
        <div className="dropdown-menu bg-gray-100 text-black">
          <div className="dropdown-item">
            <p className="text-sm leading-5 text-content1">
              {profile.fullname}
            </p>
            <p className="truncate text-sm leading-5 text-content2">
              <strong>
                {profile.email}
              </strong>
            </p>
          </div>
          <div>
            {MENU_OPTIONS.map(
              (option) => (
                <Link
                  key={Math.random().toString(
                    32
                  )}
                  href={option.linkTo}
                >
                  <span className="dropdown-item flex w-full justify-between text-left text-sm leading-5 text-content2 hover:bg-gray-200">
                    {option.label}
                  </span>
                </Link>
              )
            )}
          </div>
          <a>
            <span
              className="dropdown-item flex w-full justify-between text-left text-sm leading-5 text-content2"
              role="menuitem"
              onClick={logoutHandler}
            >
              Log out
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AccountPopover;
