import React, { useEffect } from 'react'
import axios from '../../../../Axios'
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
   { id: 4, label: 'Return date', minWidth: 50, align: 'center' },
   { id: 5, label: 'Renewed', minWidth: 50, align: 'center' },
]

const CirculatioReport = ({ user_details }) => {

   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);
   const [rows, setRows] = React.useState([]);
   const patron_id = user_details.patron_id

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
               return_date:data.return_date ? new Date(data.return_date).toLocaleDateString('en-US') : 'N/A',
               renew: data.renewal,
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