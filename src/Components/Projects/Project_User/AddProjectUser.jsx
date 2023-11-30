import { Select, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { userService } from '../../../services/userService';
import { projectService } from '../../../services/projectService';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../../Redux-toolkit/reducer/UserSlice';

const AddProjectUser = ({
  projectId,
  getAllProject
}) => {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.user)

  let options = [];

  const [lstUser, setLstUser] = useState([])
  const getLstUser = () => {
    userService.getAllUser(token)
      .then(res => {
        setLstUser(res.data.content)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const [messageApi, contextHolder] = message.useMessage();
  const successMessage = (content) => {
    messageApi.open({
      type: 'success',
      content: content,
    });
  };
  const errorMessage = (content) => {
    messageApi.open({
      type: 'error',
      content: content,
    });
  };

  useEffect(() => {
    getLstUser()
  }, [])

  const handleChangeUser = (e) => {
    projectService.assignUserProject(token, projectId, e.value)
      .then(res => {
        successMessage(res.data.message)
        dispatch(setLoading(true))
        getAllProject()
      })
      .catch(err => {
        errorMessage(err.response.data.message)
      })
  }

  const renderLstUser = () => {
    const array = []
    lstUser?.map((item) => {
      const type = {
        value: item.userId,
        label: item.name
      }
      array.push(type)
    })
    options = [...array];
  }
  return (
    <div className='text-black'>
      <h1
        className='font-semibold pb-1 mb-2 border-b border-gray-900'
      >
        Add User
      </h1>
      {contextHolder}
      {renderLstUser()}
      <Select
        id="lstAssignee"
        allowClear
        showSearch
        labelInValue
        name="lstAssignee"
        className='w-40'
        placeholder="Select User"
        options={options}
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        onChange={(e) => {
          handleChangeUser(e);
        }}
      />
    </div>
  )
}

export default AddProjectUser