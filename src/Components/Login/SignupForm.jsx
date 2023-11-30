import React, { useState } from 'react'
import { authService } from '../../services/authService'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { loginSuccess } from '../../Redux-toolkit/reducer/UserSlice'
import { message } from 'antd'

const SignupForm = ({
  setChooseForm
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isShowPass, setIsShowPass] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSignUp = (e) => {
    e.preventDefault();
    authService.dangKy({
      email: email,
      passWord: password
    })
      .then(res => {
        dispatch(loginSuccess(res.data.content.accessToken, 'token'))
        setChooseForm(false)
        navigate('/')
      })
      .catch(err => {
        errorMessage(err.response.data.message)
      })
  }

  const [messageApi, contextHolder] = message.useMessage();
  const errorMessage = (content) => {
    messageApi.open({
      type: 'error',
      content: content,
    });
  };


  return (
    <form
      className='w-full max-w-sm'
      onSubmit={handleSignUp}
    >
      {contextHolder}
      <h1
        className='text-center text-4xl font-bold text-sky-400 uppercase my-6'
      >
        Sign Up
      </h1>
      <div className="mb-6">
        <label
          htmlFor="signup_email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email:
        </label>
        <input
          type="email"
          id="signup_email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6 relative">
        <label
          htmlFor="signup_password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type={isShowPass === false ? "password" : "text"}
          id="signup_password"
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
      <div className="mb-6 relative">
        <label
          htmlFor="comfirmPassword"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Comfirm Password
        </label>
        <input
          type={isShowPass === false ? "password" : "text"}
          id="comfirmPassword"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
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
      <div
        className="flex justify-between mb-6"
      >
        <button
          id='signin_btn'
          type="submit"
          disabled={email === '' || password === '' || confirmPassword === '' || password !== confirmPassword ? true : false}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
        >
          Sign Up
        </button>
      </div>
      <hr />
      <p
        className='text-center mt-4'
      >
        Have an account?
        <span
          className='text-blue-700 ml-2 font-medium px-2 py-1.5 rounded-md cursor-pointer hover:outline hover:outline-1 hover:outline-blue-700'
          onClick={() => setChooseForm(false)}
        >
          Sign In
        </span>
      </p>
    </form>
  )
}

export default SignupForm