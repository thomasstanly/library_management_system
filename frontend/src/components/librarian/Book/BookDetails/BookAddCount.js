import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from '../../../../Axios'
import Swal from 'sweetalert2'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import style from './BookAddCount.module.scss'
import { toast } from 'react-toastify';

const BookAddCount = () => {
   let { id } = useParams();
   const navigate = useNavigate()
   const [bookInfo, setBookInfo] = useState({
      'book_name': '',
      'book_category': '',
   })
   const [language, setLanguage] = useState([])
   const [publisher, setPublisher] = useState([])
   const [bookcount, setBookCount] = useState({
      'book': '',
      'language': '',
      'publisher': '',
      'publishing_year': '',
      'isbn': '',
      'stock_no': '',
      'price': '',

   })
   const handleOnChange = (e) => {
      setBookCount({ ...bookcount, [e.target.name]: e.target.value })
   }
   const handleSubmit = async (e) => {
      e.preventDefault()
      console.log(bookcount)
      try {
         const access_token = JSON.parse(localStorage.getItem('access'))
         const res = await axios.post('book_variant/', bookcount,
            {
               headers: {
                  "Authorization": `Bearer ${access_token}`
               }
            })
         console.log(res.data)
         if (res.status === 201) {
            Swal.fire({
               icon: 'success',
               title: 'Success!',
               text: 'Added successfully!',
               showConfirmButton: false,
               timer: 1200
            })
            navigate(`/library/books/${id}`)
         }
      } catch (error) {
         console.log(error.response.data)
         if (error.response.data){
            toast.warning(error.response.data.stock_no[0])
         }
      }
   }
   useEffect(() => {
      const fetchBook = async () => {
         try {
            const access_token = JSON.parse(localStorage.getItem('access'));
            const res = await axios.get(`book/${id}/`,
               {
                  headers: {
                     Authorization: `Bearer ${access_token}`
                  }
               })
            setBookInfo({
               'book_name': res.data.title,
               'book_category': res.data.category.category_name,
            })
            setBookCount({ ...bookcount, 'book': res.data.id })
         } catch (error) {
            console.log(error.response.data)
         }
      }
      const fetchLanguage = async () => {
         try {
            const access_token = JSON.parse(localStorage.getItem('access'));
            const res = await axios.get(`language/`,
               {
                  headers: {
                     Authorization: `Bearer ${access_token}`
                  }
               })
            setLanguage(res.data)
         } catch (error) {
            console.log(error.response.data)
         }
      }
      const fetchPublisher = async () => {
         try {
            const access_token = JSON.parse(localStorage.getItem('access'));
            const res = await axios.get(`publisher/`,
               {
                  headers: {
                     Authorization: `Bearer ${access_token}`
                  }
               })
            setPublisher(res.data)
         } catch (error) {
            console.log(error.response.data)
         }
      }
      fetchBook()
      fetchLanguage()
      fetchPublisher()
   }, [])

   const breadcrumbs = [
      <Link underline="hover" key="1" color="inherit" to="/library/dashboard" style={{}}>
         Dashboard
      </Link>,
      <Link underline="hover" key="1" color="inherit" to="/library/books" style={{}}>
         Books
      </Link>,
      <Link underline="hover" key="1" color="inherit" to={`/library/books/${id}`} style={{}}>
         {bookInfo.book_name}
      </Link>,
      <Typography key="3" color="text.primary">
         Add new count
      </Typography>,
   ];
   return (
      <>
         <form action="" className={style.form} onSubmit={handleSubmit}>
            <div className={style.header}>
               <div className={style.title}>
                  <h3>Add Book</h3>
                  <Stack spacing={2}>
                     <Breadcrumbs separator={<ArrowRightIcon />} aria-label="breadcrumb">
                        {breadcrumbs}
                     </Breadcrumbs>
                  </Stack>
               </div>
               <div>
                  <Link className={style.link} to={`/library/books/${id}/`}><button>Cancel</button></Link>
                  <button type="submit">Save</button>
               </div>
            </div>
            <div className={style.main_body}>
               <div></div>
               <div className={style.body}>
                  <div className={style.details}>
                     <p>General Information</p>
                     <div>
                        <label className='label mt-2' htmlFor="">Book Name </label>
                        <input className='form-control mt-1' type="text" value={bookInfo.book_name} readOnly />
                     </div>
                     <div>
                        <label className='label mt-2' htmlFor="">category </label>
                        <input className='form-control mt-1' type="text" value={bookInfo.book_category} readOnly />
                     </div>
                     <div>
                        <label className='label mt-2' htmlFor="">ISBN </label>
                        <input className='form-control mt-1' type="text" placeholder='Type book ISBN here. . .'
                           value={bookcount.isbn} name='isbn' onChange={handleOnChange} />
                     </div>
                     <div>
                        <label className='label mt-2' htmlFor="">stock number </label>
                        <input className='form-control mt-1' type="text" placeholder='Type book stock number here. . .'
                           value={bookcount.stock_no} name='stock_no' onChange={handleOnChange} />
                     </div>

                  </div>
                  <div className={style.details}>
                     <p>Publisher</p>
                     <div >
                        <div >
                           <select className='form-select' name="publisher" onChange={handleOnChange}>
                              <option value={bookcount.publisher}>select</option>
                              {publisher.map((pub) => {
                                 return (
                                    <option key={pub.id} value={pub.id}>{pub.publisher_name}</option>
                                 )
                              })}
                           </select>
                        </div>
                        <div>
                           <label className='label mt-2' htmlFor="">Date </label>
                           <input className='form-control mt-1' type="date"
                              value={bookcount.publishing_year} name='publishing_year' onChange={handleOnChange} />
                        </div>
                     </div>
                  </div>
                  <div className={style.details}>
                     <p>Price</p>
                     <div >
                        <div>
                           <label className='label mt-2' htmlFor="">price </label>
                           <input className='form-control mt-1' type="number"
                              value={bookcount.price} name='price' onChange={handleOnChange} />
                        </div>
                     </div>
                  </div>
               </div>
               <div className={style.category}>
                  <p>Language</p>
                  <div >
                     <select className='form-select' name="language" onChange={handleOnChange}>
                        <option value={bookcount.language}>select</option>
                        {language.map((lang) => {
                           return (
                              <option key={lang.id} value={lang.id}>{lang.language}</option>
                           )
                        })}
                     </select>
                  </div>
               </div>
            </div>
         </form>
      </>
   )
}

export default BookAddCount