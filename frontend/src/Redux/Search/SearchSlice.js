import { createSlice } from "@reduxjs/toolkit";


const SearchSlice = createSlice({
    name:'search',
    initialState:{
        'query':''
    },
    reducers:{
        setQuery:(state, action)=>{
            state.query = action.payload.query
        }
    },
})

export const {setQuery} = SearchSlice.actions;
export default SearchSlice.reducer;