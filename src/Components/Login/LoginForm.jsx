import React, { useState } from 'react'
import { authService } from '../../services/authService'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../Redux-toolkit/reducer/UserSlice'
import { useNavigate } from 'react-router'
import { sessionService } from '../../services/sessionServices'

const LoginForm = ({
  setChooseForm
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isShowPass, setIsShowPass] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = (e) => {
    e.preventDefault();
    authService.dangNhap({
      email: email,
      passWord: password
    })
      .then(res => {
        sessionService.setItem(res.data.content.accessToken, 'token')
        dispatch(loginSuccess(res.data.content,'user'))
        setChooseForm(false)
        navigate('/')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <form
      className='w-full max-w-sm'
      onSubmit={handleSignIn}
    >
      <h1
        className='text-center text-3xl font-bold text-sky-400 uppercase mb-4'
      >
        Sign In
      </h1>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-6 relative">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type={isShowPass === false ? "password" : "text"}
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className='absolute bottom-2 right-2'
          onClick={() => setIsShowPass(!isShowPass)}
        >
          {
            isShowPass === false ?
              <i className='fa-solid fa-eye-slash -scale-x-100'></i>
              :
              <i className='fa-solid fa-eye'></i>
          }
        </button>
      </div>
      <div className="flex items-start mb-6">
        <div className="flex items-center h-5 relative">
          <input id="remember" type="checkbox" defaultValue className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
        </div>
        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
      </div>
      <div
        className="flex justify-between mb-6"
      >
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
      </div>
      <hr />
      <p
        className='text-center mt-4'
      >
        Don't have an account?
        <span
          className='text-blue-700 ml-2 font-medium px-2 py-1.5 rounded-md cursor-pointer hover:outline hover:outline-1 hover:outline-blue-700'
          onClick={() => setChooseForm(true)}
        >
          Sign Up
        </span>
      </p>
    </form>
  )
}

export default LoginForm