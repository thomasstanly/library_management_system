import React, { useState, useEffect } from 'react'
import ProfileMenu from '../../../components/patron/ProfileMenu/ProfileMenu'
import PatronHeader from '../../../components/patron/header/PatronHeader'
import PatronMobileHeader from '../../../components/patron/header/PatronMobileHeader'
import Profile from '../../../components/patron/Profile/Profile/Profile'
import style from './Profile.module.scss'


const ProfilePage = () => {
   const [isSmallScreen, setIsSmallScreen] = useState(false)

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
         {isSmallScreen ? <PatronMobileHeader /> : <PatronHeader />}
         <div className={style.container}>
            <div className={style.profile_menu}>
               <ProfileMenu />
            </div>
            <div className={style.content}>
               <Profile />
            </div>
         </div>
      </div>
   )
}

export default ProfilePage