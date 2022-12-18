import React from "react"

import Button from "~components/Button"

const SelectProxy = ({ proxy, activeProxyId, clickHandler }) => (
  <div className="flex justify-between items-center text-sm font-medium text-gray-900 bg-white w-full border-b hover:bg-gray-100 py-2 px-4">
    <div className="block">
      <h4 className="text-sm text-bold">{proxy.name}</h4>
      <p className="text-gray-400">{`${proxy.host}:${proxy.port}`}</p>
    </div>
    {activeProxyId === proxy.id ? (
      <Button
        classes="border-red-600 text-red-600 ml-1.5"
        clickHandler={clickHandler(proxy.id)}
        text="disconnect"
      />
    ) : (
      <Button clickHandler={clickHandler(proxy.id)} text="Connect" />
    )}
  </div>
)

export default SelectProxy
