import { createSlice } from "@reduxjs/toolkit";
import { calcPlan } from "../../utils/calcPlan";

const initialState = {
  disabledInput: true,
  documentationPlan: [],
  cuttingPlan: [],
  sheetBenderPlan: [],
  assemblingAPlan: [],
  assemblingBPlan: [],
  assemblingCPlan: [],
  assemblingSauPlan: [],
  automationPlan: [],
};

export const planSlice = createSlice({
  name: "plan",
  initialState,

  reducers: {
    setDisabledInput: (state, action) => {
      state.disabledInput = action.payload;
    },
    setPlan: (state, action) => {
      state.documentationPlan = calcPlan(action.payload);
      // state.cuttingPlan = action.payload;
      // state.sheetBenderPlan = action.payload;
      // state.assemblingAPlan = action.payload;
      // state.assemblingBPlan = action.payload;
      // state.assemblingCPlan = action.payload;
      // state.assemblingSauPlan = action.payload;
      // state.automationPlan = action.payload;
    },
    setValueDocumentationInput: (state, action) => {
      const { value, indexProduct, indexContract, indexDay } = action.payload;
      state.documentationPlan[indexDay].listPlan[indexContract].products[
        indexProduct
      ].quantityMadeToday = value;
    },
    setValueCuttingInput: (state, action) => {
      const { value, indexProduct, indexContract, indexDay } = action.payload;
      state.cuttingPlan[indexDay].listPlan[indexContract].products[
        indexProduct
      ].quantityMadeToday = value;
    },
    setValueSheetBenderInput: (state, action) => {
      const { value, indexProduct, indexContract, indexDay } = action.payload;
      state.sheetBenderPlan[indexDay].listPlan[indexContract].products[
        indexProduct
      ].quantityMadeToday = value;
    },
    setValueAssemblingAInput: (state, action) => {
      const { value, indexProduct, indexContract, indexDay } = action.payload;
      state.assemblingAPlan[indexDay].listPlan[indexContract].products[
        indexProduct
      ].quantityMadeToday = value;
    },
    setValueAssemblingBInput: (state, action) => {
      const { value, indexProduct, indexContract, indexDay } = action.payload;
      state.assemblingBPlan[indexDay].listPlan[indexContract].products[
        indexProduct
      ].quantityMadeToday = value;
    },
    setValueAssemblingCInput: (state, action) => {
      const { value, indexProduct, indexContract, indexDay } = action.payload;
      state.assemblingCPlan[indexDay].listPlan[indexContract].products[
        indexProduct
      ].quantityMadeToday = value;
    },
    setValueAssemblingSauInput: (state, action) => {
      const { value, indexProduct, indexContract, indexDay } = action.payload;
      state.assemblingSauPlan[indexDay].listPlan[indexContract].products[
        indexProduct
      ].quantityMadeToday = value;
    },
    setValueAutomationInput: (state, action) => {
      const { value, indexProduct, indexContract, indexDay } = action.payload;
      state.automationPlan[indexDay].listPlan[indexContract].products[
        indexProduct
      ].quantityMadeToday = value;
    },

    saveValue: (state, action) => {},
    updateValue: (state, action) => {},
  },
});

export const {
  setDisabledInput,
  setPlan,
  saveValue,
  updateValue,
  setValueInput,
  setValueDocumentationInput,
  setValueCuttingInput,
  setValueSheetBenderInput,
  setValueAssemblingAInput,
  setValueAssemblingBInput,
  setValueAssemblingCInput,
  setValueAssemblingSauInput,
  setValueAutomationInput,
} = planSlice.actions;

export default planSlice.reducer;
