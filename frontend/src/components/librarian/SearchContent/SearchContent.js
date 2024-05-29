import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from '../../../Axios'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import style from './SearchContent.module.scss'

const SearchContent = () => {
   const { query } = useSelector((state) => state.Search_bar)
   const navigate = useNavigate()
   const [search, setSearch] = useState([])
   const [error, setError] = useState('')

   const seachresult = async () => {
      try {
         const access_token = JSON.parse(localStorage.getItem('access'))
         const res = await axios.get(`search/?query=${query}`,
            {
               headers: {
                  Authorization: `Bearer ${access_token}`
               }
            })

         if (res.data && res.data.success) {
            const data = res.data.success;

            const results = data.map((item) => ({
               name: item.book?.title || `${item.first_name} ${item.last_name}`,
               stock_or_plan: item.stock_no || `${item.membership_id?.plan_code} ${item.id}`,
               firstname: item.book?.author[0]?.firstname || '',
               lastname: item.book?.author[0]?.lastname || '',
               patronId: item.id,
               bookId: item.book?.id,
            }));

            setSearch(results);
            setError('');
         } else {
            setError('No data found');
         }

      } catch (error) {
         console.log(error.response.data)
         setError(error.response.data.error)

      }
   }
   useEffect(() => {
      seachresult()

      return () => setSearch([])
   }, [query])
   return (
      <div>
         <div className={style.list}>
            <h3>Search Result</h3>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
               <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                     <TableBody>
                        {error ?
                           <TableRow>
                              <TableCell colSpan={3}>
                                 <p>{error}</p>
                              </TableCell>
                           </TableRow> : search && search.map((row) => {
                              return (
                                 <TableRow hover role="checkbox" tabIndex={-1} key={row.id}
                                    onClick={() => row.bookId ?
                                       navigate(`/library/books/${row.bookId}`) :
                                       navigate(`/library/patron/${row.patronId}`)}
                                 >
                                    <TableCell align="left" >{row.stock_or_plan}</TableCell>
                                    <TableCell align="left" >{row.name}</TableCell>
                                    <TableCell align="left" >{row.firstname} {row.lastname}</TableCell>

                                 </TableRow>
                              )
                           })}
                     </TableBody>
                  </Table>
               </TableContainer>
            </Paper>
         </div>
      </div >
   )
}

export default SearchContent