import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../Redux-toolkit/reducer/UserSlice'
import { Tooltip } from 'antd'

const Avatar = () => {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout());
  }

  const renderTooltip = (
    <div
      className='text-black bg-white grid grid-cols-1 p-0'
    >
      <button
        className='w-full px-2 py-1.5 text-left hover:bg-blue-500 hover:text-white rounded'
      >
        Thông tin tài khoản
      </button>
      <button
        className='w-full px-2 py-1.5 text-left hover:bg-blue-500 hover:text-white rounded'
        onClick={handleLogout}
      >
        Đăng xuất
      </button>
    </div>
  )
  
  return (
    <Tooltip
        arrow={false}
        title={renderTooltip}
        placement='bottomRight'
        trigger={'click'}
        overlayInnerStyle={{
          backgroundColor: 'white',
        }}
      >
        <img
          src={user.avatar}
          alt=""
          className='w-12 h-12 object-cover rounded-full cursor-pointer'
        />
      </Tooltip>
  )
}

export default Avatar