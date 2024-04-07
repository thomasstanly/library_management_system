import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './PatronMobileHeader.scss'

const PatronMobileHeader = () => {

   const { isAuthenticated } = useSelector((state) => state.Auth_store)
   const [showForm, setShowForm] = useState(false);
   const navigate = useNavigate()

   const toggleForm = () => {
      setShowForm(!showForm);
   };
   return (
      <>
         <div className='header'>
            <div className='left'>
               {isAuthenticated ? <div class="dropdown" style={{ marginLeft:'10px'}}>
                  <button className='profile dropdown-toggle' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                     <img className='profile' src="/images/user.png" alt="netflix logo" />
                  </button>
                  <ul class="dropdown-menu" >
                     <li><a class="dropdown-item" href="#">profile</a></li>
                     <li><a class="dropdown-item" href="#">logout</a></li>
                  </ul>
               </div> :
                  <img className='profile' src="/images/user.png" alt="netflix logo" />}
               {isAuthenticated ? <button className='btn btn-primary'style={{ marginLeft:'20px'}}>Buy Plan</button> :
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