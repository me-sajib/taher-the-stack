import { PageFormState } from '../../../interfaces/dashboard';
import PaginationEditor from '../PaginationEditor';
import PropertyEditor from '../PropertyEditor';
import RecipeInfoEditor from '../RecipeInfoEditor';

interface RecipeFormEditorPropTypes<
  ResultType = any
> {
  state: PageFormState<ResultType>;
  setState: React.Dispatch<
    React.SetStateAction<
      PageFormState<ResultType>
    >
  >;
  children?:
    | JSX.Element
    | JSX.Element[];
}

const RecipeFormEditor = ({
  state,
  setState
}: RecipeFormEditorPropTypes) => (
  <div>
    <RecipeInfoEditor
      name={state.name}
      url={state.url}
      setFormState={setState}
    />
    <PropertyEditor
      resultSchemas={
        state.resultSchemas
      }
      setFormState={setState}
    />
    <PaginationEditor
      paginate={state.paginate}
      setFormState={setState}
    />
  </div>
);

export default RecipeFormEditor;
