import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getWorkDay } from "./../../utils/calcWorkDay";
import { url, routes } from "../../config/routes";
import { calcLastDate } from "../../utils/calcLastDate";

const initialState = {
  status: "loading", //loading | success|error
  statusSubmit: "loading", //loading | success|error
  statusSubmitFile: "success", //loading | success|error
  disabledInput: true,
  objResources: {},
  // config: {},
  // resources: {},
};

export const submitFile = createAsyncThunk(
  "resourcesSlice/submitFile",
  async (file) => {
    const route = url + routes.sendFile;
    const formData = new FormData();
    formData.append("file", file, "file.xml");
    
    const data = await axios.post(route, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });

    alert(data.data);

    //return data.data;
  }
);

export const submitResource = createAsyncThunk(
  "resourcesSlice/submitResource",
  async (objResources) => {
    const data = await axios.post(url + routes.updateResource, objResources);
    //return data.data[0];
  }
);

export const fetchResource = createAsyncThunk(
  "resourcesSlice/fetchResource",
  async () => {
    const data = await axios.get(url + routes.getResource);
    return data.data[0];
  }
);

export const resourcesSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    setDisabledInput: (state, action) => {
      state.disabledInput = action.payload;
    },
    setLastDate: (state, action) => {
      state.objResources.config.lastDate = action.payload;
    },
    setCheckBoxDate: (state, action) => {
      let check = action.payload.e;
      state.objResources.config.checkBoxDate = check;
      if (check)
        state.objResources.config.lastDate = action.payload.lastСontractDate;
    },
    setStartDate: (state, action) => {
      state.objResources.config.startPlanDate = action.payload;
    },
    setCheckBoxStartDate: (state, action) => {
      let check = action.payload.e;
      state.objResources.config.checkBoxStartDate = check;
      if (check) state.objResources.config.startPlanDate = action.payload.today;
    },

    recalculationResources: (state, action) => {
      const countWorkDay = getWorkDay(new Date().toLocaleDateString(), state.objResources.config.lastDate, state.objResources.config.weekend);
      
      for (let key in state.objResources.resources.areas) {
        state.objResources.resources.areas[key].allWorkDays =
        countWorkDay + +state.objResources.resources.areas[key].adjustment;
      }
      for (let key in state.objResources.resources.areas) {
        state.objResources.resources.areas[key].totalResources =
        state.objResources.resources.areas[key].allWorkDays *
        state.objResources.resources.areas[key].dayResources;
      }
            
    },
    setStartTime: (state, action) => {   
      const {value, target} = action.payload;      
      state.objResources.resources.areas[target].startTime = value;
      
    },
    
    setDayResources: (state, action) => {      
      state.objResources.resources.areas[action.payload.target].dayResources = action.payload.value;
    },
    setAdjustment: (state, action) => {
      state.objResources.resources.areas[action.payload.target].adjustment = action.payload.value;
    },


    saveValue: (state, action) => {},
    updateValue: (state, action) => {},
  },
  extraReducers: {
    [fetchResource.pending]: (state, action) => {
      state.status = "loading";
      state.objResources = {};
    },
    [fetchResource.fulfilled]: (state, action) => {
      state.status = "success";
      state.objResources = action.payload;
    },
    [fetchResource.rejected]: (state, action) => {
      state.status = "error";
      state.objResources = {};
    },

    [submitResource.pending]: (state, action) => {
      state.statusSubmit = "loading";
    },
    [submitResource.fulfilled]: (state, action) => {
      state.statusSubmit = "success";
    },
    [submitResource.rejected]: (state, action) => {
      state.statusSubmit = "error";
    },

    [submitFile.pending]: (state, action) => {
      state.statusSubmitFile = "loading";
    },
    [submitFile.fulfilled]: (state, action) => {
      state.statusSubmitFile = "success";
    },
    [submitFile.rejected]: (state, action) => {
      state.statusSubmitFile = "error";
    },
  },
});

export const {
  setDisabledInput,
  setCheckBoxDate,
  saveValue,
  updateValue,
  setLastDate,
  recalculationResources,
  setStartDate,
  setCheckBoxStartDate,

  setDayResources,
  setAdjustment,
  setStartTime,


} = resourcesSlice.actions;

export default resourcesSlice.reducer;
