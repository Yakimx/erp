import { createSlice } from "@reduxjs/toolkit";
import { calcEndDatePlan } from "../../utils/calcEndDatePlan";
import { calcStartDatePlan } from "../../utils/calcStartDatePlan";
import { isErrorLab } from "../../utils/isErrorLab";
import ProductRow from "../../components/Main/ProductionTasks/ProductRow/ProductRow";


const initialState = {  
  filtrContract: [],
  filtrState: {  
  searchValueСustomer: "",
  searchValueContract: "",
  activeSortContractDate: false,
  activeSortPlanDate: false,
  upSortContractDate: true,
  upSortPlanDate: false,
  checkBox : {
  upkp: true,
  other: true,
  pause: true,
  ready: true,
  pending : true,
  shipped : true,
  errLab : false,
}
},
qtyAllContracts: 0,
qtyReadyContracts: 0,
qtyPauseContracts: 0,
};

const Matches = ({allContracts, plan}, filtrState) => {
 
  let filtrContract = [];
  const qty = {
    qtyAllContracts: 0,
    qtyReadyContracts: 0,
    qtyPauseContracts: 0,
  }
 
  

  filtrContract = allContracts
    .filter((contract) => {
      return contract.contractNumber.includes(filtrState.searchValueContract);
    })
    .filter((contract) => {
      return contract.customer
        .toLowerCase()
        .includes(filtrState.searchValueСustomer.toLowerCase());
    });
    filtrContract = checkReady(filtrContract);
    
    if(Object.keys(plan.areasPlan) != 0) {
      
      filtrContract = calcEndDatePlan(filtrContract, plan);
      filtrContract = calcStartDatePlan(filtrContract, plan);
    }    
    

    if(filtrState.activeSortPlanDate){
      filtrContract = filtrPlanDate(filtrContract, filtrState.upSortPlanDate);
    }
    if(filtrState.activeSortContractDate){
      filtrContract = filtrContractDate(filtrContract, filtrState.upSortContractDate);
    }
    
    
    filtrContract = filtrContract.filter(contract=>{
      return (!filtrState.checkBox.upkp && contract.typeUpkp == true) ? false : true;
    });
    filtrContract = filtrContract.filter(contract=>{
      return (!filtrState.checkBox.other && contract.typeUpkp == false) ? false : true;
    });
    filtrContract = filtrContract.filter(contract=>{
      return (!filtrState.checkBox.pause && contract.pause == true) ? false : true;
    });
    filtrContract = filtrContract.filter(contract=>{
      return (!filtrState.checkBox.ready && contract.ready == true) ? false : true;
    });
    filtrContract = filtrContract.filter(contract=>{
      return (!filtrState.checkBox.pending && !contract.ready && !contract.pause) == true ? false : true;
    });
    filtrContract = filtrContract.filter(contract=>{
      return (!filtrState.checkBox.shipped && contract.shipped) == true ? false : true;
    });

    qty.qtyAllContracts = allContracts.length;
    qty.qtyPauseContracts = allContracts.reduce((prev, cur)=> cur.pause ? prev + 1 : prev, 0)
    qty.qtyReadyContracts = filtrContract.reduce((prev, cur)=> cur.ready ? prev + 1 : prev, 0)


    filtrContract = isErrorLab(filtrContract);

    filtrContract = filtrContract.map((contract)=>{
      let status = 
        contract.shipped ? 'Отгружен'      
      : contract.pause ? 'Пауза'
      : contract.ready ? 'Готов' 
      : contract.errLab ? 'Ошибка'
      : 'Работа'
      
      return {...contract, status: status}
    })

    
    return {filtrContract: filtrContract, qty: qty };
};

const filtrPlanDate = (filtrContract, up) => {
  return up ? filtrContract.sort((a, b) => Date.parse(a.completionDatePlan.split(".").reverse().join(".")) > Date.parse(b.completionDatePlan.split(".").reverse().join(".")) ? 1 : -1)
            : filtrContract.sort((a, b) => Date.parse(a.completionDatePlan.split(".").reverse().join(".")) > Date.parse(b.completionDatePlan.split(".").reverse().join(".")) ? -1 : 1)  
};

const filtrContractDate = (filtrContract, up) => {  
  return up ? filtrContract.sort((a, b) => Date.parse(a.completionDateContract.split(".").reverse().join(".")) > Date.parse(b.completionDateContract.split(".").reverse().join(".")) ? 1 : -1)
            : filtrContract.sort((a, b) => Date.parse(a.completionDateContract.split(".").reverse().join(".")) > Date.parse(b.completionDateContract.split(".").reverse().join(".")) ? -1 : 1)  
};



const checkReady = (filtrContract) => {
return filtrContract.map(contract=>{

  let ready  = contract.products.find((product)=>{
    
    return (
    ((product.resourcesRequired.documentation == 0) || (product.quantityMade.documentation == product.quantity)) &&
    ((product.resourcesRequired.delivery == 0) || (product.quantityMade.delivery == product.quantity)) &&
    ((product.resourcesRequired.cutting == 0) || (product.quantityMade.cutting == product.quantity)) &&
    ((product.resourcesRequired.sheetBender == 0) || (product.quantityMade.sheetBender == product.quantity)) &&
    ((product.resourcesRequired.welding == 0) || (product.quantityMade.welding == product.quantity)) &&
    ((product.resourcesRequired.painting == 0) || (product.quantityMade.painting == product.quantity)) &&
    ((product.resourcesRequired.rolling == 0) || (product.quantityMade.rolling == product.quantity)) &&
    ((product.resourcesRequired.balancing == 0) || (product.quantityMade.balancing == product.quantity)) &&
    ((product.resourcesRequired.assemblingOP == 0) || (product.quantityMade.assemblingOP == product.quantity)) &&
    ((product.resourcesRequired.assemblingBV == 0) || (product.quantityMade.assemblingBV == product.quantity)) &&
    ((product.resourcesRequired.assemblingMTF == 0) || (product.quantityMade.assemblingMTF == product.quantity)) &&
    ((product.resourcesRequired.assemblingUPKP == 0) || (product.quantityMade.assemblingUPKP == product.quantity)) &&
    ((product.resourcesRequired.documentationSAU == 0) || (product.quantityMade.documentationSAU == product.quantity)) &&
    ((product.resourcesRequired.deliverySAU == 0) || (product.quantityMade.deliverySAU == product.quantity)) &&
    ((product.resourcesRequired.assemblingSAU == 0) || (product.quantityMade.assemblingSAU == product.quantity))
    ) ? false : true}) == undefined ? true : false

return {...contract, ready: ready};
  
})
}

export const filtrSlice = createSlice({
  name: "filtr",
  initialState,

  reducers: {
    setSearchValueСustomer: (state, action) => {
      state.filtrState.searchValueСustomer = action.payload;
    },
    setSearchValueContract: (state, action) => {
      state.filtrState.searchValueContract = action.payload;
    },

    setCheckBoxUpkp: (state, action) => {
      state.filtrState.checkBox.upkp = action.payload;
    },
    setCheckBoxOther: (state, action) => {
      state.filtrState.checkBox.other = action.payload;
    },
    setCheckBoxPause: (state, action) => {
      state.filtrState.checkBox.pause = action.payload;
    },
    setCheckBoxReady: (state, action) => {
      state.filtrState.checkBox.ready = action.payload;
    },
    setCheckBoxPending: (state, action) => {
      state.filtrState.checkBox.pending = action.payload;
    },
    setCheckBoxShipped: (state, action) => {
      state.filtrState.checkBox.shipped = action.payload;
    },
    

    sortContractDate: (state, action) => {
      state.filtrState.activeSortContractDate = true;
      state.filtrState.activeSortPlanDate = false;
      state.filtrState.upSortContractDate = !state.filtrState.upSortContractDate;      
    },
    sortPlanDate: (state, action) => {
      state.filtrState.activeSortPlanDate = true;
      state.filtrState.activeSortContractDate = false;
      state.filtrState.upSortPlanDate = !state.filtrState.upSortPlanDate;
    },
    filtrList: (state, action) => {
      let result = Matches(
        action.payload,
        state.filtrState
      );
      state.filtrContract = result.filtrContract;
      const {qtyAllContracts, qtyReadyContracts, qtyPauseContracts} = result.qty;
      state.qtyAllContracts = qtyAllContracts;
      state.qtyReadyContracts = qtyReadyContracts;
      state.qtyPauseContracts = qtyPauseContracts;
    },
    setDatePlan: (state, action) => {
      //state.filtrContract = calcDatePlan(state.filtrContract, action.payload);
    },
    
    
  },
});

export const {
  setSearchValueСustomer,
  setSearchValueContract,
  filtrList,
  sortContractDate,
  sortPlanDate,
  setCheckBoxUpkp,
  setCheckBoxOther,
  setCheckBoxPause,
  setCheckBoxReady,
  setCheckBoxPending,
  setCheckBoxShipped,
  setDatePlan,
  
 
} = filtrSlice.actions;

export default filtrSlice.reducer;
