import React, { useEffect, useState } from 'react'
import {Navigate} from 'react-router-dom'
import PatronAuth from '../utils/PatronAuth'

const PatronRouter = ({ children }) => {
   const [isAuth, setAuth] = useState(false)
   const [isLoading, setLoading] = useState(true)

   useEffect(() => {

      const patrondetails = async () => {
         const result = await PatronAuth()
         setAuth(result.isAuthenticated)
         setLoading(false)
      }
      patrondetails()

   }, [])

   if (isLoading) {
      return (
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', }}>
               <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
               </div>
               <div style={{ paddingLeft: '10px' }}>
                  <p style={{ fontFamily: 'monospace', fontSize: '30px', marginTop: '2px', paddingLeft: '2px' }}>Loading....</p>
               </div>
            </div>
         </div>
      )
   }
   if (isAuth === false){
      return(<Navigate to="/" />)
   }

   return children
}

export default PatronRouter