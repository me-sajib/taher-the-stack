import flatten from 'flat';
import {
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  Page,
  PageFormState,
  Recipe
} from '../interfaces/dashboard';
import { ResultSchema } from '../interfaces/extension';
import generatePerfectKey from '../utils/generatePerfectKey';
import objectToArray from '../utils/ObjectToArray';

const generateStateFromRecipe = (
  recipe: Recipe | Page
) => {
  const {
    name,
    url,
    paginate,
    resultSchema
  } = recipe;
  return {
    name,
    url,
    paginate,
    resultSchemas: objectToArray(
      resultSchema
    )
  };
};

const useRecipeForm = (
  recipe: Recipe | Page
) => {
  const modifiedRecipe =
    generateStateFromRecipe(recipe);
  type StateResult =
    typeof modifiedRecipe.resultSchemas;
  const [recipeForm, setRecipeForm] =
    useState<
      PageFormState<StateResult>
    >(modifiedRecipe);
  const [
    isValidForm,
    setValidationForm
  ] = useState<boolean>(false);

  useEffect(() => {
    setRecipeForm(
      generateStateFromRecipe(recipe)
    );
  }, [recipe]);

  const toResultSchema = useCallback(
    () =>
      recipeForm.resultSchemas.reduce(
        (
          acc,
          {
            key: name,
            value: selectors
          }
        ) => {
          if (selectors.length) {
            // if any selector exist
            if (name in acc) {
              acc[
                generatePerfectKey(
                  acc,
                  name
                )
              ] = selectors;
            } else {
              acc[name] = selectors;
            }
          }

          return acc;
        },
        {} as ResultSchema
      ),
    [recipeForm.resultSchemas]
  );

  useEffect(() => {
    let cloneForm = recipeForm;

    if (cloneForm.paginate.limit) {
      cloneForm = flatten(cloneForm);
    }

    setValidationForm(
      Object.values(cloneForm).every(
        String
      )
    );
  }, [recipeForm]);

  return {
    recipeForm,
    isValidForm,
    resultSchema: toResultSchema(),
    setRecipeForm
  };
};

export default useRecipeForm;
