import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { set_Authenticate } from '../Redux/Auth/LibrarySlice'
import { SidebarProvider } from '../Context/sidebartoggle'
//import axios from 'axios'
import LibrarianLogin from '../pages/librarian/LibrarianLogin'
import LibrarainLanding from '../pages/librarian/LibrarainLanding'
import AddCategoryPage from './librarian/Category/AddCategoryPage'
import CategoryListPage from './librarian/Category/CategoryListPage'
import AddLanguagePage from './librarian/Language/AddLanguagePage'
import LanguageListPage from './librarian/Language/LanguageListPage'
import AddPublisherpage from './librarian/Publisher/AddPublisherpage'
import PublisherListPage from './librarian/Publisher/PublisherListPage'
import AddBookpage from './librarian/book/AddBookpage'
import BookListPage from './librarian/book/BookListPage'
import LibraryAuth from '../utils/LibraryAuth'
import LibraryRouter from './LibraryRouter'


function PatronWrapper() {
   const { name } = useSelector((state) => state.Auth_store)
   const dispatch = useDispatch()
   useEffect(() => {
      const check = async () => {
         const result = await LibraryAuth()
         console.log(result)
         dispatch(
            set_Authenticate({

               first_name: result.firstname,
               isAuth: result.isAuthenticated,
               isAdmin: result.isAdmin

            })
         )
      }
      if (!name) {
         check()
      }

   }, [name, dispatch])
   return (
      <div>
         <SidebarProvider>
            <Routes>
               <Route path='/' element={<LibrarianLogin />} />
               <Route path='/dashboard' element={<LibrarainLanding />} />
               <Route path='/category' element={<CategoryListPage />} />
               <Route path='/category/add_category' element={<AddCategoryPage />} />
               <Route path='/language' element={<LanguageListPage />} />
               <Route path='/language/add_language' element={<AddLanguagePage />} />
               <Route path='/publisher' element={<PublisherListPage/>} />
               <Route path='/publisher/add_publisher' element={<AddPublisherpage/>} />
               <Route path='/books' element={<BookListPage/>} />
               <Route path='/books/add_book' element={<AddBookpage/>} />
            </Routes>
         </SidebarProvider>


      </div>
   )
}

export default PatronWrapper