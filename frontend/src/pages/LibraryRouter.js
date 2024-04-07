import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import LibraryAuth from '../utils/LibraryAuth'

const LibraryRouter = ({ children }) => {
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
      }
      fetchlibrary()
      setLoading(false)

   }, [])

   if (isLoading) {
      return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', }}>
            <div class="spinner-border" role="status">
               <span class="visually-hidden">Loading...</span>
            </div>
            <div style={{ paddingLeft: '10px' }}>
               <p style={{ fontFamily: 'monospace', fontSize: '30px', marginTop: '2px', paddingLeft: '2px' }}>Loading....</p>
            </div>
         </div>
      </div>)
   }

   if (isAuth.isAdmin === false) {
      return (<Navigate to="/library" />)
   }
   return children
}

export default LibraryRouter