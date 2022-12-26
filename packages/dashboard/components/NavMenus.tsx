import clsx from 'clsx';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import navConfig from '../layouts/dashboard/NavConfig';

export const NavMenus = ({
  classes = ''
}) => {
  const router = useRouter();

  return (
    <>
      {navConfig.map((item) => {
        const isActiveMenu =
          item.path.split('/').at(1) ===
          router.pathname
            .split('/')
            .at(1);

        return (
          <Link
            key={nanoid()}
            href={item.path}
          >
            <span
              className={clsx(
                'cursor-pointer',
                classes,
                isActiveMenu &&
                  'text-blue-600 font-semibold bg-blue-200'
              )}
            >
              <div className="flex">
                <span className="mr-2">
                  {item.icon}
                </span>
                <span>
                  {item.title}
                </span>
              </div>
            </span>
          </Link>
        );
      })}
    </>
  );
};
