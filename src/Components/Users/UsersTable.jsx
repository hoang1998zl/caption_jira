import { Input, Popover, Table, message } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../../services/userService'
import { setLstUser, setSelectedUser } from '../../Redux-toolkit/reducer/UserSlice'
import EditUser from '../../Pages/Users/EditUser'

const UsersTable = ({
  lstUser
}) => {

  const { token, lst_user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const InputRef = useRef(null)
  const handleOpenModal = (boolean) => {
    setOpenModal(boolean)
  }

  useEffect(() => {
    userService.getUser(token, '')
      .then(res => {
        dispatch(setLstUser(res.data.content))
      })
      .catch(err => {
        errorMessage(err.response.data.content)
      })
  }, [lst_user])
  
  const getUser = (name) => {
    userService.getUser(token, name)
      .then(res => {
        dispatch(setLstUser(res.data.content))
        successMessage(res.data.message)
      })
      .catch(err => {
        errorMessage(err.response.data.content)
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

  const deleteUser = (id) => {
    userService.deleteUser(token, id)
      .then(res => {
        successMessage(res.data.message)
      })
      .catch(err => {
        errorMessage(err.response.data.content)
      })
  }

  const columns = [
    {
      key: 'userId',
      title: 'STT',
      dataIndex: 'userId',
      width: 80,
      align: 'center',
      sorter: (a, b) => a.id - b.id,
      render: (text, record, index) => {
        return (
          <p>
            {index + 1}
          </p>
        )
      },
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
    },
    {
      key: 'phoneNumber',
      title: 'Phone',
      dataIndex: 'phoneNumber',
      width: 150
    },
    {
      key: 'action',
      title: 'Action',
      dataIndex: 'action',
      width: 140,
      align: 'center',
      render: (text, record) => {
        return (
          <div className='flex items-center gap-x-4'>
            <button
              type="button"
              className='px-4 py-1 flex justify-center items-center rounded bg-blue-700 text-white'
              onClick={() => {
                handleOpenModal(true);
                dispatch(setSelectedUser(record));
              }}
            >
              Edit
            </button>
            <button
              type="button"
              className='px-4 py-1 flex justify-center items-center rounded bg-red-700 text-white'
              onClick={() => {
                deleteUser(record.userId)
                getUser('')
              }}
            >
              Delete
            </button>
          </div>
        )
      }
    }
  ]
  return (
    <div className='w-full'>
      <Popover
        content={'Nhấn Enter để tìm người dùng'}
      >
        <Input
          ref={InputRef}
          className='w-full rounded mb-4'
          size='large'
          placeholder='Search user'
          allowClear
          prefix={<i className="fa-solid fa-magnifying-glass mr-4"></i>}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              getUser(e.target.value)
            }
          }}
        />
      </Popover>

      {contextHolder}

      <Table
        columns={columns}
        dataSource={lst_user}
        scroll={{
          x: 'max-content',
          y: '60vh'
        }}
      />

      {
        openModal == true &&
        <div>
          <div className='fixed inset-0 bg-black bg-opacity-30 z-10' onClick={() => handleOpenModal(false)}></div>
          <div className='w-full lg:w-1/3 max-h-[90vh] overflow-y-auto fixed top-1/2 left-1/2 bg-white rounded-lg z-50 -translate-x-1/2 -translate-y-1/2 p-4'>
            <EditUser
              getUser={getUser}
              handleOpenModal={handleOpenModal}
            />
          </div>
        </div>
      }
    </div>
  )
}

export default UsersTable