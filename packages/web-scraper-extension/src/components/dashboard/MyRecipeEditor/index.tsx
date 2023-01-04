import { formatDistanceStrict } from 'date-fns/esm';
import { useEffect } from 'react';
import {
  NavigateFunction,
  useNavigate,
  useParams
} from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector
} from '../../../app/hooks';
import { store } from '../../../app/store';
import {
  deleteRecipe,
  getRecipes,
  saveToRecipe,
  updateRecipe
} from '../../../features/dashboard/dashboardSlice';
import {
  getIsScrapping,
  toggleScrapping
} from '../../../features/scraper/scraperSlice';
import { EXTENSION_TAG_NAME } from '../../../global';
import removeRecipeProp from '../../../helpers/removeRecipeProp';
import sendAction from '../../../helpers/sendAction';
import useRecipeForm from '../../../hooks/useRecipeForm';
import {
  Recipe,
  Recipes
} from '../../../interfaces/dashboard';
import addClass from '../../../utils/addClass';
import createFormatDate from '../../../utils/createFormatDate';
import InfiniteLoading from '../../loaders/InfiniteLoading';
import Divider from '../Divider';
import RecipeFormEditor from '../RecipeFormEditor';
import RecipeLayout from '../RecipeLayout';
import TinyButton from '../TinyButton';
import classes from './index.module.css';

const recipeResultHandler =
  (
    navigate: NavigateFunction // navigate to result page
  ) =>
  (
    { type, payload }: any,
    _: chrome.runtime.MessageSender,
    sendResponse: (
      response?: any
    ) => void
  ) => {
    if (type === 'OPEN_RECIPE_RESULT') {
      const {
        url,
        id,
        results,
        totalScraped,
        startTime
      } = payload;
      const { recipes } =
        store.getState().dashboard;
      const { hostname } = new URL(url);

      const recipe: Recipe = recipes[
        hostname as keyof Recipes
      ].at(Number(id) - 1)!;

      store.dispatch(
        updateRecipe({
          hostname,
          id,
          recipe: {
            ...recipe,
            updateAt:
              createFormatDate(),
            results,
            totalScraped,
            duration:
              formatDistanceStrict(
                startTime,
                new Date()
              )
          }
        })
      );

      sendResponse(
        `Updated recipe ${payload.name}`
      );
      navigate(
        `/my-recipe/${hostname}/${id}/result`
      ); // navigate to result page
    }
  };

const MyRecipeEditor = () => {
  const recipes =
    useAppSelector(getRecipes);
  const { hostname, id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const recipe: Recipe = recipes[
    hostname as string
  ].at(Number(id) - 1)!;
  const {
    recipeForm,
    isValidForm,
    resultSchema,
    setRecipeForm
  } = useRecipeForm(recipe);
  const isScrapping = useAppSelector(
    getIsScrapping
  );

  const hasResult = Boolean(
    recipe.totalScraped
  );

  const navigateResult = () =>
    navigate(
      `/my-recipe/${hostname}/${id}/result`
    );

  useEffect(() => {
    chrome.runtime.onMessage.addListener(
      recipeResultHandler(navigate)
    );
  }, []);

  useEffect(() => {
    if (chrome.storage) {
      chrome.storage.sync.set({
        [EXTENSION_TAG_NAME]:
          removeRecipeProp(recipes)
      });
    }
  }, [recipes]);

  const updateRecipeHandler = () => {
    dispatch(
      updateRecipe({
        hostname,
        id: Number(id) - 1,
        recipe: {
          name: recipeForm.name,
          paginate: recipeForm.paginate,
          url: recipeForm.url,
          resultSchema
        }
      })
    );
  };

  const runRecipeHandler = () => {
    const { url, paginate } =
      recipeForm;
    dispatch(toggleScrapping());
    sendAction(
      {
        id,
        url,
        paginate: {
          ...paginate,
          limit: !paginate.limit
            ? 1
            : paginate.limit
        },
        resultSchema,
        results: [],
        totalScraped: 0
      },
      'RUN_RECIPE'
    );
  };

  const cloneRecipeHandler = () => {
    const cloneRecipe =
      structuredClone(recipe);
    cloneRecipe.name = `${recipe.name}_clone`;

    dispatch(saveToRecipe(cloneRecipe));
  };

  const deleteRecipeHandler = () => {
    dispatch(
      deleteRecipe({
        hostname,
        index: Number(id) - 1
      })
    );

    navigate('/not-found');
  };

  return (
    <RecipeLayout
      heading={recipe.name}
      headingClasses={
        classes.recipeFormHeading
      }
    >
      <div
        className={classes.runButtons}
      >
        {hasResult && (
          <TinyButton
            classes={classes.runButton}
            innerText={'result'}
            clickHandler={
              navigateResult
            }
          />
        )}
        <TinyButton
          classes={classes.runButton}
          innerText={'run recipe'}
          clickHandler={
            runRecipeHandler
          }
          disable={isScrapping}
        >
          {isScrapping && (
            <InfiniteLoading />
          )}
        </TinyButton>
        <TinyButton
          classes={classes.runButton}
          innerText={'clone recipe'}
          clickHandler={
            cloneRecipeHandler
          }
        />
      </div>
      <Divider />
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
          classes={classes.delete}
          innerText="delete"
          clickHandler={
            deleteRecipeHandler
          }
        />
        <TinyButton
          classes={addClass(
            !isValidForm &&
              classes.disabled
          )}
          innerText={'update'}
          clickHandler={
            updateRecipeHandler
          }
        />
      </div>
    </RecipeLayout>
  );
};

export default MyRecipeEditor;
