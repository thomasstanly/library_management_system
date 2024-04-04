import {Routes, Route } from 'react-router-dom'
import './style/global.scss'
import PatronWrapper from './pages/PatronWrapper'
import LibrarianWrapper from './pages/LibrarianWrapper'

  function App() {
    return (
      <div>
          <Routes>
            <Route path='/*' element={<PatronWrapper/>}/>
            <Route path='library/*' element={<LibrarianWrapper/>}/>
          </Routes>
      </div>
    )
  }

export default App;

