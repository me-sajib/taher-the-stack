import React from "react"

import { capitalize } from "~lib"

const Badge = ({ variant = "active", positionDisable = false }) => {
  const variants = {
    active: "bg-green-500",
    checking: "bg-yellow-500",
    inactive: "bg-red-600"
  }

  return (
    <span
      className={`
      ${positionDisable ? "" : "absolute top-1"}
      text-xs inline-block py-1 px-1.5 leading-none text-center whitespace-nowrap capitalize font-bold  text-white rounded
      ${variants[variant.toLowerCase()]}
      `.trim()}>
      {capitalize(variant)}
    </span>
  )
}

export default Badge
