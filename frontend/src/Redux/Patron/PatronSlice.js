import {createSlice} from '@reduxjs/toolkit'

const UserDetails = createSlice({
    name:'patron',
    initialState:{
        patron_id:null,
        email:null,
        phone:null,
        first_name:null,
        last_name:null,
        profile_pic:null,
        plan:null,
    },
    reducers:{
        get_UserDetails:(state,action)=>{
            state.patron_id=action.payload.patron_id
            state.email=action.payload.email
            state.phone=action.payload.phone
            state.first_name=action.payload.first_name
            state.last_name=action.payload.last_name
            state.profile_pic=action.payload.profile_pic
            state.plan = action.payload.plan
        }
    }
})

export const   {get_UserDetails} = UserDetails.actions
export default UserDetails.reducer