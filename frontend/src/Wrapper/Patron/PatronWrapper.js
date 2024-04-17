import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PatronAuth from '../../utils/PatronAuth'
// import PatronRouter from './PatronRouter'
import PatronHomePage from '../../pages/patron/PatronHomePage'
import PatronSingUp from '../../pages/patron/PatronSingUp'
import PatronLogin from '../../pages/patron/PatronLogin'
import { set_Authenticate } from '../../Redux/Auth/LibrarySlice'
import PatronLoginRouter from '../../Router/Patron/PatronLoginRouter'

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
        <Route path='/signup' element={<PatronLoginRouter><PatronSingUp /></PatronLoginRouter>} />
        <Route path='/login' element={<PatronLoginRouter><PatronLogin /></PatronLoginRouter>} />
      </Routes>
    </div>
  )
}

export default PatronWrapper