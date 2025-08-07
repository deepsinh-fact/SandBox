import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import CONFIG from '../../../src/Config/index'; 
import Service from '../../../src/Service/Service'; 

const headerAll = {
  "Content-Type": "application/json",
  "Accept": "application/json",
}

let authheader = {
  "Content-Type": "application/json",
  accept: "application/json",
};
let authheaderFormData = {
  accept: "application/json",
  "Content-Type": "multipart/form-data",
};
let uplodatHeader = { "Content-Type": "multipart/form-data" };
let authheaderTockenAndHed = Service.getAuthTokenAndHeader();
let authheaderUser = Service.getAuthUser();
//Usersignin
export const Usersignin = createAsyncThunk(
  "Usersignin",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "POST",
        baseURL: CONFIG.BASE_URL_LOGIN,
        // headers: authheader,
        url: `/api/auth/login`,
        data: { ...userdata, devicePlateform: "web" },
      });
      if (result.data.success) {
        await Service.setauthToken(result.data.token);
        await Service.setCredit(result.data.data.credit);
        await Service.setUserdata(result.data.data);
        await Service.setIsLoginData(result.data);

        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error("try catch [ Usersignin ] error.message >>", error.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
//HelpdeskTicketList
export const HelpdeskTicketList = createAsyncThunk(
  "HelpdeskTicketList",
  async (_, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_LOGIN,
        // headers: authheader,
        url: `helpdesk/ticket_list`,
        params: _,
      });
      if (result.data.success) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error("try catch [ HelpdeskTicketList ] error.message >>", error.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
//HelpdeskTicketCreate
export const HelpdeskTicketCreate = createAsyncThunk(
  "HelpdeskTicketCreate",
  async (_, thunkAPI) => {
    try {
      let result = await axios({
        method: "POST",
        baseURL: CONFIG.BASE_URL_LOGIN,
        url: `helpdesk/ticket_create`,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: _,
      });
      if (result.data.success) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error("try catch [ HelpdeskTicketCreate ] error.message >>", error.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
//ReUsersignin
export const ReUsersignin = createAsyncThunk(
  "ReUsersignin",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "POST",
        baseURL: CONFIG.BASE_URL_LOGIN,
        // headers: authheader,
        url: `/api/auth/login`,
        data: { ...userdata, devicePlateform: "web" },
      });
      if (result.data.success) {
        await Service.setauthToken(result.data.token);
        await Service.setCredit(result.data.data.credit);
        await Service.setUserdata(result.data.data);
        await Service.setIsLoginData(result.data);
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error(
        "try catch [ ReUsersignin ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// fact/reset_password
export const ResetPassword = createAsyncThunk(
  "ResetPassword",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "POST",
        baseURL: CONFIG.BASE_URL_LOGIN,
        url: `fact/reset_password`,
        data: userdata,
      });
      if (result.data.success) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error(
        "try catch [ ResetPassword ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// GetPincodeLatLong
export const GetPincodeLatLongGST = createAsyncThunk(
  "GetPincodeLatLongGST",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `GST/GetGSTDetailsByPinCode`,
        params: userdata,
      });
      if (result.data.success) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error(
        "try catch [ GetPincodeLatLongGST ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const Panverify = createAsyncThunk(
  "Panverify",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `/GST/panverify`,
        params: userdata,
      });
      if (result.data.success) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const Emailverify = createAsyncThunk(
  "Emailverify",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `/PortalAdmin/emailverify`,
        params: userdata,
      });
      if (result?.data?.success) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error(
        "try catch [ Emailverify ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const Gstverify = createAsyncThunk(
  "Gstverify",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `/GST/gstverify`,
        params: userdata,
      });
      return result.data;
    } catch (error) {
      console.error("try catch [ Gstverify ] error.message >>", error.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// -------------
export const Gstsearch = createAsyncThunk(
  "Gstsearch",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `/GST/gstsearch`,
        params: userdata,
      });
      if (result?.data?.success) {
        return result.data.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// MobileToMultipleUPI
export const MobileToMultipleUPI = createAsyncThunk(
  "MobileToMultipleUPI",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `GST/MobileToMultipleUPI`,
        params: userdata,
      });
      if (result?.data?.success) {
        return result.data.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// -------------
export const GstsearchRefreshDetails = createAsyncThunk(
  "GstsearchRefreshDetails",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `GST/RefreshGSTSearch`,
        params: userdata,
      });

      if (result?.data?.success) {
        return result.data.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error("Error in [GstsearchRefreshDetails] Try Catch:", error);

      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// -------------RefreshDINDetails
export const RefreshCinDINDetails = createAsyncThunk(
  "RefreshCinDINDetails",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `CIN/RefreshDINDetails`,
        params: userdata,
      });

      if (result?.data?.success) {
        return result.data.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error("Error in [RefreshCinDINDetails] Try Catch:", error);

      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// -------------RefreshDINDetailsByDIN
export const RefreshDINDetailsByDIN = createAsyncThunk(
  "RefreshDINDetailsByDIN",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `CIN/RefreshDINDetailsByDIN`,
        params: userdata,
      });

      if (result?.data?.success) {
        return result.data.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error("Error in [RefreshDINDetailsByDIN] Try Catch:", error);

      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// UpdateProfile
export const UpdateProfile = createAsyncThunk(
  "UpdateProfile",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "POST",
        baseURL: CONFIG.BASE_URL_LOGIN,
        url: `user/edit/information`,
        headers: authheaderFormData,
        data: userdata,
      });
      if (result?.data?.success) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// Mobile360 OSINT
export const Mobile360 = createAsyncThunk(
  "Mobile360",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `IEC/GetMobile360`,
        params: userdata,
      });
      if (result.data) {
        if (result?.data?.success) {
          return result.data.data;
        }
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error("try catch [ Mobile360 ] error.message >>", error.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// OSINT/GetFactAppInfoByPhone OSINT
export const GetFactAppInfoByPhone = createAsyncThunk(
  "GetFactAppInfoByPhone",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `OSINT/GetFactAppInfoByPhone`,
        headers: await authheaderTockenAndHed,
        params: userdata,
      });
      if (result.data) {
        if (result?.data?.success) {
          if (result.data.data.id) {
            return result?.data.data;
          } else {
            return JSON.parse(result?.data?.data);
          }
        } else {
          return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
        }
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error(
        "try catch [ GetFactAppInfoByPhone ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// OSINT/GetFactAppInfoMoreByPhone
export const GetFactAppInfoMoreByPhone = createAsyncThunk(
  "GetFactAppInfoMoreByPhone",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `OSINT/GetFactAppInfoMoreByPhone`,
        headers: await authheaderTockenAndHed,
        params: userdata,
      });
      if (result.data) {
        if (result?.data?.success) {
          if (result.data.data.id) {
            return result?.data.data;
          } else {
            return JSON.parse(result?.data?.data);
          }
        } else {
          return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
        }
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error(
        "try catch [ GetFactAppInfoMoreByPhone ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// OSINT/GetFactAppInfoByEmail
export const GetFactAppInfoByEmail = createAsyncThunk(
  "GetFactAppInfoByEmail",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `OSINT/GetFactAppInfoByEmail`,
        headers: await authheaderTockenAndHed,
        params: userdata,
      });
      if (result.data) {
        if (result?.data?.success) {
          if (result.data.data.id) {
            return result?.data.data;
          } else {
            return JSON.parse(result?.data?.data);
          }
        } else {
          return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
        }
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error(
        "try catch [ GetFactAppInfoByEmail ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// OSINT/GetFactAppInfoMoreByEmail
export const GetFactAppInfoMoreByEmail = createAsyncThunk(
  "GetFactAppInfoMoreByEmail",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `OSINT/GetFactAppInfoMoreByEmail`,
        headers: await authheaderTockenAndHed,
        params: userdata,
      });
      if (result.data) {
        if (result?.data?.success) {
          if (result.data.data.id) {
            return result?.data.data;
          } else {
            return JSON.parse(result?.data?.data);
          }
        } else {
          return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
        }
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error(
        "try catch [ GetFactAppInfoMoreByEmail ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// OSINT/GetFactAppInfoByUserName
export const GetFactAppInfoByUserName = createAsyncThunk(
  "GetFactAppInfoByUserName",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `OSINT/GetFactAppInfoByUserName`,
        params: userdata,
      });
      if (result.data) {
        if (result?.data?.success) {
          return result?.data;
        } else {
          return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
        }
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error(
        "try catch [ GetFactAppInfoByUserName ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// GetCoordinates
export const GetCoordinates = createAsyncThunk(
  "GetCoordinates",

  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: `https://maps.googleapis.com/maps/api/geocode/json?address=${userdata.address}&key=${CONFIG.MAPS_APIKEY}`,
      });

      if (result?.data?.results) {
        let LantLong = result.data.results[0].geometry.location;
        return { ...LantLong, cinname: userdata.cin };
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error(
        "try catch [ GetCoordinates ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// Cin
export const Cin = createAsyncThunk("Cin", async (userdata, thunkAPI) => {
  try {
    let result = await axios({
      method: "GET",
      baseURL: CONFIG.BASE_URL_ALL,
      url: `/CIN/CINDetails`,
      params: userdata,
    });
    if (result.data) {
      if (result?.data?.success) {
        return result.data.data;
      }
    } else {
      return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
    }
  } catch (error) {
    console.error("try catch [ Cin ] error.message >>", error.message);
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});
// DarpanSearchApi
export const DarpanSearchApi = createAsyncThunk(
  "DarpanSearchApi",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `Darpan/GetDarpanDetails`,
        params: userdata,
      });
      if (result.data) {
        if (result?.data?.success) {
          return result.data;
        }
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error("try catch [ DarpanSearchApi ] error.message >>", error.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  });
// api/Darpan/GetFileLogListByUserName
export const GetFileLogListByUserName = createAsyncThunk(
  "GetFileLogListByUserName",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `Darpan/GetFileLogListByUserName`,
        params: userdata,
      });
      if (result.data) {
        if (result?.data?.success) {
          return result.data;
        }
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error("try catch [ GetFileLogListByUserName ] error.message >>", error.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  });
//SearchCINByAdvanceSearch
export const SearchCINByAdvanceSearch = createAsyncThunk(
  "SearchCINByAdvanceSearch",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "POST",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `CIN/SearchCINByAdvanceSearch`,
        data: userdata,
      });

      if (result.data) {
        if (result?.data?.success) {
          return result.data.data;
        } else {
          return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
        }
      }
    } catch (error) {
      console.error(
        "try catch [ SearchCINByAdvanceSearch ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
//SearchGSTByAdvanceSearch
export const SearchGSTByAdvanceSearch = createAsyncThunk(
  "SearchGSTByAdvanceSearch",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "POST",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `GST/SearchGSTByAdvanceSearch`,
        data: userdata,
      });

      if (result.data) {
        if (result?.data?.success) {
          return { ...result.data.data, userdata: userdata };
        }
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error(
        "try catch [ SearchGSTByAdvanceSearch ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
//SearchGSTByAdvanceSearchMore
export const SearchGSTByAdvanceSearchMore = createAsyncThunk(
  "SearchGSTByAdvanceSearchMore",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "POST",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `GST/SearchGSTByAdvanceSearch`,
        data: userdata,
      });

      if (result.data) {
        if (result?.data?.success) {
          return result.data.data;
        }
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error(
        "try catch [ SearchGSTByAdvanceSearchMore ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
//CinGetIndustryList
export const CinGetIndustryList = createAsyncThunk(
  "CinGetIndustryList",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `CIN/GetIndustryList`,
        params: userdata,
      });
      if (result.data) {
        if (result?.data?.success) {
          return result.data.data;
        }
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error(
        "try catch [ CinGetIndustryList ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const CinGetSegmentList = createAsyncThunk(
  "CinGetSegmentList",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `CIN/GetSegmentList`,
        params: userdata,
      });
      if (result.data) {
        if (result?.data?.success) {
          return result.data.data;
        }
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error(
        "try catch [ CinGetSegmentList ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// CinRefreshCINDetails
export const CinRefreshCINDetails = createAsyncThunk(
  "CinRefreshCINDetails",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `CIN/RefreshCINDetails`,
        params: userdata,
      });
      if (result.data) {
        if (result?.data?.success) {
          return result.data;
        }
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error(
        "try catch [ CinRefreshCINDetails ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// GetGSTCINDetailByEmail
export const GetGSTCINDetailByEmail = createAsyncThunk(
  "GetGSTCINDetailByEmail",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `GST/GetGSTCINDetailByEmail`,
        params: userdata,
      });
      if (result.data) {
        if (result?.data?.success) {
          return result.data;
        }
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error(
        "try catch [ GetGSTCINDetailByEmail ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// Din
export const Din = createAsyncThunk("Din", async (userdata, thunkAPI) => {
  try {
    let result = await axios({
      method: "GET",
      baseURL: CONFIG.BASE_URL_ALL,
      url: `/CIN/DINDetails`,
      params: userdata,
    });
    if (result.data) {
      if (result?.data?.success) {
        return result.data.data;
      }
    } else {
      return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
    }
  } catch (error) {
    console.error("try catch [ Din ] error.message >>", error.message);
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});
// IESDetailApi
export const IESDetailApi = createAsyncThunk(
  "IESDetailApi",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `IEC/GetIESDetail`,
        params: userdata,
      });
      if (result.data) {
        if (result?.data?.success) {
          return { ...result.data.data, snumber: userdata.searchNumber };
        }
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error(
        "try catch [ IESDetailApi ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// MSME
export const Msme = createAsyncThunk("Msme", async (userdata, thunkAPI) => {
  try {
    let result = await axios({
      method: "GET",
      baseURL: CONFIG.BASE_URL_ALL,
      url: `/MSME/GetMSMEDetail`,
      // headers: await authheaderTockenAndHed,
      params: userdata,
    });
    if (result.data) {
      if (result?.data?.success) {
        return result.data.data;
      }
    } else {
      return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
    }
  } catch (error) {
    console.error("try catch [ Msme ] error.message >>", error.message);
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});
// MsmeRefreshDetails
export const MsmeRefreshDetails = createAsyncThunk(
  "MsmeRefreshDetails",

  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `MSME/RefreshMSMEDetail`,
        // headers: await authheaderTockenAndHed,
        params: userdata,
      });
      if (result.data) {
        if (result?.data?.success) {
          return result.data.data;
        }
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error(
        "try catch [ MsmeRefreshDetails ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// MobileToMSME
export const MobileToMSME = createAsyncThunk(
  "MobileToMSME",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `MSME/MobileToMSME`,
        params: userdata,
      });
      if (result.data) {
        if (result?.data?.success) {
          return result.data;
        }
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error("try catch [ Msme ] error.message >>", error.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// CINDetailsByDate
export const CINDetailsByDate = createAsyncThunk(
  "CINDetailsByDate",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `CIN/CINDetailsByDate`,
        params: userdata,
      });
      if (result?.data?.success) {
        return result.data.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error("try catch [ Msme ] error.message >>", error.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// /api/CIN/GetCINAddressByPin
export const GetCINAddressByPin = createAsyncThunk(
  "GetCINAddressByPin",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `CIN/GetCINAddressByPin`,
        params: userdata,
      });
      if (result?.data?.success) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error(
        "try catch [ GetCINAddressByPin ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// GetPincodeLatLong/
export const GetPincodeLatLong = createAsyncThunk(
  "GetPincodeLatLong",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userdata.latitude},${userdata.longitude}&key=${CONFIG.MAPS_APIKEY}`,
        // url: `get-pincode/`,
        // data: userdata,
      });

      if (result?.data.results) {
        return result.data.results;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error(
        "try catch [ GetPincodeLatLong ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// PanSearch
export const PanSearch = createAsyncThunk(
  "PanSearch",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `/GST/pansearch`,
        params: userdata,
      });
      if (result?.data?.success) {
        return result.data.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error("try catch [ PanSearch ] error.message >>", error.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// PansearchRefreshDetails
export const PansearchRefreshDetails = createAsyncThunk(
  "PansearchRefreshDetails",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `/GST/RefreshPANSearch`,
        params: userdata,
      });
      if (result?.data?.success) {
        return result.data.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error(
        "try catch [ PansearchRefreshDetails ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// Businesspansearch
export const Businesspansearch = createAsyncThunk(
  "Businesspansearch",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `/GST/businesspansearch`,
        params: userdata,
      });
      if (result.data) {
        if (result?.data?.success) {
          return result.data.data;
        }
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error("try catch [ PanSearch ] error.message >>", error.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// GetMCAReport
export const GetMCAReport = createAsyncThunk(
  "GetMCAReport",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `CIN/GetMCAReport`,
        headers: await authheaderUser,
        params: userdata,
      });
      console.log("result?.data?", result?.data);
      if (result?.data?.success) {
        return JSON.parse(result?.data?.data);
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error("try catch [ PanSearch ] error.message >>", error.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// GetNewGSTList
export const GetNewGSTList = createAsyncThunk(
  "GetNewGSTList",
  async ({ token, inputdate }, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `/GST/GetNewGSTList`,
        params: { token, inputdate },
      });
      if (result.data) {
        if (result?.data?.success) {
          return result.data;
        }
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error(
        "try catch [ GetNewGSTList ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// GetNewGSTDetail
export const GetNewGSTDetail = createAsyncThunk(
  "GetNewGSTDetail",
  async ({ token, gstNumber }, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `/GST/GetNewGSTDetail`,
        params: { token, gstNumber },
      });
      if (result.data) {
        if (result?.data?.success) {
          return result.data;
        }
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error(
        "try catch [ GetNewGSTDetail ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// GstContact
export const GstContact = createAsyncThunk(
  "GstContact",
  async ({ gstin }, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `/GST/gstContact`,
        params: { gstin },
      });
      if (result.data) {
        if (result?.data?.success) {
          return result.data;
        }
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error("try catch [ GstContact ] error.message >>", error.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// BankPincode
export const BankPincode = createAsyncThunk(
  "BankPincode",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `EPFO/GetAllBankDetailByPincodeSearch`,
        params: userdata,
      });
      if (result.data) {
        if (result?.data?.success) {
          return result.data;
        }
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error("try catch [ BankPincode ] error.message >>", error.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// // TokenVerify
// export const TokenVerify = createAsyncThunk(
//   "TokenVerify",
//   async (userdata, thunkAPI) => {
//     try {
//       let result = await axios({
//         method: "POST",
//         baseURL: CONFIG.BASE_URL_LOGIN,
//         url: `verify/token`,
//         data: userdata,
//       });
//       if (result.data) {
//         if (result?.data?.success) {
//           return result.data;
//         }
//       } else {
//         console.log("result.data", result.data.errorMessage);
//         // return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
//       }
//     } catch (error) {
//       console.log("error", error);
//       // console.error(
//       //   "try catch [ TokenVerify ] error.message >>",
//       //   error.message
//       // );
//       // return thunkAPI.rejectWithValue({ error: error.message });
//     }
//   }
// );
// Ewallet
export const Ewallet = createAsyncThunk(
  "Ewallet",
  async (userdata, thunkAPI) => {
    try {
      if (userdata.apiFeature) {
        let result = await axios({
          method: "POST",
          headers: await Service.GetAuthHeader(),
          baseURL: CONFIG.BASE_URL_LOGIN,
          url: `credit/check`,
          data: userdata,
        });
        if (result.data.success) {
          await Service.setCredit(result.data.credit);
          let existdata = result.data;
          let maindata = {
            ...existdata,
            productvname: userdata.productName,
            value: userdata?.value || userdata?.MoreValue?.panNumber || "",
            MoreValue: userdata?.MoreValue,
          };
          return maindata;
        } else {
          return thunkAPI.rejectWithValue({ error: result.data });
        }
      } else {
        return thunkAPI.rejectWithValue({ error: `${Infodata.InfoByApiFichar}` });
      }
    } catch (error) {
      console.error("try catch [ Ewallet ] error.message >>", error);
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);
// Popularsearch
export const Popularsearch = createAsyncThunk(
  "Popularsearch",
  async (thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        // headers: await Service.GetAuthHeader(),
        baseURL: CONFIG.BASE_URL_LOGIN,
        url: `maximum/hit`,
      });

      if (result.data.success) {
        return result.data.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error("try catch [ Popularsearch ] error.message >>", error);
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);
// dataStoreWalletUpadate /data/store
export const dataStoreWalletUpadate = createAsyncThunk(
  "dataStoreWalletUpadate",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "POST",
        baseURL: CONFIG.BASE_URL_LOGIN,
        headers: await Service.GetAuthHeader(),
        url: `data/store`,
        data: userdata,
      });
      if (result.data.success) {
        let existdata1 = result.data;
        let maindata1 = {
          ...existdata1,
          navigetName: userdata.productName,
          value: userdata.value,
        };
        return maindata1;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error(
        "try catch [ dataStoreWalletUpadate ] error.message >>",
        error
      );
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);
// UploadCIN
export const UploadCIN = createAsyncThunk(
  "UploadCIN",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "POST",
        baseURL: CONFIG.BASE_URL_ALL,
        headers: uplodatHeader,
        url: `CIN/UploadCINData`,
        params: userdata,
      });
      if (result.data) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error("try catch [ Ewallet ] error.message >>", error.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// UploadCIN
export const SearchCompanyName = createAsyncThunk(
  "SearchCompanyName",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `CIN/SearchCINDetailByKeyword`,
        params: userdata,
      });
      if (result.data) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error(
        "try catch [ SearchCompanyName ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// UploadGST
export const SearchCompanyNameGSt = createAsyncThunk(
  "SearchCompanyNameGSt",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `GST/SearchGSTDetailByKeyword`,
        params: userdata,
      });
      if (result.data) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error(
        "try catch [ SearchCompanyNameGSt ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// GSTByLastDays
export const GSTByLastDays = createAsyncThunk(
  "GSTByLastDays",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `GST/GetGSTDetailsCountByLastXDays`,
        params: userdata,
      });
      if (result.data) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error(
        "try catch [ GSTByLastDays ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// GetNewGSTDetailsCountByLastXDays
export const GetNewGSTDetailsCountByLastXDays = createAsyncThunk(
  "GetNewGSTDetailsCountByLastXDays",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `GST/GetNewGSTDetailsCountByLastXDays`,
        params: userdata,
      });
      if (result.data) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error(
        "try catch [ GetNewGSTDetailsCountByLastXDays ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// DarpanByLastDay
export const DarpanByLastDay = createAsyncThunk(
  "DarpanByLastDay",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL, 
        url: `Darpan/GetDarpanDetailsCountByLastXDays`,
        params: userdata,
      });
      if (result.data) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error(
        "try catch [ DarpanByLastDay ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// 1 /api/IEC/GetIECDetailsCountByLastXDays
export const IECByLastDays = createAsyncThunk(
  "IECByLastDays",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL, 
        url: `IEC/GetIECDetailsCountByLastXDays`,
        params: userdata,
      });
      if (result.data) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error(
        "try catch [ IECByLastDays ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// /api/CIN/GetCINDetailsCountByLastXDays
export const GetCINDetailsCountByLastXDays = createAsyncThunk(
  "GetCINDetailsCountByLastXDays",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `CIN/GetCINDetailsCountByLastXDays`,
        params: userdata,
      });
      if (result.data.success) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error(
        "try catch [ GetCINDetailsCountByLastXDays ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// /api/CIN/GetNewCINDetailsCountByLastXDays
export const GetNewCINDetailsCountByLastXDays = createAsyncThunk(
  "GetNewCINDetailsCountByLastXDays",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL, 
        url: `CIN/GetNewCINDetailsCountByLastXDays`,
        params: userdata,
      });
      if (result.data.success) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error(
        "try catch [ GetNewCINDetailsCountByLastXDays ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// /IEC/GetPdfRequestList
export const GetPdfRequestList = createAsyncThunk(
  "GetPdfRequestList",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `IEC/GetPdfRequestList`,
        params: userdata,
      });
      if (result.data.success) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error(
        "try catch [ GetPdfRequestList ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// -------------
// Sendmobileotp
export const Sendmobileotp = createAsyncThunk(
  "Sendmobileotp",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `/PortalAdmin/sendmobileotp`,
        params: userdata,
      });
      return result.data;
    } catch (error) {
      console.error(
        "try catch [ Sendmobileotp ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// Sendemailotp
export const Sendemailotp = createAsyncThunk(
  "Sendemailotp",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `/PortalAdmin/sendemailotp`,
        params: userdata,
      });
      return result.data;
    } catch (error) {
      console.error(
        "try catch [ sendemailotp ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// usersignup
export const Usersignup = createAsyncThunk(
  "Usersignup",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "POST",
        baseURL: CONFIG.BASE_URL_ALL,
        headers: authheader,
        url: `/PortalAdmin/usersignup`,
        data: userdata,
      });
      if (result.data.success) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error("try catch [ Usersignup ] error.message >>", error.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// ECOMMERCE
export const Ecommerce = createAsyncThunk(
  "Ecommerce",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "POST",
        baseURL: CONFIG.BASE_URL_LOGIN,
        // headers: authheader_ecommerce,
        url: `/check_registration`,
        data: userdata,
      });
      return result.data;
    } catch (error) {
      console.error("try catch [ Ecommerce ] error.message >>", error.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// EwalletHistory
export const EwalletHistory = createAsyncThunk(
  "EwalletHistory",
  async (_, thunkAPI) => {
    let errorMessageValue = "";
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_LOGIN,
        url: `/payment/history`,
        headers: await Service.GetAuthHeader(),
      });
      if (result.data.success) {
        return result.data;
      } else {
        errorMessageValue = result.data.errorMessage || "Unexpected error occurred";
        return thunkAPI.rejectWithValue({ error: errorMessageValue });
      }
    } catch (error) {
      console.error("try catch [ EwalletHistory ] error.message >>", error);
      return thunkAPI.rejectWithValue({
        error: errorMessageValue || error.message || "Unknown error",
      });
    }
  }
);
// GetDashboardCount
export const GetDashboardCount = createAsyncThunk(
  "GetDashboardCount",
  async (thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `IEC/GetDashboardCount`,
      });
      if (result.data.success) {
        return result.data.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error(
        "try catch [ GetDashboardCount ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// CIN/GetDashboardCategoryCount"
export const GetDashboardCategoryCount = createAsyncThunk(
  "GetDashboardCategoryCount",
  async (thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `CIN/GetDashboardCategoryCount`,
      });
      if (result.data.success) {
        return result.data.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error(
        "try catch [ GetDashboardCount ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// GST/GetGSTDetailsBySelectedDate
export const GetGSTDetailsBySelectedDateAllData = createAsyncThunk(
  "GetGSTDetailsBySelectedDateAllData",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL, 
        url: `GST/GetGSTDetailsBySelectedDate`,
        params: userdata,
      });
      if (result.data.success) {
        return result.data.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error(
        "try catch [ GetGSTDetailsBySelectedDateAllData ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// Darpan/GetDarpanDetailsBySelectedDate
export const GetDarpanDetailsBySelectedDate = createAsyncThunk(
  "GetDarpanDetailsBySelectedDate",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL, 
        url: `Darpan/GetDarpanDetailsBySelectedDate`,
        params: userdata,
      });
      if (result.data.success) {
        return result.data.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error(
        "try catch [ GetDarpanDetailsBySelectedDate ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
//2 api/IEC/GetIECDetailsBySelectedDate
export const GetIECDetailsBySelectedDate = createAsyncThunk(
  "GetIECDetailsBySelectedDate",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL, 
        url: `IEC/GetIECDetailsBySelectedDate`,
        params: userdata,
      });
      if (result.data.success) {
        return result.data.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error(
        "try catch [ GetIECDetailsBySelectedDate ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// GST/PincodeGet
export const PincodeGet = createAsyncThunk(
  "PincodeGet",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL, 
        url: `GST/GetUserPinCodeListByUsername`,
        params: userdata,
      });
      if (result.data.success) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error(
        "try catch [ PincodeGet ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// CIN/GetCompanyAndDirectorDetailBySelectedDate
export const CinGetCompanyAndDirectorDetailBySelected = createAsyncThunk(
  "CinGetCompanyAndDirectorDetailBySelected",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL, 
        url: `CIN/GetCompanyAndDirectorDetailBySelectedDate`,
        params: userdata,
      });
      if (result.data.success) {
        return result.data.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error(
        "try catch [ CinGetCompanyAndDirectorDetailBySelected ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// IEC/SavePdfRequest"
export const SavePdfRequest = createAsyncThunk(
  "SavePdfRequest",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "POST",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `IEC/SavePdfRequest`,
        data: userdata,
      });
      if (result.data.success) {
        return result.data.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error(
        "try catch [ SavePdfRequest ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// IEC/GetCompanyAndDirectorDetailBySelectedDate
export const IECGetCompanyAndDirectorDetailBySelected = createAsyncThunk(
  "IECGetCompanyAndDirectorDetailBySelected",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `SIEC/GetCompanyAndDirectorDetailBySelectedDate`,
        params: userdata,
      });
      if (result.data.success) {
        return result.data.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error(
        "try catch [ IECGetCompanyAndDirectorDetailBySelected ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// darpan/GetCompanyAndDirectorDetailBySelectedDate
export const DarpanGetCompanyAndDirectorDetailBySelected = createAsyncThunk(
  "DarpanGetCompanyAndDirectorDetailBySelected",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "GET",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `darpan/GetCompanyAndDirectorDetailBySelectedDate`,
        params: userdata,
      });
      if (result.data.success) {
        return result.data.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error(
        "try catch [ DarpanGetCompanSyAndDirectorDetailBySelected ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// GST/SaveUserPinCode
export const SaveUserPinCode = createAsyncThunk(
  "SaveUserPinCode",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "POST",
        baseURL: CONFIG.BASE_URL_ALL,
        url: `GST/SaveUserPinCode`,
        data: userdata,
      });
      if (result.data.success) {
        return result.data.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data });
      }
    } catch (error) {
      console.error(
        "try catch [ SaveUserPinCode ] error.message >>",
        error.message
      );
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
const initialState = {
  // Basic state properties
  ref1: null,
  ref2: null,
  successMessage: "",
  isMe: false,
  isPincodeGet: false,
  isDarpanSearchApi: false,
  DarpanSearchApiData: null,
  isGetFileLogListByUserName: false,
  GetFileLogListByUserNameData: null,
  darkmode: false,
  viewPortal: false,
  isloading: false,
  isSaveUserPinCode: false,
  isSavePdfRequest: false,
  ProductValue: "",
  ProductName: "",
  isGstsearch: false,
  GstsearchData: null,
  isError: false,
  errorMessage: "",
  // Add other properties as needed
};

export const TBSlice = createSlice({
  name: "TB",
  initialState,
  reducers: {
    updateState: (state, { payload }) => {
      state.ref1 = payload.ref1 !== undefined ? payload.ref1 : state.ref1;
      state.ref2 = payload.ref2 !== undefined ? payload.ref2 : state.ref2;
      state.successMessage = payload.successMessage !== undefined ? payload.successMessage : state.successMessage;

      state.isMe = payload.isMe !== undefined ? payload.isMe : state.isMe;

      state.isPincodeGet = payload.isPincodeGet !== undefined ? payload.isPincodeGet : state.isPincodeGet;

      state.isDarpanSearchApi = payload.isDarpanSearchApi !== undefined ? payload.isDarpanSearchApi : state.isDarpanSearchApi;
      state.DarpanSearchApiData = payload.DarpanSearchApiData !== undefined ? payload.DarpanSearchApiData : state.DarpanSearchApiData;

      state.isGetFileLogListByUserName = payload.isGetFileLogListByUserName !== undefined ? payload.isGetFileLogListByUserName : state.isGetFileLogListByUserName;
      state.GetFileLogListByUserNameData = payload.GetFileLogListByUserNameData !== undefined ? payload.GetFileLogListByUserNameData : state.GetFileLogListByUserNameData;

      state.darkmode =
        payload.darkmode !== undefined ? payload.darkmode : state.darkmode;

      state.viewPortal =
        payload.viewPortal !== undefined
          ? payload.viewPortal
          : state.viewPortal;

      state.isloading =
        payload.isloading !== undefined ? payload.isloading : state.isloading;

      state.isSaveUserPinCode =
        payload.isSaveUserPinCode !== undefined ? payload.isSaveUserPinCode : state.isSaveUserPinCode;

      state.isSavePdfRequest =
        payload.isSavePdfRequest !== undefined ? payload.isSavePdfRequest : state.isSavePdfRequest;

      state.ProductValue =
        payload.ProductValue !== undefined
          ? payload.ProductValue
          : state.ProductValue;
      state.ProductName =
        payload.ProductName !== undefined
          ? payload.ProductName
          : state.ProductName;

      state.isGstsearch =
        payload.isGstsearch !== undefined
          ? payload.isGstsearch
          : state.isGstsearch;
      state.GstsearchData =
        payload.GstsearchData !== undefined
          ? payload.GstsearchData
          : state.GstsearchData;

      state.isGetGSTDetailsBySelectedDateAllData =
        payload.isGetGSTDetailsBySelectedDateAllData !== undefined
          ? payload.isGetGSTDetailsBySelectedDateAllData
          : state.isGetGSTDetailsBySelectedDateAllData;
      state.GetGSTDetailsBySelectedDateAllDataData =
        payload.GetGSTDetailsBySelectedDateAllDataData !== undefined
          ? payload.GetGSTDetailsBySelectedDateAllDataData
          : state.GetGSTDetailsBySelectedDateAllDataData;

      state.isGetDarpanDetailsBySelectedDate =
        payload.isGetDarpanDetailsBySelectedDate !== undefined
          ? payload.isGetDarpanDetailsBySelectedDate
          : state.isGetDarpanDetailsBySelectedDate;
      state.GetDarpanDetailsBySelectedDateData =
        payload.GetDarpanDetailsBySelectedDateData !== undefined
          ? payload.GetDarpanDetailsBySelectedDateData
          : state.GetDarpanDetailsBySelectedDateData;

      state.isGetIECDetailsBySelectedDate =
        payload.isGetIECDetailsBySelectedDate !== undefined
          ? payload.isGetIECDetailsBySelectedDate
          : state.isGetIECDetailsBySelectedDate;
      state.GetIECDetailsBySelectedDateData =
        payload.GetIECDetailsBySelectedDateData !== undefined
          ? payload.GetIECDetailsBySelectedDateData
          : state.GetIECDetailsBySelectedDateData;

      state.isCinGetCompanyAndDirectorDetailBySelected =
        payload.isCinGetCompanyAndDirectorDetailBySelected !== undefined
          ? payload.isCinGetCompanyAndDirectorDetailBySelected
          : state.isCinGetCompanyAndDirectorDetailBySelected;
      state.CinGetCompanyAndDirectorDetailBySelectedData =
        payload.CinGetCompanyAndDirectorDetailBySelectedData !== undefined
          ? payload.CinGetCompanyAndDirectorDetailBySelectedData
          : state.CinGetCompanyAndDirectorDetailBySelectedData;

      state.isIECGetCompanyAndDirectorDetailBySelected =
        payload.isIECGetCompanyAndDirectorDetailBySelected !== undefined
          ? payload.isIECGetCompanyAndDirectorDetailBySelected
          : state.isIECGetCompanyAndDirectorDetailBySelected;
      state.IECGetCompanyAndDirectorDetailBySelectedData =
        payload.IECGetCompanyAndDirectorDetailBySelectedData !== undefined
          ? payload.IECGetCompanyAndDirectorDetailBySelectedData
          : state.IECGetCompanyAndDirectorDetailBySelectedData;

      state.isBankPincode =
        payload.isBankPincode !== undefined
          ? payload.isBankPincode
          : state.isBankPincode;
      state.BankPincodeData =
        payload.BankPincodeData !== undefined
          ? payload.BankPincodeData
          : state.BankPincodeData;

      state.isReUsersignin =
        payload.isReUsersignin !== undefined
          ? payload.isReUsersignin
          : state.isReUsersignin;
      state.ReUsersigninData =
        payload.ReUsersigninData !== undefined
          ? payload.ReUsersigninData
          : state.ReUsersigninData;

      state.isGetFactAppInfoByPhone =
        payload.isGetFactAppInfoByPhone !== undefined
          ? payload.isGetFactAppInfoByPhone
          : state.isGetFactAppInfoByPhone;
      state.GetFactAppInfoByPhoneData =
        payload.GetFactAppInfoByPhoneData !== undefined
          ? payload.GetFactAppInfoByPhoneData
          : state.GetFactAppInfoByPhoneData;

      state.isGetFactAppInfoMoreByPhone =
        payload.isGetFactAppInfoMoreByPhone !== undefined
          ? payload.isGetFactAppInfoMoreByPhone
          : state.isGetFactAppInfoMoreByPhone;
      state.GetFactAppInfoMoreByPhoneData =
        payload.GetFactAppInfoMoreByPhoneData !== undefined
          ? payload.GetFactAppInfoMoreByPhoneData
          : state.GetFactAppInfoMoreByPhoneData;

      state.isGetFactAppInfoByEmail =
        payload.isGetFactAppInfoByEmail !== undefined
          ? payload.isGetFactAppInfoByEmail
          : state.isGetFactAppInfoByEmail;
      state.GetFactAppInfoByEmailData =
        payload.GetFactAppInfoByEmailData !== undefined
          ? payload.GetFactAppInfoByEmailData
          : state.GetFactAppInfoByEmailData;

      state.isGetFactAppInfoMoreByEmail =
        payload.isGetFactAppInfoMoreByEmail !== undefined
          ? payload.isGetFactAppInfoMoreByEmail
          : state.isGetFactAppInfoMoreByEmail;
      state.GetFactAppInfoMoreByEmailData =
        payload.GetFactAppInfoMoreByEmailData !== undefined
          ? payload.GetFactAppInfoMoreByEmailData
          : state.GetFactAppInfoMoreByEmailData;

      state.isGetFactAppInfoByUserName =
        payload.isGetFactAppInfoByUserName !== undefined
          ? payload.isGetFactAppInfoByUserName
          : state.isGetFactAppInfoByUserName;
      state.GetFactAppInfoByUserNameData =
        payload.GetFactAppInfoByUserNameData !== undefined
          ? payload.GetFactAppInfoByUserNameData
          : state.GetFactAppInfoByUserNameData;

      state.isIESDetailApi =
        payload.isIESDetailApi !== undefined
          ? payload.isIESDetailApi
          : state.isIESDetailApi;
      state.IESDetailApiData =
        payload.IESDetailApiData !== undefined
          ? payload.IESDetailApiData
          : state.IESDetailApiData;

      state.isdataStoreWalletUpadate =
        payload.isdataStoreWalletUpadate !== undefined
          ? payload.isdataStoreWalletUpadate
          : state.isdataStoreWalletUpadate;

      state.isGetGSTCINDetailByEmail =
        payload.isGetGSTCINDetailByEmail !== undefined
          ? payload.isGetGSTCINDetailByEmail
          : state.isGetGSTCINDetailByEmail;
      state.GetGSTCINDetailByEmailData =
        payload.GetGSTCINDetailByEmailData !== undefined
          ? payload.GetGSTCINDetailByEmailData
          : state.GetGSTCINDetailByEmailData;

      state.isRefreshCinDINDetails =
        payload.isRefreshCinDINDetails !== undefined
          ? payload.isRefreshCinDINDetails
          : state.isRefreshCinDINDetails;
      state.RefreshCinDINDetailsData =
        payload.RefreshCinDINDetailsData !== undefined
          ? payload.RefreshCinDINDetailsData
          : state.RefreshCinDINDetailsData;

      state.isRefreshDINDetailsByDIN =
        payload.isRefreshDINDetailsByDIN !== undefined
          ? payload.isRefreshDINDetailsByDIN
          : state.isRefreshDINDetailsByDIN;
      state.RefreshDINDetailsByDINData =
        payload.RefreshDINDetailsByDINData !== undefined
          ? payload.RefreshDINDetailsByDINData
          : state.RefreshDINDetailsByDINData;

      state.isUpdateProfile =
        payload.isUpdateProfile !== undefined
          ? payload.isUpdateProfile
          : state.isUpdateProfile;
      state.UpdateProfileData =
        payload.UpdateProfileData !== undefined
          ? payload.UpdateProfileData
          : state.UpdateProfileData;

      state.isHelpdeskTicketList =
        payload.isHelpdeskTicketList !== undefined
          ? payload.isHelpdeskTicketList
          : state.isHelpdeskTicketList;
      state.HelpdeskTicketListData =
        payload.HelpdeskTicketListData !== undefined
          ? payload.HelpdeskTicketListData
          : state.HelpdeskTicketListData;

      state.isHelpdeskTicketCreate =
        payload.isHelpdeskTicketCreate !== undefined
          ? payload.isHelpdeskTicketCreate
          : state.isHelpdeskTicketCreate;
      state.HelpdeskTicketCreateData =
        payload.HelpdeskTicketCreateData !== undefined
          ? payload.HelpdeskTicketCreateData
          : state.HelpdeskTicketCreateData;

      state.isPanverify =
        payload.isPanverify !== undefined
          ? payload.isPanverify
          : state.isPanverify;
      state.PanverifyData =
        payload.PanverifyData !== undefined
          ? payload.PanverifyData
          : state.PanverifyData;

      state.isMobileToMultipleUPI =
        payload.isMobileToMultipleUPI !== undefined
          ? payload.isMobileToMultipleUPI
          : state.isMobileToMultipleUPI;
      state.MobileToMultipleUPIData =
        payload.MobileToMultipleUPIData !== undefined
          ? payload.MobileToMultipleUPIData
          : state.MobileToMultipleUPIData;

      state.isResetPassword =
        payload.isResetPassword !== undefined
          ? payload.isResetPassword
          : state.isResetPassword;
      state.ResetPasswordData =
        payload.ResetPasswordData !== undefined
          ? payload.ResetPasswordData
          : state.ResetPasswordData;

      state.isBusinessPanSearch =
        payload.isBusinessPanSearch !== undefined
          ? payload.isBusinessPanSearch
          : state.isBusinessPanSearch;
      state.BusinessPanSearchData =
        payload.BusinessPanSearchData !== undefined
          ? payload.BusinessPanSearchData
          : state.BusinessPanSearchData;

      state.isGetPincodeLatLongGST =
        payload.isGetPincodeLatLongGST !== undefined
          ? payload.isGetPincodeLatLongGST
          : state.isGetPincodeLatLongGST;
      state.GetPincodeLatLongGSTData =
        payload.GetPincodeLatLongGSTData !== undefined
          ? payload.GetPincodeLatLongGSTData
          : state.GetPincodeLatLongGSTData;

      state.location =
        payload.location !== undefined ? payload.location : state.location;

      state.isMobileToMSME =
        payload.isMobileToMSME !== undefined
          ? payload.isMobileToMSME
          : state.isMobileToMSME;
      state.MobileToMSMEData =
        payload.MobileToMSMEData !== undefined
          ? payload.MobileToMSMEData
          : state.MobileToMSMEData;

      state.isGetCINDetailsCountByLastXDays =
        payload.isGetCINDetailsCountByLastXDays !== undefined
          ? payload.isGetCINDetailsCountByLastXDays
          : state.isGetCINDetailsCountByLastXDays;
      state.GetCINDetailsCountByLastXDaysData =
        payload.GetCINDetailsCountByLastXDaysData !== undefined
          ? payload.GetCINDetailsCountByLastXDaysData
          : state.GetCINDetailsCountByLastXDaysData;

      state.isGetNewCINDetailsCountByLastXDays =
        payload.isGetNewCINDetailsCountByLastXDays !== undefined
          ? payload.isGetNewCINDetailsCountByLastXDays
          : state.isGetNewCINDetailsCountByLastXDays;
      state.GetNewCINDetailsCountByLastXDaysData =
        payload.GetNewCINDetailsCountByLastXDaysData !== undefined
          ? payload.GetNewCINDetailsCountByLastXDaysData
          : state.GetNewCINDetailsCountByLastXDaysData;

      state.isGetPdfRequestList =
        payload.isGetPdfRequestList !== undefined
          ? payload.isGetPdfRequestList
          : state.isGetPdfRequestList;
      state.GetPdfRequestListData =
        payload.GetPdfRequestListData !== undefined
          ? payload.GetPdfRequestListData
          : state.GetPdfRequestListData;

      state.isSearchCompanyName =
        payload.isSearchCompanyName !== undefined
          ? payload.isSearchCompanyName
          : state.isSearchCompanyName;
      state.SearchCompanyNameData =
        payload.SearchCompanyNameData !== undefined
          ? payload.SearchCompanyNameData
          : state.SearchCompanyNameData;

      state.isSearchCompanyNameGSt =
        payload.isSearchCompanyNameGSt !== undefined
          ? payload.isSearchCompanyNameGSt
          : state.isSearchCompanyNameGSt;
      state.SearchCompanyNameGStData =
        payload.SearchCompanyNameGStData !== undefined
          ? payload.SearchCompanyNameGStData
          : state.SearchCompanyNameGStData;

      state.isEwalletHistory =
        payload.isEwalletHistory !== undefined
          ? payload.isEwalletHistory
          : state.isEwalletHistory;
      state.EwalletHistoryData =
        payload.EwalletHistoryData !== undefined
          ? payload.EwalletHistoryData
          : state.EwalletHistoryData;

      state.isGstverify =
        payload.isGstverify !== undefined
          ? payload.isGstverify
          : state.isGstverify;
      state.GstverifyData =
        payload.GstverifyData !== undefined
          ? payload.GstverifyData
          : state.GstverifyData;

      state.isUploadCIN =
        payload.isUploadCIN !== undefined
          ? payload.isUploadCIN
          : state.isUploadCIN;
      state.UploadCINData =
        payload.UploadCINData !== undefined
          ? payload.UploadCINData
          : state.UploadCINData;

      state.isCINDetailsByDate =
        payload.isCINDetailsByDate !== undefined
          ? payload.isCINDetailsByDate
          : state.isCINDetailsByDate;
      state.CINDetailsByDateData =
        payload.CINDetailsByDateData !== undefined
          ? payload.CINDetailsByDateData
          : state.CINDetailsByDateData;

      state.isGetPincodeLatLong =
        payload.isGetPincodeLatLong !== undefined
          ? payload.isGetPincodeLatLong
          : state.isGetPincodeLatLong;
      state.GetPincodeLatLongData =
        payload.GetPincodeLatLongData !== undefined
          ? payload.GetPincodeLatLongData
          : state.GetPincodeLatLongData;

      state.isUsersignup =
        payload.isUsersignup !== undefined
          ? payload.isUsersignup
          : state.isUsersignup;
      state.UsersignupData =
        payload.UsersignupData !== undefined
          ? payload.UsersignupData
          : state.UsersignupData;

      state.isGetCINAddressByPin =
        payload.isGetCINAddressByPin !== undefined
          ? payload.isGetCINAddressByPin
          : state.isGetCINAddressByPin;
      state.GetCINAddressByPinData =
        payload.GetCINAddressByPinData !== undefined
          ? payload.GetCINAddressByPinData
          : state.GetCINAddressByPinData;

      state.isUsersignin =
        payload.isUsersignin !== undefined
          ? payload.isUsersignin
          : state.isUsersignin;
      state.UsersigninData =
        payload.UsersigninData !== undefined
          ? payload.UsersigninData
          : state.UsersigninData;

      state.isGSTByLastDays =
        payload.isGSTByLastDays !== undefined
          ? payload.isGSTByLastDays
          : state.isGSTByLastDays;
      state.GSTByLastDaysData =
        payload.GSTByLastDaysData !== undefined
          ? payload.GSTByLastDaysData
          : state.GSTByLastDaysData;

      state.isGetNewGSTDetailsCountByLastXDays =
        payload.isGetNewGSTDetailsCountByLastXDays !== undefined
          ? payload.isGetNewGSTDetailsCountByLastXDays
          : state.isGetNewGSTDetailsCountByLastXDays;
      state.GetNewGSTDetailsCountByLastXDaysData =
        payload.GetNewGSTDetailsCountByLastXDaysData !== undefined
          ? payload.GetNewGSTDetailsCountByLastXDaysData
          : state.GetNewGSTDetailsCountByLastXDaysData;

      state.isDarpanByLastDay =
        payload.isDarpanByLastDay !== undefined
          ? payload.isDarpanByLastDay
          : state.isDarpanByLastDay;
      state.DarpanByLastDayData =
        payload.DarpanByLastDayData !== undefined
          ? payload.DarpanByLastDayData
          : state.DarpanByLastDayData;

      state.isIECByLastDays =
        payload.isIECByLastDays !== undefined
          ? payload.isIECByLastDays
          : state.isIECByLastDays;
      state.IECByLastDaysData =
        payload.IECByLastDaysData !== undefined
          ? payload.IECByLastDaysData
          : state.IECByLastDaysData;

      state.isEmailAvlebl =
        payload.isEmailAvlebl !== undefined
          ? payload.isEmailAvlebl
          : state.isEmailAvlebl;

      state.navigetName =
        payload.navigetName !== undefined
          ? payload.navigetName
          : state.navigetName;

      state.EwalletData =
        payload.EwalletData !== undefined
          ? payload.EwalletData
          : state.EwalletData;
      state.isEwallet =
        payload.isEwallet !== undefined ? payload.isEwallet : state.isEwallet;
      state.Ewalletexpired =
        payload.Ewalletexpired !== undefined
          ? payload.Ewalletexpired
          : state.Ewalletexpired;

      state.isSaveUser =
        payload.isSaveUser !== undefined
          ? payload.isSaveUser
          : state.isSaveUser;
      state.isEmailverify =
        payload.isEmailverify !== undefined
          ? payload.isEmailverify
          : state.isEmailverify;
      state.isSignin =
        payload.isSignin !== undefined ? payload.isSignin : state.isSignin;

      state.isMobile360 =
        payload.isMobile360 !== undefined
          ? payload.isMobile360
          : state.isMobile360;
      state.Mobile360Data =
        payload.Mobile360Data !== undefined
          ? payload.Mobile360Data
          : state.Mobile360Data;

      state.isCin = payload.isCin !== undefined ? payload.isCin : state.isCin;
      state.CinData =
        payload.CinData !== undefined ? payload.CinData : state.CinData;

      state.isSearchCINByAdvanceSearch =
        payload.isSearchCINByAdvanceSearch !== undefined
          ? payload.isSearchCINByAdvanceSearch
          : state.isSearchCINByAdvanceSearch;
      state.SearchCINByAdvanceSearchData =
        payload.SearchCINByAdvanceSearchData !== undefined
          ? payload.SearchCINByAdvanceSearchData
          : state.SearchCINByAdvanceSearchData;

      state.isSearchGSTByAdvanceSearch =
        payload.isSearchGSTByAdvanceSearch !== undefined
          ? payload.isSearchGSTByAdvanceSearch
          : state.isSearchGSTByAdvanceSearch;
      state.SearchGSTByAdvanceSearchData =
        payload.SearchGSTByAdvanceSearchData !== undefined
          ? payload.SearchGSTByAdvanceSearchData
          : state.SearchGSTByAdvanceSearchData;

      state.isCinGetIndustryList =
        payload.isCinGetIndustryList !== undefined
          ? payload.isCinGetIndustryList
          : state.isCinGetIndustryList;
      state.CinGetIndustryListData =
        payload.CinGetIndustryListData !== undefined
          ? payload.CinGetIndustryListData
          : state.CinGetIndustryListData;

      state.isCinGetSegmentList =
        payload.isCinGetSegmentList !== undefined
          ? payload.isCinGetSegmentList
          : state.isCinGetSegmentList;
      state.CinGetSegmentListData =
        payload.CinGetSegmentListData !== undefined
          ? payload.CinGetSegmentListData
          : state.CinGetSegmentListData;

      state.isGetDashboardCount =
        payload.isGetDashboardCount !== undefined
          ? payload.isGetDashboardCount
          : state.isGetDashboardCount;

      state.isEcommerce =
        payload.isEcommerce !== undefined
          ? payload.isEcommerce
          : state.isEcommerce;
      state.EcommerceData =
        payload.EcommerceData !== undefined
          ? payload.EcommerceData
          : state.EcommerceData;

      state.isDin = payload.isDin !== undefined ? payload.isDin : state.isDin;
      state.DinData =
        payload.DinData !== undefined ? payload.DinData : state.DinData;

      state.isMsme =
        payload.isMsme !== undefined ? payload.isMsme : state.isMsme;
      state.MsmeData =
        payload.MsmeData !== undefined ? payload.MsmeData : state.MsmeData;

      state.isPanSearch =
        payload.isPanSearch !== undefined
          ? payload.isPanSearch
          : state.isPanSearch;
      state.PanSearchData =
        payload.PanSearchData !== undefined
          ? payload.PanSearchData
          : state.PanSearchData;

      state.isGetNewGSTList =
        payload.isGetNewGSTList !== undefined
          ? payload.isGetNewGSTList
          : state.isGetNewGSTList;
      state.GetNewGSTListData =
        payload.GetNewGSTListData !== undefined
          ? payload.GetNewGSTListData
          : state.GetNewGSTListData;

      state.isGetMCAReport =
        payload.isGetMCAReport !== undefined
          ? payload.isGetMCAReport
          : state.isGetMCAReport;
      state.GetMCAReportData =
        payload.GetMCAReportData !== undefined
          ? payload.GetMCAReportData
          : state.GetMCAReportData;

      state.isGetNewGSTDetail =
        payload.isGetNewGSTDetail !== undefined
          ? payload.isGetNewGSTDetail
          : state.isGetNewGSTDetail;
      state.GetNewGSTDetailData =
        payload.GetNewGSTDetailData !== undefined
          ? payload.GetNewGSTDetailData
          : state.GetNewGSTDetailData;

      state.isGstContact =
        payload.isGstContact !== undefined
          ? payload.isGstContact
          : state.isGstContact;
      state.GstContactData =
        payload.GstContactData !== undefined
          ? payload.GstContactData
          : state.GstContactData;

      state.isUsersignup =
        payload.isUsersignup !== undefined
          ? payload.isUsersignup
          : state.isUsersignup;

      state.isSendmobileotp =
        payload.isSendmobileotp !== undefined
          ? payload.isSendmobileotp
          : state.isSendmobileotp;

      state.isSendemailotp =
        payload.isSendemailotp !== undefined
          ? payload.isSendemailotp
          : state.isSendemailotp;

      state.isGetCoordinates =
        payload.isGetCoordinates !== undefined
          ? payload.isGetCoordinates
          : state.isGetCoordinates;
      state.GetCoordinatesData =
        payload.GetCoordinatesData !== undefined
          ? payload.GetCoordinatesData
          : state.GetCoordinatesData;

      state.isGetDashboardCategoryCount =
        payload.isGetDashboardCategoryCount !== undefined
          ? payload.isGetDashboardCategoryCount
          : state.isGetDashboardCategoryCount;
      state.GetDashboardCategoryCountData =
        payload.GetDashboardCategoryCountData !== undefined
          ? payload.GetDashboardCategoryCountData
          : state.GetDashboardCategoryCountData;

      state.isError =
        payload.isError !== undefined ? payload.isError : state.isError;
      state.errorMessage =
        payload.errorMessage !== undefined
          ? payload.errorMessage
          : state.errorMessage;
      return state;
    },
  },
  extraReducers: (builder) => {
    //========= GetPincodeLatLongGST
    builder.addCase(GetPincodeLatLongGST.fulfilled, (state, { payload }) => {
      try {
        state.GetPincodeLatLongGSTData = payload;
        state.isGetPincodeLatLongGST = true;
        state.isGetPincodeLatLongGSTFetching = false;

        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: GetPincodeLatLongGST.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetPincodeLatLongGST.rejected, (state, { payload }) => {
      try {
        state.GetPincodeLatLongGSTData = {};
        state.isGetPincodeLatLongGST = false;
        state.isGetPincodeLatLongGSTFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error.message
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [GetPincodeLatLongGST.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetPincodeLatLongGST.pending, (state) => {
      state.isGetPincodeLatLongGSTFetching = true;
    });

    //========= Usersignin
    builder.addCase(Usersignin.fulfilled, (state, { payload }) => {
      try {
        state.UsersignupData = payload;
        state.isUsersignin = true;
        state.isUsersigninFetching = false;

        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error("Error: Usersignin.fulfilled try catch error >>", error);
      }
    });
    builder.addCase(Usersignin.rejected, (state, { payload }) => {
      try {
        state.UsersignupData = {};
        state.isUsersignin = false;
        state.isUsersigninFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? payload.error
            : "Invalid Username And Password")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [UserUsersignin.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(Usersignin.pending, (state) => {
      state.isUsersigninFetching = true;
    });
    //========= ReUsersignin
    builder.addCase(ReUsersignin.fulfilled, (state, { payload }) => {
      try {
        state.ReUsersigninData = payload;
        state.isReUsersignin = true;
        state.isReUsersigninFetching = false;

        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: ReUsersignin.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(ReUsersignin.rejected, (state, { payload }) => {
      try {
        state.ReUsersigninData = {};
        state.isReUsersignin = false;
        state.isReUsersigninFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? payload.error
            : "Invalid Username And Password")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [UserReUsersignin.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(ReUsersignin.pending, (state) => {
      state.isReUsersigninFetching = true;
    });

    //========= UpdateProfile
    builder.addCase(UpdateProfile.fulfilled, (state, { payload }) => {
      try {
        state.UpdateProfileData = payload;
        state.isUpdateProfile = true;
        state.isUpdateProfileFetching = false;

        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: UpdateProfile.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(UpdateProfile.rejected, (state, { payload }) => {
      try {
        state.UpdateProfileData = {};
        state.isUpdateProfile = false;
        state.isUpdateProfileFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error.message
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [UpdateProfile.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(UpdateProfile.pending, (state) => {
      state.isUpdateProfileFetching = true;
    });
    //========= ResetPassword
    builder.addCase(ResetPassword.fulfilled, (state, { payload }) => {
      try {
        state.ResetPasswordData = payload;
        state.isResetPassword = true;
        state.isResetPasswordFetching = false;

        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: ResetPassword.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(ResetPassword.rejected, (state, { payload }) => {
      try {
        state.ResetPasswordData = {};
        state.isResetPassword = false;
        state.isResetPasswordFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error.message
            ? payload.error.message
            : payload.error)
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [ResetPassword.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(ResetPassword.pending, (state) => {
      state.isResetPasswordFetching = true;
    });
    //========= SavePdfRequest
    builder.addCase(SavePdfRequest.fulfilled, (state, { payload }) => {
      try {
        state.SavePdfRequestData = payload;
        state.isSavePdfRequest = true;
        state.isSavePdfRequestFetching = false;

        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: SavePdfRequest.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(SavePdfRequest.rejected, (state, { payload }) => {
      try {
        state.SavePdfRequestData = {};
        state.isSavePdfRequest = false;
        state.isSavePdfRequestFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error.message
            ? payload.error.message
            : payload.error)
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [SavePdfRequest.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(SavePdfRequest.pending, (state) => {
      state.isSavePdfRequestFetching = true;
    });
    //========= SaveUserPinCode
    builder.addCase(SaveUserPinCode.fulfilled, (state, { payload }) => {
      try {
        state.isSaveUserPinCode = true;
        state.isSaveUserPinCodeFetching = false;

        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: SaveUserPinCode.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(SaveUserPinCode.rejected, (state, { payload }) => {
      try {
        state.SaveUserPinCodeData = {};
        state.isSaveUserPinCode = false;
        state.isSaveUserPinCodeFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error.message
            ? payload.error.message
            : payload.error)
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [SaveUserPinCode.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(SaveUserPinCode.pending, (state) => {
      state.isSaveUserPinCodeFetching = true;
    });
    //========= Emailverify
    builder.addCase(Emailverify.fulfilled, (state, { payload }) => {
      try {
        state.EmailverifyData = payload;
        state.isEmailverify = true;
        state.isEmailverifyFetching = false;

        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error("Error: Emailverify.fulfilled try catch error >>", error);
      }
    });
    builder.addCase(Emailverify.rejected, (state, { payload }) => {
      try {
        state.EmailverifyData = {};
        state.isEmailverify = false;
        state.isEmailAvlebl = !payload.error.success;
        state.isEmailverifyFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error.message_detail
            ? payload.error.message_detail
            : payload.error)
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [Emailverify.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(Emailverify.pending, (state) => {
      state.isEmailverifyFetching = true;
    });
    //========= Gstverify
    builder.addCase(Gstverify.fulfilled, (state, { payload }) => {
      try {
        state.GstverifyData = payload.data;
        state.isGstverify = true;
        state.isGstverifyFetching = false;

        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error("Error: Gstverify.fulfilled try catch error >>", error);
      }
    });
    builder.addCase(Gstverify.rejected, (state, { payload }) => {
      try {
        state.GstverifyData = {};
        state.isGstverify = false;
        state.isGstverifyFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error.message_detail
            ? "Please try again (There was some network issue)."
            : "Failed to retrieve GST contact details.")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error("Error: [Gstverify.rejected] try catch error >>", error);
      }
    });
    builder.addCase(Gstverify.pending, (state) => {
      state.isGstverifyFetching = true;
    });

    //========= Usersignup
    builder.addCase(Usersignup.fulfilled, (state, { payload }) => {
      try {
        state.isUsersignup = true;
        state.isUsersignupFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error("Error: Usersignup.fulfilled try catch error >>", error);
      }
    });
    builder.addCase(Usersignup.rejected, (state, { payload }) => {
      try {
        state.isUsersignup = false;
        state.isUsersignupFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error.message_detail
            ? payload.error.message_detail
            : payload.error)
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error("Error: [Usersignup.rejected] try catch error >>", error);
      }
    });
    builder.addCase(Usersignup.pending, (state) => {
      state.isUsersignupFetching = true;
    });
    //========= Ecommerce
    builder.addCase(Ecommerce.fulfilled, (state, { payload }) => {
      try {
        state.isEcommerce = true;
        state.EcommerceData = payload;
        state.isEcommerceFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error("Error: Ecommerce.fulfilled try catch error >>", error);
      }
    });
    builder.addCase(Ecommerce.rejected, (state, { payload }) => {
      try {
        state.isEcommerce = false;
        state.isEcommerceFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error.message_detail
            ? payload.error.message_detail
            : payload.error)
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error("Error: [Ecommerce.rejected] try catch error >>", error);
      }
    });
    builder.addCase(Ecommerce.pending, (state) => {
      state.isEcommerceFetching = true;
    });
    //========= Gstsearch
    builder.addCase(Gstsearch.fulfilled, (state, { payload }) => {
      try {
        state.isGstsearch = true;
        state.GstsearchData = payload;

        state.isGstsearchFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error("Error: Gstsearch.fulfilled try catch error >>", error);
      }
    });
    builder.addCase(Gstsearch.rejected, (state, { payload }) => {
      try {
        state.GstsearchData = {};
        state.isGstsearch = false;
        state.isGstsearchFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error("Error: [Gstsearch.rejected] try catch error >>", error);
      }
    });
    builder.addCase(Gstsearch.pending, (state) => {
      state.isGstsearchFetching = true;
    });
    //========= MobileToMultipleUPI
    builder.addCase(MobileToMultipleUPI.fulfilled, (state, { payload }) => {
      try {
        state.isMobileToMultipleUPI = true;
        state.MobileToMultipleUPIData = payload;

        state.isMobileToMultipleUPIFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: MobileToMultipleUPI.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(MobileToMultipleUPI.rejected, (state, { payload }) => {
      try {
        state.MobileToMultipleUPIData = [];
        state.isMobileToMultipleUPI = false;
        state.isMobileToMultipleUPIFetching = false;
        // state.isError = true;
        // payload
        //     ? (state.errorMessage = payload.error
        //         ? "Please try again (There was some network issue For UPI)."
        //         : 'Please try again (There was some network issue For UPI).')
        //     : (state.errorMessage = 'API Response Invalid. Please Check API');
      } catch (error) {
        console.error(
          "Error: [MobileToMultipleUPI.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(MobileToMultipleUPI.pending, (state) => {
      state.isMobileToMultipleUPIFetching = true;
    });
    //========= GstsearchRefreshDetails
    builder.addCase(GstsearchRefreshDetails.fulfilled, (state, { payload }) => {
      try {
        state.isGstsearch = true;
        state.GstsearchData = payload;
        state.isGstsearchRefreshDetailsFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: GstsearchRefreshDetails.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(GstsearchRefreshDetails.rejected, (state, { payload }) => {
      try {
        // state.GstsearchData = {};
        state.isGstsearch = false;
        state.isGstsearchRefreshDetailsFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [GstsearchRefreshDetails.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(GstsearchRefreshDetails.pending, (state) => {
      state.isGstsearchRefreshDetailsFetching = true;
    });
    //========= RefreshCinDINDetails
    builder.addCase(RefreshCinDINDetails.fulfilled, (state, { payload }) => {
      try {
        if (state.CinData) {
          state.CinData.cIN_DINs = payload;
        }
        state.isRefreshCinDINDetails = true;
        state.RefreshCinDINDetailsData = payload;
        state.isRefreshCinDINDetailsFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: RefreshCinDINDetails.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(RefreshCinDINDetails.rejected, (state, { payload }) => {
      try {
        // state.GstsearchData = {};
        state.isRefreshCinDINDetails = false;
        state.isRefreshCinDINDetailsFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [RefreshCinDINDetails.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(RefreshCinDINDetails.pending, (state) => {
      state.isRefreshCinDINDetailsFetching = true;
    });
    //========= RefreshDINDetailsByDIN
    builder.addCase(RefreshDINDetailsByDIN.fulfilled, (state, { payload }) => {
      try {
        if (state.CinData) {
          const payloadData = payload;
          const updated = state.CinData?.cIN_DINs?.map((item) => {
            if (item.din === payloadData?.din) {
              return {
                ...item,
                mobileNumberRe: payloadData.mobileNumber,
                emailIdRe: payloadData.emailId,
              };
            }
            return item;
          });
          state.CinData.cIN_DINs = updated;
        }
        if (state.DinData) {
          const payloadData = payload;
          const updated = state.DinData?.map((item) => {
            if (item.din === payloadData?.din) {
              return {
                ...item,
                mobileNumberRe: payloadData.mobileNumber,
                emailIdRe: payloadData.emailId,
              };
            }
            return item;
          });
          state.DinData = updated;
        }
        state.isRefreshDINDetailsByDIN = true;
        state.RefreshDINDetailsByDINData = payload;
        state.isRefreshDINDetailsByDINFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: RefreshDINDetailsByDIN.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(RefreshDINDetailsByDIN.rejected, (state, { payload }) => {
      try {
        // state.GstsearchData = {};
        state.isRefreshDINDetailsByDIN = false;
        state.isRefreshDINDetailsByDINFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [RefreshDINDetailsByDIN.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(RefreshDINDetailsByDIN.pending, (state) => {
      state.isRefreshDINDetailsByDINFetching = true;
    });
    //========= GetGSTCINDetailByEmail
    builder.addCase(GetGSTCINDetailByEmail.fulfilled, (state, { payload }) => {
      try {
        state.isGetGSTCINDetailByEmail = true;
        state.GetGSTCINDetailByEmailData = payload;

        state.isGetGSTCINDetailByEmailFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: GetGSTCINDetailByEmail.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetGSTCINDetailByEmail.rejected, (state, { payload }) => {
      try {
        state.GetGSTCINDetailByEmailData = {};
        state.isGetGSTCINDetailByEmail = false;
        state.isGetGSTCINDetailByEmailFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [GetGSTCINDetailByEmail.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetGSTCINDetailByEmail.pending, (state) => {
      state.isGetGSTCINDetailByEmailFetching = true;
    });
    //========= GetGSTDetailsBySelectedDateAllData
    builder.addCase(GetGSTDetailsBySelectedDateAllData.fulfilled, (state, { payload }) => {
      try {
        state.isGetGSTDetailsBySelectedDateAllData = true;
        state.GetGSTDetailsBySelectedDateAllDataData = payload;

        state.isGetGSTDetailsBySelectedDateAllDataFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: GetGSTDetailsBySelectedDateAllData.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetGSTDetailsBySelectedDateAllData.rejected, (state, { payload }) => {
      try {
        state.GetGSTDetailsBySelectedDateAllDataData = [];
        state.isGetGSTDetailsBySelectedDateAllData = false;
        state.isGetGSTDetailsBySelectedDateAllDataFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? payload.error
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [GetGSTDetailsBySelectedDateAllData.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetGSTDetailsBySelectedDateAllData.pending, (state) => {
      state.isGetGSTDetailsBySelectedDateAllDataFetching = true;
    });
    //========= GetDarpanDetailsBySelectedDate
    builder.addCase(GetDarpanDetailsBySelectedDate.fulfilled, (state, { payload }) => {
      try {
        state.isGetDarpanDetailsBySelectedDate = true;
        state.GetDarpanDetailsBySelectedDateData = payload;

        state.isGetDarpanDetailsBySelectedDateFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: GetDarpanDetailsBySelectedDate.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetDarpanDetailsBySelectedDate.rejected, (state, { payload }) => {
      try {
        state.GetDarpanDetailsBySelectedDateData = [];
        state.isGetDarpanDetailsBySelectedDate = false;
        state.isGetDarpanDetailsBySelectedDateFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? payload.error
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [GetDarpanDetailsBySelectedDate.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetDarpanDetailsBySelectedDate.pending, (state) => {
      state.isGetDarpanDetailsBySelectedDateFetching = true;
    });
    //========= GetIECDetailsBySelectedDate
    builder.addCase(GetIECDetailsBySelectedDate.fulfilled, (state, { payload }) => {
      try {
        state.isGetIECDetailsBySelectedDate = true;
        state.GetIECDetailsBySelectedDateData = payload;

        state.isGetIECDetailsBySelectedDateFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: GetIECDetailsBySelectedDate.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetIECDetailsBySelectedDate.rejected, (state, { payload }) => {
      try {
        state.GetIECDetailsBySelectedDateData = [];
        state.isGetIECDetailsBySelectedDate = false;
        state.isGetIECDetailsBySelectedDateFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? payload.error
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [GetIECDetailsBySelectedDate.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetIECDetailsBySelectedDate.pending, (state) => {
      state.isGetIECDetailsBySelectedDateFetching = true;
    });
    //========= CinGetCompanyAndDirectorDetailBySelected
    builder.addCase(CinGetCompanyAndDirectorDetailBySelected.fulfilled, (state, { payload }) => {
      try {
        state.isCinGetCompanyAndDirectorDetailBySelected = true;
        state.CinGetCompanyAndDirectorDetailBySelectedData = payload;

        state.isCinGetCompanyAndDirectorDetailBySelectedFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: CinGetCompanyAndDirectorDetailBySelected.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(CinGetCompanyAndDirectorDetailBySelected.rejected, (state, { payload }) => {
      try {
        state.CinGetCompanyAndDirectorDetailBySelectedData = [];
        state.isCinGetCompanyAndDirectorDetailBySelected = false;
        state.isCinGetCompanyAndDirectorDetailBySelectedFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? payload.error
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [CinGetCompanyAndDirectorDetailBySelected.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(CinGetCompanyAndDirectorDetailBySelected.pending, (state) => {
      state.isCinGetCompanyAndDirectorDetailBySelectedFetching = true;
    });
    //========= DarpanGetCompanyAndDirectorDetailBySelected
    builder.addCase(DarpanGetCompanyAndDirectorDetailBySelected.fulfilled, (state, { payload }) => {
      try {
        state.isDarpanGetCompanyAndDirectorDetailBySelected = true;
        state.DarpanGetCompanyAndDirectorDetailBySelectedData = payload;

        state.isDarpanGetCompanyAndDirectorDetailBySelectedFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: DarpanGetCompanyAndDirectorDetailBySelected.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(DarpanGetCompanyAndDirectorDetailBySelected.rejected, (state, { payload }) => {
      try {
        state.DarpanGetCompanyAndDirectorDetailBySelectedData = [];
        state.isDarpanGetCompanyAndDirectorDetailBySelected = false;
        state.isDarpanGetCompanyAndDirectorDetailBySelectedFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? payload.error
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [DarpanGetCompanyAndDirectorDetailBySelected.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(DarpanGetCompanyAndDirectorDetailBySelected.pending, (state) => {
      state.isDarpanGetCompanyAndDirectorDetailBySelectedFetching = true;
    });
    //========= IECGetCompanyAndDirectorDetailBySelected
    builder.addCase(IECGetCompanyAndDirectorDetailBySelected.fulfilled, (state, { payload }) => {
      try {
        state.isIECGetCompanyAndDirectorDetailBySelected = true;
        state.IECGetCompanyAndDirectorDetailBySelectedData = payload;

        state.isIECGetCompanyAndDirectorDetailBySelectedFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: IECGetCompanyAndDirectorDetailBySelected.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(IECGetCompanyAndDirectorDetailBySelected.rejected, (state, { payload }) => {
      try {
        state.IECGetCompanyAndDirectorDetailBySelectedData = [];
        state.isIECGetCompanyAndDirectorDetailBySelected = false;
        state.isIECGetCompanyAndDirectorDetailBySelectedFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? payload.error
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [IECGetCompanyAndDirectorDetailBySelected.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(IECGetCompanyAndDirectorDetailBySelected.pending, (state) => {
      state.isIECGetCompanyAndDirectorDetailBySelectedFetching = true;
    });
    //========= Popularsearch
    builder.addCase(Popularsearch.fulfilled, (state, { payload }) => {
      try {
        state.isPopularsearch = true;
        state.PopularsearchData = payload;

        state.isPopularsearchFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: Popularsearch.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(Popularsearch.rejected, (state, { payload }) => {
      try {
        state.PopularsearchData = {};
        state.isPopularsearch = false;
        state.isPopularsearchFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [Popularsearch.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(Popularsearch.pending, (state) => {
      state.isPopularsearchFetching = true;
    });
    //========= Moblie360
    builder.addCase(Mobile360.fulfilled, (state, { payload }) => {
      try {
        state.isMobile360 = true;
        state.Mobile360Data = payload;

        state.isMobile360Fetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error("Error: Mobile360.fulfilled try catch error >>", error);
      }
    });
    builder.addCase(Mobile360.rejected, (state, { payload }) => {
      try {
        state.Mobile360Data = {};
        state.isMobile360 = false;
        state.isMobile360Fetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error("Error: [Mobile360.rejected] try catch error >>", error);
      }
    });
    builder.addCase(Mobile360.pending, (state) => {
      state.isMobile360Fetching = true;
    });
    //========= GetFactAppInfoByPhone
    builder.addCase(GetFactAppInfoByPhone.fulfilled, (state, { payload }) => {
      try {
        state.isGetFactAppInfoByPhone = true;
        state.GetFactAppInfoByPhoneData = payload;
        state.isGetFactAppInfoByPhoneFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: GetFactAppInfoByPhone.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetFactAppInfoByPhone.rejected, (state, { payload }) => {
      try {
        state.GetFactAppInfoByPhoneData = {};
        state.isGetFactAppInfoByPhone = false;
        state.isGetFactAppInfoByPhoneFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error ? payload.error : payload.error)
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [GetFactAppInfoByPhone.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetFactAppInfoByPhone.pending, (state) => {
      state.isGetFactAppInfoByPhoneFetching = true;
    });

    //========= GetFactAppInfoMoreByPhone
    builder.addCase(
      GetFactAppInfoMoreByPhone.fulfilled,
      (state, { payload }) => {
        try {
          state.isGetFactAppInfoMoreByPhone = true;
          state.GetFactAppInfoMoreByPhoneData = payload;
          state.isGetFactAppInfoMoreByPhoneFetching = false;
          state.isError = false;
          state.errorMessage = "";
          return state;
        } catch (error) {
          console.error(
            "Error: GetFactAppInfoMoreByPhone.fulfilled try catch error >>",
            error
          );
        }
      }
    );
    builder.addCase(
      GetFactAppInfoMoreByPhone.rejected,
      (state, { payload }) => {
        try {
          state.GetFactAppInfoMoreByPhoneData = {};
          state.isGetFactAppInfoMoreByPhone = false;
          state.isGetFactAppInfoMoreByPhoneFetching = false;
          state.isError = true;
          payload
            ? (state.errorMessage = payload.error
              ? payload.error
              : payload.error)
            : (state.errorMessage = "API Response Invalid. Please Check API");
        } catch (error) {
          console.error(
            "Error: [GetFactAppInfoMoreByPhone.rejected] try catch error >>",
            error
          );
        }
      }
    );
    builder.addCase(GetFactAppInfoMoreByPhone.pending, (state) => {
      state.isGetFactAppInfoMoreByPhoneFetching = true;
    });

    //========= GetFactAppInfoMoreByEmail
    builder.addCase(
      GetFactAppInfoMoreByEmail.fulfilled,
      (state, { payload }) => {
        try {
          state.isGetFactAppInfoMoreByEmail = true;
          state.GetFactAppInfoMoreByEmailData = payload;
          state.isGetFactAppInfoMoreByEmailFetching = false;
          state.isError = false;
          state.errorMessage = "";
          return state;
        } catch (error) {
          console.error(
            "Error: GetFactAppInfoMoreByEmail.fulfilled try catch error >>",
            error
          );
        }
      }
    );
    builder.addCase(
      GetFactAppInfoMoreByEmail.rejected,
      (state, { payload }) => {
        try {
          state.GetFactAppInfoMoreByEmailData = {};
          state.isGetFactAppInfoMoreByEmail = false;
          state.isGetFactAppInfoMoreByEmailFetching = false;
          state.isError = true;
          payload
            ? (state.errorMessage = payload.error
              ? payload.error
              : payload.error)
            : (state.errorMessage = "API Response Invalid. Please Check API");
        } catch (error) {
          console.error(
            "Error: [GetFactAppInfoMoreByEmail.rejected] try catch error >>",
            error
          );
        }
      }
    );
    builder.addCase(GetFactAppInfoMoreByEmail.pending, (state) => {
      state.isGetFactAppInfoMoreByEmailFetching = true;
    });
    //========= GetFactAppInfoByUserName
    builder.addCase(
      GetFactAppInfoByUserName.fulfilled,
      (state, { payload }) => {
        try {
          state.isGetFactAppInfoByUserName = true;
          state.GetFactAppInfoByUserNameData = payload.data;
          state.isGetFactAppInfoByUserNameFetching = false;
          state.isError = false;
          state.errorMessage = "";
          return state;
        } catch (error) {
          console.error(
            "Error: GetFactAppInfoByUserName.fulfilled try catch error >>",
            error
          );
        }
      }
    );
    builder.addCase(GetFactAppInfoByUserName.rejected, (state, { payload }) => {
      try {
        state.GetFactAppInfoByUserNameData = [];
        state.isGetFactAppInfoByUserName = false;
        state.isGetFactAppInfoByUserNameFetching = false;
        // state.isError = true;
        // payload
        //   ? (state.errorMessage = payload.error ? payload.error : payload.error)
        //   : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [GetFactAppInfoByUserName.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetFactAppInfoByUserName.pending, (state) => {
      state.isGetFactAppInfoByUserNameFetching = true;
    });
    //========= PincodeGet
    builder.addCase(
      PincodeGet.fulfilled,
      (state, { payload }) => {
        try {
          state.isPincodeGet = true;
          state.PincodeGetData = payload.data;
          state.isPincodeGetFetching = false;
          state.isError = false;
          state.errorMessage = "";
          return state;
        } catch (error) {
          console.error(
            "Error: PincodeGet.fulfilled try catch error >>",
            error
          );
        }
      }
    );
    builder.addCase(PincodeGet.rejected, (state, { payload }) => {
      try {
        state.PincodeGetData = [];
        state.isPincodeGet = false;
        state.isPincodeGetFetching = false;
        // state.isError = true;
        // payload
        //   ? (state.errorMessage = payload.error ? payload.error : payload.error)
        //   : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [PincodeGet.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(PincodeGet.pending, (state) => {
      state.isPincodeGetFetching = true;
    });

    //========= GetFactAppInfoByEmail
    builder.addCase(GetFactAppInfoByEmail.fulfilled, (state, { payload }) => {
      try {
        state.isGetFactAppInfoByEmail = true;
        state.GetFactAppInfoByEmailData = payload;
        state.isGetFactAppInfoByEmailFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: GetFactAppInfoByEmail.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetFactAppInfoByEmail.rejected, (state, { payload }) => {
      try {
        state.GetFactAppInfoByEmailData = {};
        state.isGetFactAppInfoByEmail = false;
        state.isGetFactAppInfoByEmailFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error ? payload.error : payload.error)
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [GetFactAppInfoByEmail.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetFactAppInfoByEmail.pending, (state) => {
      state.isGetFactAppInfoByEmailFetching = true;
    });

    //========= MobileToMSME
    builder.addCase(MobileToMSME.fulfilled, (state, { payload }) => {
      try {
        state.isMobileToMSME = true;
        state.MobileToMSMEData = payload;

        state.isMobileToMSMEFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: MobileToMSME.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(MobileToMSME.rejected, (state, { payload }) => {
      try {
        state.MobileToMSMEData = {};
        state.isMobileToMSME = false;
        state.isMobileToMSMEFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [MobileToMSME.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(MobileToMSME.pending, (state) => {
      state.isMobileToMSMEFetching = true;
    });
    //========= GetCoordinatesData
    builder.addCase(GetCoordinates.fulfilled, (state, { payload }) => {
      try {
        state.isGetCoordinates = true;
        state.GetCoordinatesData = payload;
        state.isGetCoordinatesFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: GetCoordinates.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetCoordinates.rejected, (state, { payload }) => {
      try {
        state.GetCoordinatesData = {};
        state.isGetCoordinates = false;
        state.isGetCoordinatesFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [GetCoordinates.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetCoordinates.pending, (state) => {
      state.isGetCoordinatesFetching = true;
    });
    //========= Cin
    builder.addCase(Cin.fulfilled, (state, { payload }) => {
      try {
        state.isCin = true;
        state.CinData = payload;

        state.isCinFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error("Error: Cin.fulfilled try catch error >>", error);
      }
    });
    builder.addCase(Cin.rejected, (state, { payload }) => {
      try {
        state.CinData = {};
        state.isCin = false;
        state.isCinFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error("Error: [Cin.rejected] try catch error >>", error);
      }
    });
    builder.addCase(Cin.pending, (state) => {
      state.isCinFetching = true;
    });
    //========= SearchCINByAdvanceSearch
    builder.addCase(
      SearchCINByAdvanceSearch.fulfilled,
      (state, { payload }) => {
        try {
          state.isSearchCINByAdvanceSearch = true;
          state.SearchCINByAdvanceSearchData = payload;

          state.isSearchCINByAdvanceSearchFetching = false;
          state.isError = false;
          state.errorMessage = "";
          return state;
        } catch (error) {
          console.error(
            "Error: SearchCINByAdvanceSearch.fulfilled try catch error >>",
            error
          );
        }
      }
    );
    builder.addCase(SearchCINByAdvanceSearch.rejected, (state, { payload }) => {
      try {
        state.SearchCINByAdvanceSearchData = [];
        state.isSearchCINByAdvanceSearch = false;
        state.isSearchCINByAdvanceSearchFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [SearchCINByAdvanceSearch.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(SearchCINByAdvanceSearch.pending, (state) => {
      state.isSearchCINByAdvanceSearchFetching = true;
    });
    //========= DarpanSearchApi
    builder.addCase(
      DarpanSearchApi.fulfilled,
      (state, { payload }) => {
        try {
          state.isDarpanSearchApi = true;
          state.DarpanSearchApiData = payload.data;

          state.isDarpanSearchApiFetching = false;
          state.isError = false;
          state.errorMessage = "";
          return state;
        } catch (error) {
          console.error(
            "Error: DarpanSearchApi.fulfilled try catch error >>",
            error
          );
        }
      }
    );
    builder.addCase(DarpanSearchApi.rejected, (state, { payload }) => {
      try {
        state.DarpanSearchApiData = {};
        state.isDarpanSearchApi = false;
        state.isDarpanSearchApiFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? payload.error
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [DarpanSearchApi.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(DarpanSearchApi.pending, (state) => {
      state.isDarpanSearchApiFetching = true;
    });
    //========= GetFileLogListByUserName
    builder.addCase(
      GetFileLogListByUserName.fulfilled,
      (state, { payload }) => {
        try {
          state.isGetFileLogListByUserName = true;
          state.GetFileLogListByUserNameData = payload.data;

          state.isGetFileLogListByUserNameFetching = false;
          state.isError = false;
          state.errorMessage = "";
          return state;
        } catch (error) {
          console.error(
            "Error: GetFileLogListByUserName.fulfilled try catch error >>",
            error
          );
        }
      }
    );
    builder.addCase(GetFileLogListByUserName.rejected, (state, { payload }) => {
      try {
        state.GetFileLogListByUserNameData = [];
        state.isGetFileLogListByUserName = false;
        state.isGetFileLogListByUserNameFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? payload.error
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [GetFileLogListByUserName.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetFileLogListByUserName.pending, (state) => {
      state.isGetFileLogListByUserNameFetching = true;
    });
    //========= SearchGSTByAdvanceSearch
    builder.addCase(
      SearchGSTByAdvanceSearch.fulfilled,
      (state, { payload }) => {
        try {
          state.SearchGSTByAdvanceSearchTotalData = payload.totalRecord;
          state.SearchGSTByAdvanceSearchData = payload.gSTAdvanceSearchResults;
          state.SearchGSTByAdvanceSearchUserdata = payload.userdata;
          state.SearchGSTByAdvanceSearchpageNumber = 2;
          state.isSearchGSTByAdvanceSearch = true;
          state.isSearchGSTByAdvanceSearchFetching = false;

          state.isError = false;
          state.errorMessage = "";
          return state;
        } catch (error) {
          console.log(
            "Error: SearchGSTByAdvanceSearch.fulfilled try catch error >>",
            error
          );
        }
      }
    );
    builder.addCase(SearchGSTByAdvanceSearch.rejected, (state, { payload }) => {
      console.log(
        "[SearchGSTByAdvanceSearch.rejected] >>>payload>>>>",
        payload
      );
      try {
        state.SearchGSTByAdvanceSearchTotalData = "";
        state.SearchGSTByAdvanceSearchData = [];
        state.SearchGSTByAdvanceSearchUserdata = {};
        state.isSearchGSTByAdvanceSearch = false;
        state.isSearchGSTByAdvanceSearchFetching = false;

        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? payload.error
            : "Failed to retrieve pincode details.")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.log(
          "Error: [SearchGSTByAdvanceSearch.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(SearchGSTByAdvanceSearch.pending, (state) => {
      state.isSearchGSTByAdvanceSearchFetching = true;
    });
    //========= SearchGSTByAdvanceSearch
    builder.addCase(
      SearchGSTByAdvanceSearchMore.fulfilled,
      (state, { payload }) => {
        // console.log("[SearchGSTByAdvanceSearchMore.fulfilled]>>>payload>>>", payload)
        try {
          state.SearchGSTByAdvanceSearchData = payload.gSTAdvanceSearchResults;
          state.SearchGSTByAdvanceSearchpageNumber =
            state.SearchGSTByAdvanceSearchpageNumber + 1;

          state.isSearchGSTByAdvanceSearch = true;
          state.isSearchGSTByAdvanceSearchFetching = false;

          state.isError = false;
          state.errorMessage = "";
          return state;
        } catch (error) {
          console.log(
            "Error: SearchGSTByAdvanceSearchMore.fulfilled try catch error >>",
            error
          );
        }
      }
    );
    builder.addCase(
      SearchGSTByAdvanceSearchMore.rejected,
      (state, { payload }) => {
        // console.log("[SearchGSTByAdvanceSearchMore.rejected] >>>payload>>>>", payload)
        try {
          state.SearchGSTByAdvanceSearchData =
            state.SearchGSTByAdvanceSearchData;
          state.SearchGSTByAdvanceSearchpageNumber =
            state.SearchGSTByAdvanceSearchpageNumber;
          state.isSearchGSTByAdvanceSearch = false;
          state.isSearchGSTByAdvanceSearchFetching = false;

          state.isError = true;
          payload
            ? (state.errorMessage = payload.error
              ? payload.error
              : "Failed to retrieve pincode details.")
            : (state.errorMessage = "API Response Invalid. Please Check API");
        } catch (error) {
          console.log(
            "Error: [SearchGSTByAdvanceSearchMore.rejected] try catch error >>",
            error
          );
        }
      }
    );
    builder.addCase(SearchGSTByAdvanceSearchMore.pending, (state) => {
      state.isSearchGSTByAdvanceSearchFetching = true;
    });
    //========= CinGetIndustryList
    builder.addCase(CinGetIndustryList.fulfilled, (state, { payload }) => {
      try {
        state.isCinGetIndustryList = true;
        state.CinGetIndustryListData = payload;

        state.isCinGetIndustryListFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: CinGetIndustryList.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(CinGetIndustryList.rejected, (state, { payload }) => {
      try {
        state.CinGetIndustryListData = [];
        state.isCinGetIndustryList = false;
        state.isCinGetIndustryListFetching = false;
        // state.isError = true;
        // payload
        //   ? (state.errorMessage = payload.error
        //       ? "Please try again (There was some network issue)."
        //       : "Please try again (There was some network issue).")
        //   : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [CinGetIndustryList.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(CinGetIndustryList.pending, (state) => {
      state.isCinGetIndustryListFetching = true;
    });
    //========= CinGetSegmentList
    builder.addCase(CinGetSegmentList.fulfilled, (state, { payload }) => {
      try {
        state.isCinGetSegmentList = true;
        state.CinGetSegmentListData = payload;

        state.isCinGetSegmentListFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: CinGetSegmentList.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(CinGetSegmentList.rejected, (state, { payload }) => {
      try {
        state.CinGetSegmentListData = [];
        state.isCinGetSegmentList = false;
        state.isCinGetSegmentListFetching = false;
        // state.isError = true;
        // payload
        //   ? (state.errorMessage = payload.error
        //       ? "Please try again (There was some network issue)."
        //       : "Please try again (There was some network issue).")
        //   : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [CinGetSegmentList.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(CinGetSegmentList.pending, (state) => {
      state.isCinGetSegmentListFetching = true;
    });
    //========= CinRefreshCINDetails
    builder.addCase(CinRefreshCINDetails.fulfilled, (state, { payload }) => {
      try {
        state.isCin = true;
        state.CinData = payload.data;
        state.isCinRefreshCINDetailsFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: CinRefreshCINDetails.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(CinRefreshCINDetails.rejected, (state, { payload }) => {
      try {
        // state.CinData = {};
        state.isCin = false;
        state.isCinRefreshCINDetailsFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [CinRefreshCINDetails.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(CinRefreshCINDetails.pending, (state) => {
      state.isCinRefreshCINDetailsFetching = true;
    });
    //========= Din
    builder.addCase(Din.fulfilled, (state, { payload }) => {
      try {
        state.isDin = true;
        state.DinData = payload;

        state.isDinFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error("Error: Din.fulfilled try catch error >>", error);
      }
    });
    builder.addCase(Din.rejected, (state, { payload }) => {
      try {
        state.DinData = {};
        state.isDin = false;
        state.isDinFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error("Error: [Din.rejected] try catch error >>", error);
      }
    });
    builder.addCase(Din.pending, (state) => {
      state.isDinFetching = true;
    });
    //========= Msme
    builder.addCase(Msme.fulfilled, (state, { payload }) => {
      try {
        state.isMsme = true;
        state.MsmeData = payload;

        state.isMsmeFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error("Error: Msme.fulfilled try catch error >>", error);
      }
    });
    builder.addCase(Msme.rejected, (state, { payload }) => {
      try {
        state.MsmeData = {};
        state.isMsme = false;
        state.isMsmeFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error("Error: [Msme.rejected] try catch error >>", error);
      }
    });
    builder.addCase(Msme.pending, (state) => {
      state.isMsmeFetching = true;
    });
    //========= MsmeRefreshDetails
    builder.addCase(MsmeRefreshDetails.fulfilled, (state, { payload }) => {
      try {
        state.isMsme = true;
        state.MsmeData = payload;
        state.isMsmeRefreshDetailsFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: MsmeRefreshDetails.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(MsmeRefreshDetails.rejected, (state, { payload }) => {
      try {
        // state.MsmeData = {};
        state.isMsme = false;
        state.isMsmeRefreshDetailsFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [MsmeRefreshDetails.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(MsmeRefreshDetails.pending, (state) => {
      state.isMsmeRefreshDetailsFetching = true;
    });
    //========= GetNewGSTList
    builder.addCase(GetNewGSTList.fulfilled, (state, { payload }) => {
      try {
        state.isGetNewGSTList = true;
        state.GetNewGSTListData = payload;

        state.isGetNewGSTListFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: GetNewGSTList.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetNewGSTList.rejected, (state, { payload }) => {
      try {
        state.GetNewGSTListData = {};
        state.isGetNewGSTList = false;
        state.isGetNewGSTListFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error.message_detail
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [GetNewGSTList.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetNewGSTList.pending, (state) => {
      state.isGetNewGSTListFetching = true;
    });
    //========= GetMCAReport
    builder.addCase(GetMCAReport.fulfilled, (state, { payload }) => {
      try {
        state.isGetMCAReport = true;
        state.GetMCAReportData = payload;
        state.isGetMCAReportFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: GetMCAReport.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetMCAReport.rejected, (state, { payload }) => {
      try {
        state.GetMCAReportData = {};
        state.isGetMCAReport = false;
        state.isGetMCAReportFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error.message_detail
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [GetMCAReport.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetMCAReport.pending, (state) => {
      state.isGetMCAReportFetching = true;
    });
    //========= GetNewGSTDetail
    builder.addCase(GetNewGSTDetail.fulfilled, (state, { payload }) => {
      try {
        state.isGetNewGSTDetail = true;
        state.GetNewGSTDetailData = payload;
        state.MaltGstDetailData.push(payload);

        state.isGetNewGSTDetailFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: GetNewGSTDetail.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetNewGSTDetail.rejected, (state, { payload }) => {
      try {
        state.GetNewGSTDetailData = payload;
        state.isGetNewGSTDetail = false;
        state.isGetNewGSTDetailFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error.message_detail
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [GetNewGSTDetail.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetNewGSTDetail.pending, (state) => {
      state.isGetNewGSTDetailFetching = true;
    });
    //========= GstContact
    builder.addCase(GstContact.fulfilled, (state, { payload }) => {
      try {
        state.isGstContact = true;
        state.GstContactData = payload;
        state.MaltGstContactData.push(payload);

        state.isGstContactFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error("Error: GstContact.fulfilled try catch error >>", error);
      }
    });
    builder.addCase(GstContact.rejected, (state, { payload }) => {
      try {
        state.GstContactData = payload;
        state.isGstContact = false;
        state.isGstContactFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error.message_detail
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error("Error: [GstContact.rejected] try catch error >>", error);
      }
    });
    builder.addCase(GstContact.pending, (state) => {
      state.isGstContactFetching = true;
    });
    //========= PanSearch
    builder.addCase(PanSearch.fulfilled, (state, { payload }) => {
      try {
        state.isPanSearch = true;
        state.PanSearchData = payload;

        state.isPanSearchFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error("Error: PanSearch.fulfilled try catch error >>", error);
      }
    });
    builder.addCase(PanSearch.rejected, (state, { payload }) => {
      try {
        state.PanSearchData = {};
        state.isPanSearch = false;
        state.isPanSearchFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error("Error: [PanSearch.rejected] try catch error >>", error);
      }
    });
    builder.addCase(PanSearch.pending, (state) => {
      state.isPanSearchFetching = true;
    });
    //========= IESDetailApi
    builder.addCase(IESDetailApi.fulfilled, (state, { payload }) => {
      try {
        state.isIESDetailApi = true;
        state.IESDetailApiData = payload;

        state.isIESDetailApiFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: IESDetailApi.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(IESDetailApi.rejected, (state, { payload }) => {
      try {
        state.IESDetailApiData = {};
        state.isIESDetailApi = false;
        state.isIESDetailApiFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [IESDetailApi.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(IESDetailApi.pending, (state) => {
      state.isIESDetailApiFetching = true;
    });
    //========= PansearchRefreshDetails
    builder.addCase(PansearchRefreshDetails.fulfilled, (state, { payload }) => {
      try {
        state.isPanSearch = true;
        state.PanSearchData = payload;

        state.isPansearchRefreshDetailsFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: PansearchRefreshDetails.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(PansearchRefreshDetails.rejected, (state, { payload }) => {
      try {
        // state.PanSearchData = {};
        state.isPanSearch = false;
        state.isPansearchRefreshDetailsFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [PansearchRefreshDetails.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(PansearchRefreshDetails.pending, (state) => {
      state.isPansearchRefreshDetailsFetching = true;
    });
    //========= Businesspansearch
    builder.addCase(Businesspansearch.fulfilled, (state, { payload }) => {
      try {
        state.isBusinessPanSearch = true;
        state.BusinessPanSearchData = payload;

        state.isBusinessPanSearchFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: Businesspansearch.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(Businesspansearch.rejected, (state, { payload }) => {
      try {
        state.BusinessPanSearchData = {};
        state.isBusinessPanSearch = false;
        state.isBusinessPanSearchFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error.message_detail
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [Businesspansearch.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(Businesspansearch.pending, (state) => {
      state.isBusinessPanSearchFetching = true;
    });
    //========= CINDetailsByDate
    builder.addCase(CINDetailsByDate.fulfilled, (state, { payload }) => {
      try {
        state.isCINDetailsByDate = true;
        state.CINDetailsByDateData = payload;

        state.isCINDetailsByDateFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: CINDetailsByDate.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(CINDetailsByDate.rejected, (state, { payload }) => {
      try {
        state.CINDetailsByDateData = {};
        state.isCINDetailsByDate = false;
        state.isCINDetailsByDateFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [CINDetailsByDate.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(CINDetailsByDate.pending, (state) => {
      state.isCINDetailsByDateFetching = true;
    });
    //========= Panverify
    builder.addCase(Panverify.fulfilled, (state, { payload }) => {
      try {
        state.isPanverify = true;
        state.PanverifyData = payload.data;

        state.isPanverifyFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error("Error: Panverify.fulfilled try catch error >>", error);
      }
    });
    builder.addCase(Panverify.rejected, (state, { payload }) => {
      try {
        state.PanverifyData = {};
        state.isPanverify = false;

        state.isPanverifyFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error?.errorMessage
            ? payload.error?.errorMessage
            : "Failed to retrieve PAN details.")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error("Error: [Panverify.rejected] try catch error >>", error);
      }
    });
    builder.addCase(Panverify.pending, (state) => {
      state.isPanverifyFetching = true;
    });
    //========= GetPincodeLatLong
    builder.addCase(GetPincodeLatLong.fulfilled, (state, { payload }) => {
      try {
        state.isGetPincodeLatLong = true;
        state.GetPincodeLatLongData = payload?.[0]?.address_components;

        state.isGetPincodeLatLongFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: GetPincodeLatLong.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetPincodeLatLong.rejected, (state, { payload }) => {
      try {
        state.GetPincodeLatLongData = {};
        state.isGetPincodeLatLong = false;

        state.isGetPincodeLatLongFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error?.errorMessage
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [GetPincodeLatLong.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetPincodeLatLong.pending, (state) => {
      state.isGetPincodeLatLongFetching = true;
    });
    //========= Sendmobileotp
    builder.addCase(Sendmobileotp.fulfilled, (state, { payload }) => {
      try {
        state.isSendmobileotp = true;
        state.SendmobileotpData = payload;

        state.isSendmobileotpFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: Sendmobileotp.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(Sendmobileotp.rejected, (state, { payload }) => {
      try {
        state.SendmobileotpData = {};
        state.isSendmobileotp = false;
        state.isSendmobileotpFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error.message_detail
            ? payload.error.message_detail
            : "no data found")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [Sendmobileotp.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(Sendmobileotp.pending, (state) => {
      state.isSendmobileotpFetching = true;
    });
    //========= GSTByLastDays
    builder.addCase(GSTByLastDays.fulfilled, (state, { payload }) => {
      try {
        state.isGSTByLastDays = true;
        state.GSTByLastDaysData = payload.data;

        state.isGSTByLastDaysFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: GSTByLastDays.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(GSTByLastDays.rejected, (state, { payload }) => {
      try {
        state.GSTByLastDaysData = [];
        state.isGSTByLastDays = false;
        state.isGSTByLastDaysFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [GSTByLastDays.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(GSTByLastDays.pending, (state) => {
      state.isGSTByLastDaysFetching = true;
    });
    //========= GetNewGSTDetailsCountByLastXDays
    builder.addCase(GetNewGSTDetailsCountByLastXDays.fulfilled, (state, { payload }) => {
      try {
        state.isGetNewGSTDetailsCountByLastXDays = true;
        state.GetNewGSTDetailsCountByLastXDaysData = payload.data;

        state.isGetNewGSTDetailsCountByLastXDaysFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: GetNewGSTDetailsCountByLastXDays.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetNewGSTDetailsCountByLastXDays.rejected, (state, { payload }) => {
      try {
        state.GetNewGSTDetailsCountByLastXDaysData = [];
        state.isGetNewGSTDetailsCountByLastXDays = false;
        state.isGetNewGSTDetailsCountByLastXDaysFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [GetNewGSTDetailsCountByLastXDays.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetNewGSTDetailsCountByLastXDays.pending, (state) => {
      state.isGetNewGSTDetailsCountByLastXDaysFetching = true;
    });
    //========= DarpanByLastDay
    builder.addCase(DarpanByLastDay.fulfilled, (state, { payload }) => {
      try {
        state.isDarpanByLastDay = true;
        state.DarpanByLastDayData = payload.data;

        state.isDarpanByLastDayFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: DarpanByLastDay.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(DarpanByLastDay.rejected, (state, { payload }) => {
      try {
        state.DarpanByLastDayData = [];
        state.isDarpanByLastDay = false;
        state.isDarpanByLastDayFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [DarpanByLastDay.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(DarpanByLastDay.pending, (state) => {
      state.isDarpanByLastDayFetching = true;
    });
    //========= IECByLastDays
    builder.addCase(IECByLastDays.fulfilled, (state, { payload }) => {
      try {
        state.isIECByLastDays = true;
        state.IECByLastDaysData = payload.data;

        state.isIECByLastDaysFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: IECByLastDays.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(IECByLastDays.rejected, (state, { payload }) => {
      try {
        state.IECByLastDaysData = [];
        state.isIECByLastDays = false;
        state.isIECByLastDaysFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [IECByLastDays.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(IECByLastDays.pending, (state) => {
      state.isIECByLastDaysFetching = true;
    });
    //========= GetCINDetailsCountByLastXDays
    builder.addCase(
      GetCINDetailsCountByLastXDays.fulfilled,
      (state, { payload }) => {
        try {
          state.isGetCINDetailsCountByLastXDays = true;
          state.GetCINDetailsCountByLastXDaysData = payload.data;
          state.isGetCINDetailsCountByLastXDaysFetching = false;
          state.isError = false;
          state.errorMessage = "";
          return state;
        } catch (error) {
          console.error(
            "Error: GetCINDetailsCountByLastXDays.fulfilled try catch error >>",
            error
          );
        }
      }
    );
    builder.addCase(
      GetCINDetailsCountByLastXDays.rejected,
      (state, { payload }) => {
        try {
          state.GetCINDetailsCountByLastXDaysData = [];
          state.isGetCINDetailsCountByLastXDays = false;
          state.isGetCINDetailsCountByLastXDaysFetching = false;
          state.isError = true;
          payload
            ? (state.errorMessage = payload.error
              ? "Please try again (There was some network issue)."
              : "Please try again (There was some network issue).")
            : (state.errorMessage = "API Response Invalid. Please Check API");
        } catch (error) {
          console.error(
            "Error: [GetCINDetailsCountByLastXDays.rejected] try catch error >>",
            error
          );
        }
      }
    );
    builder.addCase(GetCINDetailsCountByLastXDays.pending, (state) => {
      state.isGetCINDetailsCountByLastXDaysFetching = true;
    });
    //========= GetNewCINDetailsCountByLastXDays
    builder.addCase(
      GetNewCINDetailsCountByLastXDays.fulfilled,
      (state, { payload }) => {
        try {
          state.isGetNewCINDetailsCountByLastXDays = true;
          state.GetNewCINDetailsCountByLastXDaysData = payload.data;
          state.isGetNewCINDetailsCountByLastXDaysFetching = false;
          state.isError = false;
          state.errorMessage = "";
          return state;
        } catch (error) {
          console.error(
            "Error: GetNewCINDetailsCountByLastXDays.fulfilled try catch error >>",
            error
          );
        }
      }
    );
    builder.addCase(
      GetNewCINDetailsCountByLastXDays.rejected,
      (state, { payload }) => {
        try {
          state.GetNewCINDetailsCountByLastXDaysData = [];
          state.isGetNewCINDetailsCountByLastXDays = false;
          state.isGetNewCINDetailsCountByLastXDaysFetching = false;
          state.isError = true;
          payload
            ? (state.errorMessage = payload.error
              ? "Please try again (There was some network issue)."
              : "Please try again (There was some network issue).")
            : (state.errorMessage = "API Response Invalid. Please Check API");
        } catch (error) {
          console.error(
            "Error: [GetNewCINDetailsCountByLastXDays.rejected] try catch error >>",
            error
          );
        }
      }
    );
    builder.addCase(GetNewCINDetailsCountByLastXDays.pending, (state) => {
      state.isGetNewCINDetailsCountByLastXDaysFetching = true;
    });
    //========= GetPdfRequestList
    builder.addCase(
      GetPdfRequestList.fulfilled,
      (state, { payload }) => {
        try {
          state.isGetPdfRequestList = true;
          state.GetPdfRequestListData = payload.data;
          state.isGetPdfRequestListFetching = false;
          state.isError = false;
          state.errorMessage = "";
          return state;
        } catch (error) {
          console.error(
            "Error: GetPdfRequestList.fulfilled try catch error >>",
            error
          );
        }
      }
    );
    builder.addCase(
      GetPdfRequestList.rejected,
      (state, { payload }) => {
        try {
          state.GetPdfRequestListData = [];
          state.isGetPdfRequestList = false;
          state.isGetPdfRequestListFetching = false;
          state.isError = true;
          payload
            ? (state.errorMessage = payload.error
              ? "Please try again (There was some network issue)."
              : "Please try again (There was some network issue).")
            : (state.errorMessage = "API Response Invalid. Please Check API");
        } catch (error) {
          console.error(
            "Error: [GetPdfRequestList.rejected] try catch error >>",
            error
          );
        }
      }
    );
    builder.addCase(GetPdfRequestList.pending, (state) => {
      state.isGetPdfRequestListFetching = true;
    });
    //========= Ewallet
    builder.addCase(Ewallet.fulfilled, (state, { payload }) => {
      try {
        state.isEwallet = true;
        state.EwalletData = payload.credit;
        state.ProductName = payload.productvname;
        state.ProductValue = payload.value;
        state.ProductMoreValue = payload.MoreValue;
        state.isEwalletFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error("Error: Ewallet.fulfilled try catch error >>", error);
      }
    });
    builder.addCase(Ewallet.rejected, (state, { payload }) => {
      try {
        state.isEwallet = false;
        state.isEwalletFetching = false;
        state.Ewalletexpired = payload.error.statuscode || "";
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? payload.error.errorMessage || payload.error.message || payload.error
            : "no data found")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error("Error: [Ewallet.rejected] try catch error >>", error);
      }
    });
    builder.addCase(Ewallet.pending, (state) => {
      state.isEwalletFetching = true;
    });
    //===
    //========= Sendmobileotp
    builder.addCase(Sendemailotp.fulfilled, (state, { payload }) => {
      try {
        state.isSendemailotp = true;
        state.SendemailotpData = payload;

        state.isSendemailotpFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: Sendemailotp.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(Sendemailotp.rejected, (state, { payload }) => {
      try {
        state.SendemailotpData = {};
        state.isSendemailotp = false;
        state.isSendemailotpFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error.message_detail
            ? payload.error.message_detail
            : "no data found")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [Sendemailotp.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(Sendemailotp.pending, (state) => {
      state.isSendemailotpFetching = true;
    });
    //========= UploadCIN
    builder.addCase(UploadCIN.fulfilled, (state, { payload }) => {
      try {
        state.isUploadCIN = true;
        state.UploadCINData = payload;

        state.isUploadCINFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error("Error: UploadCIN.fulfilled try catch error >>", error);
      }
    });
    builder.addCase(UploadCIN.rejected, (state, { payload }) => {
      try {
        state.UploadCINData = {};
        state.isUploadCIN = false;
        state.isUploadCINFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? payload.error
            : "no data found")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error("Error: [UploadCIN.rejected] try catch error >>", error);
      }
    });
    builder.addCase(UploadCIN.pending, (state) => {
      state.isUploadCINFetching = true;
    });
    //========= GetCINAddressByPin
    builder.addCase(GetCINAddressByPin.fulfilled, (state, { payload }) => {
      try {
        state.isGetCINAddressByPin = true;
        state.GetCINAddressByPinData = payload;

        state.isGetCINAddressByPinFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: GetCINAddressByPin.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetCINAddressByPin.rejected, (state, { payload }) => {
      try {
        state.GetCINAddressByPinData = {};
        state.isGetCINAddressByPin = false;
        state.isGetCINAddressByPinFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error("Error: [UploadCIN.rejected] try catch error >>", error);
      }
    });
    builder.addCase(GetCINAddressByPin.pending, (state) => {
      state.isGetCINAddressByPinFetching = true;
    });
    //========= SearchCompanyName
    builder.addCase(SearchCompanyName.fulfilled, (state, { payload }) => {
      try {
        state.isSearchCompanyName = true;
        state.SearchCompanyNameData = payload.data;
        state.isSearchCompanyNameFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error("Error: UploadCIN.fulfilled try catch error >>", error);
      }
    });
    builder.addCase(SearchCompanyName.rejected, (state, { payload }) => {
      try {
        state.SearchCompanyNameData = [];
        state.isSearchCompanyName = false;
        state.isSearchCompanyNameFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error("Error: [UploadCIN.rejected] try catch error >>", error);
      }
    });
    builder.addCase(SearchCompanyName.pending, (state) => {
      state.isSearchCompanyNameFetching = true;
    });
    //========= SearchCompanyNameGSt
    builder.addCase(SearchCompanyNameGSt.fulfilled, (state, { payload }) => {
      try {
        state.isSearchCompanyNameGSt = true;
        state.SearchCompanyNameGStData = payload.data;
        state.isSearchCompanyNameGStFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error("Error: UploadCIN.fulfilled try catch error >>", error);
      }
    });
    builder.addCase(SearchCompanyNameGSt.rejected, (state, { payload }) => {
      try {
        state.SearchCompanyNameGStData = [];
        state.isSearchCompanyNameGSt = false;
        state.isSearchCompanyNameGStFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error("Error: [UploadCIN.rejected] try catch error >>", error);
      }
    });
    builder.addCase(SearchCompanyNameGSt.pending, (state) => {
      state.isSearchCompanyNameGStFetching = true;
    });
    //========= EwalletHistory
    builder.addCase(EwalletHistory.fulfilled, (state, { payload }) => {
      try {
        state.isEwalletHistory = true;
        state.EwalletHistoryData = payload.credit_history;
        state.isEwalletHistoryFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: EwalletHistory.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(EwalletHistory.rejected, (state, { payload }) => {
      try {
        // state.EwalletHistoryData = [];
        state.isEwalletHistory = false;
        state.isEwalletHistoryFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? payload.error
            : payload.error.errorMessage)
          : (state.errorMessage =
            "Please try again (There was some network issue).");
      } catch (error) {
        console.error(
          "Error: [EwalletHistory.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(EwalletHistory.pending, (state) => {
      state.isEwalletHistoryFetching = true;
    });
    //========= dataStoreWalletUpadate
    builder.addCase(dataStoreWalletUpadate.fulfilled, (state, { payload }) => {
      try {
        state.isdataStoreWalletUpadate = true;
        state.dataStoreWalletUpadateData = payload;
        state.isdataStoreWalletUpadateFetching = false;
        state.ProductName = payload.navigetName;
        state.ProductValue = payload.value;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: dataStoreWalletUpadate.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(dataStoreWalletUpadate.rejected, (state, { payload }) => {
      try {
        state.dataStoreWalletUpadateData = {};
        state.isdataStoreWalletUpadate = false;
        state.isdataStoreWalletUpadateFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? payload.error
            : payload.errorMessage)
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error(
          "Error: [dataStoreWalletUpadate.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(dataStoreWalletUpadate.pending, (state) => {
      state.isdataStoreWalletUpadateFetching = true;
    });
    //========= GetDashboardCount
    builder.addCase(GetDashboardCount.fulfilled, (state, { payload }) => {
      try {
        state.isGetDashboardCount = true;
        state.GetDashboardCountData = payload;
        state.isGetDashboardCountFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: GetDashboardCount.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetDashboardCount.rejected, (state, { payload }) => {
      try {
        state.GetDashboardCountData = {};
        state.isGetDashboardCount = false;
        state.isGetDashboardCountFetching = false;
        // state.isError = true;
        // payload
        //   ? (state.errorMessage = payload.error
        //       ? "Please try again (There was some network issue)."
        //       : "Please try again (There was some network issue).")
        //   : (state.errorMessage =
        //       "Please try again (There was some network issue).");
      } catch (error) {
        console.error(
          "Error: [GetDashboardCount.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(GetDashboardCount.pending, (state) => {
      state.isGetDashboardCountFetching = true;
    });
    //========= GetDashboardCount
    builder.addCase(HelpdeskTicketList.fulfilled, (state, { payload }) => {
      try {
        state.isHelpdeskTicketList = true;
        state.HelpdeskTicketListData = payload;
        state.isHelpdeskTicketListFetching = false;
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: HelpdeskTicketList.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(HelpdeskTicketList.rejected, (state, { payload }) => {
      try {
        state.HelpdeskTicketListData = {};
        state.isHelpdeskTicketList = false;
        state.isHelpdeskTicketListFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage =
            "Please try again (There was some network issue).");
      } catch (error) {
        console.error(
          "Error: [HelpdeskTicketList.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(HelpdeskTicketList.pending, (state) => {
      state.isHelpdeskTicketListFetching = true;
    });
    //========= HelpdeskTicketCreate
    builder.addCase(HelpdeskTicketCreate.fulfilled, (state, { payload }) => {
      try {
        state.isHelpdeskTicketCreate = true;
        state.HelpdeskTicketCreateData = payload;
        state.isHelpdeskTicketCreateFetching = false;
        state.successMessage = payload?.successMessage || "Ticket created successfully.";
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error(
          "Error: HelpdeskTicketCreate.fulfilled try catch error >>",
          error
        );
      }
    });
    builder.addCase(HelpdeskTicketCreate.rejected, (state, { payload }) => {
      try {
        state.HelpdeskTicketCreateData = {};
        state.isHelpdeskTicketCreate = false;
        state.isHelpdeskTicketCreateFetching = false;
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
            ? "Please try again (There was some network issue)."
            : "Please try again (There was some network issue).")
          : (state.errorMessage =
            "Please try again (There was some network issue).");
      } catch (error) {
        console.error(
          "Error: [HelpdeskTicketCreate.rejected] try catch error >>",
          error
        );
      }
    });
    builder.addCase(HelpdeskTicketCreate.pending, (state) => {
      state.isHelpdeskTicketCreateFetching = true;
    });
    //========= GetDashboardCategoryCount
    builder.addCase(
      GetDashboardCategoryCount.fulfilled,
      (state, { payload }) => {
        try {
          state.isGetDashboardCategoryCount = true;
          state.GetDashboardCategoryCountData = payload;
          state.isGetDashboardCategoryCountFetching = false;
          state.isError = false;
          state.errorMessage = "";
          return state;
        } catch (error) {
          console.error(
            "Error: GetDashboardCategoryCount.fulfilled try catch error >>",
            error
          );
        }
      }
    );
    builder.addCase(
      GetDashboardCategoryCount.rejected,
      (state, { payload }) => {
        try {
          state.GetDashboardCategoryCountData = {};
          state.isGetDashboardCategoryCount = false;
          state.isGetDashboardCategoryCountFetching = false;
          // state.isError = true;
          // payload
          //   ? (state.errorMessage = payload.error
          //       ? "Please try again (There was some network issue)."
          //       : "Please try again (There was some network issue).")
          //   : (state.errorMessage = "API Response Invalid. Please Check API");
        } catch (error) {
          console.error(
            "Error: [GetDashboardCategoryCount.rejected] try catch error >>",
            error
          );
        }
      }
    );
    builder.addCase(GetDashboardCategoryCount.pending, (state) => {
      state.isGetDashboardCategoryCountFetching = true;
    });
    //========= GetDashboardCategoryCount
    builder.addCase(
      BankPincode.fulfilled,
      (state, { payload }) => {
        try {
          state.isBankPincode = true;
          state.BankPincodeData = payload.data;
          state.isBankPincodeFetching = false;
          state.isError = false;
          state.errorMessage = "";
          return state;
        } catch (error) {
          console.error(
            "Error: BankPincode.fulfilled try catch error >>",
            error
          );
        }
      }
    );
    builder.addCase(
      BankPincode.rejected,
      (state, { payload }) => {
        try {
          state.BankPincodeData = [];
          state.isBankPincode = false;
          state.isBankPincodeFetching = false;
          state.isError = true;
          payload
            ? (state.errorMessage = payload.error
              ? "Please try again (There was some network issue)."
              : "Please try again (There was some network issue).")
            : (state.errorMessage = "API Response Invalid. Please Check API");
        } catch (error) {
          console.error(
            "Error: [BankPincode.rejected] try catch error >>",
            error
          );
        }
      }
    );
    builder.addCase(BankPincode.pending, (state) => {
      state.isBankPincodeFetching = true;
    });
  },
});

export const { updateState } = TBSlice.actions;
export const TBSelector = (state) => state.main.TB;
