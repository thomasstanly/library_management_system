import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import style from './AddLanguage.module.scss'

const AddLanguage = () => {
   const breadcrumbs = [
      <Link underline="hover" key="1" color="inherit" to="/library/dashboard" style={{}}>
         Dashboard
      </Link>,
      <Link underline="hover" key="1" color="inherit" to="/library/language" style={{}}>
         Language
      </Link>,
      <Typography key="3" color="text.primary">
         Add Language
      </Typography>,
   ];

   return (
      <>
         <form action="" className={style.form}>
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
                     <label className='label mt-2' htmlFor="">Language </label>
                     <input className='form-control mt-1' type="text" placeholder='Type language here. . .' />
                  </div>
               </div>
            </div>
         </form>
      </>

   )
}

export default AddLanguage