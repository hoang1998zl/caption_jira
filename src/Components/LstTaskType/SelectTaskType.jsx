import React, { useLayoutEffect, useState } from 'react'
import { taskService } from '../../services/taskService';
import { Select } from 'antd';

const SelectTaskType = ({
  defaultValue,
  handleSetTypeId
}) => {
  let options = [];

  const [lstTaskType, setLstTaskType] = useState([])

  const getTaskType = async () => {
    taskService.getTaskType()
      .then(res => {
        setLstTaskType(res.data.content)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useLayoutEffect(() => {
    getTaskType()
  }, [])

  const renderLstTaskType = () => {
    const array = []
    lstTaskType?.map((item) => {
      const type = {
        value: item.id,
        label: item.taskType
      }
      array.push(type)
    })
    options = [...array];
  }

  return (
    <div>
      {renderLstTaskType()}
      <Select
        id="typeId"
        allowClear
        name="typeId"
        className='w-full'
        placeholder="Select a task type"
        size='large'
        options={options}
        onChange={(e) => {
          handleSetTypeId(e)
        }}
        defaultValue={defaultValue}
      />
    </div>
  )
}

export default SelectTaskType