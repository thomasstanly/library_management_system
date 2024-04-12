import { Link, useSearchParams } from "react-router-dom";
import style from './SideBarLibrarian.module.scss'

import React, { useState } from 'react'

const SidebarMenu = ({ item }) => {

	const [subnav, setSubnav] = useState(false)

	const showSubnav = () => {
		setSubnav(!subnav)
	}
	return (
		<div>
			<Link className={style.sidebarlink} to={item.link} onClick={item.subNav && showSubnav}>
				<div>
					{item.icon}
					<span className={style.sidebarlabel}>
						{item.title}
					</span>
				</div>
				<div>
					{item.subNav && subnav ? item.arrowup : item.subNav ? item.arrowdown : null}
				</div>
			</Link>
			{subnav && item.subNav.map((item,index)=>{
				return(
					<Link className={style.sidebarlink} to={item.link} key={index}>
						<span class={style.sidebarlabel}>
							{item.title}
						</span>
					</Link>
				)
			})}
		</div>
	)
}

export default SidebarMenu