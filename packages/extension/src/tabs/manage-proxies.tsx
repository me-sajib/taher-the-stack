import { useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import Button from "~components/Button"
import FetchedProxyListTable from "~components/FetchedProxyListTable"
import LocalProxyTable from "~components/LocalProxyTable"
import Login from "~components/Login"
import { initialState } from "~reducers"

import "./style.css"

function ManageProxies() {
  const [storedState, , { setStoreValue }] = useStorage(
    process.env.STORE_NAME,
    initialState
  )
  const [isOpenLogin, setOpenLogin] = useState(false)

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

  return (
    <main>
      <header aria-label="Page Header" className="bg-gray-50 ">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Easy Proxy Manger Extension
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                Mange your proxies through extension
              </p>
            </div>
          </div>
          {storedState.user ? (
            <div className="flex justify-end items-center px-3">
              <Button
                variant="red"
                classes="mx-3"
                text={"Log out"}
                clickHandler={logoutHandler}
              />
              <h2 className="text-3xl">{storedState.user.username}</h2>
            </div>
          ) : (
            <Button text={"Login"} clickHandler={toggleOpen} />
          )}
        </div>
      </header>

      <div className="px-12 py-8 min-h-screen">
        <Login
          isOpen={isOpenLogin}
          closeHandler={toggleOpen}
          setOpenLogin={setOpenLogin}
        />

        <LocalProxyTable />
        {storedState.user && <FetchedProxyListTable />}
      </div>

      <footer aria-label="Site Footer" className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
            {`Copyright © ${new Date().getFullYear()} - SoftwareSheba`}
          </p>
        </div>
      </footer>
    </main>
  )
}

export default ManageProxies
