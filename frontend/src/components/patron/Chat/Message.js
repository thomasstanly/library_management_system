import React from 'react'
import { useSelector } from 'react-redux'
import style from './Chat.module.scss'

const Message = ({ text, sender, sent }) => {
    const patronDetails = useSelector((state) => state.patron_detils)
    const first_name = patronDetails.first_name
    return (
        <>
            <div className={sent ? style.sent : style.recieved}>
                <div className={style.message_bubble}>
                    <p className={style.user}>
                        {first_name === sender ? 'you' : sender}
                    </p>
                    {text}
                </div>
            </div>
        </>
    )
}

export default Message