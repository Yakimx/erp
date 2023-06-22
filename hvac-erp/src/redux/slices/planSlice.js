import { createSlice } from "@reduxjs/toolkit";
import { calcPlan } from "../../utils/calcPlan";

const initialState = {
  active: -1,
  disabledInput: true,
  areasPlan: {

  }
};

export const planSlice = createSlice({
  name: "plan",
  initialState,

  reducers: {
    setDisabledInput: (state, action) => {
      state.disabledInput = action.payload;
    },
    setActive: (state, action) => {     
      state.active = action.payload;
    },
    resetActive: (state, action) => {     
      state.active = 0;
    },

    setPlan: (state, action) => {      
      const { allContracts, objResources, areas } = action.payload;     

    
    let documentation = calcPlan(allContracts, objResources,'documentation');
    let delivery = calcPlan(allContracts, objResources,'delivery', documentation);
    let cutting = calcPlan(allContracts, objResources,'cutting', delivery);
    let sheetBender = calcPlan(allContracts, objResources,'sheetBender', cutting);
    let welding = calcPlan(allContracts, objResources,'welding', sheetBender);
    let painting = calcPlan(allContracts, objResources,'painting', welding);
    let rolling = calcPlan(allContracts, objResources,'rolling', painting);
    let balancing = calcPlan(allContracts, objResources,'balancing', rolling);
    let assemblingOP = calcPlan(allContracts, objResources,'assemblingOP', balancing);
    let assemblingBV = calcPlan(allContracts, objResources,'assemblingBV', assemblingOP);
    let assemblingMTF = calcPlan(allContracts, objResources,'assemblingMTF', assemblingBV);
    let assemblingUPKP = calcPlan(allContracts, objResources,'assemblingUPKP', assemblingMTF);
    let documentationSAU = calcPlan(allContracts, objResources,'documentationSAU');
    let deliverySAU = calcPlan(allContracts, objResources,'deliverySAU', documentationSAU );
    let assemblingSAU = calcPlan(allContracts, objResources,'assemblingSAU', deliverySAU);
      
    state.areasPlan['documentation'] = documentation;
    state.areasPlan['delivery'] = delivery;
    state.areasPlan['cutting'] = cutting;
    state.areasPlan['sheetBender'] = sheetBender;
    state.areasPlan['welding'] = welding;
    state.areasPlan['painting'] = painting;
    state.areasPlan['rolling'] = rolling;
    state.areasPlan['balancing'] = balancing;
    state.areasPlan['assemblingOP'] = assemblingOP;
    state.areasPlan['assemblingBV'] = assemblingBV;
    state.areasPlan['assemblingMTF'] = assemblingMTF;
    state.areasPlan['assemblingUPKP'] = assemblingUPKP;
    state.areasPlan['documentationSAU'] = documentationSAU;
    state.areasPlan['deliverySAU'] = deliverySAU;
    state.areasPlan['assemblingSAU'] = assemblingSAU;
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
  setActive,
  resetActive,

} = planSlice.actions;

export default planSlice.reducer;
