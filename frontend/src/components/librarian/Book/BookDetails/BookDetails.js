import React, { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from '../../../../Axios'
import Swal from 'sweetalert2'
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
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import style from './BookDetails.module.scss'

const columns = [
   { id: 1, label: 'Book Name', minWidth: 100, align: 'center' },
   { id: 2, label: 'publisher', minWidth: 50, align: 'center' },
   { id: 3, label: 'language', minWidth: 50, align: 'center' },
   { id: 4, label: 'Action', minWidth: 50, align: 'center' },
];

const BookDetails = () => {
   let { id } = useParams();
   const [bookdata, setBookData] = useState({})
   const [rows, setRows] = useState([]);

   useEffect(() => {
      const fetchBook = async () => {
         try {
            const access_token = JSON.parse(localStorage.getItem('access'));
            const res = await axios.get(`book/${id}/`, {
               headers: {
                  Authorization: `Bearer ${access_token}`
               }
            })
            console.log(res.data)
            setBookData(res.data)

         } catch (error) {
            console.log(error.response.data)
         }
      }
      const fetchVariant = async () => {
         try {
            const access_token = JSON.parse(localStorage.getItem('access'));
            const res = await axios.get(`book_variant/${id}/`, {
               headers: {
                  Authorization: `Bearer ${access_token}`
               }
            })
            console.log(res.data)
            setRows(res.data)

         } catch (error) {
            console.log(error.response.data)
         }
      }

      fetchBook()
      fetchVariant()
   }, [])
   const breadcrumbs = [
      <Link underline="hover" key="1" color="inherit" to="/library/dashboard" style={{}}>
         Dashboard
      </Link>,
      <Link underline="hover" key="1" color="inherit" to="/library/books" style={{}}>
         Books
      </Link>,
      <Typography key="3" color="text.primary">
         {bookdata.title}
      </Typography>,
   ];
   return (
      <>
         <div className={style.header}>
            <div>
            </div>
            <div className={style.title}>
               <h3>Categories</h3>
               <Stack spacing={2}>
                  <Breadcrumbs separator={<ArrowRightIcon />} aria-label="breadcrumb">
                     {breadcrumbs}
                  </Breadcrumbs>
               </Stack>
            </div>
            <div>
               <Link className={style.link} to={`/library/books/${id}/add`}><button>+ Add New Book</button></Link>
            </div>
         </div>
         <div className={style.body}>
            <img className={style.right} src={bookdata.cover} alt={bookdata.title} />
            <div className={style.left}>
               <div className={style.sub_right}>
                  <h3 className={style.title}>{bookdata.title}</h3>
                  <div>Authors:
                     {bookdata.author && bookdata.author.map(author => (
                        <p key={author.id}>{author.firstname} {author.lastname}</p>
                     ))}
                  </div>
                  <p>Genre: {bookdata.genre}</p>
                  <p>Category: {bookdata.category && bookdata.category.category_name}</p>
                  <p>call number: {bookdata.call_number}</p>
               </div>
               <div className={style.sub_left}>
                  <p>{bookdata.description}</p>
               </div>
            </div>
         </div>
         <Paper sx={{ width: '100%', overflow: 'hidden',padding:'50px'}}>
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
                        .map((row, index) => {
                           return (
                              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                 <TableCell align="left" >
                                    {row.book.title}
                                 </TableCell>
                                 <TableCell align="left">
                                    <span>{row.publisher.publisher_name}</span> <br /> 
                                    <span>{row.publisher.publisher_place}</span> <br />  
                                    <span>{row.publishing_year}</span>
                                 </TableCell>
                                 <TableCell align="left">
                                    {row.language.language}
                                 </TableCell>
                                 <TableCell align="center"><EditIcon style={{ color: 'blue' }} /><DeleteIcon style={{ color: 'red' }} /></TableCell>
                              </TableRow>
                           );
                        })}
                  </TableBody>
               </Table>
            </TableContainer>
            
         </Paper>
      </>
   )
}

export default BookDetails

