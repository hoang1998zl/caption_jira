import React from 'react'
import CreateProjectForm from '../../Components/Projects/CreateProjectForm'

const CreateProjectPage = () => {
  return (
    <div className='w-full'>
      <h1
        className='text-3xl font-bold pb-2 border-b-2 mb-4'
      >
        Create Project
      </h1>
      <CreateProjectForm />
    </div>
  )
}

export default CreateProjectPage