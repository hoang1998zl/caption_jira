import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../../Redux-toolkit/reducer/CurrentPage'

const Menu = () => {
  const dispatch = useDispatch()
  const { currentPage } = useSelector(state => state.currentPage)

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
    },
    {
      id: 4,
      name: 'Users Management',
      path: '/create-task'
    }
  ]

  const renderMenu = () => {
    return menu?.map((item) => {
      return (
        <button
          key={item.id}
          className={`w-full p-2 rounded hover:bg-blue-300 transition-all flex items-center gap-x-2 lg:text-white ${currentPage === item.id ? 'bg-blue-700 text-white' : ''}`}
          onClick={() => dispatch(setCurrentPage(item.id))}
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