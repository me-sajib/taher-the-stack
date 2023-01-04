import Button from "~components/Button"

const Popup = ({ heading, description = "", actionHandler, closeHandler }) => {
  return (
    <div
      className="rounded-2xl border border-blue-100 bg-white p-8 shadow-lg"
      role="alert">
      <div className="items-center sm:flex">
        <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-400 text-white">
          <svg
            className="h-3 w-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              clip-rule="evenodd"
              d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
              fill-rule="evenodd"
            />
          </svg>
        </span>

        <p className="mt-3 text-lg font-medium sm:mt-0 sm:ml-3">{heading}</p>
      </div>

      {description && <p className="mt-4 text-gray-500">{description}</p>}

      <div className="mt-6 sm:flex">
        <Button
          classes="mr-3"
          variant="red"
          text="Delete"
          clickHandler={actionHandler}
        />
        <Button variant={null} text="Close" clickHandler={closeHandler} />
      </div>
    </div>
  )
}

export default Popup
