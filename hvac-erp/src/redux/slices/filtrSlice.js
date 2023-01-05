import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValueСustomer: "",
  searchValueContract: "",

  filtrContract: [],
};

const Matches = (allContracts, searchValueСustomer, searchValueContract) => {
  return allContracts
    .filter((contract) => {
      return contract.contractNumber.includes(searchValueContract);
    })
    .filter((contract) => {
      return contract.customer
        .toLowerCase()
        .includes(searchValueСustomer.toLowerCase());
    });
};

export const filtrSlice = createSlice({
  name: "filtr",
  initialState,

  reducers: {
    setSearchValueСustomer: (state, action) => {
      state.searchValueСustomer = action.payload;
    },
    setSearchValueContract: (state, action) => {
      state.searchValueContract = action.payload;
    },
    setFocusInput: (state, action) => {
      state.focusInput = action.payload;
    },
    sortContracts: (state, action) => {
      state.focusInput = action.payload;
    },
    searchMatches: (state, action) => {
      state.filtrContract = Matches(
        action.payload,
        state.searchValueСustomer,
        state.searchValueContract
      );
    },
  },
});

export const {
  setSearchValueСustomer,
  setSearchValueContract,
  searchMatches,
  sortContracts,
} = filtrSlice.actions;

export default filtrSlice.reducer;
