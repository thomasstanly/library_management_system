import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import style from './PublisherHeader.module.scss'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


const PublisherHeader = () => {


    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" to="/library/dashboard" style={{}}>
            Dashboard
        </Link>,
        <Typography key="3" color="text.primary">
            Publisher
        </Typography>,
    ];

    return (
        <>
            <div className={style.header}>
                <div>
                </div>
                <div className={style.title}>
                    <h3>Publisher</h3>
                    <Stack spacing={2}>
                        <Breadcrumbs separator={<ArrowRightIcon />} aria-label="breadcrumb">
                            {breadcrumbs}
                        </Breadcrumbs>
                    </Stack>
                </div>
                <div className={style.button}>
                    <Link className={style.link} to='/library/publisher/add_publisher'><button>+ Add New Publisher</button></Link>
                </div>
            </div>
        </>
    )
}

export default PublisherHeader