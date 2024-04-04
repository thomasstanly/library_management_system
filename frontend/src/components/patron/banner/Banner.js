import React from 'react'
import {useTypewriter,Cursor} from 'react-simple-typewriter'
import './banner.scss'

function Banner() {
   const [text] = useTypewriter({
      words:['Welcome to Clang Mount Library'],
      loop: 1,
   })
   return (
      <div className='banner'>
         <span className='typewriter'>{text}</span>
         <span style={{color:'#1637AC',fontSize :'5vw'}}><Cursor/></span>
      </div>
   )
}

export default Banner