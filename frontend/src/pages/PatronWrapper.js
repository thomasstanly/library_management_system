import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PatronAuth from '../utils/PatronAuth'
// import PatronRouter from './PatronRouter'
import PatronHomePage from './patron/PatronHomePage'
import PatronSingUp from './patron/PatronSingUp'
import PatronLogin from './patron/PatronLogin'
import { set_Authenticate } from '../Redux/Auth/LibrarySlice'

function PatronWrapper() {
  const { name } = useSelector((state) => state.Auth_store)
  const dispatch = useDispatch()
  useEffect(() => {
    const check = async () => {
      const result = await PatronAuth()
      dispatch(
        set_Authenticate({
          first_name: result.name,
          isAuth: result.isAuthenticated
        })
      )
    }
    if (!name) {
      check()
    }
  })
  return (
    <div>
  
      <Routes>
        <Route path='/' element={<PatronHomePage />} />
        <Route path='/signup' element={<PatronSingUp />} />
        <Route path='/login' element={<PatronLogin />} />
      </Routes>

    </div>
  )
}

export default PatronWrapper