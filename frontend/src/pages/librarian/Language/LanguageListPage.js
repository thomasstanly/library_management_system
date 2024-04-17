import React from 'react'
import SideBarLibrarian from '../../../components/librarian/Sidebar/SideBarLibrarian'
import LanguageHeader from '../../../components/librarian/Language/LanguageHeader/LanguageHeader'
import LanguageList from '../../../components/librarian/Language/LanguageList/LanguageList'
import Header from '../../../components/librarian/Sidebar/Header'

const LanguageListPage = () => {
  return (
    <div>
      <Header />
      <SideBarLibrarian />
      <LanguageHeader />
      <LanguageList />
    </div>
  )
}

export default LanguageListPage