import { Table } from 'antd'
import React from 'react'
import { projectService } from '../../../services/projectService'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../../Redux-toolkit/reducer/UserSlice'

const LstProjectUser = ({
  members,
  projectId,
  getAllProject
}) => {

  const dispatch = useDispatch()
  const { token } = useSelector(state => state.user)

  const handleDeleteUser = (projectId, userId) => {
    projectService.removeUserFromProject(token, projectId, userId)
      .then(res => {
        dispatch(setLoading(true))
        getAllProject()
      })
      .catch(err => {
        console.log(err)
      })

  }
  const columns = [
    {
      key: 'userId',
      title: 'UserID',
      dataIndex: 'userId',
      width: 60,
      align: 'center'
    },
    {
      key: 'avatar',
      title: 'Avatar',
      dataIndex: 'avatar',
      width: 60,
      render: (avatar) => {
        return (
          <img
            src={avatar}
            alt="avatar"
            className='w-8 h-8 rounded-full'
          />
        )
      }
    },
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      width: 80,
      render: (text) => {
        return (
          <p
            className='line-clamp-1'
          >
            {text}
          </p>
        )
      }
    },
    {
      key: 'action',
      render: (text, record) => {
        return (
          <button
            type="button"
            className='w-7 h-7 flex justify-center items-center rounded-full bg-red-700 text-white'
            onClick={() => {
              handleDeleteUser(projectId, record.userId)
            }}
          >
            <i className='fa-solid fa-x'></i>
          </button>
        )
      }
    }
  ]
  const dataSource = members
  return (
    <div
      className='text-black'
    >
      <h1
        className='font-semibold pb-1 mb-2 border-b border-gray-900'
      >
        Member
      </h1>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </div>
  )
}

export default LstProjectUser