import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReportIcon from '@mui/icons-material/Report';
import PeopleIcon from '@mui/icons-material/People';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import LogoutIcon from '@mui/icons-material/Logout';

export const siderbarData = [
    {
        title: "dashboard",
        icon: <HomeIcon />,
        link: '/library/dashboard'

    },
    {
        title: "Book",
        icon: <MenuBookIcon />,
        link: null,
        arrowdown: <KeyboardArrowDownIcon />,
        arrowup: <KeyboardArrowUpIcon />,
        subNav: [
            {
                title: "Book List",
                link: '/library/books'
            },
            {
                title: "Category List",
                link: '/library/category'
            },
            {
                title: "Language List",
                link: '/library/language'
            },
            {
                title: "Publisher List",
                link: '/library/publisher'
            }
        ]
    },
    {
        title: "Transaction",
        icon: <AccountBalanceIcon />,
        link: '/transaction'
    },
    {
        title: "Report",
        icon: <ReportIcon />,
        link: null,
        arrowdown: <KeyboardArrowDownIcon />,
        arrowup: <KeyboardArrowUpIcon />,
        subNav: [
            {
                title: "Circulation report",
                link: '/library/report/circulation_report',
            },
            {
                title: "fine report",
                link: '/library/report/fine_report',
            },
            {
                title: "category reportt",
                link: '/library/report/category_report',
            }
        ]
    },
    {
        title: "Patron",
        icon: <PeopleIcon />,
        link: '/library/patron'
    },
    {
        title:"Membership Plan",
        icon:<CardMembershipIcon/>,
        link:'/library/membership'
    },
    {
        title: "Logout",
        icon: <LogoutIcon />,
    },
]