import {
  useEffect,
  useState
} from 'react';
import {
  useAppDispatch,
  useAppSelector
} from '../../../app/hooks';
import {
  getRecipes,
  saveToRecipe,
  updateCurrentPage
} from '../../../features/dashboard/dashboardSlice';
import { EXTENSION_TAG_NAME } from '../../../global';
import removeRecipeProp from '../../../helpers/removeRecipeProp';
import useRecipeForm from '../../../hooks/useRecipeForm';
import {
  Page,
  Recipe
} from '../../../interfaces/dashboard';
import addClass from '../../../utils/addClass';
import createFormatDate from '../../../utils/createFormatDate';
import RecipeFormEditor from '../RecipeFormEditor';
import RecipeLayout from '../RecipeLayout';
import TinyButton from '../TinyButton';
import classes from './index.module.css';

interface SaveRecipePropTypes {
  page: Page | Recipe;
}

const SaveRecipe = ({
  page
}: SaveRecipePropTypes) => {
  const recipes =
    useAppSelector(getRecipes);
  const dispatch = useAppDispatch();

  const {
    recipeForm,
    isValidForm,
    resultSchema,
    setRecipeForm
  } = useRecipeForm(page);
  const [isSaved, setSaveStatus] =
    useState<boolean>(false);

  useEffect(() => {
    if (chrome.storage) {
      chrome.storage.sync.set({
        [EXTENSION_TAG_NAME]:
          removeRecipeProp(recipes)
      });
    }
  }, [recipes]);

  const saveRecipeHandler = () => {
    const { name, url, paginate } =
      recipeForm;
    const updatedRecipe = {
      name,
      url,
      paginate,
      resultSchema,
      createAt: createFormatDate(),
      updateAt: null
    };

    dispatch(
      updateCurrentPage(updatedRecipe)
    );
    dispatch(
      saveToRecipe(updatedRecipe)
    );

    setSaveStatus(true);
  };

  return (
    <RecipeLayout heading="Save scrapping recipe">
      <RecipeFormEditor
        state={recipeForm}
        setState={setRecipeForm}
      />

      <div
        className={
          classes.actionButtons
        }
      >
        <TinyButton
          classes={addClass(
            (!isValidForm || isSaved) &&
              classes.disabled,
            classes.create
          )}
          innerText={
            isSaved
              ? 'saved'
              : 'Create recipe'
          }
          clickHandler={
            saveRecipeHandler
          }
        />
      </div>
    </RecipeLayout>
  );
};

export default SaveRecipe;
