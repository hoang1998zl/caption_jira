import React from 'react'
import Avatar from './Avatar'

const Header = ({
  isShowMenu,
  handleShowMenu,
}) => {

  return (
    <div className='w-screen h-full bg-[#f4f5f7] px-4 flex items-center justify-between lg:bg-gray-900'>
      <button
        className='w-12 h-12 border border-black rounded text-2xl hover:bg-black hover:text-white lg:text-white lg:border-white lg:hover:bg-white lg:hover:text-black'
        onClick={() => handleShowMenu(!isShowMenu)}
      >
        <i className='fa-solid fa-bars'></i>
      </button>
      <Avatar />
    </div>
  )
}

export default Header