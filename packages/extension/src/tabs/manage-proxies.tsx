import { useEffect, useState } from "react"
import shortid from "shortid"

import { useStorage } from "@plasmohq/storage/hook"

import Badge from "~components/Badge"
import Button from "~components/Button"
import Input from "~components/Input"
import Login from "~components/Login"
import ProxySetRow from "~components/ProxySetRow"
import TableData from "~components/TableData"
import type { Proxy } from "~interfaces"
import { checkProxies, getProxies } from "~lib"
import { initialState } from "~reducers"

import "./style.css"

import Popup from "~components/Popup"

function ManageProxies() {
  const [storedState, , { setStoreValue }] = useStorage(
    process.env.STORE_NAME,
    initialState
  )
  const [proxies, setProxies] = useState<Proxy[]>([])
  const [isOpenLogin, setOpenLogin] = useState(false)
  const [isChecking, setChecking] = useState(false)
  const [popupDeleteStatus, setPopupDelete] = useState({
    status: false,
    id: null
  })

  console.log({ storedState })

  const toggleOpen = (e) => {
    if (e.currentTarget === e.target) {
      setOpenLogin((prev) => !prev)
    }
  }

  const logoutHandler = () => {
    fetch(`${process.env.API_URL}/auth/sign-out`)
    if (storedState.active?.fetched) {
      storedState.active = null
    }

    setStoreValue({
      ...storedState,
      user: null
    })
  }
  useEffect(() => {
    if (storedState.user) {
      getProxies().then((proxies: Proxy[]) => {
        setProxies((prev) => prev.concat(proxies))
      })
    }
  }, [storedState.user])

  useEffect(() => {
    if (storedState) {
      setProxies(storedState.proxies)
    }
  }, [storedState])

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

  const confirmDeleteProxy = (e) => {
    const filterProxies = proxies.filter(
      (proxy) => proxy.id !== popupDeleteStatus.id
    )
    setProxies(filterProxies)
    deletePopupCloseHandler(e)
  }

  const deletePopupCloseHandler = (e) => {
    if (e.currentTarget === e.target) {
      setPopupDelete((prev) => ({ ...prev, status: false }))
    }
  }

  const checkHandler = async () => {
    setChecking(() => true)
    const statuses = await checkProxies()

    const checkedProxies = proxies.map((proxy) => ({
      ...proxy,
      status: statuses[proxy.id] ?? proxy.status
    }))

    setProxies(checkedProxies)
    setChecking(() => false)
  }

  const saveChanges = () => {
    setStoreValue({
      ...storedState,
      proxies: proxies.filter((proxy) => !proxy.fetched)
    })
  }

  const headings = [
    "Name",
    "Host",
    "Port",
    "Username",
    "password",
    "Status",
    "Actions"
  ]

  return (
    <main>
      {popupDeleteStatus.status && (
        <div
          className="flex justify-center items-center fixed w-full h-full z-10 bg-red-300/50"
          onClick={deletePopupCloseHandler}>
          <Popup
            heading={`Are you want to Delete?`}
            actionHandler={confirmDeleteProxy}
            closeHandler={deletePopupCloseHandler}
          />
        </div>
      )}
      <div className="px-10 py-8">
        <div className="py-3 px-2 flex justify-between items-center">
          <h1 className="text-3xl">Proxy manager extension</h1>

          {storedState.user ? (
            <div className="flex justify-end items-center px-3">
              <Button
                variant={isChecking ? "red" : "green"}
                text={isChecking ? "Checking..." : "Check"}
                disabled={isChecking}
                clickHandler={checkHandler}
              />
              <Button
                variant="red"
                classes="mx-3"
                text={"Log out"}
                clickHandler={logoutHandler}
              />
              <h2 className="text-3xl text-right py-3 inline-block">
                {storedState.user.username}
              </h2>
            </div>
          ) : (
            <Button text={"Login"} clickHandler={toggleOpen} />
          )}
        </div>

        <Login
          isOpen={isOpenLogin}
          closeHandler={toggleOpen}
          setOpenLogin={setOpenLogin}
        />

        <div className="relative rounded-xl overflow-auto border my-8">
          <div className="shadow-sm">
            <table className="border-collapse table-fixed w-full text-sm">
              <thead>
                <tr>
                  {headings.map((heading) => (
                    <th
                      key={shortid.generate()}
                      className="border-b font-medium p-4 text-slate-800 text-center bg-gray-50">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="dark:bg-gray-50">
                <ProxySetRow
                  setProxies={setProxies}
                  saveChanges={saveChanges}
                />

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
                    <tr key={shortid.generate()}>
                      {data.map((item) => {
                        return (
                          <TableData key={shortid.generate()}>
                            <Input disabled={proxy.fetched} {...item} />
                          </TableData>
                        )
                      })}
                      <TableData>
                        <Badge variant={proxy.status} />
                      </TableData>
                      <TableData>
                        {proxy.fetched || (
                          <Button
                            text="Delete"
                            variant="red"
                            clickHandler={deleteProxy(proxy.id)}
                          />
                        )}
                      </TableData>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ManageProxies
