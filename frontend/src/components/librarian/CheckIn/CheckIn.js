import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../../Axios';
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
   { id: 1, label: 'stock', minWidth: 20, align: 'left' },
   { id: 2, label: 'Book Name', minWidth: 50, align: 'left' },
   { id: 3, label: 'patron', minWidth: 50, align: 'center' },
   { id: 4, label: 'Checked Date', minWidth: 50, align: 'left' },
   { id: 5, label: 'Due Date ', minWidth: 100, align: 'left' },
   { id: 6, label: 'Return Date', minWidth: 50, align: 'center' },

]
const CheckIn = () => {
   const [formData, setFormData] = useState({
      "stock": ''
   })

   const [borrower, setBorrower] = useState([])

   const handleOnChage = (event) => {
      setFormData({ "stock": event.target.value })

   }

   const handleOnSubmit = async (event) => {
      event.preventDefault()
      if (!isNaN(formData.stock)) {
         try {
            const access_token = JSON.parse(localStorage.getItem('access'))
            const res = await axios.post('borrow/check_in/', formData,
               {
                  headers: {
                     Authorization: `Bearer ${access_token}`
                  }
               }
            )
            console.log(res.data)
            setFormData({
               "stock": ''
            })
            const data = res.data
            setBorrower(prevBorrowers => [...prevBorrowers, {
               stock: data.book.stock_no,
               due_date: data.due_date,
               book_name: data.book.book.title,
               patron: `${data.patron.first_name} ${data.patron.last_name} (${data.patron.membership_id.plan_code}${data.patron.id})`,
               language: data.book.language.language,
               checked_out_on: data.borrowed_date,
               return_date: data.return_date
            }]);
         } catch (error) {
            toast(error.response.data.error, {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "dark",
            })
         }
      } else {
         toast.warning('enter a number')
      }
   }

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
               <form onSubmit={handleOnSubmit}>
                  <input type="text" placeholder='Stock number' value={formData.stock}
                     onChange={handleOnChage} />
                  <button>Check In</button>
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
                           {borrower.map((borrow, index) => {
                              return (
                                 <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                                    <TableCell align="left">{borrow.stock}</TableCell>
                                    <TableCell align="left">{borrow.book_name}({borrow.language})</TableCell>
                                    <TableCell align="left">{borrow.patron}</TableCell>
                                    <TableCell align="left">{new Date(borrow.checked_out_on).toLocaleDateString('en-US')}</TableCell>
                                    <TableCell align="left" >{new Date(borrow.due_date).toLocaleDateString('en-US')}</TableCell>
                                    <TableCell align="center">{new Date(borrow.return_date).toLocaleDateString('en-US')}</TableCell>
                                 </TableRow>
                              )
                           })}
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
