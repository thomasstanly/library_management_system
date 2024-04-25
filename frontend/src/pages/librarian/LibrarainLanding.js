import React from 'react'
import SideBarLibrarian from '../../components/librarian/Sidebar/SideBarLibrarian'
import Header from '../../components/librarian/Sidebar/Header'
import Chart from '../../components/librarian/Dasboard/Dashboard'

const LibrarainLanding = () => {

  return (
    <div>
      <Header />
      <SideBarLibrarian />
      <Chart />
    </div>
  )
}

export default LibrarainLanding