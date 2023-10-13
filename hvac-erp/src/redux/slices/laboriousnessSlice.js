import { compose, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url, routes } from "../../config/routes";

const initialState = {
  status: "loading", //loading | success|error
  activeItem: 0,
  disabledInput: true,
  laboriousness: [],
};

export const fetchLaboriousness = createAsyncThunk(
  "laboriousnessSlice/fetchLaboriousness",
  async () => {
    const data = await axios.get(url + routes.getLaboriousness);
    return data.data;
  }
);

export const addLaboriousness = createAsyncThunk(
  "laboriousnessSlice/addLaboriousness",
  async (laboriousnes) => {
    const data = await axios.post(url + routes.addLaboriousness, laboriousnes);
  }
);

export const copyLaboriousness = createAsyncThunk(
  "laboriousnessSlice/copyLaboriousness",
  async (laboriousnes) => {
    const data = await axios.post(url + routes.copyLaboriousness, laboriousnes);
    if(data.data == "Dublicat") alert("Артикль уже есть в базе")
  }
 
);

export const deleteLaboriousness = createAsyncThunk(
  "laboriousnessSlice/deleteLaboriousness",
  async (id) => {
    
    const data = await axios.delete(
      url + routes.deleteLaboriousness + `/${id}`
    );
  }
);

export const updateLaboriousness = createAsyncThunk(
  "laboriousnessSlice/updateLaboriousness",
  async (laboriousness) => {
    const data = await axios.post(
      url + routes.updateLaboriousness,
      laboriousness
    );
  }
);

export const laboriousnessSlice = createSlice({
  name: "laboriousness",
  initialState,

  reducers: {
    setDisabledInput: (state, action) => {
      state.disabledInput = action.payload;
    },
   
    brakeChanges: (state, action) => {
      state.laboriousness.splice(action.payload, 1);
    },

    setName: (state, action) => {
      state.laboriousness[action.payload.index].name = action.payload.value;
    },
    
    setValue: (state, action) => {
     let {value, index, key} = action.payload;
      
      let maxValue = 999;
      value = +value > +maxValue ? +maxValue : +value < 0 ? 0 : +value;

      state.laboriousness[index].areas[key] = value;
        
    },
    setCode: (state, action) => {
      state.laboriousness[action.payload.index].code = action.payload.value;
    },
    
    
  },
  extraReducers: {
    [fetchLaboriousness.pending]: (state, action) => {
      state.status = "loading";
      state.laboriousness = "";
    },
    [fetchLaboriousness.fulfilled]: (state, action) => {
      state.status = "success";      
      state.laboriousness = action.payload;
    },
    [fetchLaboriousness.rejected]: (state, action) => {
      state.status = "error";
      state.laboriousness = [];
    },

  },
});

export const {
  // setActiveItem,
  addLaboriousnes,
  delLaboriousnes,
  setDisabledInput,
  setName,
  setValue,
  setCode,
} = laboriousnessSlice.actions;

export default laboriousnessSlice.reducer;
