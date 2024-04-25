import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from '../../Axios'
import PatronAuth from '../../utils/PatronAuth'
import PatronRouter from '../../Router/Patron/PatronRouter'
import PatronLoginRouter from '../../Router/Patron/PatronLoginRouter'
import PatronHomePage from '../../pages/patron/PatronHomePage'
import PatronSingUp from '../../pages/patron/PatronSingUp'
import PatronLogin from '../../pages/patron/PatronLogin'
import MembershipPlanPage from '../../pages/patron/MembershipPlanPage'
import PaymentPage from '../../pages/patron/PaymentPage'
import PaymentConfirmPage from '../../pages/patron/PaymentConfirm'
import ProfilePage from '../../pages/patron/Profile/ProfilePage'
import { set_Authenticate } from '../../Redux/Auth/LibrarySlice'
import { get_UserDetails } from '../../Redux/Patron/PatronSlice'



function PatronWrapper() {
  const { name, isAuthenticated, user_id } = useSelector((state) => state.Auth_store)
  const dispatch = useDispatch()

  const fetch = async () => {
    try {
      const access_token = JSON.parse(localStorage.getItem('access'))
      const res = await axios.get('patron/', {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      console.log(res)
      dispatch(
        get_UserDetails({
          patron_id: res.data.id,
          email: res.data.email,
          phone: res.data.phone_number,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          profile_pic: res.data.Profile.profile_pic,
          plan: res.data.membership_id,
        })
      )
    } catch (error) {
      console.error(error)
    }
  }
  const check = async () => {
    const result = await PatronAuth()
    dispatch(
      set_Authenticate({
        user_id: result.user_id,
        first_name: result.name,
        isAuth: result.isAuthenticated
      })
    )
  }
  useEffect(() => {
    if (!name) {
      check();
    }
  }, [])

  useEffect(()=>{
    if(isAuthenticated){
      fetch()
    }
  },[isAuthenticated])
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<PatronHomePage />} />
        <Route path='/signup' element={<PatronLoginRouter><PatronSingUp /></PatronLoginRouter>} />
        <Route path='/login' element={<PatronLoginRouter><PatronLogin /></PatronLoginRouter>} />
        <Route path='/plan' element={<PatronRouter><MembershipPlanPage /></PatronRouter>} />
        <Route path='/plan/payment/:id' element={<PatronRouter><PaymentPage /></PatronRouter>} />
        <Route path='/plan/payment/confirm/:id' element={<PatronRouter><PaymentConfirmPage /></PatronRouter>} />
        <Route path='/profile' element={<PatronRouter><ProfilePage /></PatronRouter>} />
      </Routes>
    </div>
  )
}

export default PatronWrapper