import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import style from './Chat.module.scss'

const MessageInput = ({ onSendMessage }) => {
    const [inputValue, setInputValue] = useState('')
    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }
    const handleSubmit = () => {
        if (inputValue.trim()) {
            onSendMessage(inputValue);
            setInputValue('');
          }
    }

    const handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
      };

    return (
        <>
            <div className={style.message_input}>
                <textarea
                    placeholder='Type a message'
                    value={inputValue}
                    onChange={handleInputChange} 
                    onKeyUp={handleKeyUp}/>
                {inputValue && <button onClick={handleSubmit}><SendIcon style={{ color: 'white'}}/></button>}
            </div>
        </>
    )
}

export default MessageInput