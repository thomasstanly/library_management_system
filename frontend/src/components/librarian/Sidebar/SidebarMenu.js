import { Link, useSearchParams } from "react-router-dom";
import axios from '../../../Axios'
import style from './SideBarLibrarian.module.scss'

import React, { useState } from 'react'

const SidebarMenu = ({ item }) => {

	const [subnav, setSubnav] = useState(false)

	const showSubnav = () => {
		setSubnav(!subnav)
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
						'Authorization': `Bearer ${token}`
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

	return (
		<div>
			<Link className={style.sidebarlink} to={item.link} onClick={item.subNav ? showSubnav : () => handleClick(item.title)} >
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
			{subnav && item.subNav.map((item, index) => {
				return (
					<Link className={style.sidebarlink} to={item.link} key={index} >
						<span className={style.sidebarlabel}>
							{item.title}
						</span>
					</Link>
				)
			})}
		</div>
	)
}

export default SidebarMenu