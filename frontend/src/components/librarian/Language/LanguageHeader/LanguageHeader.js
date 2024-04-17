import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import style from './LanguageHeader.module.scss'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const LanguageHeader = () => {


    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" to="/library/dashboard" style={{}}>
            Dashboard
        </Link>,
        <Typography key="3" color="text.primary">
            Language
        </Typography>,
    ];

    return (
        <>
            <div className={style.header}>
                <div>
                </div>
                <div className={style.title}>
                    <h3>Language</h3>
                    <Stack spacing={2}>
                        <Breadcrumbs separator={<ArrowRightIcon />} aria-label="breadcrumb">
                            {breadcrumbs}
                        </Breadcrumbs>
                    </Stack>
                </div>
                <div>
                    <Link className={style.link} to='/library/language/add_language'><button>+ Add New Language</button></Link>
                </div>
            </div>
        </>
    )
}

export default LanguageHeader