import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from '../../../Axios'
import './PatronMobileHeader.scss'

const PatronMobileHeader = ({header}) => {

   const { name, isAuthenticated } = useSelector((state) => state.Auth_store)
   const profile_pic = header.profile_pic
   const plan = header.plan
   const url = `http://127.0.0.1:8000${profile_pic}`
   console.log('mobile header', name,profile_pic,plan)
   const [showForm, setShowForm] = useState(false);
   const navigate = useNavigate()

   const toggleForm = () => {
      setShowForm(!showForm);
   };
   const logout = async () => {
      const refresh_token = JSON.parse(localStorage.getItem('refresh'))
      const token = JSON.parse(localStorage.getItem('access'))
  
      try {
        console.log(token)
        const res = await axios.post('logout/', { refresh_token: refresh_token }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        console.log(res.status)
        localStorage.clear();
        axios.defaults.headers.common['Authorization'] = null;
        window.location.href = '/'
      } catch (e) {
        console.log('logout not working', e)
      }
    }
  
   return (
      <>
         <div className='header'>
            <div className='left'>
               {isAuthenticated ? <div className="dropdown" style={{ marginLeft:'10px'}}>
                  <button className='profile dropdown-toggle' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                     <img className='profile' src={(profile_pic ? url : null) || "/images/user.png"} alt="netflix logo" />
                  </button>
                  <ul className="dropdown-menu" >
                     <li><a className="dropdown-item" href='/profile'>profile</a></li>
                     <li><a className="dropdown-item" href="#" onClick={logout}>logout</a></li>
                  </ul>
               </div> :
                  <img className='profile' src="/images/user.png" alt="netflix logo" />}
               {isAuthenticated  ? plan ? '' :<button className='btn btn-primary' style={{ marginLeft: '20px' }} onClick={()=>{navigate('/plan')}}>Buy Plan</button> :
                  <p onClick={() => { navigate('/login') }} style={{ cursor: 'pointer',marginLeft:'20px'}}>Login</p>}
            </div>
            <div className='right'>
               <img className='menu' src="/images/menu.png" alt="netflix logo" onClick={toggleForm} />
            </div>
         </div>
         {showForm &&
            (
               <div className='drop'>
                  <form action="">
                     <input type="text" placeholder='Search for book, author' style={{
                        backgroundImage: `url(${'/images/search.png'})`,
                        backgroundSize: 'contain', backgroundRepeat: 'no-repeat'
                     }} />
                     <button type='submit'>Submit</button>
                  </form>
               </div>
            )
         }
      </>
   )
}

export default PatronMobileHeader