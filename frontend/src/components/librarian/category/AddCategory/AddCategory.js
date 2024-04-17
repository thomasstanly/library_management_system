import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import axios from '../../../../Axios'
import style from './AddCategory.module.scss'

const AddCategory = () => {
   const [formData, setFormData] = useState({
      'category_name': '',
      'category_code': ''
   })
   const navigate = useNavigate()
   const hadleOnChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })

   }

   const handleFormSubmit = async (e) => {
      e.preventDefault()
      try {
         const access_token = JSON.parse(localStorage.getItem('access'))
         const res = await axios.post('category/', formData,
            {
               headers: {
                  Authorization: `Bearer ${access_token}`
               }
            })
         console.log(res)
         if (res.status === 201) {
            Swal.fire({
               position: "center",
               icon: "success",
               title: ` category ${formData.category_name} Created`,
               showConfirmButton: false,
               timer: 1200
            }).then(() => {
               setFormData({
                  'category_name': '',
                  'category_code': ''
               });
               navigate('/library/category')
            })
         }

      } catch (error) {
         if (error.response.status === 400) {
            console.log(error.response.data)
            if (error.response.data.category_name?.[0] && error.response.data.category_code?.[0]) {
               toast.warning(error.response.data.category_name[0])
               toast.warning(error.response.data.category_code[0])
            } else if (error.response.data.category_name?.[0]) {
               toast.warning(error.response.data.category_name[0])
            } else if (error.response.data.category_code?.[0]) {
               toast.warning(error.response.data.category_code[0])
            }
         }
         else {
            console.log(error);
         }
      }
   }


   const breadcrumbs = [
      <Link underline="hover" key="1" color="inherit" to="/library/dashboard" style={{}}>
         Dashboard
      </Link>,
      <Link underline="hover" key="1" color="inherit" to="/library/category" style={{}}>
         Category
      </Link>,
      <Typography key="3" color="text.primary">
         Add Category
      </Typography>,
   ];

   return (
      <>
         <form action="" className={style.form} onSubmit={handleFormSubmit}>
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
                  <Link className={style.link} to='/library/category'><button>Cancel</button></Link>
                  <button type="submit">Save</button>
               </div>
            </div>
            <div className={style.body}>
               <div>
               </div>
               <div className={style.details}>
                  <p>General Information</p>
                  <div>
                     <label className='label mt-2' htmlFor="">Category Name </label>
                     <input className='form-control mt-1' type="text" placeholder='Type category name here. . .'
                        name='category_name' value={formData.category_name} onChange={hadleOnChange} />
                  </div>
                  <div>
                     <label className='label mt-4 mt-1' htmlFor="">Category CODE </label>
                     <input className='form-control' type="text" placeholder='Type category code here. . .'
                        name='category_code' value={formData.category_code} onChange={hadleOnChange} />
                  </div>
               </div>
            </div>
         </form>
      </>

   )
}

export default AddCategory