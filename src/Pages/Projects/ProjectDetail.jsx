import React from 'react'
import EditProjectForm from '../../Components/Projects/EditProjectForm'

const ProjectDetail = ({
  getAllProject,
  handleShowProjectDetail
}) => {
  return (
    <div
      className='w-11/12 max-h-[75vh] bg-white rounded-xl z-10 p-4 
      lg:w-3/5 lg:p-10 overflow-y-auto'
    >
      <h1
        className='text-3xl font-bold pb-2 border-b-2 mb-4'
      >
        Edit Project
      </h1>
      <EditProjectForm
        getAllProject={getAllProject}
        handleShowProjectDetail={handleShowProjectDetail}
      />
    </div>
  )
}

export default ProjectDetail