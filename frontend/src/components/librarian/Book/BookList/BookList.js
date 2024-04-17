import * as React from 'react';
import {useNavigate} from 'react-router-dom'
import axios from '../../../../Axios'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TableRow from '@mui/material/TableRow';
import style from './BookList.module.scss'

const columns = [
   { id: 1, label: 'Book Name', minWidth: 100, align: 'center' },
   { id: 2, label: 'Author', minWidth: 50, align: 'center' },
   { id: 3, label: 'Category', minWidth: 50, align: 'center' },
   { id: 4, label: 'Action', minWidth: 50, align: 'center' },

];

const BookList = () => {
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);
   const [rows, setRows] = React.useState([]);
   const navigate = useNavigate()

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };

   const navigation = (id) =>{
      navigate(`/library/books/${id}/`)
   }

   React.useEffect(() => {
      const fetch = async () => {
         try {
            const access_token = JSON.parse(localStorage.getItem('access'))
            const res = await axios.get('book/',
               {
                  headers: {
                     Authorization: `Bearer ${access_token}`
                  }
               })
            console.log(res.data)
            setRows(res.data)
         } catch (error) {
            console.log(error)
         }
      }
      fetch()
   }, [])


   return (
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
                           let image = `http://127.0.0.1:8000${row.cover}`;
                           return (
                              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                 <TableCell align="left" onClick={()=>navigation(row.id)}>
                                    <img src={image} alt={row.title} style={{ width: '70px' }} />
                                    <span style={{ marginLeft: '2vw' }}>{row.title}</span>
                                 </TableCell>
                                 <TableCell align="left">
                                 {row.author.map((auth, index) => (
                                    <span key={index}>
                                       {auth.firstname} {auth.lastname}
                                       {index < row.author.length - 1 && ', '}
                                    </span>
                                    ))}
                                 </TableCell>
                                 <TableCell align="left">{row.category.category_name}</TableCell>
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

export default BookList