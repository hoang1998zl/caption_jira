import React from 'react'
import { Select } from 'antd';
import { useSelector } from 'react-redux';

const SelectUser = ({
  handleSetLstAssignee
}) => {

  let options = [];

  const { lst_user } = useSelector(state => state.user)

  const renderLstUser = () => {
    const array = []
    lst_user?.map((item) => {
      const type = {
        value: item.userId,
        label: item.name
      }
      array.push(type)
    })
    options = [...array];
  }

  return (
    <div>
      {renderLstUser()}
      <Select
        mode="multiple"
        id="lstAssignee"
        allowClear
        showSearch
        name="lstAssignee"
        className='w-full'
        placeholder="Select User"
        size='large'
        options={options}
        onChange={(e) => {
          handleSetLstAssignee(e);
        }}
      />
    </div>
  )
}

export default SelectUser