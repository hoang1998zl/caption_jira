import React, { useLayoutEffect, useState } from 'react'
import { projectService } from '../../services/projectService'
import { Space, Table, Tooltip, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../Redux-toolkit/reducer/UserSlice'
import { setProjectDetail } from '../../Redux-toolkit/reducer/ProjectSlice'
import ProjectDetail from '../../Pages/Projects/ProjectDetail'

const ProjectManagementTable = () => {

  const dispatch = useDispatch()
  const [lstProject, setLstProject] = useState([])

  const [showProjectDetail, setShowProjectDetail] = useState(false)

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

  useLayoutEffect(() => {
    projectService.getAllProject()
      .then(res => {
        setLstProject(res.data.content)
        successMessage(res.data.message)
        dispatch(setLoading(false))
      })
      .catch(err => {
        errorMessage(err.message)
      })
  }, [])

  const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
      width: 80,
      align: 'center',
      sorter: (a, b) => a.id - b.id,
      render: (text, record, index) => {
        return (
          <p>
            {index + 1}
          </p>
        )
      }
    },
    {
      title: 'projectName',
      dataIndex: 'projectName',
      render: (text, record, index) => {
        return (
          <p
            className='text-sky-400 font-semibold cursor-pointer'
            onClick={() => {
            }}
          >
            {text}
          </p>
        )
      }
    },
    {
      title: 'category',
      dataIndex: 'categoryName'
    },
    {
      title: 'creator',
      dataIndex: 'creator',
      align: 'center',
      render: (text, record, index) => {
        return (
          <p
            className='w-max mx-auto px-2 py-1 rounded-sm text-blue-700 border border-blue-700'
          >
            {record.creator.name}
          </p>
        )
      }
    },
    {
      title: 'member',
      width: 300,
      render: (text, record, index) => {
        return (
          <div
            className='flex flex-wrap gap-1'
          >
            {
              record.members.map((item, index) => {
                return (
                  <Tooltip
                    key={index}
                    title={'test'}
                    color='#fff'
                    placement='bottomRight'
                    overlayInnerStyle={{
                      width: 'max-content'
                    }}
                  >
                    <img
                      src={item.avatar}
                      alt=""
                      className='w-10 h-10 rounded-full cursor-pointer'
                    />
                  </Tooltip>
                )
              })
            }

            <Tooltip
              title={''}
              color='#fff'
              placement='bottomRight'
              overlayInnerStyle={{
                width: 'max-content'
              }}
            >
              <button
                type='button'
                className='w-10 h-10 rounded-full border-2 cursor-pointer'
              >
                <i className='fa-solid fa-plus'></i>
              </button>
            </Tooltip>
          </div>
        )
      }
    },
    {
      title: 'Action',
      render: (text, record, index) => {
        return (
          <Space>
            <button
              className='w-8 h-8 flex justify-center items-center rounded-md text-yellow-400 border border-yellow-400 cursor-pointer hover:bg-yellow-400 hover:text-white'
              onClick={() => {
                dispatch(setProjectDetail(record));
                setShowProjectDetail(true)
              }}
            >
              <i className='fa-solid fa-pencil-alt text-base'></i>
            </button>
            <button
              className='w-8 h-8 rounded-md text-red-700 border border-red-700 cursor-pointer hover:bg-red-700 hover:text-white'
              onClick={() => {
                projectService.deleteProject(record.id)
                  .then((res) => {
                    console.log(res.data.message)
                  })
                  .catch((err) => {
                    errorMessage(err.response.data.content)
                  })
              }}
            >
              <i className='fa-solid fa-trash text-base'></i>
            </button>
          </Space>
        )
      }
    }
  ]

  return (
    <div>
      {contextHolder}

      <Table
        columns={columns}
        dataSource={lstProject}
        scroll={{
          x: 'max-content',
          y: '60vh'
        }}
      />

      {
        showProjectDetail &&
        <div
          className='w-screen h-screen fixed top-0 left-0 z-30 flex justify-center items-center'
        >
          <div
            className='w-full h-full bg-black opacity-50 z-0 absolute top-0 left-0 right-0 bottom-0'
            onClick={() => {
              setShowProjectDetail(false)
            }}
          ></div>
          <ProjectDetail />
        </div>
      }
    </div>
  )
}

export default ProjectManagementTable