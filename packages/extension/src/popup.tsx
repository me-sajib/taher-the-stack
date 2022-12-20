import { useEffect, useReducer, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import "tw-elements"

import ActiveProxyBanner from "~components/ActiveProxyBanner"
import Header from "~components/Header"
import SelectProxy from "~components/SelectProxy"
import { PopupActionKind } from "~enum"
import type { InitialState } from "~interfaces"
import { checkProxyList, getProxyList } from "~lib"
import { initialState, popupReducer } from "~reducers"

import "./style.css"

function IndexPopup() {
  const [storedState] = useStorage<InitialState>(
    process.env.STORE_NAME,
    initialState
  )

  const [state, dispatch] = useReducer<typeof popupReducer>(
    popupReducer,
    initialState
  )
  const [isRefreshing, setRefreshStatus] = useState(false)

  // fetch all proxies from manager
  useEffect(() => {
    storedState.user !== null &&
      getProxyList()
        .then((proxies) => {
          console.log({ proxies })
          dispatch({
            type: PopupActionKind.FETCH,
            payload: {
              ...storedState,
              proxies: proxies.concat(storedState.proxies)
            }
          })
        })
        .catch(console.error)
  }, [storedState.user])

  useEffect(() => {
    if (storedState) {
      dispatch({
        type: PopupActionKind.FETCH,
        payload: {
          ...storedState,
          proxies: state.proxies
            .filter((proxy) => proxy.fetched)
            .concat(storedState.proxies)
        }
      })
    }
  }, [storedState])

  const connectDisconnectHandler = (id: string) => () => {
    if (id !== state.active?.id) {
      return dispatch({
        type: PopupActionKind.CONNECT,
        payload: id
      })
    }

    return dispatch({
      type: PopupActionKind.DISCONNECT,
      payload: id
    })
  }

  const redirectToManageProxies = () => {
    chrome.tabs.create({
      active: true,
      url: `chrome-extension://${chrome.runtime.id}/tabs/manage-proxies.html`
    })
  }

  const refreshHandler = (id) => async () => {
    setRefreshStatus(true)
    await checkProxyList([id])

    setRefreshStatus(false)
  }

  const closePopupHandler = () => window.close()

  return (
    <main>
      <section className="bg-slate-900 p-3">
        <Header
          heading={"Proxy manager extension"}
          closeHandler={closePopupHandler}
        />
        <ActiveProxyBanner
          proxy={state.active}
          isRefreshing={isRefreshing}
          disconnectHandler={connectDisconnectHandler}
          refreshHandler={refreshHandler}
        />
      </section>
      <section className="p-3">
        <h4 className="font-medium leading-tight text-xl text-black text-bold mb-2">
          Select Proxy
        </h4>
        <div className="mt-2 rounded-lg border overflow-y-auto max-h-52">
          {state.proxies.map((proxy) => (
            <SelectProxy
              key={proxy.id}
              proxy={proxy}
              activeProxyId={state.active?.id}
              clickHandler={connectDisconnectHandler}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={redirectToManageProxies}
          className="w-full inline-block px-6 py-2 mt-3 border-2 border-blue-900 text-blue-900 font-medium text-xs leading-normal uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out text-bold">
          Add new
        </button>
      </section>
    </main>
  )
}

export default IndexPopup
