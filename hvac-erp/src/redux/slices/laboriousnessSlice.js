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

export const deleteLaboriousness = createAsyncThunk(
  "laboriousnessSlice/deleteLaboriousness",
  async (id) => {
    console.log(id);
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
    // setActiveItem: (state, action) => {
    //   state.activeItem = action.payload;
    // },

    // addLaboriousnes: (state, action) => {
    //   let newItem = { ...state.laboriousness[0] };
    //   for (let key in newItem) {
    //     newItem[key] = 0;
    //   }
    //   newItem.name = "Новая позиция";

    //   state.laboriousness.push(newItem);
    // },

    // delLaboriousnes: (state, action) => {
    //   state.laboriousness.splice(action.payload, 1);
    // },
    brakeChanges: (state, action) => {
      state.laboriousness.splice(action.payload, 1);
    },

    setName: (state, action) => {
      state.laboriousness[action.payload.index].name = action.payload.value;
    },
    setDocValue: (state, action) => {
      state.laboriousness[action.payload.index].documentation =
        +action.payload.value;
    },
    setCutValue: (state, action) => {
      state.laboriousness[action.payload.index].cutting = +action.payload.value;
    },
    setSheetValue: (state, action) => {
      state.laboriousness[action.payload.index].sheetBender =
        +action.payload.value;
    },
    setAssemAValue: (state, action) => {
      state.laboriousness[action.payload.index].assemblingA =
        +action.payload.value;
    },
    setAssemBValue: (state, action) => {
      state.laboriousness[action.payload.index].assemblingB =
        +action.payload.value;
    },
    setAssemCValue: (state, action) => {
      state.laboriousness[action.payload.index].assemblingC =
        +action.payload.value;
    },
    setAssemSauValue: (state, action) => {
      state.laboriousness[action.payload.index].assemblingSau =
        +action.payload.value;
    },

    setAutoValue: (state, action) => {
      state.laboriousness[action.payload.index].automation =
        +action.payload.value;
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
  setDocValue,
  setCutValue,
  setSheetValue,
  setAssemAValue,
  setAssemBValue,
  setAssemCValue,
  setAssemSauValue,
  setAutoValue,
} = laboriousnessSlice.actions;

export default laboriousnessSlice.reducer;
