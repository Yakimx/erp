import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import data from "./data.js";
import { url, routes } from "../../config/routes";
import axios from "axios";
import { calcLastDate } from "../../utils/calcLastDate.js";

const initialState = {
  areas: [
    'documentation',    
    'cutting',
    'sheetBender',
    'welding',
    'painting',
    'rolling',
    'balancing',
    'assemblingOP',
    'assemblingBV',
    'assemblingMTF',
    'assemblingUPKP',
    'documentationSAU',    
    'assemblingSAU',
  ],
  delivery: [    
    'delivery',    
    'deliverySAU',    
  ],
  status: "loading", //loading | success|error
  statusUpdate: "loading", //loading | success|error
  allContracts: [],
  allContractsNoChange: [],
  lastСontractDate: "30.10.1991",
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
    setActiveContractDate: (state, action) => {
      // state.activeContract.contract.completionDatePlan = action.payload.completionDatePlan
      // state.activeContract.contract.startDatePlan = action.payload.startDatePlan
      
    },
    
    brakeChanges: (state, action) => {
      state.activeContract.contract = state.allContracts.find(
        (item) => item.contractNumber == state.activeContract.number
      );
    },
    setNotConfirmed: (state, action) => {
      console.log(action.payload)
      let { indexContract,
        indexItem,                     
        value,
        type } =
        action.payload;
        let maxValue = Math.round((state.allContracts[indexContract].products[indexItem].quantity - state.allContracts[indexContract].products[indexItem].quantityMade[type]) *10)/10
        value = +value > +maxValue ? +maxValue : +value < 0 ? 0 : +value;
        
   
       state.allContracts[indexContract].products[indexItem].quantityNotConfirmed[type] = value;
      
      
      
    },
    setCorrectDayUp: (state, action) => {
      let { indexContract,
        indexItem,                     
        type } =
        action.payload;
      state.allContracts[indexContract].products[indexItem].shift[type] = state.allContracts[indexContract].products[indexItem].shift[type] - 1;
    },
    setCorrectDayDown: (state, action) => {
      let { indexContract,
        indexItem,                     
        type } =
        action.payload;
      state.allContracts[indexContract].products[indexItem].shift[type] = state.allContracts[indexContract].products[indexItem].shift[type] + 1;
    },


    setDatePlan: (state, action) => {
      state.activeContract.contract.completionDatePlan = action.payload;
    },
    setDatePlan: (state, action) => {
      state.activeContract.contract.completionDatePlan = action.payload;
    },
    setTypeUpkp: (state, action) => {
      state.activeContract.contract.typeUpkp = action.payload;
    },
    setPause: (state, action) => {
      state.activeContract.contract.pause = action.payload;
    },
    setEquipment: (state, action) => {
      state.activeContract.contract.equipment = action.payload;
    },
    setEquipmentDate: (state, action) => {
      state.activeContract.contract.equipmentDate = action.payload;
    },
    setShipped: (state, action) => {
      state.activeContract.contract.shipped = action.payload;
    },
    

    setValueQuantityMade: (state, action) => {      
      let {value, index, maxValue, target} = action.payload;

      value = +value;
      maxValue = +maxValue;
      value = +value > +maxValue ? +maxValue : +value < 0 ? 0 : +value;
      state.activeContract.contract.products[
        action.payload.index
      ].quantityMade[target] = +value;
      
    },

    setDeliveryDate: (state, action) => {      
      let {value, index, target} = action.payload;
      let date = value == "" ? 0 : Date.parse(value.split(".").reverse().join("."));
      
      
      state.activeContract.contract.products[index].delivery[target] = date;
    },
    setStartDate: (state, action) => {      
      let value = action.payload;
      let date = value == "" ? 0 : value;      
      state.activeContract.contract.startDate = date;
    },
    setCompletionDateContract: (state, action) => {      
      let value = action.payload;
      let date = value == "" ? 0 : value;      
      state.activeContract.contract.completionDateContract = date;
    },




    setValueLab: (state, action) => {
      let {value, index, key} = action.payload;

      let maxValue = 20;
      value = +value > +maxValue ? +maxValue : +value < 0 ? 0 : +value;

      state.activeContract.contract.products[
        index
      ].resourcesRequired[key] = +value;
    },

    resetValue: (state, action) => {
    const {laboriousness, contract} = action.payload;
    
    contract.products.map((product, id)=>{
       let labItem = laboriousness.find((item)=> item.code == product.code);

       if(!labItem){
       labItem = {}
       labItem.areas = {...state.activeContract.contract.products[id].resourcesRequired};
       for(let key in labItem.areas){            
        labItem.areas[key] = -1;            
        }
      }

      state.activeContract.contract.products[id].resourcesRequired = labItem.areas;       
      })
    
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
  setValueQuantityMade,
  setDeliveryDate,
  setValueLab,
  setDatePlan,
  setTypeUpkp,
  setPause,
  setEquipment,
  setEquipmentDate,
  setCorrectDayUp,
  setCorrectDayDown,
  setShipped,
  setActiveContractDate,
  resetValue,
  setStartDate,
  setCompletionDateContract,
} = contractsSlice.actions;

export default contractsSlice.reducer;
