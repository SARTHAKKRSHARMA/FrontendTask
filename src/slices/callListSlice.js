import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    callList : [],
    loading : false
}

export const callListSlice = createSlice({
    name: "callList",
    initialState,
    reducers:{
        setCallList : (state, action) => {
            state.callList = action.payload;
        },
        setLoading : (state, action) => {
            state.loading=action.payload;
        }
    }
})

export const {setCallList, setLoading} = callListSlice.actions;
export default callListSlice.reducer;



