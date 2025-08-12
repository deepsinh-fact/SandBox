import moment from "moment";
import ServiceApiName from "./ServiceApiName";
import ServiceRegExr from "./RegExr";
import CONFIG from "../Config";

const setauthToken = async (token) => {
  try {
    localStorage.setItem("authToken", token);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const GetAuthHeader = () => {
  try {
    let Remember = localStorage.getItem("authToken");
    return Remember ? { token: Remember } : "";
  } catch (error) {
    console.log("try catch[ service> GetLogintoken] error:", error.message);
  }
};
const getAuthToken = async () => {
  try {
    return localStorage.getItem("authToken");
  } catch (error) {
    console.error(error);
    return null;
  }
};
const setCredit = async (credit) => {
  try {
    return localStorage.setItem("credit", credit);
  } catch (error) {
    console.error(error);
    return null;
  }
};
const getCredit = () => {
  try {
    return localStorage.getItem("credit");
  } catch (error) {
    console.error(error);
    return null;
  }
};
const setUserdata = (userdata) => {
  try {
    return localStorage.setItem("userdata", JSON.stringify(userdata));
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getAuthTokenAndHeader = () => {
  const token = localStorage.getItem("authToken");
  const username = JSON.parse(localStorage.getItem("userdata"));
  return {
    token: token,
    username: username?.email,
  };
};
const getAuthUser = () => {
  const username = JSON.parse(localStorage.getItem("userdata"));
  return {
    username: username?.email,
  };
};
const getUserdata = () => {
  try {
    // return JSON.parse(localStorage.getItem("userdata"));
    const data = JSON.parse(localStorage.getItem("userdata"));
    // const res = {
    //   ...data,
    //   // email: "test3.gmail.com",
    //   is_corporate_admin: true,
    //   packages: {
    //     ...data?.packages,
    //     CIN: true,
    //     GST: true,
    //     MAD: true,
    //     MSME: true,
    //     PAN: true,
    //     Mobile360: true,
    //     OSINT: true,
    //     IEC: true,
    //     DIN: true,
    //     MAD: true,
    //     DARPAN: true,
    //   }
    // };

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const setIsLoginData = async (data) => {
  try {
    localStorage.setItem("IsLoginData", JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
const getIsLoginData = () => {
  try {
    return JSON.parse(localStorage.getItem("IsLoginData"));
  } catch (error) {
    console.error(error);
    return null;
  }
};
const logout = async (navigate) => {
  try {
    navigate("/auth/sign-in");
    return localStorage.clear();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// const walletBalanceFunction = (
//   produtcApi,
//   dispatch,
//   Ewallet,
//   value,
//   MoreValue
// ) => {
//   const features = Service.getUserdata().packages || {};

//   if (MoreValue) {
//     dispatch(
//       Ewallet({
//         description: `${produtcApi} - ${MoreValue?.panNumber || MoreValue.mobileNumber
//           }`,
//         productName: produtcApi,
//         value: MoreValue?.panNumber || MoreValue.mobileNumber,
//         MoreValue: MoreValue,
//       })
//     );
//   } else {
//     dispatch(
//       Ewallet({
//         description: `${produtcApi} - ${value}`,
//         productName: produtcApi,
//         value: value,
//       })
//     );
//   }
// };

const walletBalanceFunction = (productApi, dispatch, Ewallet, value, MoreValue) => {
  const { packages: features = {} } = getUserdata() || {};
  const descriptionValue = MoreValue?.panNumber || MoreValue?.mobileNumber || value;

  const apiFeatureMap = {}
  apiFeatureMap[ServiceApiName["Gstsearch"]] = features["GST"];
  apiFeatureMap[ServiceApiName["GstRefresh"]] = features["GST"];
  apiFeatureMap[ServiceApiName["Cinsearch"]] = features["CIN"];
  apiFeatureMap[ServiceApiName["CinRefresh"]] = features["CIN"];
  apiFeatureMap[ServiceApiName["Dinsearch"]] = features["DIN"];
  apiFeatureMap[ServiceApiName["DinMoblieEmail"]] = features["DIN"];
  apiFeatureMap[ServiceApiName["Iecsearch"]] = features["IEC"];
  apiFeatureMap[ServiceApiName["Msmesearch"]] = features["MSME"];
  apiFeatureMap[ServiceApiName["MsmeRefresh"]] = features["MSME"];
  apiFeatureMap[ServiceApiName["Pansearch"]] = features["PAN"];
  apiFeatureMap[ServiceApiName["BusinessPansearch"]] = features["PAN"];
  apiFeatureMap[ServiceApiName["PanRefresh"]] = features["PAN"];
  apiFeatureMap[ServiceApiName["Madsearch"]] = features["MAD"];
  apiFeatureMap[ServiceApiName["Mobile360search"]] = features["Mobile360"];
  apiFeatureMap[ServiceApiName["MultipleUPI"]] = features["Mobile360"];
  apiFeatureMap[ServiceApiName["InfoByPhonesearch"]] = features["OSINT"];
  apiFeatureMap[ServiceApiName["InfoMoreByPhonesearch"]] = features["OSINT"];
  apiFeatureMap[ServiceApiName["InfoByEmailsearch"]] = features["OSINT"];
  apiFeatureMap[ServiceApiName["InfoMoreByEmailsearch"]] = features["OSINT"];
  apiFeatureMap[ServiceApiName["Darpansearch"]] = features["DARPAN"];
  apiFeatureMap[ServiceApiName["Pdfsearch"]] = true;
  const payload = {
    description: `${productApi} - ${descriptionValue}`,
    productName: productApi,
    value: descriptionValue,
    apiFeature: apiFeatureMap[productApi],
  };

  if (MoreValue) {
    payload.MoreValue = MoreValue;
  }
  dispatch(Ewallet(payload));
};
const PanType = (number) => {
  if (typeof number !== "string" || number.length < 4) {
    return "";
  }
  const numer2 = number.toLowerCase()[3];
  switch (numer2) {
    case "c":
      return "Company";
    case "p":
      return "Person";
    case "h":
      return "HUF (Hindu Undivided Family)";
    case "f":
      return "Firm";
    case "a":
      return "AOP (Association of Persons)";
    case "t":
      return "Trust";
    case "b":
      return "Body of Individual";
    case "l":
      return "Local Authority";
    case "j":
      return "Artificial Judicial Person";
    case "g":
      return "Government";
    default:
      return "";
  }
};

const AddRecentSearch = (Searchdata, Routedata, number = 3) => {
  try {
    const existingSearches = localStorage.getItem(Routedata);
    let searches = existingSearches ? JSON.parse(existingSearches) : [];
    let isnumber = searches.some((i) => i == Searchdata);
    if (!isnumber) {
      searches.unshift(Searchdata);
      if (searches.length > number) {
        searches.pop();
      }
    }
    localStorage.setItem(Routedata, JSON.stringify(searches));
  } catch (error) {
    console.error("Error updating recent search:", error);
  }
};
const GetRecentSearches = (Routedata) => {
  try {
    const searches = localStorage.getItem(Routedata);
    return searches ? JSON.parse(searches) : [];
  } catch (error) {
    console.error("Error retrieving recent searches:", error);
    return [];
  }
};
const lastDayesYYYMMDD = (number) => {
  return [...Array(number)]
    .map((_, index) =>
      moment()
        .clone()
        .subtract(1 + index, "days")
        .format("YYYY-MM-DD")
    )
    .reverse(); //1999-01-21
};
const lastDayesDDYY = (number) => {
  return [...Array(number)]
    .map((_, index) =>
      moment()
        .clone()
        .subtract(1 + index, "days")
        .format("DD-MM")
    )
    .reverse(); //21-01
};
const toCapitalize = (str) => {
  if (str) {
    return str
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  } else {
    return str;
  }
};
const toUpperCase = (str) => {
  if (str) {
    return str
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toUpperCase())
      .join(" ");
  } else {
    return str;
  }
};

const CruntDayTOBackDay = (day) => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - day);
  const endDate = new Date(today);
  endDate.setDate(today.getDate());
  const startDateFormatted = startDate.toString();
  const endDateFormatted = endDate.toString();
  return {
    startDateFormatted: moment(startDateFormatted).format("YYYY, M, DD"),
    endDateFormatted: moment(endDateFormatted).format("YYYY, M, DD"),
  };
};

const numberFormat = (data) => {
  return new Intl.NumberFormat("en-IN", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(data);
};

const dateFormating = (date) => {
  if (!date) return "";
  return moment(date, "MM/DD/YYYY HH:mm:ss").format("DD/MM/YYYY");
};
const formatNumber = (num, classprecision = 1, className) => {
  // If the number is less than 1000, return it as it is
  if (num < 1000) return num;

  // Indian Numbering System
  if (num >= 1000 && num < 100000) {
    // Thousands
    // return <span>{(num / 1000).toFixed(classprecision)}<span className={`${className}`}>K</span></span>;
    return (num / 1000).toFixed(classprecision) + "K";
  } else if (num >= 100000 && num < 10000000) {
    // Lakhs
    // return <span>{(num / 100000).toFixed(classprecision)}<span className={`${className}`}>L</span></span>
    return (num / 100000).toFixed(classprecision) + "L";
  } else if (num >= 10000000 && num < 100000000) {
    // Millions
    // return <span>{(num / 1000000).toFixed(classprecision)}<span className={`${className}`}>M</span></span>;
    return (num / 1000000).toFixed(classprecision) + "M";
  } else if (num >= 100000000) {
    // Crores
    // return <span>{(num / 10000000).toFixed(classprecision)}<span className={`${className}`}>Cr</span></span>;
    return (num / 10000000).toFixed(classprecision) + "Cr";
  }
};

const calculateAge = (birthdate, info, CuruntDay) => {
  if (birthdate) {
    const birthDate = moment(birthdate, "DD/MM/YYYY"); // Parse the input in DD/MM/YYYY format
    const today = moment();

    const years = today.diff(birthDate, "years"); // Get full years
    birthDate.add(years, "years"); // Adjust birthDate to the current date in terms of full years

    const months = today.diff(birthDate, "months"); // Get full months after the years
    birthDate.add(months, "months"); // Adjust birthDate to the current date in terms of full months

    const days = today.diff(birthDate, "days"); // Get remaining days after months
    if ("all" === info) {
      return `${years} years, ${months} months, ${days} days`; // Return age in years, months, and days
    } else if ("month" === info) {
      return `${months} month`; // Return age in months, and days
    } else if ("day" === info) {
      return `${days} days`; // Return age in days
    } else if ("yearsMonth" === info) {
      return `${years} years, ${months} months`; // Return age in years, months
    } else if ("monthDay" === info) {
      return `${months} months, ${days} days`; // Return age in months, and days
    } else if ("yearsDay" === info) {
      return `${years} years, ${days} days`; // Return age in years, and days
    } else if ("years" === info) {
      return `${years} years`; // Return age in years
    } else {
      return;
    }
  }
};
const CurontData = (str) => {
  const date = new Date();
  const dateformat = moment(date).format(`${str}`);
  return dateformat;
};
const dateFormatingyymmdd = (date) => {
  if (!date) return "";
  return moment(date, "YYYY/MM/DDTHH:mm:ss").format("DD/MM/YYYY");
};
const scroll0 = () => {
  window.scroll({
    top: 0,
    behavior: "smooth", // Enables smooth scrolling
  });
};

const PrasonAndBusinessUPICheck = (str) => {
  const valueBeforeAt = str.split("@")[0];
  const isOnlyNumbers = /^[0-9]+$/.test(valueBeforeAt);
  if (isOnlyNumbers) {
    return true;
  } else {
    return false;
  }
};

const hexToRgb = (hex, opacity = 1) => {
  hex = hex.replace(/^#/, "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map(function (char) {
        return char + char;
      })
      .join("");
  }
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);

  return `rgb(${r}, ${g}, ${b},${opacity})`;
};

const maskNumber = (number, maskChar = "*", revealCount = 3) => {
  if (number) {
    const numberStr = number.toString();
    const maskLength = numberStr.length - revealCount;
    if (maskLength <= 0) {
      return numberStr;
    }

    return maskChar.repeat(maskLength) + numberStr.slice(-revealCount);
  }
  return "";
};

const maskEmailAdvanced = (
  email,
  showUsernameChars = 3,
  showDomainChars = 3
) => {
  if (email) {
    const [username, domain] = email.split("@");
    const maskedUsername = username.slice(0, showUsernameChars) + "***";
    const domainParts = domain.split(".");
    const maskedDomain =
      domainParts[0].slice(0, showDomainChars) + "***." + domainParts[1];
    return maskedUsername + "@" + maskedDomain;
  }
};

const DateFormet = (date, format = "DD-MM-YYYY hh:mm A") => {
  if (!date) return "";
  return moment(date, "MM/DD/YYYY HH:mm:ss").format(format);
};


const getValidationRule = (type) => {
  switch (type) {
    case "PAN":
      return {
        value: ServiceRegExr.panRegExr,
        message: "Invalid PAN Number"
      };
    case "GST":
      return {
        value: ServiceRegExr.gstRegExr,
        message: "Invalid GST Number"
      };
    case "CIN":
      return {
        value: new RegExp(
          `${ServiceRegExr.cinRegExr.source}|${ServiceRegExr.cinRegExrllp.source}|${ServiceRegExr.cinRegExrf.source}`
        ), message: "Invalid CIN Number"
      };
    case "DIN":
      return {
        value: ServiceRegExr.dinRegExr,
        message: "Invalid DIN Number"
      };
    case "MSME":
      return {
        value: ServiceRegExr.msmeRegExr,
        message: "Invalid MSME Number"
      };
    case "IEC":
      return {
        value: ServiceRegExr.iecRegExr,
        message: "Invalid IEC Number"
      };
    case "MOBILE":
      return {
        value: ServiceRegExr.mobile360RegExr,
        message: "Invalid Mobile Number"
      };
    case "EMAIL":
      return {
        value: ServiceRegExr.emailRegExr,
        message: "Invalid Email Number"
      };
    default:
      return undefined;
  }
};
const apiMap = {
  PAN: ServiceApiName.Pansearch,
  GST: ServiceApiName.Gstsearch,
  CIN: ServiceApiName.Cinsearch,
  DIN: ServiceApiName.Dinsearch,
  MSME: ServiceApiName.Msmesearch,
  IEC: ServiceApiName.Iecsearch,
};
const unique = (arr) => [...new Set(arr)];

// Client API functions
const fetchClients = async () => {
  try {
    console.log('Fetching from URL:', `${CONFIG.BASE_URL_ALL}/api/client`);
    const response = await fetch(`${CONFIG.BASE_URL_ALL}/api/client`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response:', text);
      throw new Error('Server returned non-JSON response');
    }

    const result = await response.json();
    console.log('Service fetchClients result:', result);
    return result;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};

const fetchClientMasters = async () => {
  try {
    console.log('Fetching from URL:', `${CONFIG.BASE_URL_ALL}/api/clientmaster/getAllClient`);
    const response = await fetch(`${CONFIG.BASE_URL_ALL}/api/clientmaster/getAllClient`);

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('HTTP error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response:', text);
      throw new Error('Server returned non-JSON response');
    }

    const result = await response.json();
    console.log('Service fetchClientMasters result:', result);
    return result;
  } catch (error) {
    console.error('Error fetching client masters:', error);

    // If it's a network error, try to provide more helpful information
    if (error.message.includes('Failed to fetch')) {
      console.error('Network error - is the backend server running on http://localhost:3000?');
      return {
        success: false,
        message: 'Cannot connect to server. Please check if the backend is running on http://localhost:3000',
        data: []
      };
    }

    throw error;
  }
};

const createClientMaster = async (clientData) => {
  try {
    const response = await fetch(`${CONFIG.BASE_URL_ALL}/api/clientmaster/addClient`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData)
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating client master:', error);
    throw error;
  }
};

const updateClientMaster = async (clientId, clientData) => {
  try {
    const response = await fetch(`${CONFIG.BASE_URL_ALL}/api/clientmaster/updateClient/${clientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData)
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating client master:', error);
    throw error;
  }
};

const deleteClientMaster = async (clientId) => {
  try {
    console.log('=== SERVICE DELETE START ===');
    console.log('Service: ClientId to delete:', clientId);
    console.log('Service: Making DELETE request to:', `${CONFIG.BASE_URL_ALL}/api/clientmaster/deleteClient/${clientId}`);

    const response = await fetch(`${CONFIG.BASE_URL_ALL}/api/clientmaster/deleteClient/${clientId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('Service: Response received');
    console.log('Service: Response status:', response.status);
    console.log('Service: Response ok:', response.ok);
    console.log('Service: Response headers:', response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Service: HTTP error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('Service: Delete response result:', result);
    console.log('Service: Result success:', result.success);
    console.log('Service: Result message:', result.message);
    console.log('=== SERVICE DELETE END ===');
    return result;
  } catch (error) {
    console.error('Service: Error deleting client master:', error);
    console.error('Service: Error message:', error.message);
    console.error('Service: Error stack:', error.stack);
    console.log('=== SERVICE DELETE END (ERROR) ===');
    throw error;
  }
};

const Service = {
  setauthToken,
  setIsLoginData,
  getIsLoginData,
  getAuthToken,
  getCredit,
  setCredit,
  getUserdata,
  setUserdata,
  logout,
  walletBalanceFunction,
  GetAuthHeader,
  AddRecentSearch,
  GetRecentSearches,
  lastDayesDDYY,
  lastDayesYYYMMDD,
  toCapitalize,
  toUpperCase,
  CruntDayTOBackDay,
  numberFormat,
  dateFormating,
  formatNumber,
  calculateAge,
  CurontData,
  dateFormatingyymmdd,
  scroll0,
  PanType,
  PrasonAndBusinessUPICheck,
  hexToRgb,
  maskEmailAdvanced,
  maskNumber,
  DateFormet,
  getAuthTokenAndHeader,
  getAuthUser,
  getValidationRule,
  apiMap,
  unique,
  fetchClients,
  fetchClientMasters,
  createClientMaster,
  updateClientMaster,
  deleteClientMaster
};
export default Service;
