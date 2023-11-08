import React from 'react'
import { useSelector } from 'react-redux'

const ProjectDetail = () => {
  const projectDetail = useSelector(state => state.project.projectDetail)
  console.log(projectDetail)
  return (
    <div>ProjectDetail</div>
  )
}

export default ProjectDetail