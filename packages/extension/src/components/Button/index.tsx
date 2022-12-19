import { twMerge } from "tailwind-merge"

const Button = ({
  text,
  clickHandler,
  classes = "",
  icon = "",
  variant = "blue",
  ...props
}) => {
  const variants = {
    blue: "border-blue-600 bg-blue-600 active:text-blue-500",
    red: "border-red-600 bg-red-600 active:text-red-500",
    green: "border-green-600 bg-green-600 active:text-green-500"
  }
  return (
    <button
      type="button"
      onClick={clickHandler}
      className={twMerge(
        `px-2 py-1 inline-block rounded border text-sm font-medium text-white hover:text-black hover:bg-transparent focus:outline-none focus:ring ${variants[variant]} ${classes}`.trim()
      )}
      {...props}>
      {icon}
      {text}
    </button>
  )
}

export default Button
