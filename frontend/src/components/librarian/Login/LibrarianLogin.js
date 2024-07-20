import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {jwtDecode} from 'jwt-decode'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import {set_Authenticate} from '../../../Redux/Auth/LibrarySlice'
import axios from '../../../Axios'

const LibrarianLogin = () => {
    const [Show1, setShow1] = useState(false)
    
    const toggle = () => {
        setShow1(prevState => !prevState);

    }
    const { isAdmin } = useSelector((state) => state.Auth_store)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loginData, setLogindata] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(null)

    const handleOnChange = (e) => {
        setLogindata({ ...loginData, [e.target.name]: e.target.value })
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(loginData)
        if (!loginData.email || !loginData.password) {
            setError('All fields required')
        } else {
            try {
                const res = await axios.post("login/", loginData)
                if (res.status === 200) {
                    if (!res.data.isAdmin) {

                        toast.warning('You are not authorized to login.');
                        navigate('')
                        return;
                    }
                    localStorage.setItem('user', JSON.stringify(res.data.email))
                    localStorage.setItem('access', JSON.stringify(res.data.access_token))
                    localStorage.setItem('refresh', JSON.stringify(res.data.refresh_token))

                    dispatch(
                        set_Authenticate({
                            first_name: jwtDecode(res.data.access_token).first_name,
                            isAuth: true,
                            isAdmin: res.data.isAdmin
                        })
                    )
                    console.log(res)
                    navigate('dashboard')
                }
            } catch (error) {
                console.log(error.response.data.detail)
                toast.warning(error.response.data.detail)
            }
        }
    }



    return (
        <>
            <div className='Container'>
                <div className='row'>
                    <span>Librarian Login</span>
                    <form action="" onSubmit={handleSubmit}>
                        <div className='email'>
                            <label className='label' htmlFor="">Email</label>
                            <input className='form-control' type="email" name="email" value={loginData.email} onChange={handleOnChange}/>
                        </div>
                        <div>
                            <label className='label' htmlFor="">Password</label>
                            <input className='form-control' type={Show1 ? 'text' : 'password'} id="password" name="password" value={loginData.password} onChange={handleOnChange}/>
                            {Show1 ? <FaEye className='eye' onClick={() => toggle()} /> : <FaEyeSlash className='eye' onClick={() => toggle()} />}
                        </div>
                        <div>
                            <button className='form-control' type='submit'>Login</button>
                            <center className='mt-5'>Demo Credentials</center>
                            <center>email: thomas@gmail.com</center>
                            <center>password: thomas@123</center>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LibrarianLogin