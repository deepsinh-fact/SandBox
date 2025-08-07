import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import CONFIG from "../../Config";

// =============== FactReport/SaveMADReportRequest =================
export const SaveMADReport = createAsyncThunk(
  "SaveMADReport",
  async (userdata, thunkAPI) => {
    try {
      const result = await axios({
        method: "POST",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `FactReport/SaveMADReportRequest`,
        data: userdata,
      });
      if (result.data.success) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error(
        "try catch [ SaveMADReport ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

//========FactReport/GetMADReportRequestList ============
export const GetMADReportTable = createAsyncThunk(
  "GetMADReportTable",
  async (userdata, thunkAPI) => {
    try {
      const result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: "FactReport/GetMADReportRequestList",
        params: userdata,
      });
      if (result.data.success) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error(
        "try catch [ GetMADReportTable ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

//========FactReport/GetMADReportClientConfig ============
export const GetMADReportClientConfig = createAsyncThunk(
  "GetMADReportClientConfig",
  async (userdata, thunkAPI) => {
    try {
      const result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: "FactReport/GetMADReportClientConfig",
        params: userdata,
      });
      if (result.data.success) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error(
        "try catch [ GetMADReportClientConfig ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

//========FactReport/SaveMADReportClientConfig ============
export const SaveMADReportClientConfig = createAsyncThunk(
  "SaveMADReportClientConfig",
  async (userdata, thunkAPI) => {
    try {
      const result = await axios({
        method: "POST",
        baseURL: CONFIG.BASE_URL_ALL,
        url: "FactReport/SaveMADReportClientConfig",
        data: userdata,
      });
      if (result.data.success) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error(
        "try catch [ SaveMADReportClientConfig ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
//========FactReport/GetMADKYCReport ============
export const GetMADKYCReportApi = createAsyncThunk(
  "GetMADKYCReportApi",
  async (userdata, thunkAPI) => {
    try {
      const result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: "FactReport/GetMADReport",
        params: userdata,
      });
      if (result.data.success) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error(
        "try catch [ GetMADKYCReportApi ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
//FactReport/SavePolygons
export const SavePolygons = createAsyncThunk(
  "SavePolygons",
  async ({ userName, polygonData }, thunkAPI) => {
    try {
      const result = await axios({
        method: "POST",
        baseURL: "https://172.168.1.84:7276",
        // baseURL: CONFIG.BASE_URL_ALL,
        url: `FactReport/SavePolygons`,
        params: { userName },
        data: polygonData,
      });

      if (result.data.success) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error("try catch [ SavePolygons ] error.message >>", error.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const MADSlice = createSlice({
  name: "MADSlice",
  initialState: {
    successMessageMad: "",
    errorMessageMad: "",
    isErrorMad: false,

    isSaveMADReport: false,
    isSaveMADReportFetching: false,

    isGetMADReportTable: false,
    isGetMADReportTableFetching: false,
    GetMADReportTableData: [],

    isGetMADReportClientConfig: false,
    isGetMADReportClientConfigFetching: false,
    GetMADReportClientConfigData: {},

    isSaveMADReportClientConfig: false,
    isSaveMADReportClientConfigFetching: false,

    isGetMADKYCReportApi: false,
    isGetMADKYCReportApiFetching: false,
    GetMADKYCReportApiData: [],

    isSavePolygons: false,
    isSavePolygonsFetching: false,
  },
  reducers: {
    updateStateMad: (state, { payload }) => {
      //  successMessage errorMessage isError
      state.successMessageMad =
        payload.successMessageMad !== undefined
          ? payload.successMessageMad
          : state.successMessageMad;
      state.errorMessageMad =
        payload.errorMessageMad !== undefined
          ? payload.errorMessageMad
          : state.errorMessageMad;
      state.isErrorMad =
        payload.isErrorMad !== undefined
          ? payload.isErrorMad
          : state.isErrorMad;

      //isSaveMADReport
      state.isSaveMADReport =
        payload.isSaveMADReport !== undefined
          ? payload.isSaveMADReport
          : state.isSaveMADReport;

      //GetMADReportTable
      state.isGetMADReportTable =
        payload.isGetMADReportTable !== undefined
          ? payload.isGetMADReportTable
          : state.isGetMADReportTable;

      //SaveMADReportClientConfig
      state.isSaveMADReportClientConfig =
        payload.isSaveMADReportClientConfig !== undefined
          ? payload.isSaveMADReportClientConfig
          : state.isSaveMADReportClientConfig;

      //GetMADKYCReportApi
      state.isGetMADKYCReportApi =
        payload.isGetMADKYCReportApi !== undefined
          ? payload.isGetMADKYCReportApi
          : state.isGetMADKYCReportApi;
      state.GetMADKYCReportApiData =
        payload.GetMADKYCReportApiData !== undefined
          ? payload.GetMADKYCReportApiData
          : state.GetMADKYCReportApiData;

      //SavePolygons
      state.isSavePolygons =
        payload.isSavePolygons !== undefined
          ? payload.isSavePolygons
          : state.isSavePolygons;
    },
  },
  extraReducers: (builder) => {
    //========= SaveMADReport
    builder.addCase(SaveMADReport.fulfilled, (state, { payload }) => {
      try {
        state.successMessageMad = payload.successMessage;
        state.isSaveMADReport = true;
        state.isSaveMADReportFetching = false;

        state.isErrorMad = false;
        state.errorMessageMad = "";
        return state;
      } catch (error) {
        console.error(
          "Error: SaveMADReport.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(SaveMADReport.rejected, (state, { payload }) => {
      try {
        state.successMessageMad = "";
        state.isSaveMADReport = false;
        state.isSaveMADReportFetching = false;
        state.isErrorMad = true;
        payload
          ? (state.errorMessageMad = payload.error.message
            ? payload.error.message
            : payload.error)
          : (state.errorMessageMad = "API result Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [SaveMADReport.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(SaveMADReport.pending, (state) => {
      state.isSaveMADReportFetching = true;
    });
    //========= GetMADReportTable
    builder.addCase(GetMADReportTable.fulfilled, (state, { payload }) => {
      try {
        state.isGetMADReportTable = true;
        state.isGetMADReportTableFetching = false;
        state.GetMADReportTableData = payload.data;
        state.isErrorMad = false;
        state.errorMessageMad = "";
        return state;
      } catch (error) {
        console.error(
          "Error: GetMADReportTable.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetMADReportTable.rejected, (state, { payload }) => {
      try {
        state.isGetMADReportTable = false;
        state.isGetMADReportTableFetching = false;
        state.GetMADReportTableData = [];
        state.isErrorMad = true;
        payload
          ? (state.errorMessageMad = payload.error.message
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessageMad = "API result Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [GetMADReportTable.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetMADReportTable.pending, (state) => {
      state.isGetMADReportTableFetching = true;
    });
    //========= GetMADReportClientConfig
    builder.addCase(GetMADReportClientConfig.fulfilled, (state, { payload }) => {
      try {
        state.isGetMADReportClientConfig = true;
        state.isGetMADReportClientConfigFetching = false;
        state.GetMADReportClientConfigData = payload.data;
        state.isErrorMad = false;
        state.errorMessageMad = "";
        return state;
      } catch (error) {
        console.error(
          "Error: GetMADReportClientConfig.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetMADReportClientConfig.rejected, (state, { payload }) => {
      try {
        state.isGetMADReportClientConfig = false;
        state.isGetMADReportClientConfigFetching = false;
        state.GetMADReportClientConfigData = {};
        state.isErrorMad = true;
        payload
          ? (state.errorMessageMad = payload.error.message
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessageMad = "API result Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [GetMADReportClientConfig.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetMADReportClientConfig.pending, (state) => {
      state.isGetMADReportClientConfigFetching = true;
    });
    //========= SaveMADReportClientConfig
    builder.addCase(SaveMADReportClientConfig.fulfilled, (state, { payload }) => {
      try {
        state.isSaveMADReportClientConfig = true;
        state.isSaveMADReportClientConfigFetching = false;
        state.successMessageMad = payload.successMessage;
        state.isErrorMad = false;
        state.errorMessageMad = "";
        return state;
      } catch (error) {
        console.error(
          "Error: SaveMADReportClientConfig.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(SaveMADReportClientConfig.rejected, (state, { payload }) => {
      try {
        state.isSaveMADReportClientConfig = false;
        state.isSaveMADReportClientConfigFetching = false;
        state.successMessageMad = "";
        state.isErrorMad = true;
        payload
          ? (state.errorMessageMad = payload.error.message
            ? payload.error.message
            : payload.error)
          : (state.errorMessageMad = "API result Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [SaveMADReportClientConfig.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(SaveMADReportClientConfig.pending, (state) => {
      state.isSaveMADReportClientConfigFetching = true;
    });
    //========= GetMADKYCReportApi
    builder.addCase(GetMADKYCReportApi.fulfilled, (state, { payload }) => {
      try {
        state.isGetMADKYCReportApi = true;
        state.isGetMADKYCReportApiFetching = false;
        state.GetMADKYCReportApiData = payload.data;
        state.isErrorMad = false;
        state.errorMessageMad = "";
        return state;
      } catch (error) {
        console.error(
          "Error: GetMADKYCReportApi.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetMADKYCReportApi.rejected, (state, { payload }) => {
      try {
        state.isGetMADKYCReportApi = false;
        state.isGetMADKYCReportApiFetching = false;
        state.GetMADKYCReportApiData = [];
        state.isErrorMad = true;
        payload
          ? (state.errorMessageMad = payload.error.message
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessageMad = "API result Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [GetMADKYCReportApi.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetMADKYCReportApi.pending, (state) => {
      state.isGetMADKYCReportApiFetching = true;
    });
    //========= SavePolygons
    builder.addCase(SavePolygons.fulfilled, (state, { payload }) => {
      try {
        state.isSavePolygons = true;
        state.isSavePolygonsFetching = false;
        state.isErrorMad = false;
        state.successMessageMad = payload.successMessage;
        state.errorMessageMad = "";
        return state;
      } catch (error) {
        console.error(
          "Error: SavePolygons.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(SavePolygons.rejected, (state, { payload }) => {
      try {
        state.isSavePolygons = false;
        state.isSavePolygonsFetching = false;
        state.isErrorMad = true;
        payload
          ? (state.errorMessageMad = payload.error.message
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessageMad = "API result Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [SavePolygons.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(SavePolygons.pending, (state) => {
      state.isSavePolygonsFetching = true;
    });
  },
});

export const { updateStateMad } = MADSlice.actions;
export const MADSelector = (state) => state.main.MAD;
