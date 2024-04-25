import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import axios from '../../../../Axios';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import style from './AddLanguage.module.scss';

const EditLanguage = () => {
   const { id } = useParams()
   const [language, setLanguage] = useState('');
   const navigate = useNavigate();
   const hadleOnChange = (e) => {
      setLanguage(e.target.value)
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const access_token = JSON.parse(localStorage.getItem("access"))
         const res = await axios.put(`language_edit/${id}/`, { 'language': language },
            {
               headers: {
                  Authorization: `Bearer ${access_token}`
               }
            })
         if (res.status === 200) {
            setLanguage('')
            Swal.fire({
               position: "center",
               icon: "success",
               title: ` language ${language} upadted`,
               showConfirmButton: false,
               timer: 1200
            }).then(() => {
               setLanguage('')
               navigate('/library/language')
            })

         }
      } catch (error) {
         toast.warning(error.response.data.language[0])
      }
   };
   useEffect(() => {
      const fetch = async () => {
         try {
            const access_token = JSON.parse(localStorage.getItem('access'))
            const res = await axios.get(`language_edit/${id}/`, {
               headers: {
                  Authorization: `Bearer ${access_token}`
               }
            })
            console.log(res.data)
            setLanguage(res.data.language);
         } catch (error) {
            console.log(error)
         }
      }
      fetch()
   }, [])
   const breadcrumbs = [
      <Link underline="hover" key="1" color="inherit" to="/library/dashboard" style={{}}>
         Dashboard
      </Link>,
      <Link underline="hover" key="1" color="inherit" to="/library/language" style={{}}>
         Language
      </Link>,
      <Typography key="3" color="text.primary">
         Add Language
      </Typography>,
   ];

   return (
      <>
         <form action="" className={style.form} onSubmit={handleSubmit}>
            <div className={style.header}>
               <div>
               </div>
               <div className={style.title}>
                  <h3>Edit Language</h3>
                  <Stack spacing={2}>
                     <Breadcrumbs separator={<ArrowRightIcon />} aria-label="breadcrumb">
                        {breadcrumbs}
                     </Breadcrumbs>
                  </Stack>
               </div>
               <div>
                  <Link className={style.link} to='/library/language'><button>Cancel</button></Link>
                  <button type="submit">Save</button>
               </div>
            </div>
            <div className={style.body}>
               <div>
               </div>
               <div className={style.details}>
                  <p>General Information</p>
                  <div>
                     <label className='label mt-2' htmlFor="">Language </label>
                     <input className='form-control mt-1' type="text" placeholder='Type language here. . .'
                        name='language' value={language} onChange={hadleOnChange} />
                  </div>
               </div>
            </div>
         </form>
      </>

   )
}

export default EditLanguage