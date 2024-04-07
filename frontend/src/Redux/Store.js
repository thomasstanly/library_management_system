import {configureStore} from '@reduxjs/toolkit'
import LibrarySlice from './Auth/LibrarySlice'
import PatronSlice from './Patron/PatronSlice'

export const store = configureStore({
    reducer:{
        Auth_store :LibrarySlice,
        patron_detils :PatronSlice
    }
})