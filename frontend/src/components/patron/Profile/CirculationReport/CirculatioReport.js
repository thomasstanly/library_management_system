import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import axios from '../../../../Axios'
import useRazorpay from "react-razorpay";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import style from './CirculatioReport.module.scss'

const columns = [
   { id: 1, label: 'stock', minWidth: 100, align: 'center' },
   { id: 2, label: 'Book Name', minWidth: 100, align: 'center' },
   { id: 3, label: 'Check Out', minWidth: 50, align: 'center' },
   { id: 4, label: 'Check In', minWidth: 50, align: 'center' },
   { id: 5, label: 'Return date', minWidth: 50, align: 'center' },
   { id: 6, label: 'Renewed', minWidth: 50, align: 'center' },
   { id: 7, label: 'Fine', minWidth: 50, align: 'center' },
]

const CirculatioReport = ({ user_details }) => {

   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [rows, setRows] = useState([]);
   const patron_id = user_details.patron_id

   const Razorpay = useRazorpay()

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };

   const fetch = async () => {
      try {
         console.log(patron_id)
         const access_token = JSON.parse(localStorage.getItem('access'))
         const res = await axios.get(`borrow/patron/?patron_id=${patron_id}`,
            {
               headers:
               {
                  Authorization: `Bearer ${access_token}`
               }
            }
         )

         const updatedBorrower = res.data.map((data) => {
            return {
               id: data.id,
               stock: data.book.stock_no,
               check_in: new Date(data.due_date).toLocaleDateString('en-US'),
               book_name: `${data.book.book.title} (${data.book.language.language})`,
               check_out: new Date(data.borrowed_date).toLocaleDateString('en-US'),
               return_date: data.return_date ? new Date(data.return_date).toLocaleDateString('en-US') : 'N/A',
               renew: data.renewal,
               fine: data.fine_payment
            };
         });
         setRows(updatedBorrower)
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      fetch()

   }, [patron_id])

   const complete_payment = async (id, amount, payment_id, order_id, signature) => {
      try {
         const response = await axios.post('razorpay/fine_payment/complete/', {
            fine_payment: id,
            amount: amount,
            payment_id: payment_id,
            order_id: order_id,
            signature: signature,
         });
         console.log(response.data);

         await Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Payment is Successful!",
            showConfirmButton: false,
            timer: 1200
         });

      } catch (error) {
         console.log(error);
      }
   };

   const handleFine = (id, amount) => {
      console.log(id, '', amount)
      const access_token = JSON.parse(localStorage.getItem('access'))
      axios.post(`razorpay/fine_payment/?fine_id=${id}`, {
         amount: amount,
         currency: 'INR'
      }).then(function (response) {
         const options = {
            key: "rzp_test_DadhvgCTL7p70u",
            amount: "50000",
            currency: "INR",
            name: "Acme Corp",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: response.data.data.id,
            handler: function (response) {
               complete_payment(id, amount,
                  response.razorpay_payment_id,
                  response.razorpay_order_id,
                  response.razorpay_signature)

            },
            prefill: {
               name: "Piyush Garg",
               email: "youremail@example.com",
               contact: "9999999999",
            },
            notes: {
               address: "Razorpay Corporate Office",
            },
            theme: {
               color: "#3399cc",
            },
         }
         const rzp1 = new window.Razorpay(options);

         rzp1.on("payment.failed", function (response) {
            // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
            Swal.fire({
               position: "center",
               icon: "warning",
               title: `${response.error.metadata.payment_id}`,
               showConfirmButton: false,
               timer: 1500
            })
         });

         rzp1.open();
      }).catch(function (error) {
         console.log(error)
         Swal.fire({
            position: "center",
            icon: "warning",
            title: `${error.response.data.error}`,
            showConfirmButton: false,
            timer: 1500
         })
      })
   }

   return (
      <>
         <div className={style.subscription}>
            <h4>Circulation History</h4>
            <div className={style.list}>
               <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TableContainer className={style.scroller} sx={{ maxHeight: 440 }}>
                     <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                           <TableRow>
                              {columns.map((column) => (
                                 <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                 >
                                    {column.label}
                                 </TableCell>
                              ))}
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {rows
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row, index) => {
                                 return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                       <TableCell align="left">{row.stock}</TableCell>
                                       <TableCell align="left">{row.book_name}</TableCell>
                                       <TableCell align="left">{row.check_out}</TableCell>
                                       <TableCell align="left">{row.check_in}</TableCell>
                                       <TableCell align="left">{row.return_date}</TableCell>
                                       <TableCell align="left">{row.renew ? 'yes' : 'no'}</TableCell>
                                       <TableCell align="center">
                                          {row.fine ? row.fine.fine_status == 'PENDING' ? <button className={style.fine}
                                             onClick={() => handleFine(row.fine.id, row.fine.amount)}>Pay ₹ {row.fine.amount}</button> :
                                             <span className={style.fine} style={{ backgroundColor: '#0fde2a' }}>Paid </span> :
                                             <span className={style.fine} style={{ backgroundColor: '#3498db' }}>No fine</span>}
                                       </TableCell>
                                    </TableRow>
                                 );
                              })}
                        </TableBody>
                     </Table>
                  </TableContainer>
                  <TablePagination
                     rowsPerPageOptions={[10, 25, 100]}
                     component="div"
                     count={rows.length}
                     rowsPerPage={rowsPerPage}
                     page={page}
                     onPageChange={handleChangePage}
                     onRowsPerPageChange={handleChangeRowsPerPage}
                  />
               </Paper>
            </div>
         </div>
      </>
   )
}

export default CirculatioReport