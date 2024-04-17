import React from 'react'
import BookHeader from '../../../components/librarian/Book/BookHeader/BookHeader'
import BookList from '../../../components/librarian/Book/BookList/BookList'
import Header from '../../../components/librarian/Sidebar/Header'
import SideBarLibrarian from '../../../components/librarian/Sidebar/SideBarLibrarian'

const BookListPage = () => {
    return (
        <div>
            <Header />
            <SideBarLibrarian />
            <BookHeader />
            <BookList />
        </div>
    )
}

export default BookListPage