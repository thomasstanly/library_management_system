import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import axios from '../../../../Axios'
import style from './AddPublisher.module.scss'

const EditPublisher = () => {
   const { id } = useParams();
   const [publisherData, setPublisherData] = useState({
      'publisher_name': '',
      'publisher_place': ''
   })
   const navigate = useNavigate()

   const hadleOnChange = (e) => {
      setPublisherData({ ...publisherData, [e.target.name]: e.target.value })
   }

   const hadleOnSubmit = async (e) => {
      e.preventDefault()
      try {
         const access_token = JSON.parse(localStorage.getItem('access'))
         const res = await axios.put(`publisher_edit/${id}/`, publisherData,
            {
               headers: {
                  Authorization: `Bearer ${access_token}`
               }
            })
         console.log()
         if (res.status === 200) {
            Swal.fire({
               icon: 'success',
               title: 'Success!',
               text: `Publisher ${publisherData.publisher_name} updated`,
               showConfirmButton: false,
               timer: 1200
            })
            navigate('/library/publisher')
         }
      } catch (error) {
         if (error.response.data.publisher_name?.[0] && error.response.data.publisher_place?.[0]) {
            toast.warning(error.response.data.publisher_name[0])
            toast.warning(error.response.data.publisher_place[0])
         } else if (error.response.data.publisher_name?.[0]) {
            toast.error(error.response.data.publisher_name[0])
         } else if (error.response.data.publisher_place?.[0]) {
            toast.error(error.response.data.publisher_place[0])
         } else {
            console.log(error)
         }
      }
   }


   const breadcrumbs = [
      <Link underline="hover" key="1" color="inherit" to="/library/dashboard" style={{}}>
         Dashboard
      </Link>,
      <Link underline="hover" key="1" color="inherit" to="/library/publisher" style={{}}>
         Publisher
      </Link>,
      <Typography key="3" color="text.primary">
         Add Publisher
      </Typography>,
   ];

   const fetch = async () => {
      try {
         const access_token = JSON.parse(localStorage.getItem('access'))
         const res = await axios.get(`publisher_edit/${id}/`, {
            headers: {
               Authorization: `Bearer ${access_token}`
            }
         })
         console.log(res);
         setPublisherData({
            'publisher_name': res.data.publisher_name,
            'publisher_place': res.data.publisher_place
         })
      } catch (error) {
         console.log(error.response)
      }
   }
   useEffect(() => {
      fetch()
   }, [])

   return (
      <>
         <form action="" className={style.form} onSubmit={hadleOnSubmit}>
            <div className={style.header}>
               <div>
               </div>
               <div className={style.title}>
                  <h3>Edit Publisher</h3>
                  <Stack spacing={2}>
                     <Breadcrumbs separator={<ArrowRightIcon />} aria-label="breadcrumb">
                        {breadcrumbs}
                     </Breadcrumbs>
                  </Stack>
               </div>
               <div>
                  <Link className={style.link} to='/library/publisher'><button>Cancel</button></Link>
                  <button type="submit">Save</button>
               </div>
            </div>
            <div className={style.body}>
               <div>
               </div>
               <div className={style.details}>
                  <p>General Information</p>
                  <div>
                     <label className='label mt-2' htmlFor="">Publisher Name </label>
                     <input className='form-control mt-1' type="text" placeholder='Type publisher name here. . .'
                        name='publisher_name' value={publisherData.publisher_name} onChange={hadleOnChange} />
                  </div>
                  <div>
                     <label className='label mt-2' htmlFor="">Publisher Code </label>
                     <input className='form-control mt-1' type="text" placeholder='Type publisher place here. . .'
                        name='publisher_place' value={publisherData.publisher_place} onChange={hadleOnChange} />
                  </div>
               </div>
            </div>
         </form>
      </>

   )
}

export default EditPublisher