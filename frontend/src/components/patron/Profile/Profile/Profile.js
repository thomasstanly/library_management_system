import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from '../../../../Axios'
import style from './Profile.module.scss'
import { toast } from 'react-toastify'

const Profile = () => {
  const navigate = useNavigate()
  const [details, setDetails] = useState({
    id: '',
    email: '',
    phone_number: '',
    first_name: '',
    last_name: ''
  })
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!details.first_name || !details.first_name.trim().match(/^[a-zA-Z]+$/)) {
     
      return toast.error("First name should contain only characters.");
    }

    if (!details.last_name || !details.last_name.trim().match(/^[a-zA-Z]+$/)) {
     
      return toast.error("Last name should contain only characters.");
    }

    if (!details.email || !details.email.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      
      return toast.error("Invalid email format.");
    }

    if (!details.phone_number || details.phone_number.trim().length !== 10 || !details.phone_number.trim().match(/^\d+$/)) {
      console.log()
      return toast.error("Phone number should be exactly 10 digits.");
    }

    try {
      const access_token = JSON.parse(localStorage.getItem('access'))
      const res = await axios.patch(`patron/${details.id}/`, details, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      });

      console.log(res.data);

      Swal.fire({
        position: "center",
        icon: "success",
        title: ` Your profile has been updated successfully!`,
        showConfirmButton: false,
        timer: 1200
      }).then(() => {
        navigate('/profile');
      });
    } catch (error) {
      console.error(error.response);
    }
  }

  const fetch = async () => {
    try {
      const access_token = JSON.parse(localStorage.getItem('access'))
      const res = await axios.get('patron/', {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      console.log(res)
      setDetails({
        id: res.data.id,
        email: res.data.email,
        phone_number: res.data.phone_number,
        first_name: res.data.first_name,
        last_name: res.data.last_name,
      })
    } catch (error) {
      console.error(error.response)
    }
  }
  useEffect(() => {
    fetch()
  }, [])
  return (
    < >
      <div className={style.profile}>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <h5>Personal Info</h5>
          </div>
          <div>
            <label htmlFor="">First name</label>
            <input type="text" name='first_name' value={details.first_name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="">Last Name</label>
            <input type="text" name='last_name' value={details.last_name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input type="email" name='email' value={details.email} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="">Phone number</label>
            <input type="number" name='phone_number' value={details.phone_number ? details.phone_number : ''} onChange={handleChange} />
          </div>
          <div>
            <button type='submit'>Save Changes</button>
          </div>
        </form >
      </div>
    </>
  )
}

export default Profile