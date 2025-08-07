import DrawerCoponent from "components/Drawer";
import Card from "components/card";
import { useNotificationContext } from "createContextStore/NotificationContext";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ServiceRegExr from "Service/RegExr";
import { TbFilterStar } from "react-icons/tb";
import MadModifyFilter from "./MadModifyFilter";
import { TBSelector } from "Store/Reducers/TBSlice";
import { useDispatch, useSelector } from "react-redux";
import Service from "Service/Service";
import { Ewallet } from "Store/Reducers/TBSlice";
import ServiceApiName from "Service/ServiceApiName";
import { MADSelector } from "Store/Reducers/MADSlice";
import TableComponents from "components/ant/TableComponents";
import RefreshBtn from "components/RefreshBtn";
import SpinAnimate from "components/RefreshBtn/SpinAnimate";
import { GetMADReportTable } from "Store/Reducers/MADSlice";
import moment from "moment";
import { Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import MADReportClientConfig from "./MADReportClientConfig";
import { GetMADKYCReportApi } from "Store/Reducers/MADSlice";
import { BsFilePdf } from "react-icons/bs";
import CONFIG from "Config";
import { IoIosRefresh } from "react-icons/io";
import CountdownTimer from "components/CountdownTimer.jsx";

export default function MadSearch() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { darkmode, isMe, isloading } = useSelector(TBSelector);
  const {
    isGetMADReportTableFetching,
    isSaveMADReport,
    GetMADReportTableData,
  } = useSelector(MADSelector);
  const [accountType, setAccountType] = useState("individual");
  const [verified, setVerified] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { openNotification } = useNotificationContext();
  let productsName = ServiceApiName.Madsearch;

  const onSubmit = (data) => {
    if (isMe.email) {
      Service.walletBalanceFunction(productsName, dispatch, Ewallet, "search", {
        ...data,
        userName: isMe.email,
        reportType: data.panNumber[3].toLowerCase() === "p" ? "1" : "2",
        requestType: 1
      });
      setVerified(true);
    } else {
      openNotification("error", "Error", "user not valid", true, true);
    }
  };
  const onSubmit1 = (data) => {
    if (isMe.email) {
      Service.walletBalanceFunction(productsName, dispatch, Ewallet, "search", {
        ...data,
        userName: isMe.email,
        reportType: data.panNumber[3].toLowerCase() === "p" ? "1" : "2",
      });
      setVerified(true);
    } else {
      openNotification("error", "Error", "user not valid", true, true);
    }
  };

  React.useEffect(() => {
    if (isMe?.email) {
      dispatch(GetMADReportTable({ userName: isMe?.email }));
    }
  }, [isMe]);
  React.useEffect(() => {
    if (isSaveMADReport) {
      reset();
    }
  }, [isSaveMADReport]);

  const columns = [
    {
      title: "ID",
      dataIndex: "reportId",
    },
    {
      title: <span>Pan Number</span>,
      dataIndex: "panNumber",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
    },
    {
      title: "Request Min",
      dataIndex: "requestMin",
    },
    {
      title: "Type",
      dataIndex: "reportType",
    },
    {
      title: "Report Status",
      dataIndex: "isGenerated",
    },
    {
      title: "View",
      dataIndex: "view",
    },
    {
      title: "PDF",
      dataIndex: "pdf",
    },
    {
      title: "Regenerate",
      dataIndex: "regenerate",
    },
  ];

  const handleDownload = (pan, mobile) => {
    if (pan && mobile) {
      const link = document.createElement('a');
      link.href = `${CONFIG.BASE_URL_ALL}MADreport/MAD-Report-${pan}_${mobile}.pdf`;
      link.download = `MAD-Report-${pan}_${mobile}.pdf`;
      link.target = '_blank';
      link.click();
    }
  }
  const sortedData = GetMADReportTableData ? [...GetMADReportTableData].sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate)) : [];
  const dataSource = sortedData?.map((_, i) => ({
    key: _.reportId,
    reportId: i + 1,
    // reportId: _.reportId,
    panNumber: _.panNumber?.toUpperCase(),
    mobileNumber: _.mobileNumber,
    requestMin: <CountdownTimer startDate={_.requestDate} isGenerated={_.isGenerated} />,
    createdDate: moment(_.createdDate).format("LL"),
    reportType: _.reportType === "1" ? "Individual" : "Business",
    isGenerated: _.isGenerated ? "Yes" : "No",
    pdf: (
      <Tooltip
        title={
          _.isGenerated
            ? ""
            : "Report is not generated"
        }
        // color="#22c55e"
        placement="bottom"
      >
        <button
          className={`${isloading || _.isGenerated == 1 ? "cursor-pointer text-blue-700" : ""
            } flex items-center gap-2`}
          disabled={isloading || _.isGenerated !== 1}
          onClick={() => handleDownload(_.panNumber?.toUpperCase(), _.mobileNumber)}
        >
          <BsFilePdf className={`mx-auto text-xl`} />
        </button>
      </Tooltip>
    ),
    regenerate: (
      <Tooltip
        title={
          _.isGenerated == 2
            ? "Regenerated"
            : ""
        }
        // color="#22c55e"
        placement="bottom"
      >
        <button
          className={`${isloading || _.isGenerated == 2 ? "cursor-pointer text-blue-700" : ""
            } flex items-center gap-2`}
          disabled={isloading || _.isGenerated != 2}
          onClick={() => onSubmit1({
            "panNumber": _.panNumber?.toUpperCase(),
            "mobileNumber": _.mobileNumber,
            "requestType": 2,
            "reportId": _.reportId
          })}
        >
          <IoIosRefresh className={`mx-auto text-xl`} />
        </button>
      </Tooltip>
    ),
    view: (
      <Tooltip
        title={
          _.isGenerated
            ? "Report is already generated"
            : "Report is not generated"
        }
        // color="#22c55e"
        placement="bottom"
      >
        <button
          className={`${isloading || _.isGenerated == 1 ? "cursor-pointer text-blue-700" : ""
            } flex items-center gap-2`}
          disabled={isloading || _.isGenerated !== 1}
          onClick={() =>
            dispatch(
              GetMADKYCReportApi({
                ReportId: _.reportId,
                userName: isMe?.email,
              })
            )
          }
        >
          <EyeOutlined className={`mx-auto text-xl`} />
        </button>
      </Tooltip>
    )
  }));
  return (
    <>
      <DrawerCoponent
        open={open}
        darkmode={darkmode}
        setOpen={setOpen}
        title="MAD Report Client Configuration"
      >
        <MADReportClientConfig />
      </DrawerCoponent>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <Card extra={"w-full h-full pt-20 pb-10 sm:overflow-auto px-6"}>
          <div className="mb-14 text-center">
            <h1 className="mb-6 text-3xl font-bold text-gray-800 dark:text-white">
              MAD ( Mule Account Detection )
            </h1>
            <p className="text-gray-600">
              Enter Your Mobile Number Which you want to search information
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto w-full max-w-3xl"
          >
            {/* Radio Buttons */}
            {/* <div className="mb-8 flex justify-center space-x-4">
              <div
                className={`flex items-center rounded-lg border px-6 py-2 ${accountType === "individual"
                  ? "border-red-500"
                  : "border-gray-300"
                  }`}
              >
                <input
                  type="radio"
                  id="individual"
                  value="1"
                  checked={accountType === "individual"}
                  onClick={() => setAccountType("individual")}
                  onChange={() => setAccountType("individual")}
                  className="mr-2 accent-red-500"
                  {...register("reportType")}
                />
                <label htmlFor="individual" className="font-medium">
                  Individual
                </label>
              </div>
              <div
                className={`flex items-center rounded-lg border px-6 py-2 ${accountType === "business"
                  ? "border-red-500"
                  : "border-gray-300"
                  }`}
              >
                <input
                  type="radio"
                  id="business"
                  value="2"
                  checked={accountType === "business"}
                  onClick={() => setAccountType("business")}
                  onChange={() => setAccountType("business")}
                  className="mr-2 cursor-pointer accent-red-500"
                  {...register("reportType")}
                />
                <label htmlFor="business" className="font-medium">
                  Business
                </label>
              </div>
            </div> */}
            {isMe?.is_corporate_admin && (
              <div
                onClick={() => setOpen(true)}
                className="mb-3 flex cursor-pointer items-center justify-end space-x-2"
              >
                <span className="text-gray-500">
                  <TbFilterStar className="text-xl" />
                </span>
                <span className="text-gray-500">MAD Report Client Config</span>
              </div>
            )}

            {/* PAN Number */}
            <div className="mb-4 flex flex-wrap gap-y-2 sm:gap-y-0">
              <div className="w-full sm:w-3/12 sm:pr-2">
                <div className="rounded-lg border p-3">
                  <label
                    htmlFor="panNumber"
                    className="mb-1 block truncate text-sm font-medium text-gray-700"
                  >
                    PAN Number
                  </label>
                  <input
                    type="text"
                    id="panNumber"
                    className="hidden w-full focus:outline-none"
                    placeholder="PAN Number"
                  />
                </div>
              </div>
              <div className="w-full sm:w-3/4">
                <div
                  className={`flex items-center rounded-lg border p-3 ${errors.panNumber ? "border-red-500" : ""
                    }`}
                >
                  <input
                    type="text"
                    className={`bg-transparent w-full uppercase focus:outline-none`}
                    placeholder="AAAAA0000A"
                    {...register("panNumber", {
                      required: true,
                      pattern: ServiceRegExr.panRegExr,
                    })}
                  />
                  <div className="text-red-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Number */}
            <div className="mb-4 flex flex-wrap gap-y-2 sm:gap-y-0">
              <div className="w-full sm:w-3/12 sm:pr-2">
                <div className="rounded-lg border p-3">
                  <label
                    htmlFor="mobileNumber"
                    className="mb-1 block truncate text-sm font-medium text-gray-700"
                  >
                    MOBILE Number
                  </label>
                  <input
                    type="text"
                    id="mobileNumber"
                    className="hidden w-full focus:outline-none"
                    placeholder="MOBILE Number"
                  />
                </div>
              </div>
              <div className="w-full sm:w-3/4">
                <div
                  className={`flex items-center rounded-lg border p-3 ${errors.mobileNumber ? "border-red-500" : ""
                    }`}
                >
                  <div className="mr-2 hidden items-center border-r pr-2">
                    <span className="mr-1 text-xs">IND</span>
                  </div>
                  <input
                    type="text"
                    className="bg-transparent w-full focus:outline-none"
                    placeholder="10 Digit Mobile Number"
                    {...register("mobileNumber", {
                      required: true,
                      pattern: ServiceRegExr.mobile360RegExr,
                    })}
                  />
                  <div className="text-red-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Status and Next Button */}
            <div className="flex items-center justify-between">
              {verified && (
                <div
                  style={{ display: "none" }}
                  className="flex items-center rounded-full bg-green-100 px-4 py-2 text-green-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-medium">VERIFIED</span>
                </div>
              )}
              <div className="ml-auto">
                <button
                  type="submit"
                  className="rounded-lg bg-red-500 px-10 py-3 font-bold text-white hover:bg-red-600"
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </form>
          <Card extra={"w-full h-full pt-4 pb-7 sm:overflow-auto px-6"}>
            <div className="flex justify-end py-3">
              <RefreshBtn
                handleRefresh={() =>
                  isMe?.email &&
                  dispatch(GetMADReportTable({ userName: isMe?.email }))
                }
              >
                <div className="flex items-end justify-center">
                  <SpinAnimate
                    loading={isGetMADReportTableFetching}
                  ></SpinAnimate>{" "}
                </div>
              </RefreshBtn>
            </div>
            <div className="flex h-full flex-col justify-center">
              <TableComponents
                scrollx={1200}
                columns={columns}
                dataSource={dataSource}
                pagination={false}
              />
            </div>
          </Card>
        </Card>
      </div>
    </>
  );
}
