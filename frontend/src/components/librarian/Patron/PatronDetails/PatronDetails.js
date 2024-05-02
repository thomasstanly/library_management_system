import React from 'react'
import style from './PatronDetails.module.scss'

const PatronDetails = ({ firstName, lastName, email, phoneNumber, card, plan, expiryDate }) => {

  return (
    <>
      <div className={style.container}>
        <div className={style.name}>
          <h1>{firstName.charAt(0).toUpperCase() + firstName.slice(1) + ' ' + lastName.charAt(0).toUpperCase() + lastName.slice(1)}
, {card} </h1>
        </div>
        <div className={style.details}>
          <div className={style.personal}>
              <h4>personal info</h4>
              <p>first name :{firstName}</p>
              <p>last name  :{lastName}</p>
              <p>email      : {email}</p>
              <p>phone      : {phoneNumber}</p>
          </div>
          <div className={style.library}>
            <h4>Library card information</h4>
            <p>card number  :{card}</p>
            <p>membership   :{plan.plan_name}</p>
            <p>Registration :</p>
            <p>Exipry date  :{expiryDate}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default PatronDetails