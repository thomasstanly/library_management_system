import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PatronHeader from '../../../components/patron/header/PatronHeader'
import PatronMobileHeader from '../../../components/patron/header/PatronMobileHeader'
import ListBooks from '../../../components/patron/ListBooks/ListBooks'

const PatronBookListPage = () => {
   const patronDetails = useSelector((state) => state.patron_detils)
   const [isSmallScreen, setIsSmallScreen] = useState(false);
   useEffect(() => {
      const handleResize = () => {
         setIsSmallScreen(window.innerWidth <= 1000);
      };

      handleResize(); // Check initially
      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, [])
   return (
      <>
         {isSmallScreen ? <PatronMobileHeader header={patronDetails} /> : <PatronHeader header={patronDetails} />}
         <ListBooks />
      </>
   )
}

export default PatronBookListPage