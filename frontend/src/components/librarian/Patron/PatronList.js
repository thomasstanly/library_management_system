import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import axios from '../../../Axios'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography'
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import style from './PatronList.module.scss'


const columns = [
   { id: 1, label: ' ', minWidth: 100, align: 'center' },
   { id: 2, label: 'Patron Name', minWidth: 50, align: 'left' },
   { id: 3, label: 'email', minWidth: 50, align: 'center' },
   { id: 4, label: 'Phone number', minWidth: 50, align: 'left' },
   { id: 5, label: 'Membership', minWidth: 50, align: 'center' },
   { id: 6, label: 'Status', minWidth: 50, align: 'center' },
   { id: 7, label: 'Action', minWidth: 50, align: 'center' },

];
const breadcrumbs = [
   <Link underline="hover" key="1" color="inherit" href="/library/dashboard" style={{}}>
   Dashboard
</Link>,
<Typography key="3" color="text.primary">
   Patron
</Typography>,
];
const PatronList = () => {
   const [rows, setRows] = useState([])
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [toggle, setToggle] = useState(true)
   const navigate = useNavigate()
   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };
   const navigatation = (id) => {
      navigate(`/library/patron/${id}`)
   }

   const handleStatus = async (id) => {

      try {
         const access_token = JSON.parse(localStorage.getItem("access"))
         const res = await axios.get(`patron/status/${id}/`,
            {
               headers: {
                  Authorization: `Bearer ${access_token}`
               }
            })
         Swal.fire({
            title: "Status",
            text: `${res.data.message}`,
            icon: "success"
         }).then(() => {
            navigate('/library/patron')
         })

      } catch (error) {
         console.error(error.response.data)
      }

      fetchList()

   }
   const fetchList = async () => {
      try {
         const access_token = JSON.parse(localStorage.getItem('access'))
         const res = await axios.get('patron_list/',
            {
               headers: {
                  Authorization: `Bearer ${access_token}`
               }
            })
        
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
               <h3>Patron</h3>
               <Stack spacing={2}>
                  <Breadcrumbs separator={<ArrowRightIcon />} aria-label="breadcrumb">
                     {breadcrumbs}
                  </Breadcrumbs>
               </Stack>
            </div>
            <div>
            </div>
         </div>
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
                           .map((row) => {
                              return (
                                 <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    <TableCell align="left"><img style={{ height: '60px' }} src={(row.Profile ? row.Profile.profile_pic : null) || "/images/user.png"} alt="profile logo"
                                    onClick={(event) => navigatation(row.id)}
                                    /></TableCell>
                                    <TableCell align="left" onClick={(event) => navigatation(row.id)}>{row.first_name + ' ' + row.last_name}</TableCell>
                                    <TableCell align="left">{row.email}</TableCell>
                                    <TableCell align="left">{row.phone_number}</TableCell>
                                    <TableCell align="left">{row.membership_id ? row.membership_id.plan_name : ''}</TableCell>
                                    <TableCell align="center">{row.is_active ? 'Active' : 'Deactive'}</TableCell>
                                    <TableCell align="center">
                                       <FaEye style={{ color: 'grey', fontSize: '18px' }} onClick={() => handleStatus(row.id)} />
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
      </div >
   )
}

export default PatronList