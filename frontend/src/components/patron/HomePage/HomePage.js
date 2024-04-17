import React, { useEffect, useState } from 'react'
import axios from '../../../Axios'
import style from './HomePage.module.scss'

const HomePage = () => {
   const [rows, setRows] = useState([]);

   useEffect(() => {
      const fetchBook = async () => {
         try {
            const access_token = JSON.parse(localStorage.getItem('access'));
            const res = await axios.get(`book/`, )
            console.log(res.data)
            setRows(res.data)

         } catch (error) {
            console.log(error.response.data)
         }
      }
      fetchBook()

   }, [])

   return (
      <div className={style.row}>
         <h1>Recent</h1>
         <div className={style.posters}>
            {rows.map((row) => {
               let image = `http://127.0.0.1:8000${row.cover}`;
               return (
                  <div key={row.id} className={style.inside}>
                     <img className={style.poster} src={image} alt="poster" />
                     <h2 className={style.textOverlay}>{row.title}</h2>
                  </div>
               );
            })}
         </div>
      </div>
   )
}

export default HomePage