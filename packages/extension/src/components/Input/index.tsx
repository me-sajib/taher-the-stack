import React, { useEffect, useState } from "react"

const Input = ({
  name,
  placeholder,
  liftValue,
  id = "",
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
          form-control
          px-2
          py-1
          value-sm
          font-normal
          value-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          inline-block
          focus:value-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
          ${classes}
        `}
        id={id || "exampleFormControlInput4"}
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
