import React from "react"

const TableData = ({ classes = "", children }) => (
  <td
    className={`border-b border-slate-100 px-3 py-2 text-slate-500 overflow-hidden whitespace-nowrap break-words text-ellipsis text-center ${classes}`.trim()}>
    {children}
  </td>
)

export default TableData
