import type { PopupActionKind } from "~enum"

export interface Proxy {
  id: string
  name: string
  host: string
  port: number
  auth: string // username:password
  country?: string
  status: "active" | "checking" | "inactive"
  fetched: boolean
}

export interface User {
  username: string
  token: string
}

export interface InitialState {
  user: User | null
  active: Proxy | null
  proxies: Proxy[]
}

export interface PopupAction<T = any> {
  type: PopupActionKind
  payload: T
}
