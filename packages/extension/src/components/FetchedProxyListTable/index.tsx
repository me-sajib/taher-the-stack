import { useEffect, useState } from "react"
import shortid from "shortid"

import { useStorage } from "@plasmohq/storage/hook"

import Button from "~components/Button"
import Table from "~components/Table"
import TableData from "~components/TableData"
import { checkProxyList, getProxyList } from "~lib"
import { initialState } from "~reducers"

const FetchedProxyListTable = () => {
  const [storedState] = useStorage(process.env.STORE_NAME, initialState)
  const [proxyList, setProxyList] = useState([])
  const [checkingSet, setChecking] = useState(new Set())

  useEffect(() => {
    storedState.user !== null &&
      getProxyList()
        .then((list) => {
          setProxyList(list)
        })
        .catch(console.error)
  }, [storedState.user])

  const checkHandler = (id: string) => async () => {
    setChecking((prevSet) => new Set([...prevSet, id]))
    await checkProxyList([id])

    checkingSet.delete(id)
    setChecking(() => new Set(checkingSet))
  }

  const headings = [
    "Name",
    "Host",
    "Username",
    "Password",
    "Rotate Index",
    "Actions"
  ]

  return (
    <Table headings={headings} heading="Fetched Proxy List">
      {proxyList.map((list) => {
        const [username, password] = list.auth.split(":")

        const data = [
          list.name,
          list.host,
          username,
          "*".repeat(password.length),
          list.rotateIndex
        ]
        const isChecking = checkingSet.has(list.id)

        return (
          <tr key={shortid.generate()}>
            {data.map((item) => {
              return <TableData key={shortid.generate()}>{item}</TableData>
            })}
            <TableData>
              <Button
                variant={isChecking ? "red" : "green"}
                text={isChecking ? "Checking..." : "Check"}
                disabled={isChecking}
                clickHandler={checkHandler(list.id)}
              />
            </TableData>
          </tr>
        )
      })}
    </Table>
  )
}

export default FetchedProxyListTable
