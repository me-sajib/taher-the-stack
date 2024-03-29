import { twMerge } from "tailwind-merge"

import { capitalize } from "~lib"

const variants = {
  active: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="-ml-1 mr-1.5 h-4 w-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    class: "bg-emerald-100 text-emerald-700"
  },
  checking: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="-ml-1 mr-1.5 h-4 w-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z"
        />
      </svg>
    ),
    class: "bg-amber-100 text-amber-700"
  },
  inactive: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="-ml-1 mr-1.5 h-4 w-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>
    ),
    class: "bg-red-100 text-red-700"
  }
}

const Badge = ({ variant = "active", label = "", classes = "" }) => {
  const selectedVariant = variants[variant.toLowerCase()] ?? "active"
  return (
    <span
      className={twMerge(
        `inline-flex items-center justify-center rounded-full px-2.5 py-0.5 ${selectedVariant.class} ${classes}`
      )}>
      {selectedVariant.icon}
      <p className="whitespace-nowrap text-sm">
        {capitalize(label || variant)}
      </p>
    </span>
  )
}

export default Badge
