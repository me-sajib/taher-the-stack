import clsx from 'clsx';
import { getChange } from 'packages/proxy-dashboard/utils';
import { Validator } from 'packages/proxy-dashboard/validator';
import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import { Modal } from './Modal';

interface BulkEditorTypes {
  modalId: string;
  title: string;
  editStateData: string;
  bulkEditHandler: (changedMap: Map<number, any>) => void;
  extraValidation?: (
    changedMap: Map<number, any>,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) => boolean;
}

export default function BulkEditor({
  editStateData,
  title,
  modalId,
  bulkEditHandler,
  extraValidation
}: BulkEditorTypes) {
  const [modalText, setModalText] = useState(editStateData);
  const [bulkError, setBulkError] = useState('');

  useEffect(() => {
    setModalText(editStateData);
  }, [editStateData]);

  const changeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setModalText(e.target.value);
  };

  const validateBulkData = (changedMap: Map<number, any>) => {
    for (const obj of changedMap.values()) {
      const validator = new Validator(obj);
      const isValidMessage = validator.lunch();

      if (isValidMessage !== true) {
        setBulkError(isValidMessage as string);
        return false;
      }
    }

    return extraValidation
      ? extraValidation(changedMap, setBulkError)
      : true;
  };

  const saveHandler = () => {
    try {
      const recentChange = JSON.parse(modalText);
      const prevState = JSON.parse(editStateData);
      const changedMap = getChange(prevState, recentChange);

      const isValid = validateBulkData(changedMap);

      if (isValid) {
        bulkEditHandler(changedMap);
        setBulkError('');
      }
    } catch (e) {
      return null;
    }
  };

  return (
    <Modal title={title} modalId={modalId}>
      {() => (
        <div className="flex flex-col gap-3 py-5">
          <textarea
            className={clsx(
              'textarea h-64 max-w-full resize-none bg-transparent text-black',
              {
                'textarea-primary': !bulkError,
                'textarea-error': bulkError
              }
            )}
            placeholder="JSON"
            value={modalText}
            onChange={changeHandler}
          />
          {bulkError && (
            <span className="mt-1 text-red-500">{bulkError}</span>
          )}
          <Button text="Update" clickHandler={saveHandler} />
        </div>
      )}
    </Modal>
  );
}
