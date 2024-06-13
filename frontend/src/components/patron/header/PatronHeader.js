import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from '../../../Axios'
import './PatronHeader.scss'

const PatronHeader = ({ header }) => {
  const {  isAuthenticated, isAdmin } = useSelector((state) => state.Auth_store)
  const [results, setResults] = useState([])
  const profile_pic = header.profile_pic
  const plan = header.plan
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

  const handleChange = async (e) => {
    const token = JSON.parse(localStorage.getItem('access'));

    try {
      const res = await axios.get(`patron_search/?query=${e.target.value}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(res.data.success)
      if (Array.isArray(res.data.success)) {
        setResults(res.data.success);
      } else {
        setResults([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const searchedBook = (id) => {
    setResults([])
    navigate(`/Book_list/${id}`)
  }

  return (
    <div className='header'>
      <div className='left'>
        {isAuthenticated ? <div className="dropdown" style={{ marginLeft: '10px' }}>
          <button className='profile dropdown-toggle' type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img className='profile' src={(profile_pic ? profile_pic : null) || "/images/user.png"} alt="netflix logo" />
          </button>
          <ul className="dropdown-menu">
            {isAdmin ? <li><a className="dropdown-item" href="/library/dashboard">Admin</a></li> : null}
            <li><a className="dropdown-item" onClick={()=>{navigate('/profile')}} style={{ cursor: 'pointer'}}>profile</a></li>
            <li><a className="dropdown-item" href="#" onClick={logout}>logout</a></li>
          </ul>
        </div> :
          <img className='profile' src="/images/user.png" alt="netflix logo" />}

        {isAuthenticated ? plan ? '' : <button className='btn btn-primary' style={{ marginLeft: '20px' }} onClick={() => { navigate('/plan') }}>Buy Plan</button> :
          <p onClick={() => { navigate('/login') }} style={{ cursor: 'pointer', marginLeft: '20px' }}>Login</p>}
      </div>
      <div className='right'>
        <form action="">
          <input type="text" placeholder='Search for book, author' style={{
            backgroundImage: `url(${'/images/search.png'})`,
            backgroundSize: 'contain', backgroundRepeat: 'no-repeat'
          }}
            onChange={handleChange} />
        </form>
        {results.length > 0 &&
          <ul className='search-results'>
            {results.map((result, index) => (
              <li key={index} onClick={() => searchedBook(result.book.id)}>
                {result.book.title}
              </li>
            ))}
          </ul>
        }
      </div>
    </div>
  )
}

export default PatronHeader