import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import  SidebarContext from '../../../Context/sidebartoggle';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import style from './SideBarLibrarian.module.scss';

const Header = () => {
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
      </div>
   )
}

export default Header