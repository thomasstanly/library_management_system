import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import axios from '../../../../Axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import style from './PatronCheckout.module.scss';
import "react-toastify/dist/ReactToastify.css";

const columns = [
   { id: 1, label: 'stock', minWidth: 20, align: 'left' },
   { id: 2, label: 'Book Name', minWidth: 50, align: 'left' },
   { id: 3, label: 'Call Number', minWidth: 50, align: 'left' },
   { id: 4, label: 'Checked Date', minWidth: 50, align: 'left' },
   { id: 5, label: 'Due Date ', minWidth: 100, align: 'left' }, ,
   { id: 6, label: 'Renew Satus', minWidth: 50, align: 'center' },
]
const PatronCheckout = ({ patron_id }) => {

   const [formData, setFormData] = useState({
      "stock": ''
   })

   const [borrower, setBorrower] = useState([{
      stock: '',
      due_date: '',
      book_name: '',
      call_number: '',
      language: '',
      checked_out_on: '',
      renewal_status: ''
   }])

   const handleOnChage = (event) => {
      setFormData({ "stock": event.target.value })

   }
   const handleOnSubmit = async (event) => {
      event.preventDefault()
      if (!isNaN(formData.stock)) {
         try {
            const access_token = JSON.parse(localStorage.getItem('access'))
            const res = await axios.get('book_variant/',
               {
                  headers: {
                     Authorization: `Bearer ${access_token}`
                  },
                  params: {
                     stock: formData.stock
                  }
               }
            )
            Swal.fire({
               title: "Check Out",
               text: `${res.data.book.title}`,
               icon: "success",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, check out!"
            }).then(async (result) => {
               if (result.isConfirmed) {
                  try {
                     const access_token = JSON.parse(localStorage.getItem('access'))
                     const res = await axios.post(`borrow/check_out/?patron_id=${patron_id}`, formData,
                        {
                           headers: {
                              Authorization: `Bearer ${access_token}`
                           }
                        }
                     )
                     console.log(res)
                     fetch()
                     setFormData({
                        "stock": ''
                     })
                     toast(res.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                     })
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
               }
            })
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
         toast.warning('enter a Stock number')
      }
   }

   const fetch = async () => {
      try {
         const access_token = JSON.parse(localStorage.getItem('access'))
         const res = await axios.get(`borrow/patron/?patron_id=${patron_id}`,
            {
               headers:
               {
                  Authorization: `Bearer ${access_token}`
               }
            }
         )
         console.log(res)
         const result = res.data.filter((data) => data.return_date === null);
         setBorrower(result.map((data) => ({
            stock: data.book.stock_no,
            due_date: data.due_date,
            book_name: data.book.book.title,
            call_number: data.book.book.call_number,
            language: data.book.language.language,
            checked_out_on: data.borrowed_date,
            renewal_status: data.renewal,
         })));
         console.log(result)
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      fetch()
   }, [])

   return (
      <>
         <div className={style.container}>
            <div className={style.checkout}>
               <p>checking out to thomas stanly (pm2)</p>
               <form onSubmit={handleOnSubmit}>
                  <input type="text" placeholder='Stock number' required value={formData.stock}
                     onChange={handleOnChage} />
                  <button type='submit' >Check Out</button>
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
                                    <TableCell align="left">{borrow.call_number}</TableCell>
                                    <TableCell align="left">{new Date(borrow.checked_out_on).toLocaleDateString('en-US')}</TableCell>
                                    <TableCell align="left" >{new Date(borrow.due_date).toLocaleDateString('en-US')}</TableCell>
                                    <TableCell align="center">{borrow.renewal_status ? 'Yes' : 'No'}</TableCell>
                                 </TableRow>
                              )
                           })}

                        </TableBody>
                     </Table>
                  </TableContainer>
               </Paper>
            </div>
         </div>
      </>
   )
}

export default PatronCheckout