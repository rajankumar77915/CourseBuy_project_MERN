import {createSlice} from '@reduxjs/toolkit';

const initialState={
    user:null
}

export const profileSlice= createSlice({

    name:'profile',
    initialState:initialState,
    reducers:{
        Setuser(state,value){
            state.user=value.payload
        }
    }
});

export const {Setuser}=profileSlice.actions;
export default profileSlice.reducer