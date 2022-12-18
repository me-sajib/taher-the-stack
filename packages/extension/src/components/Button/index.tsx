import React from "react"

const Button = ({
  text,
  clickHandler,
  classes = "border-slate-900 text-slate-900",
  icon = "",
  ...props
}) => {
  return (
    <button
      type="button"
      onClick={clickHandler}
      className={`
      inline-block
      px-2
      py-1
      border
      font-medium
      text-xs
      text-bold
      leading-tight
      capitalize rounded hover:bg-black
      hover:bg-opacity-5
      focus:outline-none
      focus:ring-0
      transition
      duration-150 
      ase-in-out
      ${classes}`.trim()}
      {...props}>
      {icon}
      {text}
    </button>
  )
}

export default Button
