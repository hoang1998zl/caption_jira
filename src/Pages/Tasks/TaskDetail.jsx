import React from 'react'
import EditTaskForm from '../../Components/Task/EditTaskForm'

const TaskDetail = () => {
  return (
    <div
      className='w-11/12 max-h-[75vh] bg-white rounded-xl z-10 p-4 
      lg:w-4/5 lg:p-10 overflow-y-auto'
    >
      <h1
        className='text-3xl font-bold pb-2 border-b-2 mb-4'
      >
        Task Detail
      </h1>

      <div
        className='w-full my-8 flex gap-10'
      >
        <EditTaskForm />
      </div>
    </div>
  )
}

export default TaskDetail