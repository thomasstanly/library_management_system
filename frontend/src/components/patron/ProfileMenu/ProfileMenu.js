import React, { useEffect, useState, } from 'react';
import { Link } from 'react-router-dom';
import { siderbarData } from './siderbarData';
import { useDispatch } from 'react-redux';
import { get_UserDetails } from '../../../Redux/Patron/PatronSlice'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from '../../../Axios'
import style from './ProfileMenu.module.scss';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const ProfileMenu = ({ details }) => {
   const [profile, setProfile] = useState({
      last_name: '',
      first_name: '',
      profile_pic: '',
   })

   const dispatch = useDispatch()

   const [proPic, setProPic] = useState({ image: null })

   const handleImageChange = (event) => {
      const file = event.target.files[0]
      const fileTypes = ['image/jpeg', 'image/png'];
      if (fileTypes.includes(file.type)) {
         setProPic({ image: file })
      }
      else {
         toast.error(' Please select an image (JPEG/PNG)')
      }
      
   }

   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const handleProPic = async (e) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('profile_pic', proPic.image)
      try {
         const access_token = JSON.parse(localStorage.getItem('access'))
         const res = await axios.post('patron/profile_pic/', formData, {
            headers: {
               Authorization: `Bearer ${access_token}`
            }
         })
         console.log(res.data)
         handleClose()
         dispatch(
            get_UserDetails({
               profile_pic: res.data.profile_pic,
            })
         )
         if (res.status === 201) {
            Swal.fire({
               position: "center",
               icon: "success",
               title: ` profile photo uploaded`,
               showConfirmButton: false,
               timer: 1200
            })
         }
      } catch (error) {
         console.log(error)
         handleClose()
         toast.warning('Image not found')
      }
   }

   const handleClick = async (title) => {
      console.log(title)
      if (title === "Logout") {
         const refresh_token = JSON.parse(localStorage.getItem('refresh'));
         const token = JSON.parse(localStorage.getItem('access'));

         try {
            console.log(token);
            const res = await axios.post('logout/', { refresh_token: refresh_token }, {
               headers: {
                  'Authorization': `Bearer ${token}`,
                  'content-type': 'multipart/form-data',
               }
            });
            console.log(res.status);
            localStorage.clear();
            axios.defaults.headers.common['Authorization'] = null;
            window.location.href = '/';
         } catch (e) {
            console.log('logout not working', e);
         }
      }
   }

   useEffect(() => {
      setProfile({
         last_name: details.last_name,
         first_name: details.first_name,
         profile_pic: details.profile_pic,
      })
   }, [details])
   const modal = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
   };
   return (
      <>
         <div className={style.sidebar}>
            <div className={style.row}>
               <div className={style.column}>
                  <div className={style.content}>
                     <img className={style.profile} src={(profile.profile_pic ? profile.profile_pic : null) || "/images/user.png"}
                        alt="profile logo" />
                     <div className={style.addphoto} >
                        <AddAPhotoIcon className={style.photo} onClick={handleOpen} />
                     </div>
                     <p>{profile.first_name + " " + profile.last_name}</p>
                  </div>
               </div>
            </div>
            <div className={style.sidebarnav}>
               <div >
                  {siderbarData.map((item, index) => {
                     return (
                        <Link className={style.sidebarlink} to={item.link} key={index} onClick={() => handleClick(item.title)} >
                           <span className={style.sidebarlabel}>
                              {item.title}
                           </span>
                        </Link>
                     )
                  })}
               </div>
            </div>
         </div>
         <div>
            <Modal
               open={open}
               onClose={handleClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
            >
               <Box sx={modal}>
                  <div className="card-body text-center">
                     <img
                        src={(proPic.image ? URL.createObjectURL(proPic.image) : profile.profile_pic) || "/images/user.png"}
                        alt="avatar"
                        className=" img-fluid"
                        style={{ width: '150px', borderRadius: '50%' }}
                     />
                  </div>
                  <form onSubmit={handleProPic}>
                     <div className="d-flex justify-content-center mb-2">
                        <input className='form-control btn btn-success btn-md' type="file"
                           onChange={handleImageChange} />
                     </div>
                     <div className="d-flex justify-content-center mb-2">
                        <button type="submit" className="btn btn-primary btn-secondary"> save </button>
                     </div>
                  </form>
               </Box>
            </Modal>
         </div>
      </>
   )
};

export default ProfileMenu;