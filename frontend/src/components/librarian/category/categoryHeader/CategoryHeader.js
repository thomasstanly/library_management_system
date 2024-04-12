import {Link} from 'react-router-dom'
import style from './categoryHeader.module.scss'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const CategoryHeader = () => {

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/library/dashboard" style={{}}>
            Dashboard
        </Link>,
        <Typography key="3" color="text.primary">
            Category
        </Typography>,
    ];

    return (
        <>
            <div className={style.header}>
                <div>
                </div>
                <div className={style.title}>
                    <h3>Categories</h3>
                    <Stack spacing={2}>
                        <Breadcrumbs separator={<ArrowRightIcon />} aria-label="breadcrumb">
                            {breadcrumbs}
                        </Breadcrumbs>
                    </Stack>
                </div>
                <div>
                    <Link className={style.link} to='/library/category/add_category'><button>+ Add New Category</button></Link>
                </div>
            </div>
        </>
    )
}

export default CategoryHeader