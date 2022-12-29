import { useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import Input from "~components/Input"
import Modal from "~components/Modal"

const initialState = {
  identifier: "",
  password: "",
  remember: false
}

const Login = ({ isOpen, closeHandler, setOpenLogin }) => {
  const [storedState, , { setStoreValue }] = useStorage(process.env.STORE_NAME)
  const [loginInfo, setLoginInfo] = useState(initialState)

  const changeHandler = (data) => {
    setLoginInfo((prev) => ({
      ...prev,
      [data.name]: data.value
    }))
  }

  const loginHandler = async () => {
    const res = await fetch(`${process.env.API_URL}/auth/sign-in`, {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    const data = await res.json()

    if (data.token) {
      setStoreValue({
        ...storedState,
        user: {
          username: loginInfo.identifier,
          token: data.token
        }
      })
    }

    setOpenLogin(false)
  }

  return (
    <Modal
      isOpen={isOpen}
      closeHandler={closeHandler}
      title="Login"
      actionElement={loginHandler}>
      <div className="flex justify-center p5-8">
        <form className="w-full mx-8">
          <div className="mb-6">
            <Input
              name="identifier"
              liftValue={changeHandler}
              id="exampleFormControlInput2"
              placeholder="Username or email"
              classes="px-4 py-2 text-xl"
            />
          </div>

          <div className="mb-6">
            <Input
              name="password"
              type="password"
              liftValue={changeHandler}
              id="exampleFormControlInput2"
              placeholder="Password"
              classes="px-4 py-2 text-xl"
            />
          </div>

          <div className="text-center lg:text-left">
            <p className="text-sm font-semibold mt-2 pt-1 mb-0">
              Don't have an account?{" "}
              <a
                href={`${process.env.DASHBOARD_URL}/auth/sign-up`}
                target={"_blank"}
                className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default Login
