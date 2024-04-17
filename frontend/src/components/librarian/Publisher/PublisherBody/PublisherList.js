import * as React from 'react';
import axios from '../../../../Axios'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import style from './PublisherList.module.scss'

const columns = [
   { id: 1, label: 'Publisher Name', minWidth: 100, align: 'center' },
   { id: 2, label: 'Publisher Place', minWidth: 100, align: 'center' },
   { id: 3, label: 'Created at', minWidth: 50, align: 'center' },
   { id: 4, label: 'Action', minWidth: 50, align: 'center' },

];
const PublisherList = () => {
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);
   const [rows, setRows] = React.useState([]);

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };

   React.useEffect(() => {
      const fetch = async () => {
         try {
            const access_token = JSON.parse(localStorage.getItem('access'))
            const res = await axios.get('publisher/',
               {
                  headers: {
                     Authorization: `Bearer ${access_token}`
                  }
               })
            console.log(res)
            setRows(res.data)
         } catch (error) {
            console.log(error.response)
         }
      }
      fetch()
   }, [])
   return (
      <div className={style.list}>
         <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
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
                                 <TableCell align="left">{row.publisher_name}</TableCell>
                                 <TableCell align="left">{row.publisher_place}</TableCell>
                                 <TableCell align="left">{new Date(row.created_at).toLocaleDateString()}</TableCell>
                                 <TableCell align="center"><EditIcon style={{ color: 'blue' }} /><DeleteIcon style={{ color: 'red' }} /></TableCell>
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
   );
}

export default PublisherList