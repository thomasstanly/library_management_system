import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store } from './Redux/Store'
import PatronWrapper from './pages/PatronWrapper'
import LibrarianWrapper from './pages/LibrarianWrapper'
import 'react-toastify/dist/ReactToastify.css';


import './style/global.scss'

function App() {
  return (
    <div>
      <ToastContainer />
      <Provider store={store}>
        <Routes>
          <Route path='/*' element={<PatronWrapper />} />
          <Route path='library/*' element={<LibrarianWrapper />} />
        </Routes>
      </Provider>

    </div>
  )
}

export default App;

