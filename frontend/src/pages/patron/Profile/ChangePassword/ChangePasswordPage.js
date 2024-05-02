import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import ProfileMenu from '../../../../components/patron/ProfileMenu/ProfileMenu'
import PatronHeader from '../../../../components/patron/header/PatronHeader'
import PatronMobileHeader from '../../../../components/patron/header/PatronMobileHeader'
import Breadcrumb from '../../../../components/patron/Breadcrumb/Breadcrumb';
import ChangePassword from '../../../../components/patron/Profile/ChangePassword/ChangePassword';
import style from './ChangePasswordPage.module.scss'


const ChangePasswordPage = () => {
   const patronDetails = useSelector((state) => state.patron_detils)
   const [isSmallScreen, setIsSmallScreen] = useState(false)


   const breadcrumbs = [
      <Link underline="hover" key="1" color="inherit" to="/">
         Home
      </Link>,
      <Link underline="hover" key="1" color="inherit" to="/profile">
         Profile
      </Link>,
      <Typography key="3" color="text.primary">
         ChangePassword
      </Typography>,
   ];

   useEffect(() => {
      const handleResize = () => {
         setIsSmallScreen(window.innerWidth <= 768)
      }
      handleResize()
      window.addEventListener('resize', handleResize)
      return () => {
         window.removeEventListener('resize', handleResize)
      }
   }, [])
   return (
      <div >
         {isSmallScreen ? <PatronMobileHeader header={patronDetails} /> : <PatronHeader header={patronDetails} />}
         <Breadcrumb breadcrumbs={breadcrumbs} />
         <div className={style.container}>
            <div className={style.profile_menu}>
               <ProfileMenu details={patronDetails} />
            </div>
            <div className={style.content}>
               <ChangePassword />
            </div>
         </div>
      </div>
   )
}

export default ChangePasswordPage