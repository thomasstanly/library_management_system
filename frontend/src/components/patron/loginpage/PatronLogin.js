import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {jwtDecode} from 'jwt-decode'
import {set_Authenticate} from '../../../Redux/Auth/LibrarySlice'
import axios from '../../../Axios'



const PatronLogin = () => {

   const [Show1, setShow1] = useState(false)

   const toggle = () => {
      setShow1(prevState => !prevState);

   }
   const [loginData, setLoginData] = useState({
      email: "",
      password: "",
   })

   const navigate = useNavigate()
   const dispatch = useDispatch()


   const handleOnchange = (e) => {
      setLoginData({ ...loginData, [e.target.name]: e.target.value })
   }

   const handleSubmit = async (e) => {
      e.preventDefault()

      if (!loginData.email || !loginData.password) {
         toast.error('All fields required')
      } else {
         try {
            const res = await axios.post("login/",  loginData)

            if (res.status === 200) {
               localStorage.setItem('user', JSON.stringify(res.data.email))
               localStorage.setItem('access', JSON.stringify(res.data.access_token))
               localStorage.setItem('refresh', JSON.stringify(res.data.refresh_token))
               console.log('acess',res.data.access_token)

               dispatch(
                  set_Authenticate({
                     first_name: jwtDecode(res.data.access_token).first_name,
                     isAuth: true,
                     isAdmin: res.data.isAdmin
                  })
               )
               navigate('/')
            }
         } catch (error) {
            console.log(error.response.data.detail)
            toast.warning(error.response.data.detail)
         }
      }

   }

   return (
      <>
         <div className='Container'>
            <div className='row'>
               <span>Login</span>
               <form action=""  onSubmit={handleSubmit}>
                  <div className='email'>
                     <label className='label' htmlFor="">Email</label>
                     <input className='form-control' type="text" name="email" value={loginData.email} onChange={handleOnchange} />
                  </div>
                  <div>
                     <label className='label' htmlFor="">Password</label>
                     <input id='form3Example4cdg' className='form-control' type={Show1 ? "text" : "password"} name="password" value={loginData.password} onChange={handleOnchange} />
                     {Show1 ? <FaEye className='eye' onClick={() => toggle()} /> : <FaEyeSlash className='eye' onClick={() => toggle()} />}
                  </div>
                  <div>
                     <button className='form-control' type='submit'>Login</button>
                  </div>
                  <div>
                     <p onClick={()=>navigate('/signup')} style={{ cursor: 'pointer' }}>Din't have an account? Sign up now</p>
                     <p onClick={()=>navigate('/library/')} style={{ cursor: 'pointer' }}>librarian login</p>
                  </div>
               </form>
            </div>
         </div>
      </>
   )
}

export default PatronLogin