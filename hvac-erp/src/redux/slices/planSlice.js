import { createSlice } from "@reduxjs/toolkit";
import { calcPlan } from "../../utils/calcPlan";

const initialState = {
  disabledInput: true,
  documentation: [],
  cutting: [],
  sheetBender: [],
  assemblingA: [],
  assemblingB: [],
  assemblingC: [],
  assemblingSau: [],
  automation: [],
};

export const planSlice = createSlice({
  name: "plan",
  initialState,

  reducers: {
    setDisabledInput: (state, action) => {
      state.disabledInput = action.payload;
    },

    // setValueNotConfirmed: (state, action) => {
    //   let { value, indexDay, contractNumber, indexProduct, type, maxValue } =
    //     action.payload;
    //   value = +value > +maxValue ? +maxValue : +value < 0 ? 0 : +value;
      
    //   state[type][indexDay].list[indexProduct].quantityMadeToday = +value;
    // },

    setPlan: (state, action) => {
      const { allContracts, objResources } = action.payload;
      state.documentation = calcPlan(
        allContracts,
        objResources,
        "documentation"
      );
      state.cutting = calcPlan(allContracts, objResources, "cutting");
      state.sheetBender = calcPlan(
        allContracts,
        objResources,
        "sheetBender"
      );
      state.assemblingA = calcPlan(
        allContracts,
        objResources,
        "assemblingA"
      );
      state.assemblingB = calcPlan(
        allContracts,
        objResources,
        "assemblingB"
      );
      state.assemblingC = calcPlan(
        allContracts,
        objResources,
        "assemblingC"
      );
      state.assemblingSau = calcPlan(
        allContracts,
        objResources,
        "assemblingSau"
      );
      state.automation = calcPlan(allContracts, objResources, "automation");
    },
    // setValueDocumentationInput: (state, action) => {
    //   const { value, indexProduct, indexContract, indexDay } = action.payload;
    //   state.documentationPlan[indexDay].listPlan[indexContract].products[
    //     indexProduct
    //   ].quantityMadeToday = value;
    // },
    // setValueCuttingInput: (state, action) => {
    //   const { value, indexProduct, indexContract, indexDay } = action.payload;
    //   state.cuttingPlan[indexDay].listPlan[indexContract].products[
    //     indexProduct
    //   ].quantityMadeToday = value;
    // },
    // setValueSheetBenderInput: (state, action) => {
    //   const { value, indexProduct, indexContract, indexDay } = action.payload;
    //   state.sheetBenderPlan[indexDay].listPlan[indexContract].products[
    //     indexProduct
    //   ].quantityMadeToday = value;
    // },
    // setValueAssemblingAInput: (state, action) => {
    //   const { value, indexProduct, indexContract, indexDay } = action.payload;
    //   state.assemblingAPlan[indexDay].listPlan[indexContract].products[
    //     indexProduct
    //   ].quantityMadeToday = value;
    // },
    // setValueAssemblingBInput: (state, action) => {
    //   const { value, indexProduct, indexContract, indexDay } = action.payload;
    //   state.assemblingBPlan[indexDay].listPlan[indexContract].products[
    //     indexProduct
    //   ].quantityMadeToday = value;
    // },
    // setValueAssemblingCInput: (state, action) => {
    //   const { value, indexProduct, indexContract, indexDay } = action.payload;
    //   state.assemblingCPlan[indexDay].listPlan[indexContract].products[
    //     indexProduct
    //   ].quantityMadeToday = value;
    // },
    // setValueAssemblingSauInput: (state, action) => {
    //   const { value, indexProduct, indexContract, indexDay } = action.payload;
    //   state.assemblingSauPlan[indexDay].listPlan[indexContract].products[
    //     indexProduct
    //   ].quantityMadeToday = value;
    // },
    // setValueAutomationInput: (state, action) => {
    //   const { value, indexProduct, indexContract, indexDay } = action.payload;
    //   state.automationPlan[indexDay].listPlan[indexContract].products[
    //     indexProduct
    //   ].quantityMadeToday = value;
    // },

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
  //setValueNotConfirmed,
  // setValueDocumentationInput,
  // setValueCuttingInput,
  // setValueSheetBenderInput,
  // setValueAssemblingAInput,
  // setValueAssemblingBInput,
  // setValueAssemblingCInput,
  // setValueAssemblingSauInput,
  // setValueAutomationInput,
} = planSlice.actions;

export default planSlice.reducer;
