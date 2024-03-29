import Badge from "~components/Badge"
import Button from "~components/Button"

const SelectProxy = ({ proxy, activeProxyId, clickHandler }) => (
  <div className="flex justify-between items-center text-sm font-medium text-gray-900 bg-white w-full border-b hover:bg-gray-100 py-2 px-4">
    <div className="block">
      <h4 className="text-sm text-bold">
        {proxy.name}{" "}
        {proxy.fetched && <Badge classes="scale-75" label="fetched" />}
      </h4>
      <p className="text-gray-400">{`${proxy.host}:${proxy.port}`}</p>
    </div>
    {activeProxyId === proxy.id ? (
      <Button
        variant="red"
        clickHandler={clickHandler(proxy.id)}
        text="disconnect"
      />
    ) : (
      <Button clickHandler={clickHandler(proxy.id)} text="Connect" />
    )}
  </div>
)

export default SelectProxy
