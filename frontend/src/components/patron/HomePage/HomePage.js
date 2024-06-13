import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from '../../../Axios'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import style from './HomePage.module.scss'

const columns = [
   { id: 1, label: 'stock', minWidth: 10, align: 'left' },
   { id: 2, label: 'Book Name', minWidth: 50, align: 'left' },
   { id: 3, label: 'Checked Date', minWidth: 150, align: 'left' },
   { id: 4, label: 'Due Date ', minWidth: 50, align: 'left' }, ,
   { id: 5, label: 'Remaing days', minWidth: 150, align: 'center' },
   { id: 6, label: '', minWidth: 50, align: 'center' },
]

const HomePage = ({ patron }) => {
   const patron_id = patron.patron_id
   const plan = patron.plan
   const expiry = patron.plan_expiry
   const navigate = useNavigate()
   const [rows, setRows] = useState([]);
   const [borrower, setBorrower] = useState([])
   const [member, setMember] = useState({})

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
         const result = res.data.filter((data) => data.return_date === null);
         const today = new Date()
         const updatedBorrower = result.map((data) => {
            const dueDate = new Date(data.due_date);
            const timeDifference = dueDate.getTime() - today.getTime();
            const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
            return {
               stock: data.book.stock_no,
               due_date: new Date(data.due_date).toLocaleDateString('en-US'),
               book_name: `${data.book.book.title} (${data.book.language.language})`,
               call_number: data.book.book.call_number,
               checked_out_on: new Date(data.borrowed_date).toLocaleDateString('en-US'),
               remaining_days: daysDifference,
               renew: data.renewal,
               cover: data.book.book.cover,
               plan: data.patron.membership_id,
               fine: data.fine_payment
            };
         });
         setBorrower(updatedBorrower)
      } catch (error) {
         console.log(error)
      }
   }

   const fetchBook = async () => {
      try {
         const res = await axios.get(`book/`)
         setRows(res.data)

      } catch (error) {
         console.log(error.response.data)
      }
   }

   const membsership = async () => {
      try {
         const access_token = JSON.parse(localStorage.getItem('access'))
         const res = await axios.get(`razorpay/patron/${patron_id}/`,
            {
               headers:
               {
                  Authorization: `Bearer ${access_token}`
               }
            }
         )
         const lastPaidPayment = res.data.find(user => user.status === 'PAID');
         const status = new Date().setHours(0, 0, 0, 0) <= new Date(lastPaidPayment.expiry_date).setHours(0, 0, 0, 0)
         setMember({
            membership_plan: lastPaidPayment.membership_plan.plan_name,
            status: status,
            expiry: lastPaidPayment.expiry_date

         })
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      fetchBook();
      fetch();
      membsership();
   }, [patron_id]);

   const handleRenew = async (stock) => {
      try {
         const access_token = JSON.parse(localStorage.getItem('access'))
         const res = await axios.get(`borrow/renew/?patron_id=${patron_id}&stock=${stock}`,
            {
               headers:
               {
                  Authorization: `Bearer ${access_token}`
               }
            })
         Swal.fire({
            position: "center",
            icon: "success",
            title: `${res.data.message}`,
            showConfirmButton: false,
            timer: 1200
         })
         fetch()
      } catch (error) {
         Swal.fire({
            position: "center",
            icon: "error",
            title: `${error.response.data.error}`,
            showConfirmButton: false,
            timer: 1200
         })
      }
   }

   const handleExpiry = () => {
      const today = new Date().setHours(0, 0, 0, 0);
      const expiry_date = new Date(expiry).setHours(0, 0, 0, 0);
      if (today > expiry_date) {
         navigate('/plan')
      } else {
         Swal.fire({
            position: "center",
            icon: "success",
            title: 'Membership plan Active',
            showConfirmButton: false,
            timer: 1200
         })
      }
   }

   useEffect(() => {
      let scroller = document.querySelector('.posters');
      let prevbtn = document.getElementById('prevbtn');
      let nextbtn = document.getElementById('nextbtn');

      const scrollLeftSmoothly = (element, target, duration) => {
         const start = element.scrollLeft;
         const distance = target - start;
         const startTime = performance.now();

         const animateScroll = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            element.scrollLeft = start + distance * progress;

            if (progress < 1) {
               requestAnimationFrame(animateScroll);
            }
         };
         requestAnimationFrame(animateScroll);
      };

      if (scroller && prevbtn && nextbtn) {
         prevbtn.addEventListener("click", () => {
            scrollLeftSmoothly(scroller, scroller.scrollLeft - 220, 200);
         });

         nextbtn.addEventListener("click", () => {
            scrollLeftSmoothly(scroller, scroller.scrollLeft + 220, 200);
         });
      } fetchBook();
      fetch();
   }, [patron_id]);

   return (
      <>
         <div style={{marginBottom:'10vh'}}>
            <div className={style.table}>
               {plan &&
                  <div className={style.member}>
                     <div className={style.member_header}>
                        <p>Membership Details</p>
                     </div>
                     <div className={style.member_row}>
                        <p>Membership</p>
                        <p>{member.membership_plan}</p>
                     </div>
                     <div className={style.member_row}>
                        <p>Status</p>
                        <p>{member.status ? 'Active' : 'Inactive'}</p>
                     </div>
                     <div className={style.member_row}>
                        <p>Expiry date</p>
                        <p>{member.expiry}</p>
                     </div>
                     <div className={style.member_row}>
                        <button onClick={handleExpiry}>Renew Membership<span></span></button>
                     </div>
                  </div>
               }
               {borrower.length > 0 &&
                  <div className={style.borrow}>
                     <Paper>
                        <TableContainer sx={{ maxHeight: 440, margin:0 }}>
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
                                             fontSize:'0.8rem',
                                          }}
                                       >
                                          {column.label}
                                       </TableCell>
                                    ))}
                                 </TableRow>
                              </TableHead>
                              <TableBody>
                                 {borrower.map((borrow, index) => {
                                    let image = `http://127.0.0.1:8000${borrow.cover}`
                                    return (
                                       <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                                          <TableCell align="left">{borrow.stock}</TableCell>
                                          <TableCell align="left">
                                             <div className={style.image}>
                                                <img src={image} alt="" />
                                                <p>{borrow.book_name}</p>
                                             </div>
                                          </TableCell>
                                          <TableCell align="left">{borrow.checked_out_on}</TableCell>
                                          <TableCell align="left" >{borrow.due_date}</TableCell>
                                          <TableCell align="center">{borrow.remaining_days < 0 ? 0 : borrow.remaining_days}</TableCell>
                                          <TableCell align="center">
                                             {
                                                borrow.fine ?
                                                   <Link to='/profile/circulation_history' >You have a fine of ₹ {borrow.fine.amount}</Link>
                                                   : <button disabled={borrow.renew ? true : false}
                                                      onClick={() => handleRenew(borrow.stock)} >
                                                      {borrow.renew ? 'Renewed' : 'renew'}
                                                   </button>
                                             }
                                          </TableCell>
                                       </TableRow>
                                    )
                                 })}

                              </TableBody>
                           </Table>
                        </TableContainer>
                     </Paper>
                  </div>
               }
            </div>
            <div className={style.header}>
               <h1>Recent</h1>
               <Link to={'/book_list'}>See All</Link>
            </div>
            <div className={style.row}>
               <div id='prevbtn' className={style.leftarrow}>
                  <div className={style.prev}>
                     <ChevronLeftRoundedIcon style={{ fontSize: '50px' }} />
                  </div>
               </div>
               <div className={`${style.posters} posters`}>
                  {rows.map((row) => {
                     return (
                        <div key={row.id} className={style.inside}>
                           <img className={style.poster} src={row.cover} alt="poster" onClick={() => navigate(`/book_list/${row.id}`)} />
                           <h2 className={style.textOverlay}>{row.title}</h2>
                        </div>
                     );
                  })}
               </div>
               <div id='nextbtn' className={style.rightarrow}>
                  <div className={style.nxt}>
                     <ChevronRightRoundedIcon style={{ fontSize: '50px' }} />
                  </div>
               </div>
            </div>
         </div >
      </>
   )
}

export default HomePage