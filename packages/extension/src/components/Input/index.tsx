import { useEffect, useState } from "react"

const Input = ({
  name,
  placeholder,
  liftValue,
  type = "text",
  defaultValue = "",
  classes = "",
  ...props
}) => {
  const [value, setValue] = useState("")

  useEffect(() => {
    if (!value) {
      setValue(defaultValue)
    }
  }, [])

  const changeHandler = (e) => {
    setValue(e.target.value)
  }

  const blurHandler = () => {
    liftValue({
      name,
      value: value
    })
  }

  return (
    <div>
      <input
        type={type}
        name={name}
        className={`
          "form-control w-full block rounded border-gray-200 px-1.5 py-1 focus:outline-none font-normal text-gray-700 bg-white border border-solid transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 ${classes}
        `.trim()}
        placeholder={placeholder}
        value={value}
        onChange={changeHandler}
        onBlur={blurHandler}
        {...props}
      />
    </div>
  )
}

export default Input
