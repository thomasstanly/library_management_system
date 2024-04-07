import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PatronSignUp from '../../components/patron/sinuppage/PatronSignUp'

const PatronSingUp = () => {
  const { isAuthenticated } = useSelector((state) => state.Auth_store)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  return (
    <div>
      <PatronSignUp />
    </div>
  )
}

export default PatronSingUp