import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store } from './Redux/Store'
import Loader from './components/Loader'
import 'react-toastify/dist/ReactToastify.css';
import './style/global.scss'
const PatronWrapper = lazy(() => import('./Wrapper/Patron/PatronWrapper'))
const LibrarianWrapper = lazy(() => import('./Wrapper/Library/LibrarianWrapper'))


function App() {
  return (
    <>
      <Provider store={store}>
        <ToastContainer />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/*' element={<PatronWrapper />} />
            <Route path='/library/*' element={<LibrarianWrapper />} />
          </Routes>
        </Suspense>
      </Provider>

    </>
  )
}

export default App;

