import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../../Axios'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import style from './ListBooks.module.scss'

const ListBooks = () => {

   const navigate = useNavigate()
   const [rows, setRows] = useState([])
   const [category, setCategory] = useState('');
   const [publisher, setPublisher] = useState('');
   const [language, setLanguage] = useState('');
   const [data, setData] = useState({ categories: [], publishers: [], languages: [] });
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const handleCategoryChange = async (event) => {
      setCategory(event.target.value);
      setLoading(true);
      setError(null);
      try {
         const access_token = JSON.parse(localStorage.getItem('access'));
         const res = await axios.get(`book/after_filter/?category=${event.target.value}&publisher=${publisher}&language=${language}`, {
            headers: {
               Authorization: `Bearer ${access_token}`
            }
         })
         console.log(res.data)
         setRows(res.data)
      } catch (error) {
         setError(error.response?.data?.error || 'An error occurred');
      } finally {
         setLoading(false);
      }
   };

   const handlePublisherChange = async (event) => {
      setPublisher(event.target.value);
      console.log()
      try {
         const access_token = JSON.parse(localStorage.getItem('access'));
         const res = await axios.get(`book/after_filter/?category=${category}&publisher=${event.target.value}&language=${language}`, {
            headers: {
               Authorization: `Bearer ${access_token}`
            }
         })
         console.log(res.data)
         setRows(res.data)
      } catch (error) {
         setError(error.response?.data?.error || 'An error occurred');
      } finally {
         setLoading(false);
      }
   };

   const handleLanguageChange = async (event) => {
      setLanguage(event.target.value);
      try {
         const access_token = JSON.parse(localStorage.getItem('access'));
         const res = await axios.get(`book/after_filter/?category=${category}&publisher=${publisher}&language=${event.target.value}`, {
            headers: {
               Authorization: `Bearer ${access_token}`
            }
         })
         console.log(res.data)
         setRows(res.data)
      } catch (error) {
         setError(error.response?.data?.error || 'An error occurred');
      } finally {
         setLoading(false);
      }
   };
   const fetchBook = async () => {
      try {
         const access_token = JSON.parse(localStorage.getItem('access'));
         const res = await axios.get(`book_variant_list/`, {
            headers: {
               Authorization: `Bearer ${access_token}`
            }
         })
         console.log(res.data)
         setRows(res.data)
      } catch (error) {
         setError(error.response?.data?.error || 'An error occurred');
      } finally {
         setLoading(false);
      }
   }

   const handleClear = () => {
      setCategory('');
      setPublisher('');
      setLanguage('');
      fetchBook()
   }

   useEffect(() => {

      const fetchData = async () => {
         try {
            const access_token = JSON.parse(localStorage.getItem('access'));
            const response = await axios.get('book/filter/', {
               headers: {
                  Authorization: `Bearer ${access_token}`
               }
            })
            setData({
               categories: response.data.category,
               publishers: response.data.publisher,
               languages: response.data.language
            });
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
               <h4>Filter By <FilterAltIcon /></h4>
               <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="category-select-label">Category</InputLabel>
                  <Select
                     labelId="category-select-label"
                     id="category-select"
                     value={category}
                     label="Category"
                     onChange={handleCategoryChange}
                  >
                     {data.categories.map((cat) => (
                        <MenuItem key={cat.id} value={cat.id}>
                           {cat.category_name}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
               <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="publisher-select-label" sx={{ mt: 2 }}>Publisher</InputLabel>
                  <Select
                     labelId="publisher-select-label"
                     id="publisher-select"
                     value={publisher}
                     label="Publisher"
                     onChange={handlePublisherChange}
                     sx={{ mt: 2 }}
                  >
                     {data.publishers.map((pub) => (
                        <MenuItem key={pub.id} value={pub.id}>
                           {pub.publisher_name}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
               <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="language-select-label" sx={{ mt: 2 }}>Language</InputLabel>
                  <Select
                     labelId="language-select-label"
                     id="language-select"
                     value={language}
                     label="Language"
                     onChange={handleLanguageChange}
                     sx={{ mt: 2 }}
                  >
                     {data.languages.map((lang) => (
                        <MenuItem key={lang.id} value={lang.id}>
                           {lang.language}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
               <div>
                  <button className={style.filter_button} onClick={handleClear}>
                     clear <FilterAltOffIcon />
                  </button>
               </div>
            </div>
            {loading ? (
               <div className={style.loading}>
                  <CircularProgress />
               </div>
            ) : error ? (
               <div className={style.error}>{error}</div>
            ) : rows.length === 0 ? (
               <div className={style.noResult}>No Results Found</div>
            ) : (
               <div className={`${style.posters} posters`}>
                  {rows.map((row) => (
                     <div key={row.id} className={style.inside}>
                        <img
                           className={style.poster}
                           src={row.book.cover}
                           alt="poster"
                           onClick={() => navigate(`/book_list/${row.book.id}`)}
                        />
                        <h2 className={style.textOverlay} onClick={() => navigate(`/book_list/${row.book.id}`)}>
                           {row.book.title}
                        </h2>
                        <p>{row.language.language}</p>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </>
   )
}

export default ListBooks