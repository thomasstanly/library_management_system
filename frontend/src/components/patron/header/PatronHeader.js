import React from 'react'
import './PatronHeader.scss'

const PatronHeader = () => {
  return (
    <div className='header'>
      <div className='left'>
        <img className='profile' src="/images/user.png" alt="netflix logo" />
        <p>Login</p>
      </div>
      <div className='right'>
        <form action="">
          <input type="text" placeholder='Search for book, author' style={{backgroundImage:`url(${'/images/search.png'})`,
            backgroundSize: 'contain', backgroundRepeat:'no-repeat'}} />
          <button type='submit'>submit</button>
        </form>
      </div>
    </div>
  )
}

export default PatronHeader