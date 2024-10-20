import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'
import BottomNav from './bottomNav'
import TopNav from './topNav'

const MainLayout = () => {
  return (
    <div>
         <TopNav/>
         <LeftSidebar/>
        <div>
            <Outlet/>
        </div>
        <BottomNav/>
    </div>
  )
}

export default MainLayout