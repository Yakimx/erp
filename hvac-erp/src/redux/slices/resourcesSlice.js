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
    // .then((res) => {
    //   console.log(`Success`);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
    console.log(data.data);
    return data.data;
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

    recalculationResources: (state, action) => {
      const countWorkDay = getWorkDay(state.objResources.config.lastDate);
      state.objResources.resources.documentation.allWorkDays =
        countWorkDay + +state.objResources.resources.documentation.adjustment;

      state.objResources.resources.cutting.allWorkDays =
        countWorkDay + +state.objResources.resources.cutting.adjustment;

      state.objResources.resources.sheetBender.allWorkDays =
        countWorkDay + +state.objResources.resources.sheetBender.adjustment;

      state.objResources.resources.assemblingA.allWorkDays =
        countWorkDay + +state.objResources.resources.assemblingA.adjustment;
      state.objResources.resources.assemblingB.allWorkDays =
        countWorkDay + +state.objResources.resources.assemblingB.adjustment;
      state.objResources.resources.assemblingC.allWorkDays =
        countWorkDay + +state.objResources.resources.assemblingC.adjustment;
      state.objResources.resources.assemblingSau.allWorkDays =
        countWorkDay + +state.objResources.resources.assemblingSau.adjustment;

      state.objResources.resources.automation.allWorkDays =
        countWorkDay + +state.objResources.resources.automation.adjustment;
      //Ресурсы с учетом всех рабочих
      state.objResources.resources.documentation.totalResources =
        state.objResources.resources.documentation.allWorkDays *
        state.objResources.resources.documentation.dayResources;

      state.objResources.resources.cutting.totalResources =
        state.objResources.resources.cutting.allWorkDays *
        state.objResources.resources.cutting.dayResources;

      state.objResources.resources.sheetBender.totalResources =
        state.objResources.resources.sheetBender.allWorkDays *
        state.objResources.resources.sheetBender.dayResources;

      state.objResources.resources.assemblingA.totalResources =
        state.objResources.resources.assemblingA.allWorkDays *
        state.objResources.resources.assemblingA.dayResources;
      state.objResources.resources.assemblingB.totalResources =
        state.objResources.resources.assemblingB.allWorkDays *
        state.objResources.resources.assemblingB.dayResources;
      state.objResources.resources.assemblingC.totalResources =
        state.objResources.resources.assemblingC.allWorkDays *
        state.objResources.resources.assemblingC.dayResources;
      state.objResources.resources.assemblingSau.totalResources =
        state.objResources.resources.assemblingSau.allWorkDays *
        state.objResources.resources.assemblingSau.dayResources;

      state.objResources.resources.automation.totalResources =
        state.objResources.resources.automation.allWorkDays *
        state.objResources.resources.automation.dayResources;
    },

    setDocumentationDayResources: (state, action) => {
      state.objResources.resources.documentation.dayResources = action.payload;
    },
    setDocumentationAdjustment: (state, action) => {
      state.objResources.resources.documentation.adjustment = action.payload;
    },
    setCuttingDayResources: (state, action) => {
      state.objResources.resources.cutting.dayResources = action.payload;
    },
    setCuttingAdjustment: (state, action) => {
      state.objResources.resources.cutting.adjustment = action.payload;
    },
    setSheetBenderDayResources: (state, action) => {
      state.objResources.resources.sheetBender.dayResources = action.payload;
    },
    setSheetBenderAdjustment: (state, action) => {
      state.objResources.resources.sheetBender.adjustment = action.payload;
    },
    setAssemblingADayResources: (state, action) => {
      state.objResources.resources.assemblingA.dayResources = action.payload;
    },
    setAssemblingAAdjustment: (state, action) => {
      state.objResources.resources.assemblingA.adjustment = action.payload;
    },
    setAssemblingBDayResources: (state, action) => {
      state.objResources.resources.assemblingB.dayResources = action.payload;
    },
    setAssemblingBAdjustment: (state, action) => {
      state.objResources.resources.assemblingB.adjustment = action.payload;
    },
    setAssemblingCDayResources: (state, action) => {
      state.objResources.resources.assemblingC.dayResources = action.payload;
    },
    setAssemblingCAdjustment: (state, action) => {
      state.objResources.resources.assemblingC.adjustment = action.payload;
    },
    setAssemblingSauDayResources: (state, action) => {
      state.objResources.resources.assemblingSau.dayResources = action.payload;
    },
    setAssemblingSauAdjustment: (state, action) => {
      state.objResources.resources.assemblingSau.adjustment = action.payload;
    },
    setAutomationDayResources: (state, action) => {
      state.objResources.resources.automation.dayResources = action.payload;
    },
    setAutomationAdjustment: (state, action) => {
      state.objResources.resources.automation.adjustment = action.payload;
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

  setDocumentationDayResources,
  setDocumentationAdjustment,

  setCuttingDayResources,
  setCuttingAdjustment,

  setSheetBenderDayResources,
  setSheetBenderAdjustment,

  setAssemblingADayResources,
  setAssemblingAAdjustment,
  setAssemblingBDayResources,
  setAssemblingBAdjustment,
  setAssemblingCDayResources,
  setAssemblingCAdjustment,
  setAssemblingSauDayResources,
  setAssemblingSauAdjustment,

  setAutomationDayResources,
  setAutomationAdjustment,
} = resourcesSlice.actions;

export default resourcesSlice.reducer;
