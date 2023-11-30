import React from 'react'
import EditUserForm from '../../Components/Users/EditUserForm'

const EditUser = ({
  getUser,
  handleOpenModal
}) => {
  return (
    <div>
      <h1
        className='text-3xl font-bold pb-2 border-b-2 mb-4'
      >
        EditUser
      </h1>
      <EditUserForm
        getUser={getUser}
        handleOpenModal={handleOpenModal}
      />
    </div>
  )
}

export default EditUser