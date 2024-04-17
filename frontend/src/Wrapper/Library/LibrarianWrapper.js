import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { set_Authenticate } from '../../Redux/Auth/LibrarySlice'
import { SidebarProvider } from '../../Context/sidebartoggle'
//import axios from 'axios'
import LibrarianLogin from '../../pages/librarian/LibrarianLogin'
import LibrarainLanding from '../../pages/librarian/LibrarainLanding'
import AddCategoryPage from '../../pages/librarian/Category/AddCategoryPage'
import CategoryListPage from '../../pages/librarian/Category/CategoryListPage'
import AddLanguagePage from '../../pages/librarian/Language/AddLanguagePage'
import LanguageListPage from '../../pages/librarian/Language/LanguageListPage'
import AddPublisherpage from '../../pages/librarian/Publisher/AddPublisherpage'
import PublisherListPage from '../../pages/librarian/Publisher/PublisherListPage'
import AddBookpage from '../../pages/librarian/book/AddBookpage'
import BookListPage from '../../pages/librarian/book/BookListPage'
import BookDetailsPage from '../../pages/librarian/book/BookDetailsPage'
import BookAddCountPage from '../../pages/librarian/book/BookAddCountPage'
import LibraryAuth from '../../utils/LibraryAuth'
import LibraryRouter from '../../Router/Library/LibraryRouter'
import LibraryLoginRouter from '../../Router/Library/LibraryLoginRouter'


function LibrarianWrapper() {
   const { name } = useSelector((state) => state.Auth_store)
   const dispatch = useDispatch()

   const check = async () => {
     try{
      const result = await LibraryAuth()
      console.log(result)
      dispatch(
         set_Authenticate({

            first_name: result.first_name,
            isAuth: result.isAuthenticated,
            isAdmin: result.isAdmin

         })
      )
     }catch(error){
      console.log(error)
     }
   }

   useEffect(() => {
      if (!name) {
         check()
      }

   }, [])
   return (
 
         <SidebarProvider>
            <Routes>
               <Route path='/' element={<LibraryLoginRouter><LibrarianLogin /></LibraryLoginRouter>} />
               <Route path='/dashboard' element={<LibraryRouter><LibrarainLanding /></LibraryRouter>} />
               <Route path='/category' element={<LibraryRouter><CategoryListPage /></LibraryRouter>} />
               <Route path='/category/add_category' element={<LibraryRouter><AddCategoryPage /></LibraryRouter>} />
               <Route path='/language' element={<LibraryRouter><LanguageListPage /></LibraryRouter>} />
               <Route path='/language/add_language' element={<LibraryRouter><AddLanguagePage /></LibraryRouter>} />
               <Route path='/publisher' element={<LibraryRouter><PublisherListPage /></LibraryRouter>} />
               <Route path='/publisher/add_publisher' element={<LibraryRouter><AddPublisherpage /></LibraryRouter>} />
               <Route path='/books' element={<LibraryRouter><BookListPage /></LibraryRouter>} />
               <Route path='/books/add_book' element={<LibraryRouter><AddBookpage /></LibraryRouter>} />
               <Route path='/books/:id' element={<LibraryRouter><BookDetailsPage /></LibraryRouter>} />
               <Route path='/books/:id/add' element={<LibraryRouter><BookAddCountPage /></LibraryRouter>} />
            </Routes>
         </SidebarProvider>

   )
}

export default LibrarianWrapper