import React from "react";
import Dropdown from "../../components/dropdown/index";
import { FiAlignJustify } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import Service from "../../Service/Service";
import { TBSelector } from "../../Store/Reducers/TBSlice";
import { useDispatch, useSelector } from "react-redux";
import Infodata from "../../../src/data/Infodata";
import { useForm } from "react-hook-form";
import ServiceRegExr from "../../Service/RegExr";
import { Ewallet } from "../../Store/Reducers/TBSlice";
import ServiceApiName from "../../Service/ServiceApiName";
import { useNotificationContext } from "../../createContextStore/NotificationContext";
import { FaFilter } from "react-icons/fa6";
import AntModalComponents from "../../../src/components/ant/AntModalComponents";
import AdvancedSearch from "../../../src/views/admin/CIN/AdvancedSearch";
import AdvancedSearchGst from "../../../src/views/admin/GST/AdvancedSearchGst";
import RefreshBtn from "../../components/RefreshBtn";
import SpinAnimate from "../../components/RefreshBtn/SpinAnimate";
import { Tooltip } from "antd";
import { Msme } from "../../Store/Reducers/TBSlice";
import { FaList } from "react-icons/fa";
import { FaRegChartBar } from "react-icons/fa6";
import ViewBtn from "../../components/RefreshBtn/ViewBtn";
import { updateState } from "../../Store/Reducers/TBSlice";
import ClintLogo from "../../../src/assets/img/logo/RCSL.jpg";


const Navbar = (props) => {
    const { onOpenSidenav, brandText, fullPath } = props;
    const { openNotification } = useNotificationContext();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [darkmode, setDarkmode] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);
    const [chart, setChart] = React.useState(false);
    const [searchtype, setsearchtype] = React.useState("All Number");
    const {
        isMe,
        isloading,
        isdataStoreWalletUpadate,
        isSearchCINByAdvanceSearch,
        isSearchGSTByAdvanceSearch,
        isCinRefreshCINDetailsFetching,
        isEwallet,
        CinData,
        MsmeData,
        GstsearchData,
        PanSearchData,
        isGstsearchRefreshDetailsFetching,
        isMsmeRefreshDetailsFetching,
        isPansearchRefreshDetailsFetching,
        viewPortal,
    } = useSelector(TBSelector);
    const [ModalOpen, setModalOpen] = React.useState(false);
    const [ModalOpenGst, setModalOpenGst] = React.useState(false);
    const [features, setFeatures] = React.useState({});
    const [imgError, setimgError] = React.useState(true);

    React.useEffect(() => {
        const features = Service.getUserdata().packages || {};

        setFeatures(features);
    }, []);

    const cin = ServiceRegExr.cinRegExr.source;
    const cinllp = ServiceRegExr.cinRegExrllp.source;
    const cinf = ServiceRegExr.cinRegExrf.source;
    const combined = `${cin}|${cinllp}|${cinf}`;
    const regex = new RegExp(combined, 'i');

    const allOptions = [
        { label: "All Number", value: "All Number" }, // Always show
        { label: "Mobile360", value: "Mobile360" },
        { label: "GST", value: "GST" },
        { label: "CIN", value: "CIN" },
        { label: "DIN", value: "DIN" },
        { label: "MSME", value: "MSME" },
        { label: "PAN", value: "PAN" },
        { label: "IEC", value: "IEC" },
        { label: "DARPAN", value: "DARPAN" },
    ];

    const visibleOptions = allOptions.filter(
        (opt) => opt.value === "All Number" || features[opt.value]
    );
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();


    const onSubmit = (data) => {
        const search = data.searchNumber.trim();
        if (searchtype === "All Number") {
            if (ServiceRegExr.gstRegExr.test(data.searchNumber.trim())) {
                Service.walletBalanceFunction(
                    ServiceApiName.Gstsearch,
                    dispatch,
                    Ewallet,
                    search
                );
            } else if (ServiceRegExr.dinRegExr.test(data.searchNumber.trim())) {
                Service.walletBalanceFunction(
                    ServiceApiName.Dinsearch,
                    dispatch,
                    Ewallet,
                    search
                );
            } else if (ServiceRegExr.panRegExr.test(data.searchNumber.trim())) {
                if (search[3].toLowerCase() === "f") {
                    Service.walletBalanceFunction(
                        ServiceApiName.BusinessPansearch,
                        dispatch,
                        Ewallet,
                        search
                    );
                } else {
                    Service.walletBalanceFunction(
                        ServiceApiName.Pansearch,
                        dispatch,
                        Ewallet,
                        search
                    );
                }
            } else if (ServiceRegExr.msmeRegExr.test(data.searchNumber.trim())) {
                Service.walletBalanceFunction(
                    ServiceApiName.Msmesearch,
                    dispatch,
                    Ewallet,
                    search
                );
                // dispatch(Msme({ searchNumber: search }));
            } else if (regex.test(data.searchNumber.trim())) {
                Service.walletBalanceFunction(
                    ServiceApiName.Cinsearch,
                    dispatch,
                    Ewallet,
                    search
                );
            } else if (ServiceRegExr.mobile360RegExr.test(data.searchNumber.trim())) {
                Service.walletBalanceFunction(
                    ServiceApiName.Mobile360search,
                    dispatch,
                    Ewallet,
                    search
                );
            } else {
                openNotification(
                    "error",
                    "Error",
                    "Please Enter Valid Number",
                    true,
                    true
                );
            }
        }
        if (searchtype === "Mobile360") {
            if (ServiceRegExr.mobile360RegExr.test(data.searchNumber.trim())) {
                Service.walletBalanceFunction(
                    ServiceApiName.Mobile360search,
                    dispatch,
                    Ewallet,
                    search
                );
            } else {
                openNotification(
                    "error",
                    "Error",
                    "Please Enter Valid Number",
                    true,
                    true
                );
            }
        } else if (searchtype === "GST") {
            if (ServiceRegExr.gstRegExr.test(data.searchNumber.trim())) {
                Service.walletBalanceFunction(
                    ServiceApiName.Gstsearch,
                    dispatch,
                    Ewallet,
                    search
                );
            } else {
                openNotification(
                    "error",
                    "Error",
                    "Please Enter Valid GST Number",
                    true,
                    true
                );
            }
        } else if (searchtype === "CIN") {
            if (regex.test(data.searchNumber.trim())) {
                Service.walletBalanceFunction(
                    ServiceApiName.Cinsearch,
                    dispatch,
                    Ewallet,
                    search
                );
            } else {
                openNotification(
                    "error",
                    "Error",
                    "Please Enter Valid CIN Number",
                    true,
                    true
                );
            }
        } else if (searchtype === "DIN") {
            if (ServiceRegExr.dinRegExr.test(data.searchNumber.trim())) {
                Service.walletBalanceFunction(
                    ServiceApiName.Dinsearch,
                    dispatch,
                    Ewallet,
                    search
                );
            } else {
                openNotification(
                    "error",
                    "Error",
                    "Please Enter Valid DIN Number",
                    true,
                    true
                );
            }
        } else if (searchtype === "MSME") {
            if (ServiceRegExr.msmeRegExr.test(data.searchNumber.trim())) {
                Service.walletBalanceFunction(
                    ServiceApiName.Msmesearch,
                    dispatch,
                    Ewallet,
                    search
                );
            } else {
                openNotification(
                    "error",
                    "Error",
                    "Please Enter Valid CIN Number",
                    true,
                    true
                );
            }
        } else if (searchtype === "DIN") {
            if (ServiceRegExr.dinRegExr.test(data.searchNumber.trim())) {
                Service.walletBalanceFunction(
                    ServiceApiName.Dinsearch,
                    dispatch,
                    Ewallet,
                    search
                );
            } else {
                openNotification(
                    "error",
                    "Error",
                    "Please Enter Valid DIN Number",
                    true,
                    true
                );
            }
        } else if (searchtype === "MSME") {
            if (ServiceRegExr.msmeRegExr.test(data.searchNumber.trim())) {
                Service.walletBalanceFunction(
                    ServiceApiName.Msmesearch,
                    dispatch,
                    Ewallet,
                    search
                );
            } else {
                openNotification(
                    "error",
                    "Error",
                    "Please Enter Valid MSME Number",
                    true,
                    true
                );
            }
        } else if (searchtype === "PAN") {
            if (ServiceRegExr.panRegExr.test(data.searchNumber.trim())) {
                if (search[3].toLowerCase() === "f") {
                    Service.walletBalanceFunction(
                        ServiceApiName.BusinessPansearch,
                        dispatch,
                        Ewallet,
                        search
                    );
                } else {
                    Service.walletBalanceFunction(
                        ServiceApiName.Pansearch,
                        dispatch,
                        Ewallet,
                        search
                    );
                }
            } else {
                openNotification(
                    "error",
                    "Error",
                    "Please Enter Valid PAN Number",
                    true,
                    true
                );
            }
        } else if (searchtype === "IEC") {
            if (ServiceRegExr.iecRegExr.test(data.searchNumber.trim())) {
                Service.walletBalanceFunction(
                    ServiceApiName.Iecsearch,
                    dispatch,
                    Ewallet,
                    search
                );
            } else {
                openNotification(
                    "error",
                    "Error",
                    "Please Enter Valid IEC Number",
                    true,
                    true
                );
            }
        } else if (searchtype === "DARPAN") {
            if (search.length >= 4) {
                Service.walletBalanceFunction(
                    ServiceApiName.Darpansearch,
                    dispatch,
                    Ewallet,
                    search
                );
            } else {
                openNotification(
                    "error",
                    "Error",
                    "Please Enter Valid DARPAN Number",
                    true,
                    true
                );
            }
        }
    };

    //Set Dark Mode in Locustoreg get valsue
    React.useEffect(() => {
        const darkMode = localStorage.getItem("darkMode");
        if (darkMode == "true") {
            document.body.classList.add("dark");
            setDarkmode(true);
        } else {
            document.body.classList.remove("dark");
            setDarkmode(false);
        }
    }, []);

    //Set Dark Mode in Locustoreg set valsue
    React.useEffect(() => {
        dispatch(updateState({ darkmode: darkmode }));
    }, [darkmode]);

    React.useEffect(() => {
        if (fullPath === "/admin/default") {
            setsearchtype("All Number");
        } else if (fullPath === "/admin/mobile360") {
            setsearchtype("Mobile360");
        } else if (fullPath === "/admin/gst") {
            setsearchtype("GST");
        } else if (fullPath === "/admin/cin") {
            setsearchtype("CIN");
        } else if (fullPath === "/admin/din") {
            setsearchtype("DIN");
        } else if (fullPath === "/admin/msme") {
            setsearchtype("MSME");
        } else if (fullPath === "/admin/pan") {
            setsearchtype("PAN");
        } else if (fullPath === "/admin/iec") {
            setsearchtype("IEC");
        }
        setRefresh(
            fullPath === "/view/cindetail" ||
            fullPath === "/view/gstdetail" ||
            fullPath === "/view/msmedetail" ||
            fullPath === "/view/pandetail"
        );
        setChart(fullPath === "/view/dindetailAdmin" || fullPath === "/view/cindetailAdmin");
    }, [fullPath]);
    React.useEffect(() => {
        if (isdataStoreWalletUpadate) {
            // form reset
            reset();
        }
    }, [isdataStoreWalletUpadate]);

    React.useEffect(() => {
        if (isSearchCINByAdvanceSearch) {
            setModalOpen(false);
        }
    }, [isSearchCINByAdvanceSearch]);

    React.useEffect(() => {
        if (isSearchGSTByAdvanceSearch) {
            setModalOpenGst(false);
        }
    }, [isSearchGSTByAdvanceSearch]);

    const handleRefresh = () => {
        if (!isloading) {
            if (refresh) {
                if (fullPath === "/view/cindetail") {
                    const search = CinData?.cin;
                    if (search) {
                        Service.walletBalanceFunction(
                            ServiceApiName.CinRefresh,
                            dispatch,
                            Ewallet,
                            search
                        );
                    }
                } else if (fullPath === "/view/gstdetail") {
                    const search = GstsearchData?.gstin;
                    if (search) {
                        Service.walletBalanceFunction(
                            ServiceApiName.GstRefresh,
                            dispatch,
                            Ewallet,
                            search
                        );
                    }
                } else if (fullPath === "/view/msmedetail") {
                    const search = MsmeData?.reg;
                    if (search) {
                        Service.walletBalanceFunction(
                            ServiceApiName.MsmeRefresh,
                            dispatch,
                            Ewallet,
                            search
                        );
                    }
                } else if (fullPath === "/view/pandetail") {
                    const search = PanSearchData?.pan_number;
                    if (search) {
                        Service.walletBalanceFunction(
                            ServiceApiName.PanRefresh,
                            dispatch,
                            Ewallet,
                            search
                        );
                    }
                }
            }
        } else {
            openNotification("error", "Error", "Please Wait for a while", true, true);
        }
    };
    const ViewBtnClick = (view) => {
        dispatch(updateState({ viewPortal: view }));
    };


    const Nevlogo = ({ className = "lg:flex hidden items-center justify-center gap-4" }) => {
        return (
            <div className={className}>
                {imgError && (
                    <img
                        className="w-[70px] aspect-[3/2] object-contain"
                        src={`data:image/png;base64,${isMe?.client_image}`}
                        alt={isMe?.firstName || "use"}
                        onError={(e) => (setimgError(false))}
                    />
                )}
                {searchtype === "CIN" && (
                    <div
                        onClick={() => setModalOpen(true)}
                        className="flex cursor-pointer items-center gap-2"
                    >
                        <FaFilter className="h-4 w-4 text-gray-600 dark:text-white" />
                    </div>
                )}
                {searchtype === "GST" && (
                    <div
                        onClick={() => setModalOpenGst(true)}
                        className="flex cursor-pointer items-center gap-2"
                    >
                        <FaFilter className="h-4 w-4 text-gray-600 dark:text-white" />
                    </div>
                )}
                <div className="flex items-center gap-2">
                    {refresh && (
                        <>
                            <Tooltip
                                title={
                                    fullPath.split("/")[2].replace("detail", "").toUpperCase() +
                                    " Refresh"
                                }
                                // color="#22c55e"
                                placement="bottom"
                            >
                                <div className="mb-2 flex w-full flex-row items-center gap-x-2 md:mb-0 md:w-auto">
                                    <div className="w-10">
                                        <div className="flex flex-col">
                                            <RefreshBtn handleRefresh={handleRefresh}>
                                                <div className="flex items-end justify-center">
                                                    <SpinAnimate
                                                        loading={
                                                            isCinRefreshCINDetailsFetching ||
                                                            isGstsearchRefreshDetailsFetching ||
                                                            isMsmeRefreshDetailsFetching ||
                                                            isPansearchRefreshDetailsFetching ||
                                                            isEwallet
                                                        }
                                                    ></SpinAnimate>{" "}
                                                </div>
                                            </RefreshBtn>
                                        </div>
                                    </div>
                                </div>
                            </Tooltip>
                        </>
                    )}
                    {chart && 1 + 1 == 2 && (
                        <>
                            <Tooltip
                                title={
                                    fullPath.split("/")[2].replace("detail", "").toUpperCase() +
                                    " Chart"
                                }
                                // color="#22c55e"
                                placement="bottom"
                            >
                                <div className="mb-2 flex w-full flex-row items-center gap-x-2 md:mb-0 md:w-auto">
                                    <div className="">
                                        <div className="flex flex-row gap-x-1">
                                            <RefreshBtn
                                                handleRefresh={() => ViewBtnClick("FaList")}
                                            >
                                                <div className="flex items-end justify-center">
                                                    <ViewBtn Icon={FaList} />
                                                </div>
                                            </RefreshBtn>
                                            <RefreshBtn
                                                handleRefresh={() => ViewBtnClick("FaRegChartBar")}
                                            >
                                                <div className="flex items-end justify-center">
                                                    <ViewBtn Icon={FaRegChartBar} />
                                                </div>
                                            </RefreshBtn>
                                        </div>
                                    </div>
                                </div>
                            </Tooltip>
                        </>
                    )}
                </div>
                <div className="items-center gap-2 flex">
                    <span
                        className="flex cursor-pointer text-xl xl:hidden text-gray-600 dark:text-white "
                        onClick={onOpenSidenav}
                    >
                        <FiAlignJustify className="h-5 w-5" />
                    </span>
                    <Dropdown
                        button={
                            <img
                                className="h-10 w-10 rounded-full"
                                src={`data:image/png;base64,${isMe?.image}`}
                                alt={isMe?.firstName || "use"}
                                onError={(e) => (e.target.src = Infodata.Profile)}
                            />
                        }
                        children={
                            <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
                                <div className="p-4">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-sm font-bold capitalize text-navy-700 dark:text-white">
                                            👋 Hey, {isMe?.first_name || ""}
                                        </p>{" "}
                                        <div
                                            className="cursor-pointer text-gray-600"
                                            onClick={() => {
                                                if (darkmode) {
                                                    document.body.classList.remove("dark");
                                                    localStorage.setItem("darkMode", false);
                                                    setDarkmode(false);
                                                } else {
                                                    document.body.classList.add("dark");
                                                    localStorage.setItem("darkMode", true);
                                                    setDarkmode(true);
                                                }
                                            }}
                                        >
                                            {darkmode ? (
                                                <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
                                            ) : (
                                                <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="h-px w-full bg-gray-200 dark:bg-white/20 " />

                                <div className="flex flex-col p-4">
                                    <Link
                                        to={"/view/profile"}
                                        className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                                    >
                                        Profile Settings
                                    </Link>
                                    <Link
                                        to={"/view/helpdesk"}
                                        className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                                    >
                                        <p className="mt-3 cursor-pointer text-sm font-medium  transition duration-150 ease-out hover:ease-in">
                                            Help Desk
                                        </p>
                                    </Link>
                                    <Link
                                        to={"/view/financialreport"}
                                        className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                                    >
                                        <p className="mt-3 cursor-pointer text-sm font-medium  transition duration-150 ease-out hover:ease-in">
                                            Financial Report
                                        </p>
                                    </Link>


                                    <Link
                                        to={"/view/analysisreport"}
                                        className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                                    >
                                        <p className="mt-3 cursor-pointer text-sm font-medium  transition duration-150 ease-out hover:ease-in">
                                            Analysis Report
                                        </p>
                                    </Link>
                                    {/* <Link
                      to={"/view/madreport"}
                      className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                    >
                      <p className="mt-3 cursor-pointer text-sm font-medium  transition duration-150 ease-out hover:ease-in">
                        MAD Report
                      </p>
                    </Link> */}
                                    <p
                                        onClick={() => Service.logout(navigate)}
                                        className="mt-3 cursor-pointer text-sm font-medium text-red-500 transition duration-150 ease-out hover:text-red-500 hover:ease-in"
                                    >
                                        Log Out
                                    </p>
                                </div>
                            </div>
                        }
                        classNames={"py-2 top-8 -left-[180px] w-max"}
                    />
                </div>
            </div>
        );
    }
    return (
        <>
            <nav className="relative z-40 mt-5 flex flex-row items-center 
      justify-between flex-wrap rounded-xl bg-white p-2 shadow-prime backdrop-blur-xl dark:bg-[#0b14374d] dark:shadow-none lg:flex-nowrap">
                <div className="ml-[6px]">
                    <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
                        <Link
                            to="#"
                            className="break-keep font-bold capitalize hover:text-navy-700 dark:hover:text-white"
                        >
                            <span className="text-nowrap break-keep">Dashboard</span>
                            {/* <div className="" dangerouslySetInnerHTML={{ __html: brandText.replace(" ", " ") }} /> */}
                        </Link>
                    </p>
                </div>
                <Nevlogo className="lg:hidden flex items-center gap-2" />
                <form
                    className="relative mt-[3px] flex h-[70px] flex-grow items-center justify-around gap-2 rounded-full bg-white
           px-2 py-2 shadow-none shadow-shadow-500 dark:!bg-navy-800 dark:shadow-xl sm:w-full md:flex-grow-0 md:gap-1 
            xl:gap-2"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* <div className={`flex h-full ${imgError ? "lg:w-[80%]" : "lg:w-[90%]"} w-full items-center rounded-xl bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white`}>
                        <div className="mb-0 flex items-center justify-center">
                            <select
                                value={searchtype}
                                onChange={(e) => setsearchtype(e.target.value)}
                                className="mr-2 border-gray-400 bg-lightPrimary px-2 text-sm font-bold text-navy-700 outline-none hover:cursor-pointer dark:bg-navy-900 dark:text-white"
                            >
                                {visibleOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full">
                            <input
                                disabled={isloading}
                                type="text"
                                autoComplete="off"
                                maxLength={50}
                                spellCheck="false"
                                placeholder={
                                    searchtype === "All Number"
                                        ? "Search..."
                                        : searchtype === "Mobile360"
                                            ? "Search by Mobile Number"
                                            : searchtype === "GST"
                                                ? "Search by GST Number"
                                                : searchtype === "CIN"
                                                    ? "Search by CIN Number"
                                                    : searchtype === "DIN"
                                                        ? "Search by DIN Number"
                                                        : searchtype === "MSME"
                                                            ? "Search by MSME Number"
                                                            : searchtype === "PAN"
                                                                ? "Search by PAN Number"
                                                                : searchtype === "IEC"
                                                                    ? "Search by IEC Number"
                                                                    : searchtype === "DARPAN"
                                                                        ? "Search by DARPAN Number"
                                                                        : "Search..."
                                }
                                className="block h-full w-[calc(100%-10px)] bg-lightPrimary py-3 text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:text-base"
                                {...register("searchNumber", {
                                    required: "This number is required",
                                })}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleSubmit(onSubmit)();
                                    }
                                }}
                            />
                        </div>
                        <p className="pl-3 pr-2 text-xl">
                            <button className="cursor-pointer hover:text-gray-600 dark:hover:text-white" type="submit">
                                <FiSearch className="h-4 w-4" />
                            </button>
                        </p>
                    </div> */}
                    <Nevlogo className="lg:flex hidden items-center justify-center gap-4" />
                </form>
            </nav>
            <AntModalComponents
                ModalOpen={ModalOpen}
                setOpen={setModalOpen}
                handleCancel={() => setModalOpen(false)}
                width={1000}
                title="Advanced Search"
            >
                <AdvancedSearch />
            </AntModalComponents>
            <AntModalComponents
                ModalOpen={ModalOpenGst}
                setOpen={setModalOpenGst}
                handleCancel={() => setModalOpenGst(false)}
                width={1000}
                title="Advanced Search"
            >
                <AdvancedSearchGst />
            </AntModalComponents>
        </>
    );
};
export default Navbar;
