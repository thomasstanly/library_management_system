import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const LibrarianLogin = () => {
    const [Show1, setShow1] = useState(false)

    const toggle = () => {
        setShow1(prevState => !prevState);

    }

    return (
        <>
            <div className='Container'>
                <div className='row'>
                    <span>Login</span>
                    <form action="">
                        <div className='email'>
                            <label className='label' htmlFor="">Email</label>
                            <input className='form-control' type="text" />
                        </div>
                        <div>
                            <label className='label' htmlFor="">Password</label>
                            <input id='form3Example4cdg' className='form-control' type={Show1 ? "text" : "password"} />
                            {Show1 ? <FaEye className='eye' onClick={() => toggle()} /> : <FaEyeSlash className='eye' onClick={() => toggle()} />}
                        </div>
                        <div>
                            <button className='form-control' type='submit'>Login</button>
                        </div>
                        <div>
                            <p>Din't have an account? Sign up now</p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LibrarianLogin