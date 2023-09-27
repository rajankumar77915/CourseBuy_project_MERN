import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token: localStorage.getItem('token') ?JSON.stringify(localStorage.getItem('token')):null,
    signupData:null,
    loading:false
  }

  export const AuthSlice=createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        Settoken(state,value){
             state.token=value.payload;
        },
        SetsignupData(state,value){
            state.signupData=value.payload;
        },
        Setloading(state,value){
            state.loading=value.payload
        }
    }
  })


  export const {Settoken,SetsignupData,Setloading}= AuthSlice.actions;
  export default AuthSlice.reducer