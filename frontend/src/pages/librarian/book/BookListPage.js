import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import Breadcrumb from '../../../components/librarian/Book/Breadcrumb/Breadcrumb'
import BookList from '../../../components/librarian/Book/BookList/BookList'
import Header from '../../../components/librarian/Sidebar/Header'
import SideBarLibrarian from '../../../components/librarian/Sidebar/SideBarLibrarian'

const BookListPage = () => {
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" to="/library/dashboard" style={{}}>
           Dashboard
        </Link>,
        <Typography key="3" color="text.primary">
           books
        </Typography>,
     ];
    return (
        <div>
            <Header />
            <SideBarLibrarian />
            <Breadcrumb breadcrumbs={breadcrumbs}/>
            <BookList />
        </div>
    )
}

export default BookListPage