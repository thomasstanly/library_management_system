import * as React from 'react';
import { useNavigate } from 'react-router-dom'
import axios from '../../../../Axios'
import Swal from 'sweetalert2'
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
import style from './CategoryList.module.scss'

const columns = [
   { id: 1, label: 'Category Name', minWidth: 100, align: 'center' },
   { id: 2, label: 'Category code', minWidth: 50, align: 'center' },
   { id: 3, label: 'Created at', minWidth: 50, align: 'center' },
   { id: 4, label: 'Action', minWidth: 50, align: 'center' },

];



const CategoryList = () => {
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

   const handleDelete = (id, category_name) => {
      Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
         if (result.isConfirmed) {
            try {
               const access_token = JSON.parse(localStorage.getItem('access'))
               console.log(access_token);
               const res = await axios.delete(`category_edit/${id}/`, {
                  headers: {
                     Authorization: `Bearer ${access_token}`
                  }
               })
               Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
               });

            } catch (error) {
               console.error(error.response.data);
            }
         }
         fetch()
      });
   }
   const fetch = async () => {
      try {
         const access_token = JSON.parse(localStorage.getItem('access'))
         const res = await axios.get('category/',
            {
               headers: {
                  Authorization: `Bearer ${access_token}`
               }
            })
         setRows(res.data)
      } catch (error) {
         console.log(error.response)
      }
   }
   React.useEffect(() => {
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
                        .map((row) => {
                           return (
                              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                 <TableCell align="left">{row.category_name}</TableCell>
                                 <TableCell align="left">{row.category_code}</TableCell>
                                 <TableCell align="left">{new Date(row.created_at).toLocaleDateString()}</TableCell>
                                 <TableCell align="center"><EditIcon onClick={() => (navigate(`/library/category/${row.id}`))} style={{ color: 'blue' }} />
                                    <DeleteIcon style={{ color: 'red' }} onClick={() => handleDelete(row.id, row.category_name)} /></TableCell>
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
               sx={{
                  '& .MuiTablePagination-selectLabel': {
                     marginBottom: '0px',
                     color:'Blue',
                     fontWeight: 'bold',
                  },
                  '& .MuiTablePagination-displayedRows': {
                     marginBottom: '0px',
                     color:'Blue',
                     fontWeight: 'bold',
                  }
               }}
            />
         </Paper>
      </div>
   );
}

export default CategoryList