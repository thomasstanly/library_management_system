import React from 'react'
import Header from '../../../components/librarian/Sidebar/Header'
import SideBarLibrarian from '../../../components/librarian/Sidebar/SideBarLibrarian'
import MembershipList from '../../../components/librarian/membership/MembershipList/MembershipList'

const MembershipListPage = () => {
  return (
   <>
   <Header/>
   <SideBarLibrarian/>
   <MembershipList/>
   </>
  )
}

export default MembershipListPage