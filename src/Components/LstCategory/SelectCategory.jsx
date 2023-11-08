import { Select } from 'antd'
import React, { useLayoutEffect, useState } from 'react'
import { projectService } from '../../services/projectService'

const SelectCategory = ({ handleSetCategoryId }) => {
  let options = [];
  const [lstCategory, setLstCategory] = useState([])

  const getListCategory = () => {
    projectService.getProjectCategory()
      .then(res => {
        setLstCategory(res.data.content)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useLayoutEffect(() => {
    getListCategory()
  }, [])

  const renderLstCategory = () => {
    const array = []
    lstCategory?.map((item) => {
      const category = {
        value: item.id,
        label: item.projectCategoryName
      }
      array.push(category)
    })
    options = [...array];
  }

  return (
    <div>
      {renderLstCategory()}
      <Select
        id="categoryId"
        allowClear
        showSearch
        name="categoryId"
        className='w-full'
        placeholder="Select a category"
        size='large'
        options={options}
        onChange={(e) => {
          handleSetCategoryId(e)
        }}
      />
    </div>
  )
}

export default SelectCategory