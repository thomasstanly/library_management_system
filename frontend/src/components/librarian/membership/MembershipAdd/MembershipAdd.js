import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import axios from '../../../../Axios'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import style from './MembershipAdd.module.scss'

const breadcrumbs = [
   <Link underline="hover" key="1" color="inherit" to="/library/dashboard" style={{}}>
      Dashboard
   </Link>,
   <Link underline="hover" key="1" color="inherit" to="/library/membership" style={{}}>
      Membership
   </Link>,
   <Typography key="3" color="text.primary">
      Add Membership Plan
   </Typography>,
];

const MembershipAdd = () => {
   const [plan, setPlan] = useState({
      plan_name: '',
      plan_code: '',
      no_books: '',
      return_period: '',
      plan_rate: '',
      fine_amount:''
   })

   const navigate = useNavigate()

   const handleOnchange = async (e) => {
      setPlan({ ...plan, [e.target.name]: e.target.value })
   }
   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         const access_token = JSON.parse(localStorage.getItem("access"))
         const res = await axios.post('membership/', plan,
            {
               headers: {
                  Authorization: `Bearer ${access_token}`
               }
            })
            console.log(res.data)
            Swal.fire({
               position: "center",
               icon: "success",
               title: ` category ${res.data.plan_code} Created`,
               showConfirmButton: false,
               timer: 1200
            }).then(()=>{
               navigate('/library/membership')
            })
      } catch (error) {
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
            console.error(error);
         }
      }
   }

   return (
      <form action="" className={style.form} onSubmit={handleSubmit}>
         <div className={style.header}>
            <div className={style.title}>
               <h3>Add plan</h3>
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
                     <input className='form-control mt-1' type="number" min={1} placeholder='Type No of books here. . .'
                        value={plan.no_books} name='no_books' onChange={handleOnchange} />
                  </div>
                  <div>
                     <label className='label mt-2' htmlFor="">Return period</label>
                     <input className='form-control mt-1' type="number" placeholder='Type Return period here. . .'
                        value={plan.return_period} name='return_period' onChange={handleOnchange} />
                  </div>
                  <div>
                     <label className='label mt-2' htmlFor="">Plan rate</label>
                     <input className='form-control mt-1' type="number" min={1} placeholder='Type Plan rate here. . .'
                        value={plan.plan_rate} name='plan_rate' onChange={handleOnchange} />
                  </div>
                  <div>
                     <label className='label mt-2' htmlFor="">Fine amount</label>
                     <input className='form-control mt-1' type="number" min={1} placeholder='Type Fine amount here. . .'
                        value={plan.fine_amount} name='fine_amount' onChange={handleOnchange} />
                  </div>
               </div>
            </div>
         </div>
      </form>

   )
}

export default MembershipAdd