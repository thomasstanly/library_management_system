import {configureStore} from '@reduxjs/toolkit'
import LibrarySlice from './Auth/LibrarySlice'
import PatronSlice from './Patron/PatronSlice'
import SearchSlice from './Search/SearchSlice'

export const store = configureStore({
    reducer:{
        Auth_store :LibrarySlice,
        patron_detils :PatronSlice,
        Search_bar:SearchSlice,
    }
})