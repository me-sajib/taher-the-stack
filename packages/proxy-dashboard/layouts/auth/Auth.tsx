// @mui
// components
import { useRouter } from 'next/router';
import Page from 'packages/proxy-dashboard/components/Page';
// ----------------------------------------------------------------------

interface AuthPropTypes {
  title: string;
  redirect: {
    path: string;
    title: string;
    placeholder: string;
  };
  sideTitle: string;
  form: {
    title: string;
    subTitle: string;
  };
  children: JSX.Element[] | JSX.Element;
}

export default function Index({
  title,
  redirect,
  form,
  sideTitle,
  children
}: AuthPropTypes) {
  const router = useRouter();
  const redirectHandler = () => {
    router.push(redirect.path);
  };

  return (
    <Page title={title}>
      <div className="flex flex-col md:flex-row h-screen bg-gray-200">
        <header className="flex bg-gray-100 md:basis-1/2 items-center w-full p-4">
          <h1 className="text-3xl text-blue-600 font-semibold ">
            {sideTitle}
          </h1>
        </header>

        <div className="w-full flex justify-center items-center">
          <div className="flex flex-col justify-center md:w-1/2 w-2/3">
            <div className="my-4">
              <h4 className="text-2xl text-black font-semibold">
                {form.title}
              </h4>
              <span>{form.subTitle}</span>
            </div>
            {children}

            <p className="text-center mt-4">
              {redirect.title} {''}
              <span
                className="text-blue-600 font-bold underline cursor-pointer"
                onClick={redirectHandler}
              >
                {redirect.placeholder}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
}
