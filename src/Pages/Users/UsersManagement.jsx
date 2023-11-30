import React from 'react'
import UsersTable from '../../Components/Users/UsersTable'

const UsersManagement = () => {
  return (
    <div className='w-full'>
      <h1
        className='text-3xl font-bold pb-2 border-b-2 mb-4'
      >
        Users Management
      </h1>
      <UsersTable />
    </div>
  )
}

export default UsersManagement