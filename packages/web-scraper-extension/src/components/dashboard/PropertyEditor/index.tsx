import React, { useState } from 'react';
import { PageFormState } from '../../../interfaces/dashboard';
import generateUid from '../../../utils/generateUid';
import Button from '../../Button';
import InputText from '../InputText';
import PropertyInput from '../PropertyInput';
import SectionLayout from '../SectionLayout';
import styles from './index.module.css';

interface ResultsSchema {
  id: string;
  key: string;
  value: string[];
}

interface PropertyEditorPropTypes {
  resultSchemas: ResultsSchema[];
  setFormState: React.Dispatch<
    React.SetStateAction<any>
  >;
}

const PropertyEditor = ({
  resultSchemas,
  setFormState
}: PropertyEditorPropTypes) => {
  const [
    isSelectorEdit,
    setSelectorEdit
  ] = useState<boolean>(false);
  const [add, setAdd] =
    useState<boolean>(true);
  const toggleEdit = () =>
    setSelectorEdit(!isSelectorEdit);
  const toggleAddStatus = () =>
    setAdd(!add);

  const updateResultSchema =
    (id: string) =>
    (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const target =
        e.target as HTMLInputElement;
      const { value } = target;

      value &&
        setFormState(
          (
            prevState: PageFormState<
              typeof resultSchemas
            >
          ) => ({
            ...prevState,
            resultSchemas:
              prevState.resultSchemas.map(
                (schema) => {
                  const {
                    id: currentId,
                    value: selectors
                  } = schema;

                  if (
                    id === currentId
                  ) {
                    if (
                      isSelectorEdit ||
                      !selectors.length
                    ) {
                      return {
                        ...schema,
                        value:
                          value.split(
                            /,\s*/
                          )
                      };
                    }

                    return {
                      ...schema,
                      key: value
                    };
                  }

                  return schema;
                }
              )
          })
        );
    };

  const deleteButtonHandler =
    (id: string) => () => {
      setFormState(
        (
          prevState: PageFormState<
            typeof resultSchemas
          >
        ) => ({
          ...prevState,
          resultSchemas:
            prevState.resultSchemas.filter(
              (schema) =>
                schema.id !== id
            )
        })
      );
    };

  const addKeyDownDandler =
    (value: string) =>
    (
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      const { key } = e;

      if (value && key === 'Enter') {
        setFormState(
          (
            prevState: PageFormState<
              typeof resultSchemas
            >
          ) => ({
            ...prevState,
            resultSchemas: [
              ...prevState.resultSchemas,
              {
                id: generateUid(),
                key: value,
                value: []
              }
            ]
          })
        );

        toggleAddStatus();
      }
    };

  return (
    <SectionLayout
      title="Selected properties"
      description="Name the data you selected to extract"
      inputBoxClasses={
        styles.propEditorInputBox
      }
    >
      <div
        className={
          styles.inputContainer
        }
      >
        {resultSchemas.map(
          ({
            id,
            key: name,
            value: selectors
          }) => {
            let inputProps;

            if (
              isSelectorEdit ||
              !selectors.length
            ) {
              inputProps = {
                label: name,
                placeholder:
                  '.css .selector',
                passedValue:
                  selectors.join(', ')
              };
            } else {
              inputProps = {
                placeholder:
                  'property name',
                passedValue: name
              };
            }

            return (
              <PropertyInput
                key={id}
                id={id}
                isSelectorEdit={
                  isSelectorEdit
                }
                inputProps={inputProps}
                updateResultSchema={
                  updateResultSchema
                }
                deleteButtonHandler={
                  deleteButtonHandler
                }
              />
            );
          }
        )}

        {!isSelectorEdit &&
          (add ? (
            <Button
              classes={styles.addButton}
              status="add"
              clickAction={
                toggleAddStatus
              }
            />
          ) : (
            <InputText
              placeholder="Enter property name"
              liftValueOnKeyDown={
                addKeyDownDandler
              }
            />
          ))}
      </div>

      <Button
        classes={styles.editButton}
        innerText={
          isSelectorEdit
            ? 'Edit property'
            : 'Edit selector'
        }
        clickAction={toggleEdit}
      />
    </SectionLayout>
  );
};

export default PropertyEditor;
