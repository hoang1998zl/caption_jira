import React from 'react'
import ProjectManagementTable from '../../Components/Projects/ProjectManagementTable'

const ProjectManagement = () => {
  return (
    <div className='w-full'>
      <h1
        className='text-3xl font-bold pb-2 border-b-2 mb-4'
      >
        Project Management
      </h1>
      <ProjectManagementTable />
    </div>
  )
}

export default ProjectManagement