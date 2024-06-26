import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react'
import axios from '../../../Axios';
import animationData from '../../../Assets/Animation - 1716553241579.json'
import style from './MembershipPlan.module.scss';

const MembershipPlan = () => {
   const [plans, setPlans] = useState([]);
   const navigate = useNavigate();

   const handlePaymentClick = (plan) => {
      navigate(`/plan/payment/${plan.id}`);
   };

   const fetch = async () => {
      try {
         const access_token = JSON.parse(localStorage.getItem('access'));
         const res = await axios.get('membership/', {
            headers: {
               Authorization: `Bearer ${access_token}`,
            },
         });
         setPlans(res.data);
      } catch (error) {
         console.error(error.response);
      }
   };

   useEffect(() => {
      fetch();
   }, []);

   return (
      <>
         <div className={style.body}>
            <div className={style.lottieBackground}>
               <Lottie animationData={animationData} 
               speed={2.5}/>
            </div>
            <div className={style.body_container}>
               {plans.map((plan) => (
                  <div key={plan.id} className={style.plan}>
                     <div className={style.header}>
                        <h3>{plan.plan_name}</h3>
                     </div>
                     <div>
                        <div>
                           <p>Number of books user can take at a time {plan.no_books}</p>
                        </div>
                        <div>
                           <p>Time to keep the book {plan.return_period} days</p>
                        </div>
                        <div>
                           <p>Membership for minimum 1 month.</p>
                        </div>
                        <div>
                           <p>Membership fee per month ₹ {plan.plan_rate}</p>
                        </div>
                        <div>
                           <p>Membership fee per month ₹ {plan.plan_rate}</p>
                        </div>
                     </div>
                     <button onClick={() => handlePaymentClick(plan)}>
                        <Link style={{ textDecoration: 'none', color: 'black' }}>
                           <h5>make payment</h5>
                        </Link>
                     </button>
                  </div>
               ))}
            </div>

         </div>

      </>
   );
};

export default MembershipPlan;
