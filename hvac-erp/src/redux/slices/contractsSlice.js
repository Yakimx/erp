import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import data from "./data.js";
import { url, routes } from "../../config/routes";
import axios from "axios";
import { calcLastDate } from "../../utils/calcLastDate.js";

const initialState = {
  status: "loading", //loading | success|error
  statusUpdate: "loading", //loading | success|error
  allContracts: [],
  allContractsNoChange: [],
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
    return data.data;
  }
);

export const updatePlan = createAsyncThunk(
  "contractsSlice/updatePlan",
  async (config) => {
    const data = await axios.post(url + routes.updatePlan, { config });
    return data.data;
  }
);

export const updateNotConfirmed = createAsyncThunk(
  "contractsSlice/updateNotConfirmed",
  async (allContracts) => {

    const data = await axios.post(
      url + routes.updateNotConfirmed,
      allContracts
    );
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
    setNotConfirmed: (state, action) => {
      
      let { indexContract,
        indexItem,                     
        value,
        type } =
        action.payload;
        let maxValue = state.allContracts[indexContract].products[indexItem].quantity - state.allContracts[indexContract].products[indexItem].quantityMade[type]
        value = +value > +maxValue ? +maxValue : +value < 0 ? 0 : +value;
   
       state.allContracts[indexContract].products[indexItem].quantityNotConfirmed[type] = value;
      
      // let plan = action.payload;
      // console.log(plan)
      // plan.map((item)=>{
      //   state.allContracts.map((contract, indexContract)=>{
      //       contract.products.map((product, indexProduct)=>{
      //         if(item.id==product._id){
      //           state.allContracts[indexContract].products[indexProduct].quantityNotConfirmed[key]=
      //           state.allContracts[indexContract].products[indexProduct].quantityNotConfirmed[key] + 
      //         }
      //       })
      //       })
      //   item.id

      // })

      // let plan = action.payload;
      
      // state.allContracts.map((contract, indexContract)=>{
      //   contract.products.map((product, indexProduct)=>{
      //     for(let key in product.quantityNotConfirmed){
            
      //         let idProduct = state.allContracts[indexContract].products[indexProduct]._id;
      //         console.log(idProduct)
      //         console.log(plan.find((item)=>item.id==idProduct?true:false))
      //         state.allContracts[indexContract].products[indexProduct].quantityNotConfirmed[key]=
      //         state.allContracts[indexContract].products[indexProduct].quantityNotConfirmed[key] + 
      //         plan.find((item)=>item.id==idProduct?true:false).quantityMadeToday
              
      //       }
      // })
      // })
     
      
    },

    setDocValue: (state, action) => {
      let value = +action.payload.value;
      let maxValue = +action.payload.maxValue;
      value = +value > +maxValue ? +maxValue : +value < 0 ? 0 : +value;
      state.activeContract.contract.products[
        action.payload.index
      ].quantityMade.documentation = +value;
    },
    setCutValue: (state, action) => {
      let value = +action.payload.value;
      let maxValue = +action.payload.maxValue;
      value = +value > +maxValue ? +maxValue : +value < 0 ? 0 : +value;
      state.activeContract.contract.products[
        action.payload.index
      ].quantityMade.cutting = +value;
    },
    setSheetValue: (state, action) => {
      let value = +action.payload.value;
      let maxValue = +action.payload.maxValue;
      value = +value > +maxValue ? +maxValue : +value < 0 ? 0 : +value;
      state.activeContract.contract.products[
        action.payload.index
      ].quantityMade.sheetBender = +value;
    },
    setAssemAValue: (state, action) => {
      let value = +action.payload.value;
      let maxValue = +action.payload.maxValue;
      value = +value > +maxValue ? +maxValue : +value < 0 ? 0 : +value;
      state.activeContract.contract.products[
        action.payload.index
      ].quantityMade.assemblingA = +value;
    },
    setAssemBValue: (state, action) => {
      let value = +action.payload.value;
      let maxValue = +action.payload.maxValue;
      value = +value > +maxValue ? +maxValue : +value < 0 ? 0 : +value;
      state.activeContract.contract.products[
        action.payload.index
      ].quantityMade.assemblingB = +value;
    },
    setAssemCValue: (state, action) => {
      let value = +action.payload.value;
      let maxValue = +action.payload.maxValue;
      value = +value > +maxValue ? +maxValue : +value < 0 ? 0 : +value;
      state.activeContract.contract.products[
        action.payload.index
      ].quantityMade.assemblingC = +value;
    },
    setAssemSauValue: (state, action) => {
      let value = +action.payload.value;
      let maxValue = +action.payload.maxValue;
      value = +value > +maxValue ? +maxValue : +value < 0 ? 0 : +value;
      state.activeContract.contract.products[
        action.payload.index
      ].quantityMade.assemblingSau = +value;
    },

    setAutoValue: (state, action) => {
      let value = +action.payload.value;
      let maxValue = +action.payload.maxValue;
      value = +value > +maxValue ? +maxValue : +value < 0 ? 0 : +value;
      state.activeContract.contract.products[
        action.payload.index
      ].quantityMade.automation = +value;
    },

    setDocValueLab: (state, action) => {
      state.activeContract.contract.products[
        action.payload.index
      ].resourcesRequired.documentation = +action.payload.value;
    },
    setCutValueLab: (state, action) => {
      state.activeContract.contract.products[
        action.payload.index
      ].resourcesRequired.cutting = +action.payload.value;
    },
    setSheetValueLab: (state, action) => {
      state.activeContract.contract.products[
        action.payload.index
      ].resourcesRequired.sheetBender = +action.payload.value;
    },
    setAssemAValueLab: (state, action) => {
      state.activeContract.contract.products[
        action.payload.index
      ].resourcesRequired.assemblingA = +action.payload.value;
    },
    setAssemBValueLab: (state, action) => {
      state.activeContract.contract.products[
        action.payload.index
      ].resourcesRequired.assemblingB = +action.payload.value;
    },
    setAssemCValueLab: (state, action) => {
      state.activeContract.contract.products[
        action.payload.index
      ].resourcesRequired.assemblingC = +action.payload.value;
    },
    setAssemSauValueLab: (state, action) => {
      state.activeContract.contract.products[
        action.payload.index
      ].resourcesRequired.assemblingSau = +action.payload.value;
    },

    setAutoValueLab: (state, action) => {
      state.activeContract.contract.products[
        action.payload.index
      ].resourcesRequired.automation = +action.payload.value;
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
  brakeChanges,
  setNotConfirmed,
  setDocValue,
  setCutValue,
  setSheetValue,
  setAssemAValue,
  setAssemBValue,
  setAssemCValue,
  setAssemSauValue,
  setAutoValue,
  setDocValueLab,
  setCutValueLab,
  setSheetValueLab,
  setAssemAValueLab,
  setAssemBValueLab,
  setAssemCValueLab,
  setAssemSauValueLab,
  setAutoValueLab,
} = contractsSlice.actions;

export default contractsSlice.reducer;
