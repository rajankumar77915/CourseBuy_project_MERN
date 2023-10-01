import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
};

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        Setuser(state, value) {
            state.user = value.payload;
            console.log("inside slic",state.user)
            localStorage.setItem("user", JSON.stringify(value.payload))
        },
        Setloading(state, value) {
            state.loading = value.payload;
          },
    },
});

export const {Setuser, Setloading} = profileSlice.actions;
export default profileSlice.reducer;