import React, { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from '../../../Axios'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import style from './BookDetails.module.scss'

const columns = [
   { id: 1, label: ' ', minWidth: 10, align: 'center' },
   { id: 2, label: 'Book Name', minWidth: 50, align: 'center' },
   { id: 3, label: 'Call Number', minWidth: 50, align: 'center' },
   { id: 4, label: 'Status', minWidth: 50, align: 'center' },
   { id: 5, label: 'Publisher', minWidth: 50, align: 'center' },
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
            const res = await axios.get(`borrow/book/?book=${id}`, {
               headers: {
                  Authorization: `Bearer ${access_token}`
               }
            })
            console.log(res.data.data)
            setRows(res.data.data)

         } catch (error) {
            console.log(error.response.data)
         }
      }

      fetchBook()
      fetchVariant()
   }, [id])

   return (
      <>
         <div className={style.body}>
            <div className={style.shade}></div>
            <img className={style.right} src={bookdata.cover} alt={bookdata.title} />
            <div className={style.content}>
               <h3 className={style.title}>{bookdata.title}</h3   >
               <div className={style.left}>
                  <div className={style.sub_right}>
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
         </div>
         <Paper sx={{m:6, overflow: 'hidden',borderRadius: 4}}>
            <TableContainer className={style.scroller} sx={{ maxHeight: 768 }}>
               <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                     <TableRow>
                        {columns.map((column) => (
                           <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth,
                                 backgroundColor: '#E0E2E7',
                                 fontWeight:'600'
                               }}
                              
                           >
                              {column.label}
                           </TableCell>
                        ))}
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {rows.map((row, index) => {
                        return (
                           <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                              <TableCell align='left'>{index + 1}</TableCell>
                              <TableCell align="center" > {row.title} ({row.language})</TableCell>
                              <TableCell align='center'>{row.call_number}</TableCell>
                              <TableCell align="center">
                                 {row.patron ?
                                    <span>
                                       `<i>Checked out, due on </i> {new Date(row.due_date).toLocaleDateString('en-US')}`
                                    </span>
                                    : "Available"}
                              </TableCell>
                              <TableCell align="center">
                                 <span>{row.publisher.name}</span> <br />
                                 <span>{row.publisher.year}</span> <br />
                              </TableCell>

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

