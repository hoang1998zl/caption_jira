import { Input, message } from 'antd';
import React, { useState } from 'react'
import SelectProject from '../LstProject/SelectProject';

const CreateTaskForm = () => {

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

  const [projectId, setProjectId] = useState(null);
  const handleSetProjectId = (id) => {
    setProjectId(id)
  } 

  return (

    <div>
      {contextHolder}
      <div
        className='mb-4'
      >
        <label htmlFor="projectId" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Project:</label>
        <SelectProject
          handleSetProjectId={handleSetProjectId}
        />
      </div>
      <div
        className='mb-4'
      >
        <label htmlFor="taskName" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Task name:</label>
        <Input
          id="taskName"
          className='w-full text-base'
          placeholder='Task name'
          size='large'
          onChange={(e) => {

          }}
        />
      </div>
      <div className="flex justify-start items-center">
        <button
          type='button'
          className='border-2 border-blue-500  text-blue-500 font-bold py-2 px-4 rounded'
          onClick={() => {
            const init = {
              projectId: projectId
            }
            console.log(init)
          }}
        >
          Create Task
        </button>
      </div>
    </div>
  )
}

export default CreateTaskForm