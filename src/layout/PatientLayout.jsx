import React from 'react'
import { Outlet } from 'react-router-dom'

export default function PatientLayout() {
  return (
    <div>
        <Outlet />
    </div>
  )
}
