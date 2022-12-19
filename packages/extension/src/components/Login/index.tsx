import { useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import Input from "~components/Input"
import Modal from "~components/Modal"

const initialState = {
  identifier: "",
  password: "",
  remember: false
}

const LoginButton = ({ loginHandler }) => (
  <button
    type="button"
    onClick={loginHandler}
    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
    data-bs-dismiss="modal">
    Login
  </button>
)

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
      actionElement={<LoginButton loginHandler={loginHandler} />}>
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

          {/* <div className="flex justify-between items-center mb-6">
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              id="exampleCheck2"
            />
            <label
              className="form-check-label inline-block text-gray-800"
              htmlFor="exampleCheck2">
              Remember me
            </label>
          </div>
        </div> */}

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
