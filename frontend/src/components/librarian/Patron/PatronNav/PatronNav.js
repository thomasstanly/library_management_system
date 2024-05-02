import React from 'react';
import { Link } from 'react-router-dom';
import { siderbarData } from './siderbarData';
// import { useDispatch } from 'react-redux';
// import Swal from 'sweetalert2';
// import { toast } from 'react-toastify';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import axios from '../../../../Axios';
// import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import style from './PatronNav.module.scss'


const PatronNav = ({name, card, pic, id}) => {
   console.log(name,card,pic,id)

   return (
      <>
         <div className={style.sidebar}>
            <div className={style.sidebarnav}>
               <div>
                  <div className={style.profile_pic}>
                     <img src={(pic ? pic : null) || "/images/user.png"} alt="profile logo" />
                     <h3>{name}, ({card})</h3>
                  </div>
                  {siderbarData.map((item, index) => {
                     return (
                        <Link className={style.sidebarlink} to={item.link(id)} key={index}>
                           <span className={style.sidebarlabel}>{item.title}</span>
                        </Link>
                     );
                  })}
               </div>
            </div>
         </div>
      </>
   );
};

export default PatronNav;
