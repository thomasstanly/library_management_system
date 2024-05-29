import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setQuery as setQueryAction } from '../../../Redux/Search/SearchSlice';
import SidebarContext from '../../../Context/sidebartoggle';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import style from './SideBarLibrarian.module.scss';

const Header = () => {
   const { sidebar, showSidebar } = useContext(SidebarContext)
   const [query, setQuery] = useState('')
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleChange = (e) => {
      e.preventDefault(e)
      setQuery(e.target.value)

   }
   const handleSearch = (e) => {
      e.preventDefault()
      console.log(query)
      dispatch(
         setQueryAction({
            query: query
         })
      )
      navigate('/library/search')
   };

   return (
      <div className={style.sidebarContainer}>
         <div className={style.Nav}>
            <Link className={style.navIcon} >
               <MenuIcon onClick={showSidebar} style={{ fontSize: '2rem' }} />
            </Link>
            <form onSubmit={handleSearch}>
               <div className={style.SearchContainer}>
                  <input type="text" placeholder="Search..." className={style.SearchInput} onChange={handleChange} />
                  <button type='submit' ><SearchIcon style={{ fontSize: '2.25rem', color: '#8B8E99' }} /></button>
                  <button className={style.checkin}><Link to={'/library/checkin'} className={style.link}>Check In</Link></button>
               </div>
            </form>
            <img className='profile' src="/images/user.png" alt="netflix logo" />
         </div>
      </div>
   )
}

export default Header