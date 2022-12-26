import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import { NavMenus } from 'packages/dashboard/components';
import { getUser } from 'packages/dashboard/store/userSlice';
import { useSelector } from 'react-redux';

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
          className="btn flex bg-transparent text-lg border-none text-black"
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

          <div className="md:hidden">
            <NavMenus classes="dropdown-item flex w-full justify-between text-left text-sm leading-5 text-content2 hover:bg-blue-100" />
          </div>

          <span
            className="dropdown-item flex w-full justify-between text-left text-sm leading-5 text-content2 font-semibold text-red-500"
            role="menuitem"
            onClick={logoutHandler}
          >
            Log out
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountPopover;
