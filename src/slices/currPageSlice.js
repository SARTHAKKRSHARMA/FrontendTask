import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currPage : "inbox",
    currPageCallList : []
}

export const currPageCallListSlice = createSlice({
    name: "currPage",
    initialState,
    reducers:{
        setCurrPageCallList : (state, action) => {
            state.currPageCallList = action.payload;
        },
        setCurrPage : (state, action) => {
            state.currPage=action.payload;
        }
    }
})

export const {setCurrPageCallList, setCurrPage} = currPageCallListSlice.actions;
export default currPageCallListSlice.reducer;
