import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "../../components/footer/Footer.jsx";
import routes from "../../routes.jsx";
import { useDispatch, useSelector } from "react-redux";
import ServiceApiName from "Service/ServiceApiName";
import ServiceRegExr from "../../Service/RegExr.js";

// antd
import { message } from "antd";

//Store TB
import {
  GetDashboardCategoryCount,
  TBSelector,
  updateState,
  GetDashboardCount,
  dataStoreWalletUpadate,
  Cin,
  Gstsearch,
  Din,
  PanSearch,
  Msme,
  Popularsearch,
  Mobile360,
} from "Store/Reducers/TBSlice";
import { CinRefreshCINDetails } from "Store/Reducers/TBSlice";
import { GstsearchRefreshDetails } from "Store/Reducers/TBSlice";
import { PansearchRefreshDetails } from "Store/Reducers/TBSlice";
import { Businesspansearch } from "Store/Reducers/TBSlice";
import { MsmeRefreshDetails } from "Store/Reducers/TBSlice";
import { SearchCompanyNameGSt } from "Store/Reducers/TBSlice";
import { SearchCompanyName } from "Store/Reducers/TBSlice";
import { MobileToMultipleUPI } from "Store/Reducers/TBSlice";
import { IESDetailApi } from "Store/Reducers/TBSlice";
import Service from "Service/Service";
import { GetFactAppInfoByPhone } from "Store/Reducers/TBSlice";
import { GetFactAppInfoMoreByPhone } from "Store/Reducers/TBSlice";
import { GetFactAppInfoByEmail } from "Store/Reducers/TBSlice";
import { GetFactAppInfoMoreByEmail } from "Store/Reducers/TBSlice";
import AntModalComponents from "../../components/ant/AntModalComponents.jsx";
import { ReUsersignin } from "Store/Reducers/TBSlice";
import { GetFactAppInfoByUserName } from "Store/Reducers/TBSlice";
import { SaveMADReport } from "Store/Reducers/MADSlice";
import { MADSelector } from "Store/Reducers/MADSlice";
import { updateStateMad } from "Store/Reducers/MADSlice";
import { GetMADReportTable } from "Store/Reducers/MADSlice";
import { RefreshDINDetailsByDIN } from "Store/Reducers/TBSlice";
import { SavePdfRequest } from "Store/Reducers/TBSlice";
import { DarpanSearchApi } from "Store/Reducers/TBSlice";

export default function Admin(props) {
  const { ...rest } = props;
  const features = Service.getUserdata().packages || {};
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const SessionExpiredTimer = React.useRef(null);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");
  const [loading, setloading] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const {
    isEwallet,
    isDarpanSearchApi,
    isDarpanSearchApiFetching,
    DarpanSearchApiData,
    viewPortal,
    ProductName,
    ProductValue,
    isGetDashboardCount,
    isCin,
    CinData,
    isCinFetching,
    isBankPincodeFetching,
    isEwalletFetching,
    isSavePdfRequestFetching,
    isDin,
    DinData,
    isDinFetching,
    isPanSearch,
    PanSearchData,
    isPanSearchFetching,
    isGstsearch,
    GstsearchData,
    isGstsearchFetching,
    isMsme,
    MsmeData,
    isMsmeFetching,
    isdataStoreWalletUpadate,
    isdataStoreWalletUpadateFetching,
    isMobile360,
    Mobile360Data,
    isMobile360Fetching,
    isIESDetailApi,
    IESDetailApiData,
    isIESDetailApiFetching,
    isMobileToMultipleUPI,
    MobileToMultipleUPIData,
    isMobileToMultipleUPIFetching,
    isUpdateProfile,
    UpdateProfileData,
    isUpdateProfileFetching,
    isGetGSTCINDetailByEmailFetching,
    isGetPincodeLatLongGSTFetching,
    isCinRefreshCINDetailsFetching,
    isGstsearchRefreshDetailsFetching,
    isPansearchRefreshDetailsFetching,
    isGetCINAddressByPinFetching,
    isBusinessPanSearchFetching,
    isBusinessPanSearch,
    BusinessPanSearchData,
    isMsmeRefreshDetailsFetching,
    isGetPincodeLatLongFetching,
    isSearchCompanyNameGSt,
    isSearchCompanyName,
    isSearchCompanyNameFetching,
    isSearchCompanyNameGStFetching,
    SearchCompanyNameData,
    SearchCompanyNameGStData,
    isGetFactAppInfoByPhoneFetching,
    isGetFactAppInfoMoreByPhoneFetching,
    isGetFactAppInfoByEmailFetching,
    isGetFactAppInfoMoreByEmailFetching,
    isGetFactAppInfoByPhone,
    isGetFactAppInfoMoreByPhone,
    isGetFactAppInfoByEmail,
    isGetFactAppInfoMoreByEmail,
    GetFactAppInfoMoreByPhoneData,
    GetFactAppInfoByPhoneData,
    GetFactAppInfoMoreByEmailData,
    GetFactAppInfoByEmailData,
    isSearchCINByAdvanceSearchFetching,
    isSearchCINByAdvanceSearch,
    isSearchGSTByAdvanceSearchFetching,
    isSearchGSTByAdvanceSearch,
    isError,
    isMe,
    errorMessage,
    isCinGetCompanyAndDirectorDetailBySelectedFetching,
    Ewalletexpired,
    isReUsersignin,
    isReUsersigninFetching,
    ReUsersigninData,
    isRefreshCinDINDetailsFetching,
    ProductMoreValue,
    isRefreshDINDetailsByDIN,
    isRefreshDINDetailsByDINFetching,
    isGetGSTDetailsBySelectedDateAllDataFetching,
  } = useSelector(TBSelector);

  const {
    isSaveMADReport,
    isGetMADKYCReportApiFetching,
    isGetMADKYCReportApi,
    isSaveMADReportFetching,
    isErrorMad,
    errorMessageMad
  } = useSelector(MADSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = React.useMemo(() => {
    return (
      isCinFetching ||
      isCinGetCompanyAndDirectorDetailBySelectedFetching ||
      isGetGSTDetailsBySelectedDateAllDataFetching ||
      isBankPincodeFetching ||
      isDinFetching ||
      isDarpanSearchApiFetching ||
      isPanSearchFetching ||
      isGstsearchFetching ||
      isEwalletFetching ||
      isSavePdfRequestFetching ||
      isMsmeFetching ||
      isMobile360Fetching ||
      isdataStoreWalletUpadateFetching ||
      isGetGSTCINDetailByEmailFetching ||
      isCinRefreshCINDetailsFetching ||
      isGetPincodeLatLongGSTFetching ||
      isGstsearchRefreshDetailsFetching ||
      isPansearchRefreshDetailsFetching ||
      isBusinessPanSearchFetching ||
      isMsmeRefreshDetailsFetching ||
      isGetPincodeLatLongFetching ||
      isGetCINAddressByPinFetching ||
      isSearchCompanyNameFetching ||
      isSearchCompanyNameGStFetching ||
      isMobileToMultipleUPIFetching ||
      isIESDetailApiFetching ||
      isUpdateProfileFetching ||
      isGetFactAppInfoByPhoneFetching ||
      isGetFactAppInfoMoreByPhoneFetching ||
      isGetFactAppInfoByEmailFetching ||
      isGetFactAppInfoMoreByEmailFetching ||
      isSearchCINByAdvanceSearchFetching ||
      isRefreshCinDINDetailsFetching ||
      isSearchGSTByAdvanceSearchFetching ||
      isSaveMADReportFetching ||
      isRefreshDINDetailsByDINFetching ||
      isGetMADKYCReportApiFetching
    );
  }, [
    isCinFetching,
    isCinGetCompanyAndDirectorDetailBySelectedFetching,
    isGetGSTDetailsBySelectedDateAllDataFetching,
    isBankPincodeFetching,
    isGetMADKYCReportApiFetching,
    isDinFetching,
    isDarpanSearchApiFetching,
    isPanSearchFetching,
    isGstsearchFetching,
    isEwalletFetching,
    isSavePdfRequestFetching,
    isMsmeFetching,
    isMobile360Fetching,
    isdataStoreWalletUpadateFetching,
    isGetGSTCINDetailByEmailFetching,
    isCinRefreshCINDetailsFetching,
    isGetPincodeLatLongGSTFetching,
    isGstsearchRefreshDetailsFetching,
    isPansearchRefreshDetailsFetching,
    isBusinessPanSearchFetching,
    isMsmeRefreshDetailsFetching,
    isGetPincodeLatLongFetching,
    isGetCINAddressByPinFetching,
    isSearchCompanyNameFetching,
    isSearchCompanyNameGStFetching,
    isMobileToMultipleUPIFetching,
    isIESDetailApiFetching,
    isUpdateProfileFetching,
    isGetFactAppInfoByPhoneFetching,
    isGetFactAppInfoMoreByPhoneFetching,
    isGetFactAppInfoByEmailFetching,
    isGetFactAppInfoMoreByEmailFetching,
    isSearchCINByAdvanceSearchFetching,
    isSearchGSTByAdvanceSearchFetching,
    isRefreshCinDINDetailsFetching,
    isSaveMADReportFetching,
    isRefreshDINDetailsByDINFetching,
  ]);

  React.useEffect(() => {
    setloading(isLoading);
  }, [isLoading]);

  // Add state for modal
  const [loginModalOpen, setLoginModalOpen] = React.useState(false);

  // Add state for countdown timer
  const [sessionExpiredTimer, setSessionExpiredTimer] = React.useState(10);

  // Modify the useEffect
  React.useEffect(() => {
    if (
      Ewalletexpired == "401" ||
      Ewalletexpired == "402" ||
      errorMessage == "Token has expired" ||
      errorMessageMad == "Token has expired"
    ) {
      setLoginModalOpen(true);
      setSessionExpiredTimer(10); // Reset timer to 10 seconds
      dispatch(updateState({ isError: false, errorMessage: "" }));
      dispatch(updateState({ Ewalletexpired: "" }));
      // Start countdown
      SessionExpiredTimer.current = setInterval(() => {
        setSessionExpiredTimer((prev) => {
          if (prev <= 1) {
            clearInterval(SessionExpiredTimer.current);
            handleLogout(); // Auto logout when timer reaches 0
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return;
    }
  }, [isError, errorMessage, dispatch, isErrorMad, errorMessageMad]);

  // Clear timer when modal closes
  React.useEffect(() => {
    if (!loginModalOpen) {
      clearInterval(SessionExpiredTimer.current);
      setSessionExpiredTimer(10);
    }
  }, [loginModalOpen]);

  // Add handler for logout
  const handleLogout = () => {
    // Add your logout logic here

    dispatch(updateState({ Ewalletexpired: "" }));
    setTimeout(() => {
      Service.logout(navigate);
    }, 1000);
    dispatch(updateState({ isError: false, errorMessage: "" }));
    setLoginModalOpen(false);
  };

  // Add handler for login
  const handleLogin = () => {
    // Use the existing credentials to log in
    if (isMe?.email && isMe?.password) {
      // Add your login logic here using isMe.email and isMe.password
      // After successful login:
      clearInterval(SessionExpiredTimer.current);
      setSessionExpiredTimer(10);
      dispatch(updateState({ isError: false, errorMessage: "" }));
      dispatch(ReUsersignin({ email: isMe.email, password: isMe.password }));
    }
  };

  React.useEffect(() => {
    if (isReUsersignin) {
      dispatch(updateState({ isReUsersignin: false }));
      setLoginModalOpen(false);
    }
  }, [isReUsersignin, ReUsersigninData]);
  //loading
  React.useEffect(() => {
    if (loading) {
      // messageApi.open({
      //   type: "loading",
      //   content: "Action in progress..",
      //   duration: 0,
      //   className: "custom-class-messageapi",
      // });
      dispatch(updateState({ isloading: loading }));
    }
    if (!loading) {
      dispatch(updateState({ isloading: loading }));
      messageApi.destroy();
    }
    //loading is Active
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);

  // isEwallet
  React.useEffect(() => {
    if (isEwallet) {
      //Cin
      if (ProductName === ServiceApiName.Cinsearch) {
        dispatch(Cin({ searchNumber: ProductValue }));
        dispatch(updateState({ isEwallet: false }));
      }
      //Gst
      if (ProductName === ServiceApiName.Gstsearch) {
        dispatch(Gstsearch({ gstin: ProductValue }));
        dispatch(updateState({ isEwallet: false }));
      }
      //Din
      if (ProductName === ServiceApiName.Dinsearch) {
        dispatch(Din({ searchNumber: ProductValue }));
        dispatch(updateState({ isEwallet: false }));
      }
      //msme
      if (ProductName === ServiceApiName.Msmesearch) {
        dispatch(Msme({ searchNumber: ProductValue }));
        dispatch(updateState({ isEwallet: false }));
      }
      //IES
      if (ProductName === ServiceApiName.Iecsearch) {
        dispatch(IESDetailApi({ searchNumber: ProductValue }));
        dispatch(updateState({ isEwallet: false }));
      }
      //Mobile
      if (ProductName === ServiceApiName.Mobile360search) {
        dispatch(
          updateState({ Mobile360Data: {}, MobileToMultipleUPIData: [] })
        );
        dispatch(Mobile360({ searchNumber: ProductValue }));
        dispatch(
          MobileToMultipleUPI({ mobileNumber: ProductValue.replace("+", "") })
        );
        dispatch(updateState({ isEwallet: false }));
      }
      //pan
      if (ProductName === ServiceApiName.Pansearch) {
        dispatch(PanSearch({ pannumber: ProductValue }));
        dispatch(updateState({ isEwallet: false }));
      }
      //CinRefresh
      if (ProductName === ServiceApiName.CinRefresh) {
        dispatch(CinRefreshCINDetails({ searchNumber: ProductValue }));
        dispatch(updateState({ isEwallet: false }));
      }
      //GstRefresh
      if (ProductName === ServiceApiName.GstRefresh) {
        dispatch(GstsearchRefreshDetails({ gstin: ProductValue }));
        dispatch(updateState({ isEwallet: false }));
      }
      //PanRefresh
      if (ProductName === ServiceApiName.PanRefresh) {
        dispatch(PansearchRefreshDetails({ pannumber: ProductValue }));
        dispatch(updateState({ isEwallet: false }));
      }
      //MsmeRefresh
      if (ProductName === ServiceApiName.MsmeRefresh) {
        dispatch(MsmeRefreshDetails({ searchNumber: ProductValue }));
        dispatch(updateState({ isEwallet: false }));
      }
      //BusinessPan
      if (ProductName === ServiceApiName.BusinessPansearch) {
        dispatch(Businesspansearch({ pannumber: ProductValue }));
        dispatch(updateState({ isEwallet: false }));
      }
      //BusinessPan
      if (ProductName === ServiceApiName.CompnayList) {
        dispatch(SearchCompanyName({ keyword: ProductValue }));
        dispatch(SearchCompanyNameGSt({ keyword: ProductValue }));
        dispatch(updateState({ isEwallet: false }));
      }
      //FactAppInfoByPhone
      if (ProductName === ServiceApiName.InfoByPhonesearch) {
        dispatch(GetFactAppInfoByPhone({ phoneNumber: ProductValue }));
        dispatch(updateState({ isEwallet: false }));
      }
      //FactAppInfoMoreByPhone
      if (ProductName === ServiceApiName.InfoMoreByPhonesearch) {
        dispatch(GetFactAppInfoMoreByPhone({ phoneNumber: ProductValue }));
        dispatch(updateState({ isEwallet: false }));
      }
      //FactAppInfoByEmail
      if (ProductName === ServiceApiName.InfoByEmailsearch) {
        dispatch(GetFactAppInfoByEmail({ email: ProductValue }));
        dispatch(updateState({ isEwallet: false }));
      }
      //FactAppInfoMoreByEmail
      if (ProductName === ServiceApiName.InfoMoreByEmailsearch) {
        dispatch(GetFactAppInfoMoreByEmail({ email: ProductValue }));
        dispatch(updateState({ isEwallet: false }));
      }
      //DinMoblieEmail
      if (ProductName === ServiceApiName.DinMoblieEmail) {
        dispatch(RefreshDINDetailsByDIN({ din: ProductValue }));
        dispatch(updateState({ isEwallet: false }));
      }
      //Mad
      if (ProductName === ServiceApiName.Madsearch) {
        dispatch(SaveMADReport(ProductMoreValue));
        dispatch(updateState({ isEwallet: false }));
      }
      //Mad
      if (ProductName === ServiceApiName.Pdfsearch) {
        dispatch(SavePdfRequest(ProductMoreValue));
        dispatch(updateState({ isEwallet: false }));
      }
      //Darpan
      if (ProductName === ServiceApiName.Darpansearch) {
        dispatch(DarpanSearchApi({ "NgoId": ProductValue }));
        dispatch(updateState({ isEwallet: false }));
      }
      dispatch(updateState({ isEwallet: false }));
    }
  }, [isEwallet]);

  // isTrue
  React.useEffect(() => {
    if (isCin) {
      dispatch(updateState({ isCin: false }));
      dispatch(
        dataStoreWalletUpadate({
          productName: ServiceApiName.Cinsearch,
          value: CinData?.cin,
          data: {
            success: true,
            data: CinData,
          },
          description: "",
        })
      );
      if (CinData?.cin) {
        Service.AddRecentSearch(
          CinData?.cin,
          ServiceApiName.Cinsearch
        );
      }
    }
    if (isGstsearch) {
      dispatch(
        dataStoreWalletUpadate({
          productName: ServiceApiName.Gstsearch,
          value: GstsearchData?.gstin,
          data: {
            success: true,
            data: GstsearchData,
          },
          description: "",
        })
      );
      dispatch(updateState({ isGstsearch: false }));
      if (GstsearchData?.gstin) {
        Service.AddRecentSearch(
          GstsearchData?.gstin,
          ServiceApiName.Gstsearch
        );
      }
    }
    if (isDin) {
      dispatch(
        dataStoreWalletUpadate({
          productName: ServiceApiName.Dinsearch,
          value: DinData?.[0]?.din,
          data: {
            success: true,
            data: DinData,
          },
          description: "",
        })
      );
      dispatch(updateState({ isDin: false }));
      if (DinData?.[0]?.din) {
        Service.AddRecentSearch(
          DinData?.[0]?.din,
          ServiceApiName.Dinsearch
        );
      }
    }
    if (isPanSearch) {
      dispatch(
        dataStoreWalletUpadate({
          productName: ServiceApiName.Pansearch,
          value: PanSearchData?.pan_number,
          data: {
            success: true,
            data: PanSearchData,
          },
          description: "",
        })
      );
      dispatch(updateState({ isPanSearch: false, BusinessPanSearchData: {} }));
      if (PanSearchData?.pan_number) {
        Service.AddRecentSearch(
          PanSearchData?.pan_number,
          ServiceApiName.Pansearch
        );
      }
    }
    if (isDarpanSearchApi) {
      dispatch(
        dataStoreWalletUpadate({
          productName: ServiceApiName.Darpansearch,
          value: DarpanSearchApiData?.pan_number,
          data: {
            success: true,
            data: DarpanSearchApiData,
          },
          description: "",
        })
      );
      dispatch(updateState({ isDarpanSearchApi: false }));
      if (DarpanSearchApiData) {
        Service.AddRecentSearch(
          ProductValue,
          ServiceApiName.Darpansearch
        );
      }
    }
    if (isMsme) {
      dispatch(
        dataStoreWalletUpadate({
          productName: ServiceApiName.Msmesearch,
          value: MsmeData?.reg,
          data: {
            success: true,
            data: MsmeData,
          },
          description: "",
        })
      );
      dispatch(updateState({ isMsme: false }));
      if (MsmeData?.reg) {
        Service.AddRecentSearch(
          MsmeData?.reg,
          ServiceApiName.Msmesearch
        );
      }
    }
    if (isIESDetailApi) {
      dispatch(
        dataStoreWalletUpadate({
          productName: ServiceApiName.Iecsearch,
          value: ProductValue,
          data: {
            success: true,
            data: IESDetailApiData,
          },
          description: "",
        })
      );
      dispatch(updateState({ isIESDetailApi: false }));
      if (ProductValue) {
        Service.AddRecentSearch(
          ProductValue,
          ServiceApiName.Iecsearch
        );
      }
    }
    if (isMobile360) {
      dispatch(
        dataStoreWalletUpadate({
          productName: ServiceApiName.Mobile360search,
          value: Mobile360Data?.telco_info?.data?.msisdn?.msisdn,
          data: {
            success: true,
            data: Mobile360Data,
          },
          description: "",
        })
      );
      dispatch(updateState({ isMobile360: false }));
      if (Mobile360Data?.telco_info?.data?.msisdn?.msisdn) {
        Service.AddRecentSearch(
          Mobile360Data?.telco_info?.data?.msisdn?.msisdn,
          ServiceApiName.Mobile360search
        );
      }
    }
    if (isMobileToMultipleUPI) {
      dispatch(
        dataStoreWalletUpadate({
          productName: ServiceApiName.MultipleUPI,
          value:
            Mobile360Data?.telco_info?.data?.msisdn?.msisdn || ProductValue,
          data: {
            success: true,
            data: MobileToMultipleUPIData,
          },
          description: "",
        })
      );
      dispatch(updateState({ isMobileToMultipleUPI: false }));
    }
    if (isBusinessPanSearch) {
      dispatch(
        dataStoreWalletUpadate({
          productName: ServiceApiName.Pansearch,
          value: BusinessPanSearchData?.pan || "",
          data: {
            success: true,
            data: BusinessPanSearchData,
          },
          description: "",
        })
      );
      dispatch(updateState({ isBusinessPanSearch: false, PanSearchData: {} }));
      if (BusinessPanSearchData?.pan) {
        Service.AddRecentSearch(
          BusinessPanSearchData?.pan,
          ServiceApiName.Pansearch
        );
      }
    }
    if (isSearchCompanyName || isSearchCompanyNameGSt) {
      dispatch(
        dataStoreWalletUpadate({
          productName: ServiceApiName.CompnayList,
          value: ProductValue,
          data: {
            success: true,
            data: [SearchCompanyNameData, SearchCompanyNameGStData],
          },
          description: "",
        })
      );
      dispatch(
        updateState({
          isSearchCompanyNameGSt: false,
          isSearchCompanyName: false,
        })
      );
    }
    if (isGetFactAppInfoByPhone) {
      dispatch(
        dataStoreWalletUpadate({
          productName: ServiceApiName.InfoByPhonesearch,
          value: GetFactAppInfoByPhoneData?.criteria,
          data: {
            success: true,
            data: GetFactAppInfoByPhoneData?.criteria,
          },
          description: "",
        })
      );
      dispatch(updateState({ isGetFactAppInfoByPhone: false }));
    }
    if (isGetFactAppInfoMoreByPhone) {
      dispatch(
        dataStoreWalletUpadate({
          productName: ServiceApiName.InfoMoreByPhonesearch,
          value: GetFactAppInfoMoreByPhoneData?.criteria,
          data: {
            success: true,
            data: GetFactAppInfoMoreByPhoneData?.criteria,
          },
          description: "",
        })
      );
      dispatch(updateState({ isGetFactAppInfoMoreByPhone: false }));
    }
    if (isGetFactAppInfoByEmail) {
      dispatch(
        dataStoreWalletUpadate({
          productName: ServiceApiName.InfoByEmailsearch,
          value: GetFactAppInfoByEmailData?.criteria,
          data: {
            success: true,
            data: GetFactAppInfoByEmailData?.criteria,
          },
          description: "",
        })
      );
      dispatch(updateState({ isGetFactAppInfoByEmail: false }));
    }
    if (isGetFactAppInfoMoreByEmail) {
      dispatch(
        dataStoreWalletUpadate({
          productName: ServiceApiName.InfoMoreByEmailsearch,
          value: GetFactAppInfoMoreByEmailData?.criteria,
          data: {
            success: true,
            data: GetFactAppInfoMoreByEmailData?.criteria,
          },
          description: "",
        })
      );
      dispatch(updateState({ isGetFactAppInfoMoreByEmail: false }));
    }
  }, [
    isCin,
    isIESDetailApi,
    isGetFactAppInfoByPhone,
    isGetFactAppInfoMoreByPhone,
    isGstsearch,
    isDin,
    isMobileToMultipleUPI,
    isPanSearch,
    isMsme,
    isMobile360,
    isBusinessPanSearch,
    isSearchCompanyNameGSt,
    isSearchCompanyName,
    isGetFactAppInfoByEmail,
    isGetFactAppInfoMoreByEmail,
    isDarpanSearchApi,
  ]);
  //Not Store Data
  React.useEffect(() => {
    //SearchCINByAdvanceSearch
    if (isSearchCINByAdvanceSearch) {
      navigate("/view/companydetailbycin", { replace: true });
      dispatch(updateState({ isSearchCINByAdvanceSearch: false }));
    }
    //SearchGSTByAdvanceSearch
    if (isSearchGSTByAdvanceSearch) {
      navigate("/view/companydetailbygst", { replace: true });
      dispatch(updateState({ isSearchGSTByAdvanceSearch: false }));
    }
    if (isSaveMADReport) {
      dispatch(GetMADReportTable({ userName: isMe.email }));
      dispatch(updateStateMad({ isSaveMADReport: false }));
    }
    if (isGetMADKYCReportApi) {
      navigate("/view/madreport", { replace: true });
      dispatch(updateStateMad({ isGetMADKYCReportApi: false }));
    }
    if (isRefreshDINDetailsByDIN) {
      dispatch(updateStateMad({ isRefreshDINDetailsByDIN: false }));
    }
  }, [
    isSearchCINByAdvanceSearch,
    isSaveMADReport,
    isSearchGSTByAdvanceSearch,
    isGetMADKYCReportApi,
    isRefreshDINDetailsByDIN,
  ]);

  // isdataStoreWalletUpadate  Naviget
  React.useEffect(() => {
    dispatch(updateState({ viewPortal: "FaList" }));
    if (isdataStoreWalletUpadate) {
      if (ProductName === ServiceApiName.Cinsearch) {
        dispatch(updateState({ isdataStoreWalletUpadate: false }));
        navigate("/view/cindetail", { state: { data: CinData }, replace: true });
      }
      if (ProductName === ServiceApiName.Gstsearch) {
        dispatch(updateState({ isdataStoreWalletUpadate: false }));
        navigate("/view/gstdetail", { replace: true });
      }
      if (ProductName === ServiceApiName.Darpansearch) {
        dispatch(updateState({ isdataStoreWalletUpadate: false }));
        navigate("/view/darpandetail", { state: { data: DarpanSearchApiData } }, { replace: true });
      }

      if (ProductName === ServiceApiName.Dinsearch) {
        dispatch(updateState({ isdataStoreWalletUpadate: false }));
        navigate("/view/dindetail", { replace: true });
      }
      if (ProductName === ServiceApiName.Pansearch) {
        dispatch(updateState({ isdataStoreWalletUpadate: false }));
        navigate("/view/pandetail", { replace: true });
      }
      if (ProductName === ServiceApiName.Mobile360search) {
        dispatch(updateState({ isdataStoreWalletUpadate: false }));
        navigate("/view/mobile360detail", { replace: true });
      }
      if (ProductName === ServiceApiName.MultipleUPI) {
        dispatch(updateState({ isdataStoreWalletUpadate: false }));
        navigate("/view/mobile360detail", { replace: true });
      }
      if (ProductName === ServiceApiName.Msmesearch) {
        dispatch(updateState({ isdataStoreWalletUpadate: false }));
        navigate("/view/msmedetail", { replace: true });
      }
      if (ProductName === ServiceApiName.CompnayList) {
        dispatch(updateState({ isdataStoreWalletUpadate: false }));
        navigate("/view/companylist", { replace: true });
      }
      if (ProductName === ServiceApiName.Iecsearch) {
        dispatch(updateState({ isdataStoreWalletUpadate: false }));
        navigate("/view/iecdetail", { replace: true });
      }
      if (ProductName === ServiceApiName.InfoByPhonesearch) {
        dispatch(updateState({ isdataStoreWalletUpadate: false }));
        if (!GetFactAppInfoByPhoneData?.message) {
          navigate("/view/osintnumber", { replace: true });
        } else {
          if (isMe?.email) {
            dispatch(GetFactAppInfoByUserName({ userName: isMe?.email }));
          }
        }
      }
      if (ProductName === ServiceApiName.InfoMoreByPhonesearch) {
        dispatch(updateState({ isdataStoreWalletUpadate: false }));
        if (!GetFactAppInfoMoreByPhoneData?.message) {
          navigate("/view/osintnumberalldetails", { replace: true });
        } else {
          if (isMe?.email) {
            dispatch(GetFactAppInfoByUserName({ userName: isMe?.email }));
          }
        }
      }
      if (ProductName === ServiceApiName.InfoByEmailsearch) {
        dispatch(updateState({ isdataStoreWalletUpadate: false }));
        if (!GetFactAppInfoByEmailData?.message) {
          navigate("/view/osintemail", { replace: true });
        } else {
          if (isMe?.email) {
            dispatch(GetFactAppInfoByUserName({ userName: isMe?.email }));
          }
        }
      }
      if (ProductName === ServiceApiName.InfoMoreByEmailsearch) {
        dispatch(updateState({ isdataStoreWalletUpadate: false }));
        if (!GetFactAppInfoMoreByEmailData?.message) {
          navigate("/view/osintemailalldetails", { replace: true });
        } else {
          if (isMe?.email) {
            dispatch(GetFactAppInfoByUserName({ userName: isMe?.email }));
          }
        }
      }
    }
  }, [isdataStoreWalletUpadate]);

  //isUpdateProfile
  React.useEffect(() => {
    const userdata = Service.getUserdata();
    if (isUpdateProfile) {
      if (userdata) {
        userdata.company_address = UpdateProfileData.data.companyAddress;
        userdata.first_name = UpdateProfileData.data.firstName;
        userdata.last_name = UpdateProfileData.data.lastName;
        userdata.image = UpdateProfileData.data.image;
        Service.setUserdata(userdata);
      }
      dispatch(
        updateState({
          isUpdateProfile: false,
          isMe: userdata,
          UpdateProfileData: {},
        })
      );
    }
  }, [isUpdateProfile, dispatch]);

  // isMe
  React.useEffect(() => {
    dispatch(updateState({ isMe: Service.getUserdata() }));
  }, [dispatch]);

  // Dashboard Count
  React.useEffect(() => {
    if (!isGetDashboardCount) {
      dispatch(GetDashboardCount());
    }
  }, [isGetDashboardCount, dispatch]);

  // GetDashboardCategoryCount
  React.useEffect(() => {
    dispatch(GetDashboardCategoryCount());
  }, []);
  // Popularsearch
  React.useEffect(() => {
    dispatch(Popularsearch());
  }, []);

  //Routes In Page
  const getActiveRoute = (routes) => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes
      .filter((route) => {
        // Check feature flag (if present)
        if (route.featureKey !== undefined) {
          return features[route.featureKey];
        }
        return true; // Always include if no featureKey
      }).map((prop, key) => {
        if (prop.layout === "/admin") {
          return (
            <Route path={`/${prop.path}`} element={prop.component} key={key} />
          );
        }
        if (prop.layout === "/view") {
          return (
            <Route path={`/${prop.path}`} element={prop.component} key={key} />
          );
        }
        if (prop.layout === "/dashboard") {
          return (
            <Route path={`/${prop.path}`} element={prop.component} key={key} />
          );
        } else {
          return null;
        }
      });
  };
  React.useEffect(() => {
    if (window.innerWidth < 1200) {
      setOpen(false);
    } else {
      setOpen(true);
    }
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);
  // document.documentElement.dir = "ltr";

  React.useEffect(() => {
    if (isReUsersignin) {
      SessionExpiredTimer.current = setInterval(() => {
        //cont -1
        setSessionExpiredTimer(SessionExpiredTimer.current - 1);
      }, 1000);
    }
  }, [isReUsersignin]);
  return (
    <div className="flex h-full w-full">
      {contextHolder}
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`ml-3 mr-[6px] h-full flex-none transition-all xl:ml-3`}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"Fact Byte"}
              brandText={currentRoute}
              fullPath={location.pathname}
              secondary={getActiveNavbar(routes)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] py-2 md:pr-2">
              <Routes>
                {getRoutes(routes)}
                <Route
                  path="/"
                  element={<Navigate to="/admin/default" replace />}
                />
              </Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
      {/* loader */}
      {loading && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-[10000] flex h-screen w-full items-center justify-center bg-gray-900/50">
          <div className="loader"></div>
        </div>
      )}

      <AntModalComponents
        ModalOpen={loginModalOpen}
        setOpen={setLoginModalOpen}
        handleCancel={() => handleLogout(false)}
        width={400}
        title={`Session Expired (${sessionExpiredTimer}s)`}
        extraFooter={[
          <div key="buttons" className="flex w-full flex-col gap-2">
            <button
              onClick={handleLogin}
              disabled={isReUsersigninFetching}
              className="linear w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"

              >
              {isReUsersigninFetching ? (
                <svg
                  aria-hidden="true"
                  className="mr-2 inline h-4 w-4 animate-spin text-gray-200"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                "Login with Existing Credentials"
              )}
            </button>
            <button
              onClick={handleLogout}
              className="linear w-full rounded-xl border border-brand-500 bg-white py-3 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:border-brand-400 dark:text-brand-400 dark:hover:bg-navy-700 dark:active:bg-navy-600"
            >
              Logout ({sessionExpiredTimer}s)
            </button>
          </div>,
        ]}
      >
        <div className="text-center">
          <p className="mb-4 text-gray-700 dark:text-gray-200">
            Your session has expired. You can login with your existing
            credentials or logout to sign in manually.
            {sessionExpiredTimer > 0 && (
              <span className="mt-2 block text-sm text-red-500">
                Auto logout in {sessionExpiredTimer} seconds
              </span>
            )}
          </p>
          {isMe?.email && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Logged in as: {isMe.email}
            </p>
          )}
        </div>
      </AntModalComponents>
    </div>
  );
}
