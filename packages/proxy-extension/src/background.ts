import type { InitialState } from "~interfaces"
import { storage } from "~storage"

export {}

chrome.webRequest.onAuthRequired.addListener(
  (_, asyncCallback) => {
    storage.get<InitialState>(process.env.STORE_NAME).then((data) => {
      if (data) {
        const [username, password] = data.active.auth.split(":")
        console.log([username, password])
        asyncCallback({
          authCredentials: { username, password }
        })
      }
    })
  },
  { urls: ["<all_urls>"] },
  ["asyncBlocking"]
)
