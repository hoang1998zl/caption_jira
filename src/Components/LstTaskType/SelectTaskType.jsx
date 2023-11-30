import React, { useLayoutEffect, useState } from 'react'
import { taskService } from '../../services/taskService';
import { Select } from 'antd';
import { useSelector } from 'react-redux';

const SelectTaskType = ({
  defaultValue,
  handleSetTypeId
}) => {

  const { token } = useSelector(state => state.user)
  let options = [];

  const [lstTaskType, setLstTaskType] = useState([])

  const getTaskType = async () => {
    taskService.getTaskType(token)
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
        className='w-full min-w-[10rem]'
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