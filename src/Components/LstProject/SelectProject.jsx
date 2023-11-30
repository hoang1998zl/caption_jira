import { Select } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';

const SelectProject = ({
  handleSetProjectId
}) => {

  const { lst_project } = useSelector(state => state.project)

  let options = [];

  const renderLstProject = () => {
    const array = []
    lst_project?.map((item) => {
      const type = {
        value: item.id,
        label: item.projectName
      }
      array.push(type)
    })
    options = [...array];
  }

  return (
    <div>
      {renderLstProject()}
      <Select
        id="projectId"
        allowClear
        showSearch
        name="projectId"
        className='w-full'
        placeholder="Select Project"
        size='large'
        options={options}
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        onChange={(e) => {
          handleSetProjectId(e)
        }}
      />
    </div>
  )
}

export default SelectProject