import React, { useState } from 'react'
import UsersTable from '../../Components/Users/UsersTable'
import { authService } from '../../services/authService'
import { message } from 'antd'
import { userService } from '../../services/userService'
import { useDispatch, useSelector } from 'react-redux'
import { setLstUser } from '../../Redux-toolkit/reducer/UserSlice'

const UsersManagement = () => {
  const [isShowPass, setIsShowPass] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { token } = useSelector(state => state.user)

  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()

  const getUser = (name) => {
    userService.getUser(token, name)
      .then(res => {
        successMessage(res.data.message)
        dispatch(setLstUser(res.data.content))
      })
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    await authService.dangKy({
      email: email,
      passWord: password
    })
      .then(res => {
        setOpenModal(false)
        console.log(res)
        getUser('')
      })
      .catch(err => {
        errorMessage(err.response.data.message)
      })
  }
  const [messageApi, contextHolder] = message.useMessage();
  const successMessage = (content) => {
    messageApi.open({
      type: 'success',
      content: content,
    });
  };
  const errorMessage = (content) => {
    messageApi.open({
      type: 'error',
      content: content,
    });
  };

  return (
    <div className='w-full'>
      <h1
        className='text-3xl font-bold pb-2 border-b-2 mb-4 flex items-center'
      >
        <span className='flex-1'>
          Users Management
        </span>

        <button
          className='text-xl bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded'
          onClick={() => {
            setOpenModal(true)
          }}
        >
          Add User
        </button>
      </h1>
      <UsersTable />
      {contextHolder}
      {
        openModal == true && (
          <div>
            <div className='fixed inset-0 bg-black bg-opacity-30 z-10' onClick={() => setOpenModal(false)}></div>
            <div className='w-full max-w-sm max-h-[90vh] overflow-y-auto fixed top-1/2 left-1/2 bg-white rounded-lg z-50 -translate-x-1/2 -translate-y-1/2 p-4'>
              <form
                className='w-full max-w-sm'
                onSubmit={handleSignUp}
              >
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
              </form>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default UsersManagement