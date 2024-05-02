import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart } from '@mui/x-charts/LineChart';
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
   { id: 1, label: 'Due Date ', minWidth: 100, align: 'center' },
   { id: 2, label: 'Book Name', minWidth: 50, align: 'left' },
   { id: 3, label: 'Call number', minWidth: 50, align: 'center' },
   { id: 4, label: 'Category', minWidth: 50, align: 'left' },
   { id: 5, label: 'Checked out on', minWidth: 50, align: 'center' },
   { id: 6, label: 'Fine', minWidth: 50, align: 'center' },
]

const Dashboard = () => {
   return (
      <>
         <div className={style.first_row}>
            <div className={style.chart}>
               <LineChart
                  height={300}
                  series={[{ data: pData, label: 'pv' } ]}
                  xAxis={[{ scaleType: 'point', data: xLabels }]}
               />
            </div>
            <div className={style.board}>
               fsdfdsfdsfs
            </div>
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
      </>
   )
}

export default Dashboard