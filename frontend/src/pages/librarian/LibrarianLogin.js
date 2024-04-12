import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from '../../components/librarian/Login/LibrarianLogin'

const LibrarianLogin = () => {
  const { isAdmin } = useSelector((state) => state.Auth_store)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAdmin == 'False') {
      navigate('/');
    } else if (isAdmin == 'True') {
      navigate('/library/dashboard');
    }
  }, [isAdmin, navigate])

  return (
    <div><Login /></div>
  )
}

export default LibrarianLogin