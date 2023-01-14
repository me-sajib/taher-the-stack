import { nanoid } from "nanoid"
import { useEffect, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import Button from "~components/Button"
import Input from "~components/Input"
import Popup from "~components/Popup"
import ProxySetRow from "~components/ProxySetRow"
import Table from "~components/Table"
import TableData from "~components/TableData"
import type { Proxy } from "~interfaces"
import { initialState } from "~reducers"

const LocalProxyTable = () => {
  const [storedState, , { setStoreValue }] = useStorage(
    process.env.STORE_NAME,
    initialState
  )
  const [proxies, setProxies] = useState<Proxy[]>([])
  const [popupDeleteStatus, setPopupDelete] = useState({
    status: false,
    id: null
  })

  useEffect(() => {
    if (storedState) {
      setProxies(storedState.proxies)
    }
  }, [storedState])

  const headings = ["Name", "Host", "Port", "Username", "password", "Actions"]

  const changeHandler = (id) => (data) => {
    const proxyIndex = storedState.proxies.findIndex((proxy) => proxy.id === id)
    const clonedProxies = structuredClone(storedState.proxies)
    clonedProxies[proxyIndex][data.name] = data.value

    setProxies(clonedProxies.concat(proxies.filter((proxy) => proxy.fetched)))
  }

  const deleteProxy = (id) => () => {
    setPopupDelete({
      status: true,
      id
    })
  }

  const deletePopupCloseHandler = (e) => {
    if (e.currentTarget === e.target) {
      setPopupDelete((prev) => ({ ...prev, status: false }))
    }
  }

  const confirmDeleteProxy = (e) => {
    const filterProxies = proxies.filter(
      (proxy) => proxy.id !== popupDeleteStatus.id
    )
    setProxies(filterProxies)
    deletePopupCloseHandler(e)
  }

  const saveChanges = () => {
    setStoreValue({
      ...storedState,
      proxies: proxies.filter((proxy) => !proxy.fetched)
    })
  }

  return (
    <>
      {popupDeleteStatus.status && (
        <div
          className="flex justify-center items-center fixed w-full h-full top-0 -left-1 z-10 bg-red-300/50"
          onClick={deletePopupCloseHandler}>
          <Popup
            heading={`Are you want to Delete?`}
            actionHandler={confirmDeleteProxy}
            closeHandler={deletePopupCloseHandler}
          />
        </div>
      )}
      <Table headings={headings} heading="Local Proxies">
        <ProxySetRow setProxies={setProxies} saveChanges={saveChanges} />

        {proxies.map((proxy: Proxy) => {
          const [username, password] = proxy.auth.split(":")
          const liftValue = changeHandler(proxy.id)
          const data = [
            {
              name: "name",
              placeholder: "proxy name",
              liftValue,
              defaultValue: proxy.name
            },
            {
              name: "host",
              placeholder: "host",
              liftValue,
              defaultValue: proxy.host
            },
            {
              name: "port",
              placeholder: "port",
              liftValue,
              type: "number",
              defaultValue: String(proxy.port)
            },
            {
              name: "username",
              placeholder: "username",
              liftValue,
              defaultValue: username
            },
            {
              name: "password",
              type: "password",
              placeholder: "password",
              liftValue,
              defaultValue: password
            }
          ]

          return (
            <tr key={nanoid()}>
              {data.map((item) => {
                return (
                  <TableData key={nanoid()}>
                    <Input {...item} />
                  </TableData>
                )
              })}
              <TableData>
                <Button
                  text="Delete"
                  variant="red"
                  clickHandler={deleteProxy(proxy.id)}
                />
              </TableData>
            </tr>
          )
        })}
      </Table>
    </>
  )
}

export default LocalProxyTable
