import React from 'react'
import style from './Subscription.module.scss'

const Subscription = ({ user_details }) => {


   const plan = user_details.plan

   return (
      <>
         <div className={style.subscription}>
            <div>
               <h4>My Subscription</h4>
               <div className={style.table}>
                  <div className={style.column}>
                     <div className={style.row}>
                        <p className={style.right}>Membership Plan</p>
                     </div>
                     <div className={style.row}>
                        <p className={style.right}>Plan Code</p>
                     </div>
                     <div className={style.row}>
                        <p className={style.right}>Number of books</p>
                     </div>
                     <div className={style.row}>
                        <p className={style.right}>Return period</p>
                     </div>
                     <div className={style.row}>
                        <p className={style.right}>Rate</p>
                     </div>
                  </div>
                  <div className={style.column}>
                     <div className={style.row}>
                        <p>{plan? plan.plan_name : '' }</p>
                     </div>
                     <div className={style.row}>
                        <p>{plan? plan.plan_code : '' }</p>
                     </div>
                     <div className={style.row}>
                        <p>{plan? plan.no_books : '' }</p>
                     </div>
                     <div className={style.row}>
                        <p>{plan? plan.return_date : '' } days</p>
                     </div>
                     <div className={style.row}>
                        <p>₹ {plan? plan.plan_rate : ''}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default Subscription