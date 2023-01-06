import React, { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { setPaginate } from '../../../features/scraper/scraperSlice';

interface PaginationConfigInputPropTypes {
  after?: string;
  placeholder: string;
  type: 'limit' | 'delay';
}

const PaginationConfigInput = ({
  type,
  placeholder,
  after
}: PaginationConfigInputPropTypes) => {
  const [limit, setLimit] = useState<string>('');
  const dispatch = useAppDispatch();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setLimit(value.replace(/\D+/g, ''));
  };

  const blurHandler = () => {
    const validateLimit: number = +limit || 1;

    dispatch(
      setPaginate({
        [type]: validateLimit
      })
    );
    setLimit(String(validateLimit));
  };

  return (
    <div className={'pagination-input-container'}>
      <input
        className={'pagination-input'}
        placeholder={placeholder}
        type={'number'}
        value={limit}
        onChange={changeHandler}
        onBlur={blurHandler}
      />
      {after && <p className={'label-after'}>{after}</p>}
    </div>
  );
};

export default PaginationConfigInput;
