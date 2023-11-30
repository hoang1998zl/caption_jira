import { Select } from 'antd';
import React, { useMemo, useState } from 'react'
import { taskService } from '../../services/taskService';

const SelectPriority = ({
  handleSetPriorityId,
  defaultValue
}) => {

  let options = [];

  const [lstPriority, setLstPriority] = useState([])
  
  const getLstPriority = () => {
    taskService.getPriority()
      .then(res => {
        setLstPriority(res.data.content)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useMemo(() => {
    getLstPriority()
  }, [])

  const renderLstPriority = () => {
    const array = []
    lstPriority?.map((item) => {
      const type = {
        value: item.priorityId,
        label: item.priority
      }
      array.push(type)
    })
    options = [...array];
  }
  
  return (

    <div>
      {renderLstPriority()}
      <Select
        id="statusId"
        allowClear
        showSearch
        name="statusId"
        className='w-full'
        placeholder="Select Priority"
        size='large'
        options={options}
        onChange={(e) => { handleSetPriorityId(e) }}
        defaultValue={defaultValue}
      />
    </div>
  )
}

export default SelectPriority