import { useRef } from 'react';

interface ModalPropTypes {
  modalId: string;
  title: string;
  description?: string;
  children: (
    closeRef: React.RefObject<HTMLLabelElement>
  ) => JSX.Element[] | JSX.Element;
}

export const Modal = ({
  modalId,
  title,
  description,
  children
}: ModalPropTypes) => {
  const ref = useRef();

  return (
    <>
      <input className="modal-state" id={modalId} type="checkbox" />
      <div className="modal w-screen">
        <label className="modal-overlay" htmlFor={modalId}></label>
        <div className="modal-content w-4/12 bg-gray-100">
          <label
            ref={ref}
            className="modal-close"
            htmlFor={modalId}
          ></label>
          <h2 className="text-2xl text-black font-semibold mb-3">
            {title}
          </h2>
          <p>{description}</p>

          {children(ref)}
        </div>
      </div>
    </>
  );
};
