import { twMerge } from "tailwind-merge"

const Button = ({
  text,
  clickHandler,
  classes = "",
  icon = null,
  variant = "blue",
  ...props
}) => {
  const variants = {
    blue: "text-blue-600 hover:text-blue-900 hover:border-blue-900 ring-blue-100",
    red: "text-red-600 hover:text-red-900 hover:border-red-900 ring-red-100",
    green:
      "text-green-600 hover:text-green-900 hover:border-green-900 ring-green-100"
  }
  return (
    <button
      type="button"
      onClick={clickHandler}
      className={twMerge(
        `px-2 py-1 inline-block rounded border text-sm font-medium text-black hover:bg-transparent focus:outline-none focus:ring ${
          variants[variant] ?? ""
        } ${classes}`.trim()
      )}
      {...props}>
      {icon}
      {text}
    </button>
  )
}

export default Button
