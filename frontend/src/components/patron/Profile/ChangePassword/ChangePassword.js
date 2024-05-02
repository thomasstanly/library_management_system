import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from '../../../../Axios'
import style from './ChangePassword.module.scss';
import Swal from 'sweetalert2';

const ChangePassword = () => {

    const [password, setPassword] = useState({
        "password": "",
        "new_password": "",
        "confirm_password": "",
    })
    const [Show1, setShow1] = useState(false)
    const [Show2, setShow2] = useState(false)

    const toggle = (value) => {
        if (value === 1) {
            setShow1(prevState => !prevState);
        }
        else {
            setShow2(prevState => !prevState);
        }

    }

    const handleChange = (event) => {
        setPassword({ ...password, [event.target.name]: event.target.value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newPassword = password.new_password.trim();
        const containsLetter = /[a-zA-Z]/.test(newPassword);
        const containsDigit = /[1-9]/.test(newPassword);
        const containsSpecialChar = /[@_*&^%$]/.test(newPassword);
        if (!containsLetter) {
            return toast.error("Password must contain at least one letter.");
        } else if (!containsDigit) {
            return toast.error("Password must contain at least one digit.");
        } else if (!containsSpecialChar) {
            return toast.error("Password must contain at least one special character.");
        }
        if (password.new_password !== password.confirm_password) {
            return toast.error("Both passwords must be the same.")
        } else if (password.new_password.length < 6) {
            return toast.warn('Your password should have at least 8 characters')
        }
        try {
            const access_token = JSON.parse(localStorage.getItem('access'))
            const res = await axios.post('patron/change_password/', password, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            console.log(res.data.message)
            Swal.fire({
                position: "center",
                icon: "success",
                title: `${res.data.message}`,
                showConfirmButton: false,
                timer: 1200
            }).then(() => {
                setPassword({
                    "password": "",
                    "new_password": "",
                    "confirm_password": "",
                })
            })

        } catch (error) {
            console.error(error)
        }

    }
    return (
        <div className={style.change_password}>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <h5>Change Password</h5>
                </div>
                <div>
                    <label htmlFor="">Current Password</label>
                    <input type="text" name='password' onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="">New password</label>
                    <input type={Show1 ? "text" : "password"} name='new_password' onChange={handleChange} />
                    {Show1 ? <FaEye className={style.eye} onClick={() => toggle(1)} /> : <FaEyeSlash className={style.eye} onClick={() => toggle(1)} />}
                </div>
                <div>
                    <label htmlFor="">Confirm password</label>
                    <input type={Show2 ? "text" : "password"} name='confirm_password' onChange={handleChange} />
                    {Show2 ? <FaEye className={style.eye} onClick={() => toggle(2)} /> : <FaEyeSlash className={style.eye} onClick={() => toggle(2)} />}
                </div>
                <div>
                    <button type='submit'>Save Change<span></span></button>
                </div>
            </form >
        </div>
    )
}

export default ChangePassword