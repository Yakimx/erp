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

    setValueNotConfirmed: (state, action) => {
      let { value, indexDay, contractNumber, indexProduct, type, maxValue } =
        action.payload;
      value = +value > +maxValue ? +maxValue : +value < 0 ? 0 : +value;
      console.log(indexDay + "==" + indexProduct);
      state[type][indexDay].list[indexProduct].quantityMadeToday = +value;
    },

    setPlan: (state, action) => {
      const { allContracts, objResources } = action.payload;
      state.documentationPlan = calcPlan(
        allContracts,
        objResources,
        "documentation"
      );
      state.cuttingPlan = calcPlan(allContracts, objResources, "cutting");
      state.sheetBenderPlan = calcPlan(
        allContracts,
        objResources,
        "sheetBender"
      );
      state.assemblingAPlan = calcPlan(
        allContracts,
        objResources,
        "assemblingA"
      );
      state.assemblingBPlan = calcPlan(
        allContracts,
        objResources,
        "assemblingB"
      );
      state.assemblingCPlan = calcPlan(
        allContracts,
        objResources,
        "assemblingC"
      );
      state.assemblingSauPlan = calcPlan(
        allContracts,
        objResources,
        "assemblingSau"
      );
      state.automationPlan = calcPlan(allContracts, objResources, "automation");
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
  setValueNotConfirmed,
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
