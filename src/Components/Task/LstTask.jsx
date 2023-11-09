import React, { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { projectService } from '../../services/projectService'
import { message } from 'antd'
import { taskService } from '../../services/taskService'
import { setTaskDetail } from '../../Redux-toolkit/reducer/ProjectSlice'

const LstTask = ({
  handleShowLstTask,
  handleShowTaskDetail,
}) => {
  const projectDetail = useSelector(state => state.project.projectDetail)
  const dispatch = useDispatch()

  const [lstTask, setLstTask] = useState([])

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

  const getLstTask = (projectID) => {
    projectService.getProjectByID(projectID)
      .then(res => {
        console.log(res.data.content.lstTask)
        setLstTask(res.data.content.lstTask)
        successMessage(res.data.message)
      })
      .catch(err => {
        errorMessage(err.message)
      })
  }

  useLayoutEffect(() => {
    getLstTask(projectDetail?.id)
  }, [])

  const getTaskDetail = (taskID) => {
    taskService.getTaskByID(taskID)
      .then(res => {
        successMessage(res.data.message)
        dispatch(setTaskDetail(res.data.content))
        handleShowLstTask(false)
        handleShowTaskDetail(true)
      })
      .catch(err => {
        errorMessage(err.message)
      })
  }

  const renderLstTask = () => {
    return lstTask?.map((item, index) => {
      return (
        <div
          key={index}
          className='border border-gray-300 rounded-lg py-4 px-1 bg-[#f4f5f7] shadow flex flex-col justify-between'
        >
          <h1
            className='font-semibold text-base px-3'
          >
            {item.statusName}
          </h1>
          <div className='w-full mt-4 bg-white rounded'>
            {
              item.lstTaskDeTail.map((taskDetail, index) => {
                return (
                  <div
                    key={index}
                    className='p-3'
                  >
                    <h4
                      className='text-gray-700 capitalize mb-4 hover:text-blue-500 cursor-pointer'
                      onClick={() => {
                        getTaskDetail(taskDetail.taskId)
                      }}
                    >
                      {taskDetail.taskName}
                    </h4>

                    <div
                      className='flex justify-between items-center gap-4'
                    >
                      <p
                        className='text-red-500 font-sm flex-1 w-max'
                      >
                        {taskDetail.priorityTask.priority}
                      </p>
                      <div
                        className='flex justify-end items-center gap-2'
                      >
                        {
                          taskDetail.assigness.map((user, index) => {
                            return <img key={index} src={user.avatar} alt="" className='w-8 h-8 rounded-full' />
                          })
                        }
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    })
  }

  return (
    <div className='w-full'>
      {contextHolder}
      <div className='w-full my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {renderLstTask()}
      </div>
    </div>
  )
}

export default LstTask