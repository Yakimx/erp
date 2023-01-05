import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import data from "./data.js";
import { url, routes } from "../../config/routes";
import axios from "axios";
import { calcLastDate } from "../../utils/calcLastDate.js";

const initialState = {
  status: "loading", //loading | success|error
  statusUpdate: "loading", //loading | success|error
  allContracts: [],
  lastСontractDate: "2099-01-02",
  activeContract: {
    number: 0,
    contract: null,
  },
};

export const fetchContracts = createAsyncThunk(
  "contractsSlice/fetchContracts",
  async () => {
    const data = await axios.get(url + routes.getContracts);
    return data.data;
  }
);

export const updateContract = createAsyncThunk(
  "contractsSlice/updateContract",
  async (contract) => {
    const data = await axios.post(url + routes.updateContract, contract);
    console.log(data.data);
    return data.data;
  }
);

export const contractsSlice = createSlice({
  name: "contracts",
  initialState,

  reducers: {
    setActiveContract: (state, action) => {
      state.activeContract.number = action.payload;
      state.activeContract.contract = state.allContracts.find(
        (item) => item.contractNumber == state.activeContract.number
      );
    },
    brakeChanges: (state, action) => {
      state.activeContract.contract = state.allContracts.find(
        (item) => item.contractNumber == state.activeContract.number
      );
    },

    setDocValue: (state, action) => {
      state.activeContract.contract.products[
        action.payload.index
      ].quantityMade.documentation = +action.payload.value;
    },
    setCutValue: (state, action) => {
      state.activeContract.contract.products[
        action.payload.index
      ].quantityMade.cutting = +action.payload.value;
    },
    setSheetValue: (state, action) => {
      state.activeContract.contract.products[
        action.payload.index
      ].quantityMade.sheetBender = +action.payload.value;
    },
    setAssemAValue: (state, action) => {
      state.activeContract.contract.products[
        action.payload.index
      ].quantityMade.assemblingA = +action.payload.value;
    },
    setAssemBValue: (state, action) => {
      state.activeContract.contract.products[
        action.payload.index
      ].quantityMade.assemblingB = +action.payload.value;
    },
    setAssemCValue: (state, action) => {
      state.activeContract.contract.products[
        action.payload.index
      ].quantityMade.assemblingC = +action.payload.value;
    },
    setAssemSauValue: (state, action) => {
      state.activeContract.contract.products[
        action.payload.index
      ].quantityMade.assemblingSau = +action.payload.value;
    },

    setAutoValue: (state, action) => {
      state.activeContract.contract.products[
        action.payload.index
      ].quantityMade.automation = +action.payload.value;
    },
  },

  extraReducers: {
    [fetchContracts.pending]: (state, action) => {
      state.status = "loading";
      state.allContracts = "";
    },
    [fetchContracts.fulfilled]: (state, action) => {
      state.status = "success";
      state.allContracts = action.payload;
      state.lastСontractDate = calcLastDate(state.allContracts);
    },
    [fetchContracts.rejected]: (state, action) => {
      state.status = "error";
      state.allContracts = [];
    },

    [updateContract.pending]: (state, action) => {
      state.statusUpdate = "loading";
    },
    [updateContract.fulfilled]: (state, action) => {
      state.statusUpdate = "success";
      const index = state.allContracts.findIndex(
        (item) => item.contractNumber == state.activeContract.number
      );
      state.allContracts[index] = action.payload;
    },
    [updateContract.rejected]: (state, action) => {
      state.statusUpdate = "error";
    },
  },
});

export const {
  setActiveContract,
  setDocValue,
  setCutValue,
  setSheetValue,
  setAssemAValue,
  setAssemBValue,
  setAssemCValue,
  setAssemSauValue,
  setAutoValue,
  brakeChanges,
} = contractsSlice.actions;

export default contractsSlice.reducer;
