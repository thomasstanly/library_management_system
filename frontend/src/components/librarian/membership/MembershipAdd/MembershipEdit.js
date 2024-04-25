import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import axios from '../../../../Axios'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import style from './MembershipAdd.module.scss'

const breadcrumbs = [
   <Link underline="hover" key="1" color="inherit" to="/library/dashboard">
      Dashboard
   </Link>,
   <Link underline="hover" key="1" color="inherit" to="/library/membership">
      Membership
   </Link>,
   <Typography key="3" color="text.primary">
      Edit Membership Plan
   </Typography>,
];

const MembershipEdit = () => {

   const { id } = useParams()
   const [plan, setPlan] = useState({
      "plan_name": "",
      "plan_code": "",
      "no_books": "",
      "return_period": "",
      "plan_rate": "",
   })

   const navigate = useNavigate()

   const handleOnchange = (e) => {
      setPlan({ ...plan, [e.target.name]: e.target.value })
   }
   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         const access_token = JSON.parse(localStorage.getItem("access"))
         const res = await axios.put(`membership/${id}/`, plan,
            {
               headers: {
                  Authorization: `Bearer ${access_token}`
               }
            })
         console.log(res.data)
         if (res.status === 200) {
            Swal.fire({
               position: "center",
               icon: "success",
               title: `category ${res.data.plan_code} updated`,
               showConfirmButton: false,
               timer: 1200
            })
            navigate("/library/membership")
         }
      } catch (error) {
         console.log(error.response)
         if (error.response) {
            const responseData = error.response.data;
            if (responseData.plan_name) {
               toast.warning(responseData.plan_name[0]);
            }
            if (responseData.plan_code) {
               toast.warning(responseData.plan_code[0]);
            }
            if (responseData.no_books) {
               toast.warning(responseData.no_books[0]);
            }
            if (responseData.return_period) {
               toast.warning(responseData.return_period[0]);
            }
         } else {
            console.error("Request failed:", error.message);
         }
      }
   }

   const fetch = async () => {
      try {
         const access_token = JSON.parse(localStorage.getItem("access"))
         const res = await axios.get(`membership/${id}/`,
            {
               headers: {
                  Authorization: `Bearer ${access_token}`
               }
            })
         console.log(res.data)
         setPlan({
            "plan_name": res.data.plan_name,
            "plan_code": res.data.plan_code,
            "no_books": res.data.no_books,
            "return_period": res.data.return_period,
            "plan_rate": res.data.plan_rate,
         })
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      fetch()
   }, [])

   return (
      <form className={style.form} onSubmit={handleSubmit}>
         <div className={style.header}>
            <div className={style.title}>
               <h3>Edit plan</h3>
               <Stack spacing={2}>
                  <Breadcrumbs separator={<ArrowRightIcon />} aria-label="breadcrumb">
                     {breadcrumbs}
                  </Breadcrumbs>
               </Stack>
            </div>
            <div>
               <Link className={style.link} to='/library/membership'><button>Cancel</button></Link>
               <button type="submit">Save</button>
            </div>
         </div>
         <div className={style.main_body}>
            <div></div>
            <div className={style.body}>
               <div className={style.details}>
                  <p>General Information</p>
                  <div>
                     <label className='label mt-2' htmlFor="">plan Name </label>
                     <input className='form-control mt-1' type="text" placeholder='Type plan name here. . .'
                        value={plan.plan_name} name='plan_name' onChange={handleOnchange} />
                  </div>
                  <div>
                     <label className='label mt-2' htmlFor="">Plan code </label>
                     <input className='form-control mt-1' type="text" placeholder='Type plan name here. . .'
                        value={plan.plan_code} name='plan_code' onChange={handleOnchange} />
                  </div>
                  <div>
                     <label className='label mt-2' htmlFor="">No of books</label>
                     <input className='form-control mt-1' type="number" min={1} placeholder='Type plan genre here. . .'
                        value={plan.no_books} name='no_books' onChange={handleOnchange} />
                  </div>
                  <div>
                     <label className='label mt-2' htmlFor="">Return period</label>
                     <input className='form-control mt-1' type="number" placeholder='Type plan genre here. . .'
                        value={plan.return_period} name='return_period' onChange={handleOnchange} />
                  </div>
                  <div>
                     <label className='label mt-2' htmlFor="">Plan rate</label>
                     <input className='form-control mt-1' type="number" min={1} placeholder='Type plan genre here. . .'
                        value={plan.plan_rate} name='plan_rate' onChange={handleOnchange} />
                  </div>
               </div>
            </div>
         </div>
      </form>

   )
}

export default MembershipEdit