import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import LibraryAuth from '../../utils/LibraryAuth'
import Loader from '../../components/Loader';

const LibraryLoginRouter = ({ children }) => {
   const [isLoading, setLoading] = useState(true)
   const [isAuth, setAuth] = useState({
      isAdmin: false,
      isAuth: false
   })


   useEffect(() => {
      const fetchlibrary = async () => {
         const library = await LibraryAuth()
         setAuth({
            isAuth: library.isAuthenticated,
            isAdmin: library.isAdmin
         })
         setLoading(false)
      }
      fetchlibrary()


   }, [])

   if (isLoading) {
      return <Loader />
   }
   
   if (isAuth.isAdmin === false &&  isAuth.isAuth === true) {
      console.log('isAuth.isAdmin')
      return (<Navigate to="/" />)
   }

   if (isAuth.isAdmin === true) {
      console.log('isAuth.isAdmin')
      return (<Navigate to="/library/dashboard" />)
   }
   return children
}

export default LibraryLoginRouter