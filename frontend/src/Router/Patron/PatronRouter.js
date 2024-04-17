import React, { useEffect, useState } from 'react'
import {Navigate} from 'react-router-dom'
import PatronAuth from '../../utils/PatronAuth'
import Loader from '../../components/Loader'

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
      return <Loader/>
   }
   if (isAuth === false){
      return(<Navigate to="/" />)
   }

   return children
}

export default PatronRouter