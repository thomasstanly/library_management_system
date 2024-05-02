import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import style from './CheckIn.module.scss'


const breadcrumbs = [
   <Link underline="hover" key="1" color="inherit" to="/library/dashboard" style={{}}>
      Dashboard
   </Link>,
   <Typography key="3" color="text.primary">
      Add Membership Plan
   </Typography>,
];
const columns = [
   { id: 1, label: 'Due Date ', minWidth: 100, align: 'center' },
   { id: 2, label: 'Book Name', minWidth: 50, align: 'left' },
   { id: 3, label: 'Call number', minWidth: 50, align: 'center' },
   { id: 4, label: 'Category', minWidth: 50, align: 'left' },
   { id: 5, label: 'Checked out on', minWidth: 50, align: 'center' },
   { id: 6, label: 'Fine', minWidth: 50, align: 'center' },
] 
const CheckIn = () => {

   return (
      <div>
         <div className={style.header}>
            <div className={style.title}>
               <h3>Memebership</h3>
               <Stack spacing={2}>
                  <Breadcrumbs separator={<ArrowRightIcon />} aria-label="breadcrumb">
                     {breadcrumbs}
                  </Breadcrumbs>
               </Stack>
            </div>
         </div>
         <div className={style.container}>
            <div className={style.checkout}>
               <p>checking out to thomas stanly (pm2)</p>
               <form action="">
                  <input type="text" placeholder='Stock number' />
                  <button>Check Out</button>
               </form>
            </div>
            <div className={style.table}>
               <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TableContainer className={style.scroller} sx={{ maxHeight: 440 }}>
                     <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                           <TableRow >
                              {columns.map((column) => (
                                 <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                       minWidth: column.minWidth,
                                       backgroundColor: '#E0E2E7',
                                    }}
                                 >
                                    {column.label}
                                 </TableCell>
                              ))}
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           <TableRow hover role="checkbox" tabIndex={-1}>
                              <TableCell align="left" ></TableCell>
                              <TableCell align="left"></TableCell>
                              <TableCell align="left"></TableCell>
                              <TableCell align="left"></TableCell>
                              <TableCell align="center"></TableCell>
                              <TableCell align="center">  </TableCell>
                           </TableRow>
                        </TableBody>
                     </Table>
                  </TableContainer>
               </Paper>
            </div>
         </div>
      </div >
   )
}

export default CheckIn
