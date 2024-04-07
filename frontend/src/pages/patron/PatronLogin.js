import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PatronLoginpage from '../../components/patron/loginpage/PatronLogin'

const PatronLogin = () => {
  const { isAuthenticated } = useSelector((state) => state.Auth_store)
  const navigate = useNavigate()
  
  useEffect(() => {
    if (isAuthenticated) {
       navigate('/');
    }
 }, [isAuthenticated, navigate]);

 return !isAuthenticated && <PatronLoginpage />;
}

export default PatronLogin