import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from '../../../Axios'



const PatronSignUp = () => {

   const [Show1, setShow1] = useState(false)
   const [Show2, setShow2] = useState(false)

   const toggle = (value) => {
      if (value === 1) {
         setShow1(prevState => !prevState);
      }
      else {
         setShow2(prevState => !prevState);
      }

   }
   const [formdata, setFormdata] = useState({
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      password2: "",
      phone_number: ""
   })

   const [otp, setOtp] = useState({
      otpvalue: '',
      email: '',
      status: false,
      expiryTime: null
   })
   const navigate = useNavigate()


   const handleOnchange = (e) => {
      setFormdata({ ...formdata, [e.target.name]: e.target.value })
   }
   const phoneNumberString = formdata.phone_number.toString();
   const handleSubmit = async (e) => {
      e.preventDefault()

      if (!formdata.email.trim() || !formdata.first_name.trim() || !formdata.last_name.trim()) {
         return toast.success('all fields are required')

      }
      else if (!formdata.first_name.trim().match(/^[A-Za-z]+$/)) {
         return toast.warning('First name can only contain letters')
      } 
      else if (!formdata.last_name.trim().match(/^[A-Za-z]+$/)) {
         return toast.warning('Last name can only contain letters')
      } 
      else if (!formdata.password.trim() || !formdata.password2.trim()) {
         return toast.warning('password required')
      } 
      else if (formdata.password !== formdata.password2) {
         return toast.warning('password not matching')
      } 
      else if (formdata.password.length < 6) {
         console.log(formdata.password.length)
         return toast.warning('password min length 6')
      } 
      else if (!formdata.email.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
         return toast.error("Invalid email format.");
      } 
      else if (phoneNumberString.length !== 10 || !phoneNumberString.match(/^\d+$/) ||  /^(.)\1{9}$/.test(phoneNumberString)) {
         return toast.error("Phone number should be exactly 10 digits.");
      } 
      else {
         try {
            toast.warn("please wait for the otp")
            const res = await axios.post("signup/", formdata, { withCredentials: true })

            if (res.status === 200) {
               setOtp({ ...otp, status: true, email: res.data.email, expiryTime: res.data.exiry })
               console.log(otp)
               console.log(res.data)
               toast.warning(res.data.message)

            }
         } catch (error) {
            if (error.response.status === 400) {
               console.log(error.response.data)
               if (error.response.data.email?.[0] && error.response.data.phone_number?.[0]) {
                  toast.warning(error.response.data.email[0])
                  toast.warning(error.response.data.phone_number[0])
               } else if (error.response.data.email?.[0] && error.response.data.non_field_errors?.[0]) {
                  toast.warning(error.response.data.email[0])
                  toast.warning(error.response.data.non_field_error[0])
               } else if (error.response.data.email?.[0]) {
                  toast.warning(error.response.data.email[0])
               } else if (error.response.data.phone_number?.[0]) {
                  toast.warning(error.response.data.phone_number[0])
               } else {
                  toast.warning(error.response.data.non_field_errors[0])
               }

            }
            else {
               console.log(error);

            }
         }
      }

   }

   const otpVerfication = async (e) => {

      e.preventDefault()
      console.log(otp)
      try {
         const res = await axios.post("otp/", otp, { withCredentials: true })

         if (res.status === 201) {
            setOtp({ ...otp, status: false })
            console.log(res.data.message)
            toast.success(res.data.message)
            setFormdata({
               email: "",
               first_name: "",
               last_name: "",
               password: "",
               password2: "",
               phone_number: ""
            })
            navigate('/login')

         }
      } catch (error) {
         console.log(error.response.data.message)
         toast.error(error.response.data.message)
      }
   }

   const handleResend = async () => {
      try {
         const res = await axios.put("otp/", { email: otp.email }, { withCredentials: true })
         if (res.status === 200) {
            setOtp({ ...otp, expiryTime: res.data.exiry })
            toast.success(res.data.message)
         }
      } catch (error) {
         toast.error(error.response.data.message)
      }
   }

   return (
      <div>
         <div className='Container'>
            <div className='row'>
               <span>Register</span>
               <form action="" onSubmit={handleSubmit}>
                  <div className='email'>
                     <label className='label' htmlFor="">Email</label>
                     <input className='form-control' type="email" value={formdata.email} name='email' onChange={handleOnchange} />
                  </div>
                  <div>
                     <label className='label' htmlFor="">First Name</label>
                     <input className='form-control' type="text" value={formdata.first_name} name='first_name' onChange={handleOnchange} />
                  </div>
                  <div>
                     <label className='label' htmlFor="">Last Name</label>
                     <input className='form-control' type="text" value={formdata.last_name} name='last_name' onChange={handleOnchange} />
                  </div>
                  <div>
                     <label className='label' htmlFor="">Phone Number</label>
                     <input className='form-control' type="number" value={formdata.phone_number} name='phone_number' onChange={handleOnchange} />
                  </div>
                  <div>
                     <label className='label' htmlFor="">Password</label>
                     <input className='form-control' type={Show1 ? "text" : "password"} value={formdata.password} name='password' onChange={handleOnchange} />
                     {Show1 ? <FaEye className='eye' onClick={() => toggle(1)} /> : <FaEyeSlash className='eye' onClick={() => toggle(1)} />}
                  </div>
                  <div>
                     <label className='label' htmlFor="">Confirm Password</label>
                     <input className='form-control' type={Show2 ? "text" : "password"} value={formdata.password2} name='password2' onChange={handleOnchange} />
                     {Show2 ? <FaEye className='eye' onClick={() => toggle(2)} /> : <FaEyeSlash className='eye' onClick={() => toggle(2)} />}
                  </div>
                  <div>
                     <button className='form-control' type='submit'>SignUp</button>
                  </div>

               </form>
               {
                  otp.status && <form action="" onSubmit={otpVerfication}>
                     <div className='d-flex justify-content-between'>
                        <input className='form-control w-50' type="number" name='phone_number' onChange={(e) => setOtp({ ...otp, otpvalue: e.target.value })} />
                        <button className='btn' type='submit' >verify</button>
                     </div>
                     <div>
                        <p style={{ cursor: 'pointer' }} onClick={handleResend}>resent</p>
                     </div>
                  </form>
               }
               <div>
                  <p onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>Already have an account? login</p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PatronSignUp