import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'


const PatronSignUp = () => {

   const [Show1, setShow1] = useState(false)
   const [Show2, setShow2] = useState(false)

   const toggle = (value)=>{
      if (value === 1){
         setShow1(prevState => !prevState);
      }
      else{
         setShow2(prevState => !prevState);
      }
      
   }

   return (
      <>
         <div className='Container'>
            <div className='row'>
               <span>Register</span>
               <form action="">
                  <div className='email'>
                     <label className='label' htmlFor="">Email</label>
                     <input className='form-control' type="text" />
                  </div>
                  <div>
                     <label className='label' htmlFor="">First Name</label>
                     <input  className='form-control' type="text" />
                  </div>
                  <div>
                     <label className='label' htmlFor="">Last Name</label>
                     <input  className='form-control' type="text" />
                  </div>
                  <div>
                     <label className='label' htmlFor="">Password</label>
                     <input id='form3Example4cdg'  className='form-control' type={Show1?"text":"password"} />
                     {Show1?<FaEye className='eye' onClick={()=>toggle(1)} />:<FaEyeSlash className='eye' onClick={()=>toggle(1)} />}
                  </div>
                  <div>
                     <label className='label' htmlFor="">Confirm Password</label>
                     <input  className='form-control' type={Show2?"text":"password"} />
                     {Show2?<FaEye className='eye' onClick={()=>toggle(2)} />:<FaEyeSlash className='eye' onClick={()=>toggle(2)} />}
                  </div>
                  <div>
                     <button className='form-control' type='submit'>SignUp</button>
                  </div>
                  <div>
                     <p>Already have an account? login</p>
                  </div>
               </form>
            </div>
         </div>
      </>
   )
}

export default PatronSignUp