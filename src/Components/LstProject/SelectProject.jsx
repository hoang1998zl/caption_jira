import { Select } from 'antd';
import React, { useMemo, useState } from 'react'
import { projectService } from '../../services/projectService';

const SelectProject = ({
}) => {
  let options = [];

  const [lstProject, setLstProject] = useState([])

  const getProject = async () => {
    projectService.getAllProject()
      .then(res => {
        setLstProject(res.data.content)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useMemo(() => {
    getProject()
  }, [])

  const renderLstProject = () => {
    const array = []
    lstProject?.map((item) => {
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
        id="typeId"
        allowClear
        showSearch
        name="typeId"
        className='w-full'
        placeholder="Select a task type"
        size='large'
        options={options}
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        //  -- sắp xếp options theo Number -> ABC --
        // filterSort={(optionA, optionB) =>
        //   (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        // }
        onChange={(e)=>{
           console.log(e)
        }}
      />
    </div>
  )
}

export default SelectProject