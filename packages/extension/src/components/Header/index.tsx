import React from "react"

const Header = ({ heading, closeHandler }) => {
  return (
    <div className="flex justify-between items-center py-3 mb-2">
      <h1 className="font-medium leading-tight text-2xl text-white">
        {heading}
      </h1>
      <svg
        className="scale-150 cursor-pointer"
        onClick={closeHandler}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="white"
        viewBox="0 0 16 16">
        {" "}
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />{" "}
      </svg>
    </div>
  )
}

export default Header
