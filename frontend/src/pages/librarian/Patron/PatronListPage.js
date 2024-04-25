import React from 'react'
import Header from '../../../components/librarian/Sidebar/Header'
import PatronList from '../../../components/librarian/Patron/PatronList'
import SideBarLibrarian from '../../../components/librarian/Sidebar/SideBarLibrarian'

const PatronListPage = () => {
    return (
        <div>
            <Header />
            <SideBarLibrarian />
            <PatronList />
        </div>
    )
}

export default PatronListPage