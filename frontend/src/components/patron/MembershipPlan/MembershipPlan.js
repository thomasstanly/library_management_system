import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../Axios';
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
         console.log(res.data);
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
            <div className={style.body_container}>
               {plans.map((plan) => (
                  <div key={plan.id} className={style.plan}>
                     <div className={style.header}>
                        <h3>{plan.plan_name}</h3>
                     </div>
                     <div>
                        <div>
                           <p>{plan.no_books}</p>
                        </div>
                        <div>
                           <p>{plan.return_period}</p>
                        </div>
                        <div>
                           <p>Membership for 1 month.</p>
                        </div>
                        <div>
                           <p>{plan.plan_rate}</p>
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
