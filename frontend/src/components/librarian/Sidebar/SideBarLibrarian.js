import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { siderbarData } from './siderbarData';
import  SidebarContext from '../../../Context/sidebartoggle';
import SubMenu from './SidebarMenu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import style from './SideBarLibrarian.module.scss';

const SideBarLibrarian = () => {
   const {sidebar, showSidebar} = useContext(SidebarContext)

   return (
      <div className={style.sidebarContainer}>
         <div className={style.Nav}>
            <Link className={style.navIcon} >
               <MenuIcon onClick={showSidebar} style={{ fontSize: '2rem' }} />
            </Link>
            <div className={style.SearchContainer}>
               <input type="text" placeholder="Search..." className={style.SearchInput} />
               <button><SearchIcon style={{ fontSize: '2.25rem', color: '#8B8E99' }} /></button>
               <button className={style.checkin}><Link className={style.link}>Check In</Link></button>
            </div>
            <img className='profile' src="/images/user.png" alt="netflix logo" />
         </div>
         {sidebar && <div className={`${style.sidebarnav} ${sidebar ? style.showSidebar : ''}`}>
            <div className={style.sidebarWrap}>
               < Link className={style.Icon} >
                  <MenuOpenIcon onClick={showSidebar} style={{ fontSize: '2rem' }} />
               </Link>
               {siderbarData.map((item, index) => {
                  return (
                     <SubMenu item={item} key={index} />
                  )
               })}
            </div>
         </div>}
      </div>
   )
};

export default SideBarLibrarian;

{/* <div>
   <div className={style.sidebar}>
      <ul className={style.SideBarList}>
         {siderbarData.map((val, key) => (
            <li
               className={style.row}
               key={key}
               onClick={() => {
                  if (val.link == null) {
                     handleClick(key);
                  } else {
                     window.location.pathname = val.link;
                  }
               }}
               id={window.location.pathname === val.link ? 'active' : 'inactive'}
            >
               <div id={style.icon}>{val.icon}</div>
               <div id={style.title}>{val.title}</div>
               <div id={style.arrow}>{val.arrow}</div>
               {dropDown === key && (
                  <div className={style.submenu}>
                     <ul>
                        {val.sub.map((res, index) => (
                           <li key={index} onClick={() => { window.location.pathname = res.sub_link }}>
                              <div>{res.sub_title}</div>
                           </li>
                        ))}
                     </ul>
                  </div>
               )}
            </li>
         ))}
      </ul>
   </div>
</div> */}