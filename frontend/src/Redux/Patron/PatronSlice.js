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
        plan_expiry:null,
    },
    reducers:{
        get_UserDetails:(state,action)=>{
            Object.assign(state, action.payload);
        }
    }
})

export const {get_UserDetails} = UserDetails.actions
export default UserDetails.reducer