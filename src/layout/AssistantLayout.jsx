import React from 'react'
import { Outlet } from 'react-router-dom'
import AssistantSidebar from '../pages/assistant/AssistantSidebar'

export default function AssistantLayout() {
  return (
    <div className='flex'>
      <AssistantSidebar />
      <div className='w-full p-4'>
        <Outlet />
      </div>
    </div>
  )
}
