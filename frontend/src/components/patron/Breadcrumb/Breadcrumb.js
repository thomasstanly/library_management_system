import React from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import style from './breadcrumb.module.scss'

const Breadcrumb = ({ breadcrumbs }) => {
   return (
      <>
         <div className={style.header}>
            <Stack spacing={2}>
               <Breadcrumbs separator={<ArrowRightIcon />} aria-label="breadcrumb">
                  {breadcrumbs}
               </Breadcrumbs>
            </Stack>
         </div>
      </>
   )
}

export default Breadcrumb