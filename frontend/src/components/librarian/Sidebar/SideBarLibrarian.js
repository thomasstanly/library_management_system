import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { siderbarData } from './siderbarData';
import  SidebarContext from '../../../Context/sidebartoggle';
import SubMenu from './SidebarMenu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import style from './SideBarLibrarian.module.scss';

const SideBarLibrarian = () => {
   const {sidebar, showSidebar} = useContext(SidebarContext)

   return (
      <div className={style.sidebarContainer}>
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

