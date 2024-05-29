import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../../Axios'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import style from './ListBooks.module.scss'

const ListBooks = () => {

   const navigate = useNavigate()
   const [rows, setRows] = useState([])
   const [category, setCategory] = React.useState('');

   const handleChange = (event) => {
      setCategory(event.target.value);
   };
   useEffect(() => {
      const fetchBook = async () => {
         try {
            const access_token = JSON.parse(localStorage.getItem('access'));
            const res = await axios.get(`book/`, {
               headers: {
                  Authorization: `Bearer ${access_token}`
               }
            })
            console.log(res.data)
            setRows(res.data)
         } catch (error) {
            console.log(error.response.data)
         }
      }

      const fetchData = async () => {
         try {
            const access_token = JSON.parse(localStorage.getItem('access'));
            const response = await axios.get('book/filter/', {
               headers: {
                  Authorization: `Bearer ${access_token}`
               }
            })
            const categories = response.data.category.map((cat) => ({
               ...cat,
               type: 'Category',
            }));
            const publishers = response.data.publisher.map((pub) => ({
               ...pub,
               type: 'Publisher',
            }));
            const languages = response.data.language.map((lang) => ({
               ...lang,
               type: 'Language',
            }));

            setData([...categories, ...publishers, ...languages]);
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      };

      fetchBook()
      fetchData();

   }, [])

   return (
      <>
         <div className={style.conatainer}>
            <div className={style.filter}>
               <h3>Filter</h3>
               <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={category}
                     label="Category"
                     onChange={handleChange}
                  >
                     <MenuItem value={10}>Ten</MenuItem>
                     <MenuItem value={20}>Twenty</MenuItem>
                     <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
               </FormControl>
               <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={category}
                     label="Category"
                     onChange={handleChange}
                  >
                     <MenuItem value={10}>Ten</MenuItem>
                     <MenuItem value={20}>Twenty</MenuItem>
                     <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
               </FormControl>
               <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={category}
                     label="Category"
                     onChange={handleChange}
                  >
                     <MenuItem value={10}>Ten</MenuItem>
                     <MenuItem value={20}>Twenty</MenuItem>
                     <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
               </FormControl>
            </div>
            <div className={`${style.posters} posters`} >
               {rows.map((row) => {
                  return (
                     <div key={row.id} className={style.inside} >
                        <img className={style.poster} src={row.cover} alt="poster" onClick={() => navigate(`/book_list/${row.id}`)} />
                        <h2 className={style.textOverlay} onClick={() => navigate(`/book_list/${row.id}`)}>{row.title}</h2>
                     </div>
                  );
               })}
            </div>
         </div>
      </>
   )
}

export default ListBooks