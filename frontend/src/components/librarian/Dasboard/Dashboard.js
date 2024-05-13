import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
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

const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
   'Page A',
   'Page B',
   'Page C',
   'Page D',
   'Page E',
   'Page F',
   'Page G',
];
const columns = [
   { id: 1, label: 'StocK', minWidth: 100, align: 'left' },
   { id: 2, label: 'Book Name', minWidth: 50, align: 'left' },
   { id: 3, label: 'patron', minWidth: 50, align: 'left' },
   { id: 4, label: 'Check Out', minWidth: 50, align: 'left' },
   { id: 5, label: 'Check In', minWidth: 50, align: 'left' },
   { id: 6, label: 'Return', minWidth: 50, align: 'left' },
]

const Dashboard = () => {
   const [rows, setRows] = useState([]);
   const [borrower, setBorrower] = useState([])

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
         const result = res.data.filter((data) => data.return_date === null);
         const updatedBorrower = result.map((data) => {
            return {
               stock: data.book.stock_no,
               due_date: new Date(data.due_date).toLocaleDateString('en-US'),
               book_name: `${data.book.book.title} (${data.book.language.language})`,
               patron:`(${data.patron.membership_id.plan_code} ${data.patron.membership_id.id  }) ${data.patron.first_name} ${data.patron.last_name}`,
               checked_out: new Date(data.borrowed_date).toLocaleDateString('en-US'),
               return_date: data.return_date,
            };
         });
         setBorrower(updatedBorrower)
      } catch (error) {
         console.log(error)
      }
   }
   useEffect(() => {
      fetch();
   }, []);

   return (
      <>
         <div className={style.first_row}>
            <div className={style.chart}>
               <LineChart
                  height={300}
                  series={[{ data: pData, label: 'pv' }]}
                  xAxis={[{ scaleType: 'point', data: xLabels }]}
               />
            </div>
            {/* <div className={style.board}>
               fsdfdsfdsfs
            </div> */}
         </div>
         <div className={style.second_row}>
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