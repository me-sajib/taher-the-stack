import Badge from "~components/Badge"
import Button from "~components/Button"

const ActiveProxyBanner = ({
  proxy,
  isRefreshing,
  disconnectHandler,
  refreshHandler
}) => {
  let content = (
    <h2 className="font-medium mr-2 inline-block leading-tight text-lg mt-0 mb-2 text-white">
      No proxies connected
    </h2>
  )

  if (proxy) {
    content = (
      <>
        <div className="relative">
          <h2 className="font-medium mr-2 inline-block leading-tight text-xl mt-0 mb-2 text-white">
            {proxy.name}
          </h2>
          <Badge variant={proxy.status} />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-400">{`${proxy.host}:${proxy.port}`}</p>
          <div>
            {proxy.fetched && (
              <Button
                classes="border-green-600 text-green-600"
                clickHandler={refreshHandler(proxy.id)}
                disabled={isRefreshing}
                text={isRefreshing ? "Refreshing..." : "Refresh"}
              />
            )}
            <Button
              classes="border-red-600 text-red-600 ml-1.5"
              clickHandler={disconnectHandler(proxy.id)}
              text="disconnect"
            />
          </div>
        </div>
      </>
    )
  }

  return <div className="py-5 mt-3">{content}</div>
}

export default ActiveProxyBanner
