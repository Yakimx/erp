import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  disabledInput: true,
};

export const contractEditorSlice = createSlice({
  name: "contractEditor",
  initialState,

  reducers: {
    setDisabledInput: (state, action) => {
      state.disabledInput = action.payload;
    },
  },
});

export const { setDisabledInput } = contractEditorSlice.actions;

export default contractEditorSlice.reducer;
