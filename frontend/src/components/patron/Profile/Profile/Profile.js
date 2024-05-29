import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { get_UserDetails } from '../../../../Redux/Patron/PatronSlice'
import Swal from 'sweetalert2'
import axios from '../../../../Axios'
import style from './Profile.module.scss'
import { toast } from 'react-toastify'

const Profile = ({ user_details }) => {
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
  const dispatch = useDispatch()
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

    const phoneNumberString = details.phone_number.toString();

    if (phoneNumberString.length !== 10 || !phoneNumberString.match(/^\d+$/)) {
      
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
      dispatch(
        get_UserDetails({
          email: res.data.email,
          phone: res.data.phone_number,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
        })
      )

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

  useEffect(() => {
    setDetails({
      id: user_details.patron_id || '',
      email: user_details.email || '',
      phone_number: user_details.phone || '',
      first_name: user_details.first_name || '',
      last_name: user_details.last_name || ''
    });
  }, [user_details]);
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
            <button type='submit'>Save Change<span></span></button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Profile