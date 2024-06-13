import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Banner from '../../components/patron/banner/Banner'
import PatronHeader from '../../components/patron/header/PatronHeader'
import PatronMobileHeader from '../../components/patron/header/PatronMobileHeader'
import HomePage from '../../components/patron/HomePage/HomePage'
import Chat from '../../components/patron/Chat/Chat'
import Footer from '../../components/patron/Footer/Footer'

function PatronHomePage() {
  const patronDetails = useSelector((state) => state.patron_detils)
  const { isAuthenticated } = useSelector((state) => state.Auth_store)
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
        {isAuthenticated &&
          <div className='chat' >
            <Chat />
          </div>
        }
        <HomePage patron={patronDetails} />
        <Footer />

      </div>
    </>
  )
}

export default PatronHomePage