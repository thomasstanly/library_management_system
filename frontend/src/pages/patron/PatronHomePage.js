import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Banner from '../../components/patron/banner/Banner'
import PatronHeader from '../../components/patron/header/PatronHeader'
import PatronMobileHeader from '../../components/patron/header/PatronMobileHeader'
import HomePage from '../../components/patron/HomePage/HomePage'

function PatronHomePage() {
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
      <div>
        {isSmallScreen ? <PatronMobileHeader header={patronDetails} /> : <PatronHeader header={patronDetails} />}
        <Banner />
        <HomePage patron={patronDetails}/>
      </div>
    </>
  )
}

export default PatronHomePage