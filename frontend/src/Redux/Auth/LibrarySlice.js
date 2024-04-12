import {createSlice} from '@reduxjs/toolkit'

const LibrarySlice = createSlice({
    name:'library',
    initialState:{
            name:null,
            isAuthenticated:false,
            isAdmin:'False'
    },
    reducers:{
        set_Authenticate:(state,action) =>{
            state.name=action.payload.first_name
            state.isAuthenticated=action.payload.isAuth
            state.isAdmin=action.payload.isAdmin
        }
    }
})

export const {set_Authenticate} = LibrarySlice.actions;
export default LibrarySlice.reducer;