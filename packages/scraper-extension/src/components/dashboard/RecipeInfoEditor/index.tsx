import React from 'react';
import { PageFormState } from '../../../interfaces/dashboard';
import InputText from '../InputText';
import SectionLayout from '../SectionLayout';

interface RecipeInfoEditorPropTypes {
  name: string;
  url: string;
  setFormState: React.Dispatch<React.SetStateAction<any>>;
}

const RecipeInfoEditor = ({
  name,
  url,
  setFormState
}: RecipeInfoEditorPropTypes) => {
  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState((prevState: PageFormState) => ({
      ...prevState,
      [name]: value
    }));
  };
  return (
    <SectionLayout
      title="Recipe information"
      description="Name your recipe and choose the URL you'd like to scrape"
    >
      <InputText
        name={'name'}
        label="Recipe name"
        passedValue={name}
        placeholder="e.g. Yelp store names"
        liftValueOnBlur={blurHandler}
      />
      <InputText
        name={'url'}
        label="URL"
        placeholder="e.g. www.reddit.com"
        passedValue={url}
        liftValueOnBlur={blurHandler}
      />
    </SectionLayout>
  );
};

export default RecipeInfoEditor;
