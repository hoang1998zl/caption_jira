import React, { useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const Menu = ({
  isCurrentMenu,
  handleChangeMenu
}) => {
  const menu = [
    {
      id: 1,
      name: 'Project Management',
      path: '/'
    },
    {
      id: 2,
      name: 'Create Project',
      path: '/create-project'
    },
    {
      id: 3,
      name: 'Create Task',
      path: '/create-task'
    }
  ]

  const renderMenu = () => {
    return menu?.map((item) => {
      return (
        <button
          key={item.id}
          className={`w-full p-2 rounded hover:bg-blue-300 transition-all flex items-center gap-x-2 lg:text-white ${isCurrentMenu === item.id ? 'bg-blue-700 text-white' : ''}`}
          onClick={() => handleChangeMenu(item.id)}
        >
          <i className='fa-solid fa-gear'></i>
          {item.name}
        </button>
      )
    })
  }

  return (
    <div
      className='w-full grid grid-cols-1 gap-1'
    >
      {renderMenu()}
    </div>
  )
}

export default Menu