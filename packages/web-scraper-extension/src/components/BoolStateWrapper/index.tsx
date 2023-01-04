import { useState } from 'react';

interface BoolStateWrapperPropTypes {
  children: (
    status: boolean,
    toggleStatus: () => void
  ) => JSX.Element;
}

const BoolStateWrapper = ({
  children
}: BoolStateWrapperPropTypes) => {
  const [status, setStatus] =
    useState<boolean>(false);
  const toggleStatus = () =>
    setStatus(!status);

  return children(status, toggleStatus);
};

export default BoolStateWrapper;
