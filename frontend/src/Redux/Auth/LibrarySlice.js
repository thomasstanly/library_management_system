import {createSlice} from '@reduxjs/toolkit'

const LibrarySlice = createSlice({
    name:'library',
    initialState:{
        user_id:null,
        name:null,
        isAuthenticated:false,
        isAdmin:false
    },
    reducers:{
        set_Authenticate:(state,action) =>{
            state.user_id=action.payload.user_id
            state.name=action.payload.first_name
            state.isAuthenticated=action.payload.isAuth
            state.isAdmin=action.payload.isAdmin
        }
    }
})

export const {set_Authenticate} = LibrarySlice.actions;
export default LibrarySlice.reducer;