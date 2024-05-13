import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import SidebarContext from '../../../../Context/sidebartoggle'
import style from './Breadcrumb.module.scss'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const Breadcrumb = ({breadcrumbs}) => {
  return (
    <>
      <div className={style.header}>
        <div className={style.title}>
          <h3>Books</h3>
          <Stack spacing={2}>
            <Breadcrumbs separator={<ArrowRightIcon />} aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
        </div>
      </div>
    </>
  )
}

export default Breadcrumb