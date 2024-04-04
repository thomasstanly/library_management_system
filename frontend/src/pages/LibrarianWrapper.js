import React from 'react'
import {Route,Routes} from 'react-router-dom'
import LibrarianLogin from '../pages/librarian/LibrarianLogin'

function PatronWrapper() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<LibrarianLogin/>} />
        </Routes>
    </div>
  )
}

export default PatronWrapper