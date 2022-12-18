import React, { useEffect, useState } from "react"
import shortid from "shortid"

import { useStorage } from "@plasmohq/storage/hook"

import Badge from "~components/Badge"
import Button from "~components/Button"
import Input from "~components/Input"
import Login from "~components/Login"
import TableData from "~components/TableData"
import type { Proxy } from "~interfaces"
import { checkProxies, getProxies } from "~lib"
import { initialState } from "~reducers"

import "./style.css"

const ProxySetRow = ({ setProxies }) => {
  const [proxy, setProxy] = useState({
    id: "",
    name: "",
    host: "",
    port: NaN,
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

  return (
    <tr key={shortid.generate()}>
      <TableData>
        <Input
          name={"name"}
          placeholder={"name"}
          liftValue={changeProxyHandler}
          defaultValue={proxy.name}
        />
      </TableData>
      <TableData>
        <Input
          name={"host"}
          placeholder={"host"}
          liftValue={changeProxyHandler}
          defaultValue={proxy.host}
        />
      </TableData>
      <TableData>
        <Input
          name={"port"}
          placeholder={"port"}
          type="number"
          liftValue={changeProxyHandler}
          defaultValue={String(proxy.port)}
        />
      </TableData>
      <TableData>
        <Input
          name={"username"}
          placeholder={"username"}
          liftValue={changeProxyHandler}
          defaultValue={proxy.username}
        />
      </TableData>
      <TableData>
        <Input
          name={"password"}
          placeholder={"password"}
          liftValue={changeProxyHandler}
          defaultValue={proxy.password}
        />
      </TableData>
      <TableData> </TableData>
      <TableData>
        <Button
          classes="border-blue-600 text-blue-600"
          text="Add Proxy"
          clickHandler={addProxy}
        />
      </TableData>
    </tr>
  )
}

function ManageProxies() {
  const [storedState, , { setStoreValue }] = useStorage(
    process.env.STORE_NAME,
    initialState
  )
  const [proxies, setProxies] = useState<Proxy[]>([])
  const [isOpenLogin, setOpenLogin] = useState(false)
  const [isChecking, setChecking] = useState(false)

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
    const filterProxies = proxies.filter((proxy) => proxy.id !== id)
    setProxies(filterProxies)
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

  return (
    <main className="px-10 py-8">
      <div className="py-3 px-2 flex justify-between items-center">
        <h1 className="text-3xl">Proxy manager extension</h1>

        {storedState.user ? (
          <div className="flex justify-end items-center px-3">
            <Button
              classes={`text-white mx-5 hover:text-black ${
                isChecking
                  ? "border-yellow-600 bg-yellow-600"
                  : "border-green-600 bg-green-600"
              }`}
              text={isChecking ? "Checking..." : "Check"}
              disabled={isChecking}
              clickHandler={checkHandler}
            />
            <Button
              classes="border-red-600 text-red-600 mr-5"
              text={"Log out"}
              clickHandler={logoutHandler}
            />
            <h2 className="text-3xl text-right py-3 inline-block">
              {storedState.user.username}
            </h2>
          </div>
        ) : (
          <Button
            classes="border-blue-600 text-blue-600"
            text={"Login"}
            clickHandler={toggleOpen}
          />
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
                <th className="border-b font-medium p-4 text-slate-800 text-center bg-gray-50">
                  Name
                </th>
                <th className="border-b font-medium p-4 text-slate-800 text-center bg-gray-50">
                  Host
                </th>
                <th className="border-b font-medium p-4 text-slate-800 text-center bg-gray-50">
                  Port
                </th>
                <th className="border-b font-medium p-4 text-slate-800 text-center bg-gray-50">
                  Username
                </th>
                <th className="border-b font-medium p-4 text-slate-800 text-center bg-gray-50">
                  password
                </th>
                <th className="border-b font-medium p-4 text-slate-800 text-center bg-gray-50">
                  Status
                </th>
                <th className="border-b font-medium p-4 text-slate-800 text-center bg-gray-50">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="dark:bg-gray-50">
              <ProxySetRow setProxies={setProxies} />
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
                        <TableData>
                          <Input
                            key={shortid.generate()}
                            disabled={proxy.fetched}
                            {...item}
                          />
                        </TableData>
                      )
                    })}
                    <TableData>
                      <Badge positionDisable={true} variant={proxy.status} />
                    </TableData>
                    <TableData>
                      {proxy.fetched || (
                        <Button
                          classes="border-red-600 text-red-600"
                          text="Delete"
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

      <div className="py-3 text-center">
        <Button
          classes="text-bold border-green-600 text-green-600 text-2xl"
          text="Save changes"
          clickHandler={saveChanges}
        />
      </div>
    </main>
  )
}

export default ManageProxies
