import { useState } from "react"
import shortid from "shortid"

import Button from "~components/Button"
import Input from "~components/Input"
import TableData from "~components/TableData"

const ProxySetRow = ({ setProxies, saveChanges }) => {
  const [proxy, setProxy] = useState({
    id: "",
    name: "",
    host: "",
    port: "",
    username: "",
    password: ""
  })

  const addProxy = () => {
    const submitProxy = {
      id: shortid.generate(),
      name: proxy.name,
      host: proxy.host,
      port: +proxy.port,
      auth: `${proxy.username}:${proxy.password}`,
      createdAt: new Date(),
      fetched: false
    }
    setProxies((proxies) => [submitProxy, ...proxies])
  }

  const changeProxyHandler = (data) => {
    const clonedProxy = structuredClone(proxy)
    clonedProxy[data.name] = data.value
    setProxy((prevProxy) => ({ ...prevProxy, ...clonedProxy }))
  }

  const proxyInputs = [
    {
      name: "name",
      placeholder: "name",
      defaultValue: proxy.name
    },
    {
      name: "host",
      placeholder: "host",
      defaultValue: proxy.host
    },
    {
      name: "port",
      placeholder: "port",
      defaultValue: String(proxy.port)
    },
    {
      name: "username",
      placeholder: "username",
      defaultValue: proxy.username
    },
    {
      name: "password",
      placeholder: "password",
      defaultValue: proxy.password
    }
  ]

  return (
    <tr>
      {proxyInputs.map((proxy) => (
        <TableData key={shortid.generate()}>
          <Input {...proxy} liftValue={changeProxyHandler} />
        </TableData>
      ))}
      <TableData> </TableData>
      <TableData>
        <Button text="Add Proxy" clickHandler={addProxy} />
        <Button
          classes="ml-3"
          variant="green"
          text="Save"
          clickHandler={saveChanges}
        />
      </TableData>
    </tr>
  )
}

export default ProxySetRow
