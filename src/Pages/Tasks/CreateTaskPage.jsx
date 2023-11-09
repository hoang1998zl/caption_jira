import React from 'react'
import CreateTaskForm from '../../Components/Task/CreateTaskForm'

const CreateTaskPage = () => {
  return (
    <div className='w-full'>
      <h1
        className='text-3xl font-bold pb-2 border-b-2 mb-4'
      >
        Create Task
      </h1>
      <CreateTaskForm />
    </div>
  )
}

export default CreateTaskPage