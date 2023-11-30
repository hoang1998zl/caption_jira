import { Table } from 'antd'
import React from 'react'
import { projectService } from '../../../services/projectService'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../../Redux-toolkit/reducer/UserSlice'

const LstProjectUser = ({
  members,
  projectId,
  getAllProject
}) => {
  
  const dispatch = useDispatch()

  const handleDeleteUser = (projectId, userId) => {
    projectService.removeUserFromProject(projectId, userId)
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
      width: 80,
      align: 'center'
    },
    {
      key: 'avatar',
      title: 'Avatar',
      dataIndex: 'avatar',
      width: 80,
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
      width: 120
    },
    {
      key: 'action',
      render: (text, record) => {
        return (
          <button
            type="button"
            className='w-8 h-8 flex justify-center items-center rounded-full bg-red-700 text-white'
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