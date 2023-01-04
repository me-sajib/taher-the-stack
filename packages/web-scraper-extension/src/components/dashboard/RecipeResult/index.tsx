import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { getRecipes } from '../../../features/dashboard/dashboardSlice';
import {
  Recipe,
  Recipes
} from '../../../interfaces/dashboard';
import ResultLayout from '../ResultLayout';

const RecipeResult = () => {
  const recipes: Recipes =
    useAppSelector(getRecipes);
  const { hostname, id } = useParams();
  const recipe: Recipe = recipes[
    hostname as keyof Recipe
  ].at(Number(id) - 1)!;

  const {
    name,
    results = [],
    totalScraped = 0,
    updateAt,
    duration
  } = recipe;

  const statues = [
    {
      heading: String(results.length),
      status: 'row extracted'
    },
    {
      heading: String(totalScraped),
      status: 'properties extracted'
    }
  ];

  if (duration) {
    statues.push(
      {
        heading: duration,
        status: 'time to complete'
      },
      {
        heading: String(
          recipe.paginate.limit || 1
        ),
        status: 'page scraped'
      }
    );
  }

  return (
    <ResultLayout
      name={name}
      hostname={hostname!}
      results={results}
      dates={[updateAt]}
      statuses={statues}
    />
  );
};

export default RecipeResult;
