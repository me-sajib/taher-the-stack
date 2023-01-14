import { Storage } from "@plasmohq/storage"

import type { InitialState } from "~interfaces"
import { initialState } from "~reducers"

export const storage = new Storage({
  unlimited: true
})

async function initStorage() {
  const isInitialize = await storage.get<InitialState>(process.env.STORE_NAME)
  if (!isInitialize) {
    console.log("Init Storage")
    await storage.set(process.env.STORE_NAME, initialState)
  }
}

initStorage()
