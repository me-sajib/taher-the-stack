import { nanoid } from "nanoid"

const Table = ({ headings, heading = "", children }) => {
  return (
    <div className="relative rounded-xl overflow-auto border my-8">
      <div className="shadow-sm">
        {heading && (
          <h2 className="py-1.5 pl-3 text-xl bg-gray-50">{heading}</h2>
        )}

        <table className="border-collapse table-fixed w-full text-sm">
          <thead>
            <tr>
              {headings.map((heading) => (
                <th
                  key={nanoid()}
                  className="border-b font-medium p-4 text-slate-800 text-center bg-gray-50">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="dark:bg-gray-50">{children}</tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
