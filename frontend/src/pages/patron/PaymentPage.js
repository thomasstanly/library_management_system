import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import Pyamentmethod from '../../components/patron/MembershipPlan/Paymentmethod'
import PatronHeader from '../../components/patron/header/PatronHeader'
import PatronMobileHeader from '../../components/patron/header/PatronMobileHeader'

const PaymentPage = () => {
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
    <div>
      {isSmallScreen ? <PatronMobileHeader header={patronDetails} /> : <PatronHeader header={patronDetails} />}
      <Pyamentmethod />
    </div>
  )
}

export default PaymentPage