import React, { useState, useRef } from 'react'

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import style from './AddBook.module.scss'

const AddBook = () => {
   const [authors, setAuthors] = useState([{ firstname: '', lastname: '' }]);
   const [cover, setCover] = useState("")
   const inputRef = useRef(null)


   const addAuthor = () => {
      setAuthors([...authors, { firstname: '', lastname: '' }]);
   };

   const removeAuthor = (index) => {
      const updatedAuthors = [...authors];
      updatedAuthors.splice(index, 1);
      setAuthors(updatedAuthors);
   };

   const handleImageClick = () => {
      inputRef.current.click()
   }

   const handleImageChange = (event) => {
      setCover(event.target.files[0])
   }

   const breadcrumbs = [
      <Link underline="hover" key="1" color="inherit" tp="/library/dashboard" style={{}}>
         Dashboard
      </Link>,
      <Link underline="hover" key="1" color="inherit" to="/library/books" style={{}}>
         books
      </Link>,
      <Typography key="3" color="text.primary">
         Add Book
      </Typography>,
   ];

   return (
      <>
         <form action="" className={style.form}>
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
                  <Link className={style.link} to=''><button>Cancel</button></Link>
                  <Link className={style.link} to=''><button type="submit">Save</button></Link>
               </div>
            </div>
            <div className={style.main_body}>
               <div></div>
               <div className={style.body}>
                  <div className={style.details}>
                     <p>General Information</p>
                     <div>
                        <label className='label mt-2' htmlFor="">Book Name </label>
                        <input className='form-control mt-1' type="text" placeholder='Type book name here. . .' />
                     </div>
                     {
                        authors.map((author, index) => (
                           <div className={style.author}>
                              <div style={{ width: '22vw' }}>
                                 <label className='label mt-4 mt-1' htmlFor="">Author Firstname  </label>
                                 <input className='form-control' type="text" placeholder='Type firstname here. . .' />
                              </div>
                              <div style={{ width: '22vw' }}>
                                 <label className='label mt-4 mt-1' htmlFor="">Author Lastname </label>
                                 <input className='form-control' type="text" placeholder='Type lastname here. . .' />
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
                        <input className='form-control mt-1' type="text" placeholder='Type book name here. . .' />
                     </div>
                     <div>
                        <label className='label mt-2' htmlFor="">Call number </label>
                        <textarea className='form-control mt-1' type="text" placeholder='Type book name here. . .' />
                     </div>
                  </div>
                  <div className={style.details}>
                     <p>Media</p>
                     <div className={style.media} onClick={handleImageClick}>
                        {cover ? <img src={URL.createObjectURL(cover)} alt="" style={{ width: '125px', marginTop: '10px' }} /> : <img src="/images/dummy.png" alt="" />}
                        {!cover && <p>add image here</p>}
                        <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                        <span className='btn btn-secondary mt-2 mb-3'>Upload Image</span>
                     </div>
                  </div>
               </div>
               <div className={style.category}>
               <p>Category</p>
                  <div >
                     <label className='label mt-2' htmlFor="">Call number </label>
                     <input className='form-control mt-1' type="" placeholder='Type book name here. . .' />
                  </div>
               </div>
            </div>
         </form>
      </>

   )
}

export default AddBook