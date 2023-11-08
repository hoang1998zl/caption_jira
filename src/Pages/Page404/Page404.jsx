import React from 'react'
import { NavLink } from 'react-router-dom'

const Page404 = () => {
  return (
    <div>
      <NavLink
        to={'/'}
        className='px-8 py-2 bg-blue-700 text-white rounded'
      >
        Quay lại trang chủ
      </NavLink>
    </div>
  )
}

export default Page404