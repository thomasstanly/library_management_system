import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from '../../../../Axios'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import style from './AddBook.module.scss'

const EditBook = () => {
   const { id } = useParams()
   const [authors, setAuthors] = useState([{ firstname: '', lastname: '' }]);
   const navigate = useNavigate()
   const [book, setBook] = useState({
      'title': '',
      'call_number': '',
      'genre': '',
      'description': '',
      'category': '',
      'cover': null,
   })
   const [cover, setCover] = useState('')
   const [categories, setCategories] = useState([])
   const inputRef = useRef(null)


   const addAuthor = () => {
      setAuthors([...authors, { firstname: '', lastname: '' }]);
   };
   const handleAuthorChange = (index, e) => {
      const updateAuthor = [...authors]
      updateAuthor[index] = { ...updateAuthor[index], [e.target.name]: e.target.value }
      setAuthors(updateAuthor)
   }
   const removeAuthor = (index) => {
      const updatedAuthors = [...authors];
      updatedAuthors.splice(index, 1);
      setAuthors(updatedAuthors);
   };

   const handleImageClick = () => {
      inputRef.current.click()
   }
   const handleImageChange = (event) => {
      console.log(cover)
      setCover(event.target.files[0])
   }

   const handleOnchange = (e) => {
      setBook({ ...book, [e.target.name]: e.target.value })

   }


   const handleSubmit = async (event) => {
      event.preventDefault();
      if (!book.title || !book.call_number || authors.length === 0) {
         alert("Please fill out all fields")
         return false;
      }
      for (let i = 0; i < authors.length; i++) {
         if (!authors[i].firstname) {
            alert(`Author ${i + 1} must have a first and last name`)
            return false
         }
      }
      console.log(cover)
      // let formData = new FormData();
      // formData.append('title', book.title);
      // formData.append('call_number', book.call_number);
      // formData.append('category', book.category);
      // formData.append('genre', book.genre);
      // formData.append('description', book.description);
      // cover ? formData.append('cover', cover) : formData.append('cover', book.cover)
      // formData.append('authors', JSON.stringify(authors))
      let formData = {
         'title': book.title,
         'call_number': book.call_number,
         'category': book.category,
         'genre': book.genre,
         'description': book.description,
         'cover': cover,
         'authors': JSON.stringify(authors),
      };


      try {
         const access_token = JSON.parse(localStorage.getItem('access'))
         const res = await axios.put(`book/${id}/`, formData,
            {
               headers: {
                  'Authorization': `Bearer ${access_token}`,
                  'Content-Type': 'multipart/form-data'
               }
            })
         console.log(res)
         if (res.status === 200) {
            Swal.fire({
               position: "center",
               icon: "success",
               title: ` Book ${formData.title} updated`,
               showConfirmButton: false,
               timer: 1200
            })
         }
         navigate('/library/books')
      } catch (err) {
         console.log(err.response)
      }
   }

   useEffect(() => {
      const fetchData = async () => {
         try {
            const access_token = JSON.parse(localStorage.getItem('access'));
            const res = await axios.get(`book/${id}/`, {
               headers: {
                  Authorization: `Bearer ${access_token}`,
               },
            });
            const fetchedBook = res.data;
            setBook({
               title: fetchedBook.title,
               call_number: fetchedBook.call_number,
               genre: fetchedBook.genre,
               description: fetchedBook.description,
               category: fetchedBook.category ? fetchedBook.category.category_name : 'Select',
               cover: fetchedBook.cover,
            });
            console.log(res.data)
            setAuthors(fetchedBook.author);
         } catch (error) {
            console.log(error.response);
         }
      };

      const fetchCategories = async () => {
         try {
            const access_token = JSON.parse(localStorage.getItem('access'));
            const res = await axios.get('category/', {
               headers: {
                  Authorization: `Bearer ${access_token}`,
               },
            });
            console.log(res.data)
            setCategories(res.data);
         } catch (error) {
            console.log(error.response);
         }
      };

      fetchData();
      fetchCategories();
   }, [id]);

   const breadcrumbs = [
      <Link underline="hover" key="1" color="inherit" tp="/library/dashboard" style={{}}>
         Dashboard
      </Link>,
      <Link underline="hover" key="1" color="inherit" to="/library/books" style={{}}>
         books
      </Link>,
      <Typography key="3" color="text.primary">
         Edit Book
      </Typography>,
   ];

   return (
      <>
         <form action="" className={style.form} onSubmit={handleSubmit}>
            <div className={style.header}>
               <div className={style.title}>
                  <h3>Edit Book</h3>
                  <Stack spacing={2}>
                     <Breadcrumbs separator={<ArrowRightIcon />} aria-label="breadcrumb">
                        {breadcrumbs}
                     </Breadcrumbs>
                  </Stack>
               </div>
               <div>
                  <Link className={style.link} to='/library/books'><button>Cancel</button></Link>
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
                        <input className='form-control mt-1' type="text" placeholder='Type book name here. . .'
                           value={book.title} name='title' onChange={handleOnchange} />
                     </div>
                     {
                        authors.map((author, index) => (
                           <div className={style.author} key={index}>
                              <div style={{ width: '22vw' }}>
                                 <label className='label mt-4 mt-1' htmlFor="">Author Firstname  </label>
                                 <input className='form-control' type="text" placeholder='Type firstname here. . .'
                                    name='firstname' value={author.firstname} onChange={(e) => handleAuthorChange(index, e)} />
                              </div>
                              <div style={{ width: '22vw' }}>
                                 <label className='label mt-4 mt-1' htmlFor="">Author Lastname </label>
                                 <input className='form-control' type="text" placeholder='Type lastname here. . .'
                                    name='lastname' value={author.lastname} onChange={(e) => handleAuthorChange(index, e)} />
                              </div>

                              {authors.length - 1 === index && authors.length < 6 &&
                                 (<div className='mt-5' >
                                    <button onClick={addAuthor} type='button'>
                                       <AddCircleOutlineIcon style={{ color: '#8B8E99' }} />
                                    </button>
                                 </div>)
                              }

                              {authors.length > 1 &&
                                 (<div className='mt-5' >
                                    <button onClick={() => removeAuthor(index)} type='button'>
                                       <DoDisturbOnIcon style={{ color: '#8B8E99' }} />
                                    </button>
                                 </div>)
                              }

                           </div>
                        ))
                     }
                     <div>
                        <label className='label mt-2' htmlFor="">Call number </label>
                        <input className='form-control mt-1' type="text" placeholder='Type book name here. . .'
                           value={book.call_number} name='call_number' onChange={handleOnchange} />
                     </div>
                     <div>
                        <label className='label mt-2' htmlFor="">Genre </label>
                        <input className='form-control mt-1' type="text" placeholder='Type book genre here. . .'
                           value={book.genre} name='genre' onChange={handleOnchange} />
                     </div>
                     <div>
                        <label className='label mt-2' htmlFor="">Description </label>
                        <textarea className='form-control mt-1' type="text" placeholder='Type book name here. . .'
                           value={book.description} name='description' onChange={handleOnchange} />
                     </div>
                  </div>
                  <div className={style.details}>
                     <p>Media</p>
                     <div className={style.media} onClick={handleImageClick}>
                        {cover ? <img src={URL.createObjectURL(cover)} alt="" style={{ width: '125px', marginTop: '10px' }} /> :
                           book.cover ? <img src={`http://127.0.0.1:8000${book.cover}`} alt="" style={{ width: '125px', marginTop: '10px' }} /> : <img src="/images/dummy.png" alt="" />}
                        {!cover && <p>add image here</p>}
                        <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                        <span className='btn btn-secondary mt-2 mb-3'>Upload Image</span>
                     </div>
                  </div>
               </div>
               <div className={style.category}>
                  <p>Category</p>
                  <div >
                     <select className='form-select' name="category" onChange={handleOnchange}>
                        <option value={book.category}>{book.category}</option>
                        {categories.map((category) => (
                           <option key={category.id} value={category.category_name}>{category.category_name}</option>
                        ))}
                     </select>
                  </div>
               </div>
            </div>
         </form>
      </>

   )
}

export default EditBook