import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTabListTab: 0,
  activeTabTask: 0,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,

  reducers: {
    setActiveTabListTab: (state, action) => {
      state.activeTabListTab = action.payload;
    },
    setActiveTabTask: (state, action) => {
      state.activeTabTask = action.payload;
    },
  },
});

export const { setActiveTabListTab, setActiveTabTask } = menuSlice.actions;

export default menuSlice.reducer;
