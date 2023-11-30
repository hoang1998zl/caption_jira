import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SelectTaskType from '../LstTaskType/SelectTaskType'
import { taskService } from '../../services/taskService'
import { Input, Popover, Select, message } from 'antd'
import Comment from './Comment/Comment'
import SelectStatus from '../LstStatus/SelectStatus'
import { setTaskDetail } from '../../Redux-toolkit/reducer/ProjectSlice'
import SelectPriority from '../LstPriority/SelectPriority'

const EditTaskForm = () => {
  const { user, token } = useSelector(state => state.user)
  const taskDetail = useSelector(state => state.project.taskDetail)
  const projectDetail = useSelector(state => state.project.projectDetail)

  const dispatch = useDispatch()

  const [typeId, setTypeId] = useState(taskDetail?.typeId)
  const handleSetTypeId = (e) => {
    setTypeId(e)
    const init = { ...taskDetail }
    init.typeId = e
    taskService.updateTypeId(token, init)
      .then(res => {
        successMessage(res.data.message)
      })
      .catch(err => {
        errorMessage(err.message)
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

  const handleSetStatusId = (data) => {
    const init = {
      taskId: taskDetail?.taskId,
      statusId: data
    }
    taskService.updateStatus(token, init)
      .then(res => {
        successMessage(res.data.message)
      })
      .catch(err => {
        errorMessage(err.message)
      })
  }

  const renderAssigness = () => {
    return taskDetail?.assigness?.map((assigness, index) => {
      return (
        <img
          className='w-8 h-8 rounded-full'
          src={assigness?.avatar}
          key={index}
          alt=""
        />
      )
    })
  }

  let options_user = [];
  const renderLstUser = () => {
    const array = []
    projectDetail?.members?.map((item) => {
      const type = {
        value: item.userId,
        label: item.name
      }
      array.push(type)
    })
    options_user = [...array];
  }

  const addUserTask = (arrayID) => {
    const init = { ...taskDetail }
    init.listUserAsign = arrayID
    delete init.assigness

    taskService.updateTask(token, init)
      .then(res => {
        taskService.getTaskByID(token, taskDetail?.taskId)
          .then(res => {
            dispatch(setTaskDetail(res.data.content))
            successMessage(res.data.message)
          })
          .catch(err => {
            errorMessage(err.message)
          })
      })
      .catch(err => {
        errorMessage(err.message)
      })
  }

  const handleSetPriorityId = (priorityId) => {
    const init = {
      taskId: taskDetail?.taskId,
      priorityId: priorityId
    }
    taskService.updatePriority(token, init)
      .then(res => {
        successMessage(res.data.message)
      })
      .catch(err => {
        errorMessage(err.message)
      })
  }

  return (
    <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-x-4'>
      {contextHolder}
      <div className='lg:col-span-2'>
        <div
          className='w-full mb-4 flex gap-4 items-center'
        >
          <i className='fa-solid fa-bookmark text-green-700 text-2xl'></i>
          <SelectTaskType
            defaultValue={typeId}
            handleSetTypeId={handleSetTypeId}
          />
          <p className='w-max'>
            {taskDetail?.taskName}
          </p>
        </div>
        <div
          className='w-full mb-4 font-semibold text-2xl'
        >
          This is an issue of type: Task
        </div>
        <div
          className='w-full mb-4'
        >
          <p className='font-semibold'>
            Description:
          </p>
          <Popover
            content={'Nhấn Enter để cập nhật'}
            trigger="hover"
          >
            <textarea
              className='w-full h-20 border-2 border-gray-200 rounded-md p-2 resize-none focus:outline-none'
              name="description"
              id="description"
              defaultValue={taskDetail?.description}
              onKeyDown={(e) => {
                const init = {
                  taskId: taskDetail?.taskId,
                  description: e.target.value
                }
                if (e.key === 'Enter') {
                  e.preventDefault();

                  taskService.updateDescription(token, init)
                    .then(res => {
                      successMessage(res.data.message)
                    })
                    .catch(err => {
                      errorMessage(err.response.data.content)
                    })
                }
              }}
            />
          </Popover>
        </div>
        <Comment
          user={user}
          taskDetail={taskDetail}
          successMessage={successMessage}
          errorMessage={errorMessage}
          contextHolder={contextHolder}
        />
      </div>
      <div className='flex flex-col gap-y-4'>
        <div>
          <p
            className='font-semibold mb-2'
          >
            Status:
          </p>
          <SelectStatus
            defaultValue={taskDetail?.statusId}
            handleSetStatusId={handleSetStatusId}
          />
        </div>
        <div>
          <p
            className='font-semibold mb-2'
          >
            Assigness:
          </p>
          <div
            className='flex flex-wrap gap-2'
          >
            {renderAssigness()}
          </div>
          {renderLstUser()}
          <Select
            allowClear
            showSearch
            mode='multiple'
            name="lstAssignee"
            className='w-full mt-4'
            placeholder="Add User"
            optionFilterProp="children"
            defaultValue={taskDetail?.assigness?.map(item => item.id)}
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            size='large'
            options={options_user}
            onChange={(e) => {
              addUserTask(e)
            }}
          />
        </div>
        <div>
          <p
            className='font-semibold mb-2'
          >
            Priority:
          </p>
          <SelectPriority
            defaultValue={taskDetail?.priorityId}
            handleSetPriorityId={handleSetPriorityId}
          />
        </div>
        <div>
          <p
            className='font-semibold mb-2'
          >
            Original Estimate (Hours):
          </p>
          <Input
            className='w-full'
            size='large'
            defaultValue={taskDetail?.originalEstimate}
            readOnly
            disabled
          />
        </div>
        <div
          className='w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-x-4'
        >
          <div
            className='mb-4'
          >
            <label htmlFor="timeTrackingSpent" className='font-semibold mb-2'>Time Spent:</label>
            <Input
              id="timeTrackingSpent"
              className='w-full text-base'
              placeholder='0'
              size='large'
              defaultValue={taskDetail?.timeTrackingSpent}
              onChange={(e) => {
                // setTimeTrackingSpent(Number(e.target.value))
              }}
            />
          </div>
          <div
            className='mb-4'
          >
            <label htmlFor="timeTrackingRemaining" className='font-semibold mb-2'>Time Remaining:</label>
            <Input
              id="timeTrackingRemaining"
              className='w-full text-base'
              placeholder='0'
              size='large'
              defaultValue={taskDetail?.timeTrackingRemaining}
              onChange={(e) => {
                // setTimeTrackingRemaining(Number(e.target.value))
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditTaskForm