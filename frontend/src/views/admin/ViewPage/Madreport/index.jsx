import React from "react";
import { FiDownload, FiRefreshCw, FiMoreHorizontal } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import GaugeChart from "react-gauge-chart";
import Card from "components/card";
import { Tooltip } from "antd";
import { MADSelector } from "Store/Reducers/MADSlice";
import { useSelector } from "react-redux";
import { TbCirclePlusFilled, TbCircleCheckFilled } from "react-icons/tb";
import Service from "Service/Service";
import moment from "moment";
import CONFIG from "Config";

export default function Madreport() {
  const { GetMADKYCReportApiData } = useSelector(MADSelector);
  const [madScore, setmadScore] = React.useState("0%")
  React.useEffect(() => {
    if (Number(GetMADKYCReportApiData?.madScore) < 1) {
      setmadScore("0%")
    } else if (Number(GetMADKYCReportApiData?.madScore) <= 10) {
      setmadScore((Number(GetMADKYCReportApiData?.madScore) - 1) * 10 + "%")
    }
  }, [GetMADKYCReportApiData]);
  console.log(GetMADKYCReportApiData)
  const handleDownload = (pan, mobile) => {
    if (pan && mobile) {
      const link = document.createElement('a');
      link.href = `${CONFIG.BASE_URL_ALL}MADreport/MAD-Report-${pan}_${mobile}.pdf`;
      link.download = `MAD-Report-${pan}_${mobile}.pdf`;
      link.target = '_blank';
      link.click();
    }
  }
  return (
    <div className="mx-auto flex flex-col gap-y-5 py-4">
      {/* Header Section */}
      <div className="flex flex-wrap justify-end items-center gap-4">
        <button className="flex flex-wrap items-center gap-2 font-semibold text-xl rounded-lg border-2 border-gray-400 px-4 py-2 text-gray-700">
          Requested by : <span className="">{GetMADKYCReportApiData?.requestedBy}</span>
        </button>
        <button className="flex items-center gap-2 rounded-lg border-2 border-blue-100 px-4 py-2 text-blue-500">
          {GetMADKYCReportApiData?.reportType == "1" ? "Individual" : "Business"}
        </button>
      </div>
      <Card
        extra={`flex flex-col w-full h-full gap-1 !p-4 3xl:p-![18px] bg-white`}
      >
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-700">
              FACT CODE : {GetMADKYCReportApiData?.factCode} | {GetMADKYCReportApiData?.reportType == "2" ? GetMADKYCReportApiData?.companyName : GetMADKYCReportApiData?.personName}
            </h1>
            <div className="mt-3 flex gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <span className="text-gray-500">PAN Number :</span>
                <span className="ml-2">{GetMADKYCReportApiData?.panNumber}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500">Mobile Number :</span>
                <span className="ml-2">{GetMADKYCReportApiData?.mobileNumber}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm text-gray-400">
              {`(Last updated ${moment(GetMADKYCReportApiData?.requestDate).fromNow()})`}
            </span>
            <button onClick={() => handleDownload(GetMADKYCReportApiData?.panNumber, GetMADKYCReportApiData?.mobileNumber)} className="flex items-center gap-2 rounded-lg bg-red-100 px-4 py-2 text-red-500">
              <FiDownload /> Download
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-blue-100 px-4 py-2 text-blue-500">
              <FiRefreshCw /> Refresh
            </button>
            <button className="text-gray-500">
              <FiMoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* MULE Score */}
        <div className="mt-4 flex items-center justify-end">
          <div className="text-sm text-gray-600 mr-4">MULE SCORE</div>
          <div className="relative w-full max-w-md flex items-center">
            {/* Score Bar */}
            <div className="relative flex w-full h-6 rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"></div>
              <div className="absolute inset-0 items-center flex justify-between px-2">
                {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((label, index) => (
                  <div key={index} style={Number(GetMADKYCReportApiData?.madScore) == label ? { opacity: "0" } : null} className="text-xs text-white font-semibold">
                    {label}
                  </div>
                ))}
              </div>
              {/* Emoji Icon */}
              <div style={{ right: madScore }}
                className={`ml-0 absolute right-[${madScore}] text-base`}>
                {GetMADKYCReportApiData?.madScore >= 8
                  ? "😎"
                  : GetMADKYCReportApiData?.madScore >= 5
                    ? "🙂"
                    : "😟"}
              </div>
            </div>
          </div>
        </div>

      </Card>

      {/* Address Section */}
      <Card
        extra={`flex flex-col shadow-xl w-full h-full gap-1 !p-4 3xl:p-![18px] bg-white`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            <IoLocationOutline className="mt-1 text-gray-500" size={20} />
            <div>
              <div className="font-medium text-gray-700">
                REGISTERED ADDRESS :
              </div>
              <div className="text-gray-600">
                {GetMADKYCReportApiData?.registeredAddress}
              </div>
            </div>
          </div>
          <button className="text-gray-500">
            <FiMoreHorizontal size={20} />
          </button>
        </div>
      </Card>

      {/* Score Cards Grid */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Government & Public Record Validation",
            score: 100,
            color: "#4CAF50",
          },
          {
            title: "Credit & Risk Data Points",
            score: 400,
            color: "#FFC107",
          },
          {
            title: "Digital Behaviour Linkages",
            score: 600,
            color: "#4CAF50",
          },
          {
            title: "OCCUPATIONAL",
            score: 900,
            color: "#F44336",
          },
        ].map((item, index) => (
          <Card
            key={index}
            extra={`flex flex-col shadow-xl w-full h-full gap-1 !p-4 3xl:p-![18px] bg-white`}
          >
            <div className="px-4 py-2">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-medium text-gray-700">{item.title}</h3>
                <button className="text-gray-500">
                  <FiMoreHorizontal size={20} />
                </button>
              </div>
              <div className="">
                {/* <GaugeChart
id={`gauge-chart-${index}`}
nrOfLevels={4}
// arcsLength={[0.25, 0.25, 0.25, 0.25]}
formatTextValue={() => ["Poor", "Fair", "Good", "Excellent"]}
colors={["#FF0000", "#FFA500", "#FFEB3B", "#4CAF50"]}
arcWidth={0.3}
percent={item.score / 1000}
textColor="black"
/> */}
                <Tooltip title={``}>
                  <div>
                    <GaugeChart
                      id={`gauge-chart-${index}`}
                      nrOfLevels={4}
                      tooltip={true}
                      colors={["#FF0000", "#FFA500", "#FFEB3B", "#4CAF50"]}
                      arcWidth={0.3}
                      percent={item.score / 1000}
                      textColor="black"
                      formatTextValue={(value) => {
                        const levels = ["Poor", "Fair", "Good", "Excellent"];
                        const index = Math.min(
                          levels.length - 1,
                          Math.floor((item.score / 1000) * levels.length)
                        );
                        return levels[index];
                      }}
                      tooltipText={(value) => {
                        console.log(value);
                        const levels = ["Poor", "Fair", "Good", "Excellent"];
                        const index = Math.min(
                          levels.length - 1,
                          Math.floor((item.score / 1000) * levels.length)
                        );
                        return `${item.title}: ${levels[index]} (${item.score})`;
                      }}
                    />
                  </div>
                </Tooltip>
              </div>
              <div className="mt-2 flex items-center justify-center">
                <div
                  className={`flex items-center gap-2 text-2xl font-bold ${item.score >= 600 ? "text-green-500" : "text-red-500"
                    }`}
                >
                  {item.score}
                  {item.score >= 600 ? (
                    <span className="rounded-full bg-green-100 p-1">✓</span>
                  ) : (
                    <span className="rounded-full bg-red-100 p-1">×</span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Company Details */}

      <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Company Name",
            value: GetMADKYCReportApiData?.companyName,
            islink: GetMADKYCReportApiData?.reportType == "2" ? true : false,
          },
          {
            title: "Person Name",
            value: GetMADKYCReportApiData?.personName,
            islink: GetMADKYCReportApiData?.reportType == "1" ? true : false,
          },
          {
            title: "GST Number",
            value: GetMADKYCReportApiData?.gst,
            islink: GetMADKYCReportApiData?.reportType == "1" ? true : false,
            islink: true,
          },
          {
            title: "Mobile Number",
            value: GetMADKYCReportApiData?.mobileNumber,
            islink: true,
          },
          {
            title: "REGISTERED ADDRESS",
            value: GetMADKYCReportApiData?.registeredAddress,
            islink: true,
          },
          {
            title: "Address of Communication ",
            value: GetMADKYCReportApiData?.addressOfCommunication,
            islink: true,
          },
          {
            title: Service.PanType(GetMADKYCReportApiData?.panNumber) + " PAN Number",
            value: GetMADKYCReportApiData?.panNumber,
            islink: true,
          },
        ].map((item, index) =>
          item.islink ? (<Card
            key={index}
            extra={`flex flex-col shadow-xl w-full h-full gap-1 !p-6 !pb-7 3xl:p-![18px] bg-white`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xl font-semibold text-gray-800">
                  {item.title}
                </div>
                <div className="my-4"></div>
                <div
                  className={`text-base font-medium text-[#595454] md:text-[20px] ${index > 2 ? "" : "underline"
                    }`}
                >
                  {item.value}
                </div>
              </div>
              <button className="text-gray-500">
                <FiMoreHorizontal size={20} />
              </button>
            </div>
          </Card>) : null
        )}
      </div>

      {/* Mandatory Checks */}
      <Card
        extra={`flex flex-col shadow-xl w-full h-full gap-1 !p-6 3xl:p-![18px] bg-white`}
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-700">
          Mandatory Checks
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 text-left text-sm font-medium text-gray-600">
                  Parameter
                </th>
                <th className="py-3 text-left text-sm font-medium text-gray-600">
                  Description / Criteria
                </th>
                <th className="py-3 text-left text-sm font-medium text-gray-600">
                  Scoring
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { parameter: "Virtual Number check", status: "No" },
                { parameter: "Negative Customer Match", status: "No" },
                { parameter: "Negative Location match", status: "No" },
                { parameter: "Active GST", status: "Yes" },
              ].map((check, index) => (
                <tr key={index}>
                  <td className="py-4 text-sm text-gray-600">
                    {check.parameter}
                  </td>
                  <td className="py-4">
                    <span
                      className={`flex items-center gap-2 ${check.status === "Yes"
                        ? "text-green-500"
                        : "text-red-500"
                        }`}
                    >
                      {check.status === "Yes" ? (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                          ✓
                        </span>
                      ) : (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100">
                          ×
                        </span>
                      )}
                      {check.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex w-48 items-center gap-0.5">
                      {[...Array(20)].map((_, i) => (
                        <div
                          className={`${i == 2 ? "border-[1px] border-red-700" : ""
                            }`}
                          key={i}
                        >
                          <div

                            className={`${i == 2 ? "m-[1px] h-5 w-2" : "h-2 w-2"
                              } rounded-sm ${i < 5
                                ? "bg-green-500"
                                : i < 10
                                  ? "bg-green-300"
                                  : i < 15
                                    ? "bg-yellow-400"
                                    : "bg-red-500"
                              }`}
                          />
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* KYC Checks Score */}
      <div className="relative mt-16">
        <h2 className="absolute -top-16 z-[1] rounded-lg border-2 bg-[#ecf1fc] px-9 pb-10 pt-5 text-lg font-semibold text-gray-700 dark:bg-navy-900">
          KYC Checks Score
        </h2>
        <Card
          extra={`relative z-[2] flex border-2 flex-col shadow-xl w-full h-full gap-1 !p-6 3xl:p-![18px] bg-white`}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="rounded-sm bg-gray-50 px-2 dark:bg-navy-700">
                <tr>
                  <th className="py-3 text-left text-sm font-medium text-gray-600">
                    Parameter
                  </th>
                  <th className="py-3 text-left text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="py-3 text-center text-sm font-medium text-gray-600">
                    Score
                  </th>
                  <th className="py-3 text-right text-sm font-medium text-gray-600">
                    Weight
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {GetMADKYCReportApiData?.madReportParemeterMaster?.map(
                  (check, index) =>
                    check.paramType === "1" && (
                      <tr key={index}>
                        <td className="py-4 text-sm text-gray-600">
                          {check.paramName}
                        </td>
                        <td className="py-4">
                          {/* <TbCirclePlusFilled /> */}
                          {/* <TbCircleCheckFilled /> */}
                          <span
                            className={`flex items-center gap-2 ${check.value === "Yes"
                              ? "text-green-500"
                              : "text-red-500"
                              }`}
                          >
                            {((1 + 1) === 2) &&
                              (check.value === "Yes" ? (
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xl">
                                  ✓
                                </span>
                              ) : (
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xl">
                                  ×
                                </span>
                              ))}
                            {check.value ? check.value : "No"}
                            {check.extraInfo && (
                              <span className="ml-2 text-gray-500">
                                {check.extraInfo}
                              </span>
                            )}
                          </span>
                          {/* <span
className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm
${check.value === "LOW"
? "bg-orange-100 text-orange-500"
: check.value === "Active"
? "bg-green-100 text-green-500"
: check.value === "Yes"
? "text-green-500"
: check.value === "No"
? "text-red-500"
: ""
}`}
>
{check.value}
{check.extraInfo && (
<span className="ml-2 text-gray-500">
{check.extraInfo}
</span>
)}
</span> */}
                        </td>
                        <td className="py-4 text-center text-sm text-gray-700">
                          {check.score || 0}
                        </td>
                        <td className="py-4 text-right text-sm text-gray-500">
                          {check.weight || 0}
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      {/* Digital Behaviour Linkages */}
      <div className="relative mt-16 ">
        <h2 className="absolute -top-16 z-[1] rounded-lg border-2 bg-[#ecf1fc] px-9 pb-10 pt-5 text-lg font-semibold text-gray-700 dark:bg-navy-900">
          Digital Behaviour Linkages
        </h2>
        <Card
          extra={`relative z-[2] flex border-2 flex-col shadow-xl w-full h-full gap-1 !p-6 3xl:p-![18px] bg-white`}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 text-left text-sm font-medium text-gray-600">
                    Parameter
                  </th>
                  <th className="py-3 text-left text-sm font-medium text-gray-600">
                    Description / Criteria
                  </th>
                  <th className="py-3 text-left text-sm font-medium text-gray-600">
                    Risk
                  </th>
                  <th className="py-3 text-right text-sm font-medium text-gray-600">
                    Weight (%)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {GetMADKYCReportApiData?.madReportParemeterMaster?.map(
                  (check, index) =>
                    check.paramType === "2" && (
                      <tr key={index}>
                        <td className="py-4 text-sm text-gray-600">
                          {check.paramName}
                        </td>
                        <td className="py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm
${check.status === "LOW"
                                ? "bg-orange-100 text-orange-500"
                                : check.status === "Active"
                                  ? "bg-green-100 text-green-500"
                                  : check.status === "Yes"
                                    ? "text-green-500"
                                    : ""
                              }`}
                          >
                            {check.value}
                            {check.extraInfo && (
                              <span className="ml-2 text-gray-500">
                                {check.extraInfo}
                              </span>
                            )}
                          </span>
                        </td>
                        <td className="py-4 text-center text-sm text-gray-700">
                          {check.score || 0}
                        </td>
                        <td className="py-4 text-right text-sm text-gray-500">
                          {check.weight || 0}
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Public Record Validation */}
      <div className="relative mt-16">
        <h2 className="absolute -top-16 z-[1] rounded-lg border-2 bg-[#ecf1fc] px-9 pb-10 pt-5 text-lg font-semibold text-gray-700 dark:bg-navy-900">
          Public Record Validation
        </h2>
        <Card
          extra={`relative z-[2] flex border-2 flex-col shadow-xl w-full h-full gap-1 !p-6 3xl:p-![18px] bg-white`}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F7F7F7]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Parameter
                  </th>
                  <th className="py-3 text-left text-sm font-medium text-gray-600">
                    Description / Criteria
                  </th>
                  <th className="py-3 text-center text-sm font-medium text-gray-600">
                    Scoring
                  </th>
                  <th className="py-3 text-right text-sm font-medium text-gray-600">
                    Weight (%)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {GetMADKYCReportApiData?.madReportParemeterMaster?.map(
                  (check, index) =>
                    check.paramType === "3" && (
                      <tr key={index}>
                        <td className="py-4 text-sm text-gray-600">
                          {check.paramName}
                        </td>
                        <td className="py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm
${check.status === "LOW"
                                ? "bg-orange-100 text-orange-500"
                                : check.status === "Active"
                                  ? "bg-green-100 text-green-500"
                                  : check.status === "Yes"
                                    ? "text-green-500"
                                    : ""
                              }`}
                          >
                            {check.value}
                            {check.extraInfo && (
                              <span className="ml-2 text-gray-500">
                                {check.extraInfo}
                              </span>
                            )}
                          </span>
                        </td>
                        <td className="py-4 text-center text-sm text-gray-700">
                          {check.score || 0}
                        </td>
                        <td className="py-4 text-right text-sm text-gray-500">
                          {check.weight || 0}
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}