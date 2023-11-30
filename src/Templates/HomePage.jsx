import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../Components/Header/Header'
import Menu from '../Components/Header/Menu'
import CreateProjectPage from '../Pages/Projects/CreateProjectPage'
import ProjectManagement from '../Pages/Projects/ProjectManagement'
import CreateTaskPage from '../Pages/Tasks/CreateTaskPage'
import { PropagateLoader } from 'react-spinners'
import { setCurrentPage } from '../Redux-toolkit/reducer/CurrentPage'
import { sessionService } from '../services/sessionServices'
import { projectService } from '../services/projectService'
import { setLstProject } from '../Redux-toolkit/reducer/ProjectSlice'
import { setLoading, setLstUser } from '../Redux-toolkit/reducer/UserSlice'
import { userService } from '../services/userService'
import UsersManagement from '../Pages/Users/UsersManagement'

const HomePage = () => {
  const { isAuthenticated, loading } = useSelector(state => state.user)
  const { currentPage } = useSelector(state => state.currentPage)

  const token = sessionService.getItem('token');

  if (!token) {
    sessionService.setItem(token, "token");
  }

  const getAllProject = () => {
    projectService.getAllProject(token)
      .then(res => {
        dispatch(setLstProject(res.data.content))
      })
      .catch(err => {
        console.log(err)
      })
  }
  const getAllUser = () => {
    userService.getAllUser(token)
      .then(res => {
        dispatch(setLstUser(res.data.content))
      })
      .catch(err => {
        console.log(err)
      })
  }

  const fetchData = () => {
    getAllProject();
    getAllUser();
    dispatch(setLoading(false))
  }

  const dispatch = useDispatch()

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.reload()
    }
  })

  useLayoutEffect(() => {
    dispatch(setCurrentPage(1));
    fetchData();
    if (window.innerWidth < 768) {
      handleShowMenu(false)
    }
  }, [])

  const [isShowMenu, setIsShowMenu] = useState(true)

  const handleShowMenu = (boolean) => {
    setIsShowMenu(boolean)
  }
  const renderContent = () => {
    switch (currentPage) {
      case 1: return <ProjectManagement />
      case 2: return <CreateProjectPage />
      case 3: return <CreateTaskPage />
      case 4: return <UsersManagement />
      default: return <ProjectManagement />
    }
  }

  return (
    <div className='w-screen h-screen'>
      <div className='w-full h-16 fixed top-0 left-0 z-10'>
        <Header
          isShowMenu={isShowMenu}
          handleShowMenu={handleShowMenu}
        />
      </div>
      <div
        className={`
      h-[calc(100vh-4rem)] bg-[#f4f5f7] overflow-y-auto fixed top-16 border-t-2 border-black p-2
      lg:w-72 lg:border-t-0 lg:border-r-2 lg:border-black lg:bg-gray-900  transition-all z-10
      ${isShowMenu === true ? 'w-full lg:w-72 left-0' : 'w-0 lg:w-0 lg:p-0 -left-full'}
      `}
      >
        <Menu />
      </div>
      <div
        className={`w-full h-[calc(100vh-4rem)] border-t-2 border-black p-2 fixed top-16 transition-all bg-[#f5f5f5] lg:z-20
        ${isShowMenu === true ? 'lg:w-[calc(100%-18rem)] lg:left-72' : 'lg:w-full lg:left-0'} lg:border-t-0 overflow-y-auto`}
      >
        <div
          className='w-full bg-white p-4 rounded-lg'
        >
          {renderContent()}
        </div>
      </div>
      {
        loading && <div className='w-screen h-screen absolute top-0 left-0 bg-slate-100 z-50'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <PropagateLoader
              color={"#01b4e2"}
              loading={true}
              size={40}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      }
    </div>
  )
}

export default HomePage