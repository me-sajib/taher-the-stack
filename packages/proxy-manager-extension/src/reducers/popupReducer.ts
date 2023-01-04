import { PopupActionKind } from "~enum"
import type { InitialState, PopupAction } from "~interfaces"
import { removeProxy, setProxy } from "~lib"
import { storage } from "~storage"

export const popupReducer = (state: InitialState, action: PopupAction) => {
  const clonedState = structuredClone(state)

  switch (action.type) {
    case PopupActionKind.CONNECT: {
      const proxy = clonedState.proxies.find(
        (proxy) => proxy.id === action.payload
      )
      clonedState.active = proxy
      removeProxy()
      setProxy(proxy)

      storage.set(process.env.STORE_NAME, {
        ...clonedState,
        proxies: clonedState.proxies.filter((proxy) => !proxy.fetched) // stored non fetched proxies
      })
      return clonedState
    }
    case PopupActionKind.DISCONNECT: {
      removeProxy()
      clonedState.active = null
      storage.set(process.env.STORE_NAME, {
        ...clonedState,
        proxies: clonedState.proxies.filter((proxy) => !proxy.fetched) // stored non fetched proxies
      })

      return clonedState
    }
    case PopupActionKind.FETCH: {
      return action.payload
    }
  }

  return state
}
