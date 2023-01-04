import React from 'react';
import { Page } from '../../../interfaces/dashboard';
import { Paginate } from '../../../interfaces/extension';
import InputText from '../InputText';
import SectionLayout from '../SectionLayout';

interface PaginationEditorPropTypes {
  paginate: Paginate;
  setFormState: React.Dispatch<
    React.SetStateAction<any>
  >;
}

const PaginationEditor = ({
  paginate,
  setFormState
}: PaginationEditorPropTypes) => {
  const blurHandler = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormState((prevState: Page) => ({
      ...prevState,
      paginate: {
        ...prevState.paginate,
        [name]: value
      }
    }));
  };

  const numberModifier = (
    value: string
  ) => value.replace(/\D/g, '');

  return (
    <SectionLayout
      title="Page navigation"
      description="Navigate single or multiple pages"
    >
      <InputText
        name={'limit'}
        label={
          'Number of pages to scrape'
        }
        passedValue={String(
          paginate.limit
        )}
        placeholder="1"
        changeModifier={numberModifier}
        liftValueOnBlur={blurHandler}
      />
      <InputText
        name={'delay'}
        label={
          'Number of seconds to scrape each page'
        }
        passedValue={String(
          paginate.delay
        )}
        placeholder="5s"
        changeModifier={numberModifier}
        liftValueOnBlur={blurHandler}
      />
      <InputText
        name={'selector'}
        label={'Paginate selector'}
        passedValue={String(
          paginate.selector
        )}
        placeholder=".css .selector"
        liftValueOnBlur={blurHandler}
      />
    </SectionLayout>
  );
};

export default PaginationEditor;
