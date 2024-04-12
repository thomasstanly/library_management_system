import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SideBarLibrarian from '../../components/librarian/Sidebar/SideBarLibrarian'

const LibrarainLanding = () => {
  const { isAdmin } = useSelector((state) => state.Auth_store)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAdmin) {

      navigate('/library/dashboard');
    }
  }, [isAdmin, navigate])
  return (
    <div><SideBarLibrarian /></div>
  )
}

export default LibrarainLanding