import React, { useState } from 'react'
import './PatronMobileHeader.scss'

const PatronMobileHeader = () => {
   const [showForm, setShowForm] = useState(false);

   const toggleForm = () => {
      setShowForm(!showForm);
   };
   return (
      <>
         <div className='header'>
            <div className='left'>
               <img className='profile' src="/images/user.png" alt="netflix logo" />
               <p>Login</p>
            </div>
            <div className='right'>
               <img className='menu' src="/images/menu.png" alt="netflix logo" onClick={toggleForm} />
            </div>
         </div>
         {showForm &&
            (
               <div className='drop'>
                  <form action="">
                     <input type="text" placeholder='Search for book, author' style={{backgroundImage:`url(${'/images/search.png'})`,
            backgroundSize: 'contain', backgroundRepeat:'no-repeat'}}/>
                     <button type='submit'>Submit</button>
                  </form>
               </div>
            )
         }
      </>
   )
}

export default PatronMobileHeader