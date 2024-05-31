import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
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
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import style from './MembershipList.module.scss'

const columns = [
   { id: 1, label: 'Plan Name', minWidth: 100, align: 'center' },
   { id: 2, label: 'Plan code', minWidth: 50, align: 'left' },
   { id: 3, label: 'number of books', minWidth: 50, align: 'left' },
   { id: 4, label: 'return period', minWidth: 50, align: 'left' },
   { id: 5, label: 'Rate/month', minWidth: 50, align: 'left' },
   { id: 6, label: 'Fine/day', minWidth: 50, align: 'left' },
   { id: 7, label: 'Action', minWidth: 50, align: 'center' },

];
const breadcrumbs = [
   <Link underline="hover" key="1" color="inherit" to="/library/dashboard" style={{}}>
      Dashboard
   </Link>,
   <Typography key="3" color="text.primary">
      Add Membership Plan
   </Typography>,
];

const MembershipList = () => {
   const [rows, setRows] = useState([])
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const navigate = useNavigate()
   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };

   const handleDelete = (id) => {
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
               const access_token = JSON.parse(localStorage.getItem("access"))
               const res = await axios.delete(`membership/${id}/`,
                  {
                     headers: {
                        Authorization: `Bearer ${access_token}`
                     }
                  })
               Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
               }).then(() =>{
                  navigate('/library/membership')
               })
               
            } catch (error) {
               console.error(error.response.data)
            }
         }
         fetchList()
      })
   }
   const fetchList = async () => {
      try {
         const access_token = JSON.parse(localStorage.getItem('access'))
         const res = await axios.get('membership/',
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
   useEffect(() => {
      fetchList()
   }, [])
   return (
      <div>
         <div className={style.header}>
            <div>
            </div>
            <div className={style.title}>
               <h3>Memebership</h3>
               <Stack spacing={2}>
                  <Breadcrumbs separator={<ArrowRightIcon />} aria-label="breadcrumb">
                     {breadcrumbs}
                  </Breadcrumbs>
               </Stack>
            </div>
            <div className={style.button}>
               <Link className={style.link} to='/library/membership/add_plan'><button>+ Add New Plan</button></Link>
            </div>
         </div>
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
                                    <TableCell align="left">{row.plan_name}</TableCell>
                                    <TableCell align="left">{row.plan_code}</TableCell>
                                    <TableCell align="left">{row.no_books}</TableCell>
                                    <TableCell align="left">{row.return_period} days</TableCell>
                                    <TableCell align="left">{row.plan_rate}</TableCell>
                                    <TableCell align="left">{row.fine_amount}</TableCell>
                                    <TableCell align="center"><EditIcon style={{ color: 'blue' }} onClick={() => navigate(`/library/membership/${row.id}`)} />
                                       <DeleteIcon style={{ color: 'red' }} onClick={() => handleDelete(row.id)} />
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
      </div >
   )
}

export default MembershipList