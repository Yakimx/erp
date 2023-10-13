import { createSlice } from "@reduxjs/toolkit";
import { calcPlan } from "../../utils/calcPlan";
import { calcPlanDelivery } from "../../utils/calcPlanDelivery";

const initialState = {
  active: -1,
  disabledInput: true,
  lastTime: 0,
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

    
    let documentation = calcPlan(false, allContracts, objResources,'documentation');
    let delivery = calcPlanDelivery(true, allContracts, objResources,'op', 'delivery');
    let cutting = calcPlan(false, allContracts, objResources,'cutting', [delivery, documentation]);
    let sheetBender = calcPlan(false, allContracts, objResources,'sheetBender', [cutting, delivery, documentation]);
    let welding = calcPlan(false, allContracts, objResources,'welding', [sheetBender, cutting, delivery, documentation]);
    let painting = calcPlan(false, allContracts, objResources,'painting', [welding, sheetBender, cutting, delivery, documentation]);
    let rolling = calcPlan(false, allContracts, objResources,'rolling', [painting, welding, sheetBender, cutting, delivery, documentation]);
    let balancing = calcPlan(false, allContracts, objResources,'balancing', [rolling, painting, welding, sheetBender, cutting, delivery, documentation]);
    let assemblingOP = calcPlan(false, allContracts, objResources,'assemblingOP', [balancing, rolling, painting, welding, sheetBender, cutting, delivery, documentation]);
    let assemblingBV = calcPlan(false, allContracts, objResources,'assemblingBV', [assemblingOP, balancing, rolling, painting, welding, sheetBender, cutting, delivery, documentation]);
    let assemblingMTF = calcPlan(false, allContracts, objResources,'assemblingMTF', [assemblingBV, assemblingOP, balancing, rolling, painting, welding, sheetBender, cutting, delivery, documentation]);
    let assemblingUPKP = calcPlan(false, allContracts, objResources,'assemblingUPKP', [assemblingMTF, assemblingBV, assemblingOP, balancing, rolling, painting, welding, sheetBender, cutting, delivery, documentation]);
    let documentationSAU = calcPlan(false, allContracts, objResources,'documentationSAU');
    let deliverySAU = calcPlanDelivery(true, allContracts, objResources,'sau', 'deliverySAU');
    let assemblingSAU = calcPlan(false, allContracts, objResources,'assemblingSAU', [deliverySAU, documentationSAU]);
      
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

    let lastTime = 0;
    for (let key in state.areasPlan){
      state.areasPlan[key].itemsPlan.map(item => item.timeCodeEnd);      
      lastTime = Math.max(Math.max.apply(null, state.areasPlan[key].itemsPlan.map(item => item.timeCodeEnd)), lastTime);
    }
    state.lastTime = lastTime;    
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
