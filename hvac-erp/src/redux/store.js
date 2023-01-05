import { configureStore } from "@reduxjs/toolkit";
import contractsReducer from "./slices/contractsSlice";
import filtrReducer from "./slices/filtrSlice";
import contractEditorReducer from "./slices/contractEditorSlice";
import resourcesReducer from "./slices/resourcesSlice";
import planReducer from "./slices/planSlice";

export const store = configureStore({
  reducer: {
    contracts: contractsReducer,
    filtr: filtrReducer,
    contractEditor: contractEditorReducer,
    resources: resourcesReducer,
    plan: planReducer,
  },
});
