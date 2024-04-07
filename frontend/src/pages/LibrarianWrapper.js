import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
//import axios from 'axios'
import LibrarianLogin from '../pages/librarian/LibrarianLogin'
import LibraryAuth from '../utils/LibraryAuth'
// import LibraryRouter from './LibraryRouter'
import { set_Authenticate } from '../Redux/Auth/LibrarySlice'

function PatronWrapper() {
   const { name } = useSelector((state) => state.Auth_store)
   const dispatch = useDispatch()
   useEffect(() => {
      const check = async () => {
         const result = await LibraryAuth()
         dispatch(
            set_Authenticate({

               first_name: result.first_name,
               isAuth: result.isAuthenticated,
               isAdmin: result.isAdmin

            })
         )
      }
      if (!name) {
         check()
      }

   }, [name, dispatch])
   return (
      <div>
         <Routes>
            <Route path='/' element={<LibrarianLogin />} />
         </Routes>
      </div>
   )
}

export default PatronWrapper