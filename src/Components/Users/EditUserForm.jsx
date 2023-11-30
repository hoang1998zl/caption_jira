import { Button, Input, message } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { userService } from '../../services/userService'

const EditUserForm = ({
  getUser,
  handleOpenModal
}) => {
  const { token, selectedUser } = useSelector(state => state.user)

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

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: e.target.id.value,
      email: e.target.email.value,
      password: e.target.passWord.value,
      name: e.target.name.value,
      phoneNumber: e.target.phoneNumber.value
    }
    userService.editUser(token, data)
      .then(res => {
        successMessage(res.data.message)
        getUser('');
        handleOpenModal(false)
      })
      .catch(err => {
        errorMessage(err.response.data.content)
      })
  }

  return (
    <form
      className='w-full py-2 max-h-[50vh] overflow-y-auto'
      onSubmit={(e) => {
        onSubmit(e)
      }}
    >

      {contextHolder}
      <div>
        <p
          className='font-semibold mb-2'
        >
          User ID:
        </p>
        <Input
          id='id'
          className='w-full rounded mb-4'
          size='large'
          value={selectedUser?.userId}
          disabled
        />
      </div>
      <div>
        <p
          className='font-semibold mb-2'
        >
          Email:
        </p>
        <Input
          id='email'
          className='w-full rounded mb-4'
          size='large'
          defaultValue={selectedUser?.email}
        />
      </div>
      <div>
        <p
          className='font-semibold mb-2'
        >
          Password:
        </p>
        <Input
          id='passWord'
          className='w-full rounded mb-4'
          size='large'
          defaultValue={selectedUser?.password}
        />
      </div>
      <div>
        <p
          className='font-semibold mb-2'
        >
          Name:
        </p>
        <Input
          id='name'
          className='w-full rounded mb-4'
          size='large'
          defaultValue={selectedUser?.name}
        />
      </div>
      <div>
        <p
          className='font-semibold mb-2'
        >
          Phone:
        </p>
        <Input
          id='phoneNumber'
          className='w-full rounded mb-4'
          size='large'
          defaultValue={selectedUser?.phoneNumber}
        />
      </div>
      <button
        type='submit'
        className='w-full px-4 py-1.5 flex justify-center items-center rounded bg-green-700 text-white'
      >
        Update
      </button>
    </form>
  )
}

export default EditUserForm