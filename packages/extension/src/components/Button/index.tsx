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
    blue: "text-blue-600 hover:text-white hover:bg-blue-600 border-blue-600",
    red: "text-red-600 hover:text-white hover:bg-red-600 border-red-600",
    green: "text-green-600 hover:text-white hover:bg-green-600 border-green-600"
  }
  return (
    <button
      type="button"
      onClick={clickHandler}
      className={twMerge(
        `px-3 py-1.5 rounded-lg inline-block border-2 text-sm font-medium active:scale-95 transition duration-75 ease-in ${
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
