import React, { useState } from 'react'
import LoginForm from '../../Components/Login/LoginForm'
import SignupForm from '../../Components/Login/SignupForm'
import '../../assets/scss/login.scss'

const LoginPage = () => {

  const [chooseForm, setChooseForm] = useState(false);
  const setChooseFormm = (boolean) => {
    setChooseForm(boolean);
  }

  return (
    <div
      id='LoginPage'
      className="w-screen h-screen overflow-y-auto bg-sky-400 relative flex justify-center items-center">
      <div
        className={`content w-full h-[47rem] max-w-md ${chooseForm === true && 'active'}`}
      >
        <div
          className='signin w-[calc(100%-4rem)] max-h-full overflow-y-auto'
        >
          <LoginForm
            setChooseForm={setChooseFormm}
          />
        </div>
        <div
          className='signup w-[calc(100%-4rem)] max-h-full overflow-y-auto'
        >
          <SignupForm
            setChooseForm={setChooseFormm}
          />
        </div>
      </div>
    </div>
  )
}

export default LoginPage