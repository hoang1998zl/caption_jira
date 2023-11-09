import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import SelectTaskType from '../LstTaskType/SelectTaskType'

const EditTaskForm = () => {
  const taskDetail = useSelector(state => state.project.taskDetail)
  const [typeId, setTypeId] = useState(taskDetail?.typeId)
  const handleSetTypeId = (e) => {
    setTypeId(e)
  }
  const updateTask = () => {

  }
  useMemo(() => {
    console.log(typeId)
  }, [typeId])
  
  return (
    <div>
      {taskDetail?.taskName}
      <SelectTaskType
        defaultValue={typeId}
        handleSetTypeId={handleSetTypeId}
      />
    </div>
  )
}

export default EditTaskForm