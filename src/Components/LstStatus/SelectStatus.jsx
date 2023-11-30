import React, { useMemo, useState } from 'react'
import { taskService } from '../../services/taskService';
import { Select } from 'antd';

const SelectStatus = ({
  handleSetStatusId,
  defaultValue
}) => {

  let options = [];

  const [lstStatus, setLstStatus] = useState([])

  const getLstStatus = () => {
    taskService.getStatus()
      .then(res => {
        setLstStatus(res.data.content)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useMemo(() => {
    getLstStatus()
  }, [])

  const renderLstStatus = () => {
    const array = []
    lstStatus?.map((item) => {
      const type = {
        value: item.statusId,
        label: item.statusName
      }
      array.push(type)
    })
    options = [...array];
  }

  return (
    <div>
      {renderLstStatus()}
      <Select
        id="statusId"
        allowClear
        showSearch
        name="statusId"
        className='w-full'
        placeholder="Select Status"
        size='large'
        options={options}
        onChange={(e) => { handleSetStatusId(e) }}
        defaultValue={defaultValue}
      />
    </div>
  )
}

export default SelectStatus