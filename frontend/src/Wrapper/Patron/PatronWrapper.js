import React, { useEffect, lazy } from 'react'
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
import ProfilePage from '../../pages/patron/Profile/Profile/ProfilePage'
import PatronBookListPage from '../../pages/patron/PatronBookList/PatronBookListPage'
import PatronBookDetailsPage from '../../pages/patron/PatronBookDetailsPage'
import { set_Authenticate } from '../../Redux/Auth/LibrarySlice'
import { get_UserDetails } from '../../Redux/Patron/PatronSlice'
import ChangePasswordPage from '../../pages/patron/Profile/ChangePassword/ChangePasswordPage'
import SubscriptionPage from '../../pages/patron/Profile/Subscription/SubscriptionPage'
import CirculationHistoryPage from '../../pages/patron/Profile/CirculationHistory/CirculationHistoryPage'
import PaymentHistoryPage from '../../pages/patron/Profile/PaymentHistory/PaymentHistoryPage'
const NotFoundPage = lazy(() => import('../../pages/404Page'))

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
      const profilePic = res.data.Profile ? res.data.Profile.profile_pic : null;
      dispatch(
        get_UserDetails({
          patron_id: res.data.id,
          email: res.data.email,
          phone: res.data.phone_number,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          profile_pic: profilePic,
          plan: res.data.membership_id,
          plan_expiry:res.data.mebership_date
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
        isAuth: result.isAuthenticated,
        isAdmin: result.isAdmin
      })
    )
  }
  useEffect(() => {
    if (!name) {
      check();
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetch()
    }
  }, [isAuthenticated])

  return (
    <div>
      <Routes>
      <Route path='/*' element={<NotFoundPage />} />
        <Route path='/' element={<PatronHomePage />} />
        <Route path='/signup' element={<PatronLoginRouter><PatronSingUp /></PatronLoginRouter>} />
        <Route path='/login' element={<PatronLoginRouter><PatronLogin /></PatronLoginRouter>} />
        <Route path='/plan' element={<PatronRouter><MembershipPlanPage /></PatronRouter>} />
        <Route path='/Book_list' element={<PatronRouter><PatronBookListPage /></PatronRouter>} />
        <Route path='/Book_list/:id' element={<PatronRouter><PatronBookDetailsPage /></PatronRouter>} />
        <Route path='/plan/payment/:id' element={<PatronRouter><PaymentPage /></PatronRouter>} />
        <Route path='/plan/payment/confirm/:id' element={<PatronRouter><PaymentConfirmPage /></PatronRouter>} />
        <Route path='/profile' element={<PatronRouter><ProfilePage /></PatronRouter>} />
        <Route path='/profile/change_password' element={<PatronRouter><ChangePasswordPage /></PatronRouter>} />
        <Route path='/profile/subscription' element={<PatronRouter><SubscriptionPage /></PatronRouter>} />
        <Route path='/profile/circulation_history' element={<PatronRouter><CirculationHistoryPage /></PatronRouter>} />
        <Route path='/profile/payment' element={<PatronRouter><PaymentHistoryPage /></PatronRouter>} />
      </Routes>
    </div>
  )
}

export default PatronWrapper