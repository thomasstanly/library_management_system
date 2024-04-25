import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify'
import axios from '../../../Axios'
import style from './Paymentmethod.module.scss'

const Pyamentmethod = () => {
   const { id } = useParams()
   const { user_id } = useSelector((state) => state.Auth_store)
   console.log(user_id)
   const [plan, setPlan] = useState({
      "plan_id": '',
      'plan_name': '',
      "plan_code": '',
      "plan_rate": '',
   });
   const [currentMonth, setCurrentMonth] = useState('')
   const [nextMonth, setnextMonth] = useState('')
   const [amount, setAmount] = useState('')
   const navigate = useNavigate();

   function getCurrentMonthYear() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits for month
      const day = currentDate.getDate().toString().padStart(2, '0'); // Ensure two digits for day
      return `${year}-${month}-${day}`;
   }

   const handleMonth = (e) => {
      setnextMonth(e.target.value);
      const from = new Date(currentMonth);
      const to = new Date(e.target.value);
      const diff = (to - from) / (1000 * 60 * 60 * 24 * 30);
      const calculatedAmount = Math.round(plan.plan_rate * diff);
      setAmount(calculatedAmount)
   };

   const fetch = async () => {
      try {
         const access_token = JSON.parse(localStorage.getItem('access'));
         const res = await axios.get(`membership/${id}/`, {
            headers: {
               Authorization: `Bearer ${access_token}`,
            },
         });
         setPlan({
            "plan_id": res.data.id,
            'plan_name': res.data.plan_name,
            "plan_code": res.data.plan_code,
            "plan_rate": res.data.plan_rate,
         })
      } catch (error) {
         console.error(error);
      }
   };
   const handleSubmit = async (e) => {
      e.preventDefault()
      if (amount < plan.plan_rate) {
         toast.warning("Please enter valid date")
         return
      }
      console.log(user_id)
      const formData = new FormData()
      formData.append('amount_paid', amount)
      formData.append('from_date', currentMonth)
      formData.append('expiry_date', nextMonth)
      formData.append('membership_plan', plan.plan_id)
      formData.append('patron', user_id)
      for (const pair of formData.entries()) {
         console.log(pair[0], pair[1]);
      }

      try {
         const access_token = JSON.parse(localStorage.getItem('access'))
         const res = await axios.post('razorpay/order/', formData,
            {
               headers: {
                  Authorization: `Bearer ${access_token}`
               }
            })
         navigate(`/plan/payment/confirm/${res.data.message.id}`)
      } catch (error) {
         console.error(error.response)
      }
   }

   useEffect(() => {
      fetch()
      setCurrentMonth(getCurrentMonthYear())
   }, [])

   return (
      <>
         <form onSubmit={handleSubmit}>
            <div className={style.container}>
               <div className={style.field_name}>
                  <div className={style.row}>
                     <p>Membership</p>
                  </div>
                  <div className={style.row}>
                     <p>From</p>
                  </div>
                  <div className={style.row}>
                     <p>To</p>
                  </div>
                  <div className={style.row}>
                     <p>Total</p>
                  </div>

               </div>
               <div className={style.field_name}>
                  <div className={style.row}>
                     <input className={style.plan_name} value={plan.plan_name} readOnly />
                  </div>
                  <div className={style.row}>
                     <input className={style.date} type="date" value={currentMonth} readOnly />
                  </div>
                  <div className={style.row}>
                     <input className={style.date} type="date" value={nextMonth} onChange={handleMonth} />
                  </div>
                  <div className={style.row}>
                     <input className={style.amount} type="text" value={amount} readOnly />
                  </div>
               </div>
               <button type='submit'>Make Payment</button>
            </div>
         </form>
      </>
   );
};

export default Pyamentmethod;