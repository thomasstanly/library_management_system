import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from '../../../Axios'
import './PatronHeader.scss'

const PatronHeader = () => {
  const { name, isAuthenticated } = useSelector((state) => state.Auth_store)
  console.log('header', name)
  const navigate = useNavigate()
  const logout = async () => {
    const refresh_token = JSON.parse(localStorage.getItem('refresh'))
    const token = JSON.parse(localStorage.getItem('access'))

    try {
      console.log(token)
      const res = await axios.post('logout/', { refresh_token: refresh_token }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(res.status)
      localStorage.clear();
      axios.defaults.headers.common['Authorization'] = null;
      window.location.href = '/'
    } catch (e) {
      console.log('logout not working', e)
    }
  }
  return (
    <div className='header'>
      <div className='left'>
        {isAuthenticated ? <div class="dropdown" style={{ marginLeft: '10px' }}>
          <button className='profile dropdown-toggle' type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img className='profile' src="/images/user.png" alt="netflix logo" />
          </button>
          <ul class="dropdown-menu" >
            <li><a class="dropdown-item" href="#">profile</a></li>
            <li><a class="dropdown-item" onClick={logout}>logout</a></li>
          </ul>
        </div> :
          <img className='profile' src="/images/user.png" alt="netflix logo" />}

        {isAuthenticated ? <button className='btn btn-primary' style={{ marginLeft: '20px' }}>Buy Plan</button> :
          <p onClick={() => { navigate('/login') }} style={{ cursor: 'pointer', marginLeft: '20px' }}>Login</p>}
      </div>
      <div className='right'>
        <form action="">
          <input type="text" placeholder='Search for book, author' style={{
            backgroundImage: `url(${'/images/search.png'})`,
            backgroundSize: 'contain', backgroundRepeat: 'no-repeat'
          }} />
          <button type='submit'>submit</button>
        </form>
      </div>
    </div>
  )
}

export default PatronHeader