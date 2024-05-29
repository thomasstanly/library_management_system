import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import axios from '../../../Axios';
import style from './Dashboard.module.scss'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const columns = [
   { id: 1, label: 'StocK', minWidth: 100, align: 'left' },
   { id: 2, label: 'Book Name', minWidth: 50, align: 'left' },
   { id: 3, label: 'patron', minWidth: 50, align: 'left' },
   { id: 4, label: 'Check Out', minWidth: 50, align: 'left' },
   { id: 5, label: 'Check In', minWidth: 50, align: 'left' },
   { id: 6, label: 'Return', minWidth: 50, align: 'left' },
]

const Dashboard = () => {
   const [borrower, setBorrower] = useState([])
   const [monthlyData, setMonthlyData] = useState([]);
   const [fineData, setFineData] = useState({});

   const fetch = async () => {
      try {
         const access_token = JSON.parse(localStorage.getItem('access'))
         const res = await axios.get(`borrow/`,
            {
               headers:
               {
                  Authorization: `Bearer ${access_token}`
               }
            }
         )
         const result = res.data.result.filter((data) => data.return_date === null);
         const updatedBorrower = result.map((data) => {
            return {
               stock: data.book.stock_no,
               due_date: new Date(data.due_date).toLocaleDateString('en-US'),
               book_name: `${data.book.book.title} (${data.book.language.language})`,
               patron: `(${data.patron.membership_id.plan_code} ${data.patron.membership_id.id}) ${data.patron.first_name} ${data.patron.last_name}`,
               checked_out: new Date(data.borrowed_date).toLocaleDateString('en-US'),
               return_date: data.return_date,
            };
         });
         setBorrower(updatedBorrower)
      } catch (error) {
         console.log(error)
      }
   }
   const fetchMonthlyData = async () => {
      try {
         const res = await axios.get('razorpay/dashboard/');
         setMonthlyData(res.data.chart);
         setFineData(res.data.pie)
      } catch (error) {
         console.log(error);
      }
   };
   const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
   ];
   const pData = monthlyData.map((item) => item.total_sum);
   const xLabels = monthlyData.map((item) => monthNames[item.month - 1]);

   const data = [
      { id: 0, value: fineData.total_paid, label: 'total paid  ₹' },
      { id: 1, value:  fineData.total_unpaid, label: 'total unpaid  ₹' },
   ];

   useEffect(() => {
      fetch();
      fetchMonthlyData();
   }, []);

   return (
      <>
         <div className={style.first_row}>
            <div className={style.chart}>
               <LineChart
                  height={300}
                  series={[{ data: pData, label: 'membership payment' }]}
                  xAxis={[{ scaleType: 'point', data: xLabels }]}
               />
            </div>
            <div className={style.board}>
               <h5>Overdue Payment</h5>
               <PieChart
                  series={[
                     {
                        data,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                     },
                  ]}
                  height={200}
                  width={420}
               />
            </div>
         </div>
         <div className={style.second_row}>
            <h2>Current Check Out</h2>
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
                        {borrower.map((row, index) => {
                           return (
                              <TableRow hover role="checkbox" tabIndex={-1} key={row.stock}>
                                 <TableCell align="left">{row.stock}</TableCell>
                                 <TableCell align="left">{row.book_name}</TableCell>
                                 <TableCell align="left">{row.patron}</TableCell>
                                 <TableCell align="left">{row.checked_out}</TableCell>
                                 <TableCell align="left">{row.due_date}</TableCell>
                                 <TableCell align="left">{row.return_date ? '' : 'N/A'}</TableCell>
                              </TableRow>
                           )
                        })}
                     </TableBody>
                  </Table>
               </TableContainer>
            </Paper>
         </div>
      </>
   )
}

export default Dashboard