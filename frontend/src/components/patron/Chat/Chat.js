import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CancelIcon from '@mui/icons-material/Cancel';
import Message from './Message';
import MessageInput from './MessageInput';
import style from './Chat.module.scss'

const styleModal = {
  position: 'absolute',
  top: '30%',
  right: '5%',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
};

const Chat = () => {
  const patronDetails = useSelector((state) => state.patron_detils)
  const patron_id = patronDetails.patron_id
  const sender = patronDetails.first_name
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [messages, setMessages] = useState([{}]);
  const chatLogRef = useRef(null);
  let chatSocket = useRef(null);

  useEffect(() => {
  
    chatSocket.current = new WebSocket(
      `${process.env.REACT_APP_CHAT_KEY}ws/chat/community/`
    );

    chatSocket.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, {'message':data.message,'created':data.created, 'sender':data.sent_by}]);
    };

    chatSocket.current.onclose = (e) => {
      console.error('Chat socket closed unexpectedly');
    };

    return () => {
      chatSocket.current.close();
    };
  }, []);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (message) => {
    if (chatSocket.current.readyState === WebSocket.OPEN) {
      chatSocket.current.send(JSON.stringify({ message, patron_id, sender }));
    }
  };

  return (
    <div >
      <button className={style.modalbutton} onClick={handleOpen}>
        <QuestionAnswerIcon style={{ color: 'white' }} />
      </button>
      <Modal
        hideBackdrop={true}
        disableScrollLock={false}
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ borderRadius: '50px' }}

      >
        <Box sx={styleModal}>
          <div className={style.chat}>
            <div onClick={handleClose}>
              <CancelIcon style={{ color: 'white', cursor: 'pointer', position: 'absolute', top: '10px', right: '10px' }} />
            </div>
            <div className={style.chat_header}>
              <p>Community Chat</p>
            </div>
            <div className={style.chat_area} ref={chatLogRef}>
              {messages.map((msg, index) => {
                return (
                <Message key={index} text={msg.message} sender={msg.sender} sent={msg.created === patron_id} />
              )})}
            </div>
            <MessageInput onSendMessage={handleSendMessage}/>
          </div>
        </Box>

      </Modal>
    </div >
  );
}

export default Chat