import Button from "~components/Button"

const Modal = ({ isOpen, title, children, actionElement, closeHandler }) => {
  return (
    <div onClick={closeHandler} className="w-full">
      <div
        className={`rounded-lg bg-white w-1/3 p-8 m-auto shadow-2xl ${
          isOpen ? "" : "hidden fade"
        }`.trim()}>
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="mt-2 text-sm text-gray-500">
          Please enter your proxy manager credentials to log in
        </p>

        <div className="py-4">{children}</div>

        <div className="flex items-center justify-end text-xs">
          <Button text="Login" classes="mr-3" clickHandler={actionElement} />
          <Button variant="red" text="Close" clickHandler={closeHandler} />
        </div>
      </div>
    </div>
  )
}

export default Modal
