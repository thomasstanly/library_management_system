import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import style from './AddCategory.module.scss'


const AddCategory = () => {

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" to="/library/dashboard" style={{}}>
            Dashboard
        </Link>,
        <Link underline="hover" key="1" color="inherit" to="/library/category" style={{}}>
            Category
        </Link>,
        <Typography key="3" color="text.primary">
            Add Category
        </Typography>,
    ];

    return (
        <>
            <form action="" className={style.form}>
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
                        <Link className={style.link} to=''><button>Cancel</button></Link>
                        <Link className={style.link} to=''><button type="submit">Save</button></Link>
                    </div>
                </div>
                <div className={style.body}>
                    <div>
                    </div>
                    <div className={style.details}>
                        <p>General Information</p>
                        <div>
                            <label className='label mt-2' htmlFor="">Category Name </label>
                            <input className='form-control mt-1' type="text" placeholder='Type category name here. . .' />
                        </div>
                        <div>
                            <label className='label mt-4 mt-1' htmlFor="">Category CODE </label>
                            <input className='form-control' type="text" placeholder='Type category code here. . .' />
                        </div>
                    </div>
                </div>
            </form>
        </>

    )
}

export default AddCategory