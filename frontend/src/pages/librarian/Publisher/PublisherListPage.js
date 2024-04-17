import React from 'react'
import SideBarLibrarian from '../../../components/librarian/Sidebar/SideBarLibrarian'
import PublisherHeader from '../../../components/librarian/Publisher/PublisherHeader/PublisherHeader'
import PublisherList from '../../../components/librarian/Publisher/PublisherBody/PublisherList'
import Header from '../../../components/librarian/Sidebar/Header'

const PublisherListPage = () => {
    return (
        <div>
            <Header />
            <SideBarLibrarian />
            <PublisherHeader />
            <PublisherList />
        </div>
    )
}

export default PublisherListPage