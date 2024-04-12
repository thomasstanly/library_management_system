import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import SidebarContext from '../../../../Context/sidebartoggle'
import style from './BookHeader.module.scss'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const BookHeader = () => {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" to="/library/dashboard" style={{}}>
      Dashboard
    </Link>,
    <Typography key="3" color="text.primary">
      Books
    </Typography>,
  ];

  return (
    <>
      <div className={style.header}>
        <div>
        </div>
        <div className={style.title}>
          <h3>Books</h3>
          <Stack spacing={2}>
            <Breadcrumbs separator={<ArrowRightIcon />} aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
        </div>
        <div>
          <Link className={style.link} to='/library/books/add_book'><button>+ Add New Book</button></Link>
        </div>
      </div>
    </>
  )
}

export default BookHeader