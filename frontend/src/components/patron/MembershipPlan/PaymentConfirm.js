import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify'
import useRazorpay from "react-razorpay";
import axios from '../../../Axios'
import style from './Paymentmethod.module.scss'

const PaymentConfirm = () => {
   const { id } = useParams()
   const navigate = useNavigate();
   const [plan, setPlan] = useState({
      'plan_name': '',
      "from": '',
      "to": '',
      'amount': ''
   });
   const Razorpay = useRazorpay()

   const complete_payment = async (payment_id, order_id, signature) => {
      try {
         const response = await axios.post('razorpay/order/complete/', {
            membership_payment: plan.id,
            amount: plan.amount,
            payment_id: payment_id,
            order_id: order_id,
            signature: signature,
         });

         await Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Payment is Successful!",
            showConfirmButton: false,
            timer: 1200
         });

         window.location.href = '/';

      } catch (error) {
         console.log(error);
      }
   };

   const payment = () => {
      axios.post('razorpay/order/create/', {
         amount: plan.amount,
         currency: 'INR'
      }).then(function (response) {
         const options = {
            key: "rzp_test_DadhvgCTL7p70u",
            amount: "50000",
            currency: "INR",
            name: "Acme Corp",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: response.data.data.id,
            handler: function (response) {
               // alert(response.razorpay_payment_id);
               // alert(response.razorpay_order_id);
               // alert(response.razorpay_signature);
               complete_payment(response.razorpay_payment_id,
                  response.razorpay_order_id,
                  response.razorpay_signature)

            },
            prefill: {
               name: "Piyush Garg",
               email: "youremail@example.com",
               contact: "9999999999",
            },
            notes: {
               address: "Razorpay Corporate Office",
            },
            theme: {
               color: "#3399cc",
            },
         };

         const rzp1 = new window.Razorpay(options);

         rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
         });

         rzp1.open();
      }).catch(function (error) {
         console.log(error);
      });
   }




   const fetch = async () => {
      try {
         const access_token = JSON.parse(localStorage.getItem('access'));
         const res = await axios.get(`razorpay/order/${id}/`, {
            headers: {
               Authorization: `Bearer ${access_token}`,
            },
         });
         setPlan({
            'id': res.data.id,
            'plan_name': res.data.membership_plan.plan_name,
            "from": res.data.from_date,
            "to": res.data.expiry_date,
            'amount': res.data.amount_paid,
         })
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      
      fetch()
   }, [])

   return (
      <>
         <form >
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
                     <input className={style.date} type="date" value={plan.from} readOnly />
                  </div>
                  <div className={style.row}>
                     <input className={style.date} type="date" value={plan.to} readOnly />
                  </div>
                  <div className={style.row}>
                     <input className={style.amount} type="text" value={plan.amount} readOnly />
                  </div>
               </div>
               <button type='button' onClick={payment}>Confirm Payment</button>
            </div>
         </form>
      </>
   );
};

export default PaymentConfirm;