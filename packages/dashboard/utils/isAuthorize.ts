import Router from 'next/router';

export const isAuthorize = (
  axiosResponse: any
) => {
  if (axiosResponse.status === 401) {
    Router.push('/auth/sign-in');
    throw new Error('Unauthorize');
  }

  return true;
};
