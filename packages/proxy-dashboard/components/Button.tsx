import clsx from 'clsx';
import React from 'react';

interface ButtonPropTypes {
  text: string;
  clickHandler?: (event: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  classes?: string;
  conditionClasses?: {
    [key: string]: boolean;
  };
}

export const Button = ({
  text,
  clickHandler = null,
  type = 'button',
  variant = 'primary',
  classes = '',
  conditionClasses = {}
}: ButtonPropTypes) => (
  <button
    type={type}
    className={clsx(
      `btn btn-outline-${variant} text-lg`,
      classes,
      conditionClasses
    )}
    onClick={clickHandler}
  >
    {text}
  </button>
);
