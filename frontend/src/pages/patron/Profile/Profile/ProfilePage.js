import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import ProfileMenu from '../../../../components/patron/ProfileMenu/ProfileMenu'
import PatronHeader from '../../../../components/patron/header/PatronHeader'
import PatronMobileHeader from '../../../../components/patron/header/PatronMobileHeader'
import Breadcrumb from '../../../../components/patron/Breadcrumb/Breadcrumb';
import Profile from '../../../../components/patron/Profile/Profile/Profile'
import style from './Profile.module.scss'


const ProfilePage = () => {
   const patronDetails = useSelector((state) => state.patron_detils)
   const [isSmallScreen, setIsSmallScreen] = useState(false)
   const breadcrumbs = [
      <Link underline="hover" key="1" color="inherit" to="/">
         Home
      </Link>,
      <Typography key="3" color="text.primary">
        Profile
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
   }, [patronDetails])
   return (
      <div >
         {isSmallScreen ? <PatronMobileHeader header={patronDetails} /> : <PatronHeader header={patronDetails} />}
         <Breadcrumb breadcrumbs={breadcrumbs}/>
         <div className={style.container}>
            <div className={style.profile_menu}>
               <ProfileMenu details={patronDetails} />
            </div>
            <div className={style.content}>
               <Profile user_details={patronDetails} />
            </div>
         </div>
      </div>
   )
}

export default ProfilePage