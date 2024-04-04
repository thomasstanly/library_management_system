import React from 'react'
import {Route,Routes} from 'react-router-dom'
import PatronHomePage from './patron/PatronHomePage'
import PatronSingUp from './patron/PatronSingUp'
import PatronLogin from './patron/PatronLogin'

function PatronWrapper() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<PatronHomePage/>} />
            <Route path='/signup' element={<PatronSingUp/>}/>
            <Route path='/login' element={<PatronLogin/>}/>
        </Routes>
    </div>
  )
}

export default PatronWrapper