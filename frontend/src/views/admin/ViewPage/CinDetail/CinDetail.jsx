import React from "react";
import BoxCard from "components/BoxCard";
import Card from "components/card";
import AllDirectors from "views/admin/ViewPage/CinDetail/AllDirectors";
import CINCharges from "views/admin/ViewPage/CinDetail/CINCharges";
import { useDispatch, useSelector } from "react-redux";
import { TBSelector, GetGSTCINDetailByEmail } from "Store/Reducers/TBSlice";
import Service from "Service/Service";
import AntModalComponents from "components/ant/AntModalComponents";
import GoogleMaps from "components/GoogleMaps";
import { EyeOutlined, PlayCircleFilled } from "@ant-design/icons";
import { updateState } from "Store/Reducers/TBSlice";
import TableComponents from "components/ant/TableComponents";
import RefreshBtn from "components/RefreshBtn";
import SpinAnimate from "components/RefreshBtn/SpinAnimate";
import { Ewallet } from "Store/Reducers/TBSlice";
import ServiceApiName from "Service/ServiceApiName";
import { useNotificationContext } from "createContextStore/NotificationContext";
import LastUpdatedDate from "components/RefreshBtn/LastUpdatedDate";
import { FaUser } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi";
import { Tooltip } from "antd";
import { RefreshCinDINDetails } from "Store/Reducers/TBSlice";
import { LiaCalendarDaySolid } from "react-icons/lia";
import MiniCalendar from "components/calendar/MiniCalendar";
import PdfDownload from "components/PdfDownload";
import AnnualReturnFillingInfo from "./AnnualReturnFillingInfo";
import BalanceSheet from "./BalanceSheet";
import { useLocation } from "react-router-dom";

export default function CinDetail() {
  const { openNotification } = useNotificationContext();
  const {
    isGetGSTCINDetailByEmail,
    isloading,
    GetGSTCINDetailByEmailData,
    isCinRefreshCINDetailsFetching,
    isRefreshCinDINDetailsFetching,
    isEwallet,

    GetMCAReportData,
  } = useSelector(TBSelector);
  const location = useLocation();

  const [modal1Open, setModal1Open] = React.useState(false);
  const [modal2Open, setModal2Open] = React.useState(false);
  const [EmailTogst, setEmailTogst] = React.useState([]);
  const [CinData, setData] = React.useState({});
  const dispatch = useDispatch();
  let productsName = ServiceApiName.CinRefresh;

  React.useEffect(() => {
    setData(location?.state?.data || {});
  }, [location]);

  // CIN Charge Details To Open Close And Total
  let total = CinData?.cIN_Charges?.reduce(
    function (x, y) {
      return { amount: x.amount + y.amount };
    },
    { amount: 0 }
  );
  let open = CinData?.cIN_Charges?.reduce(
    function (accumulator, current) {
      if (current.datE_SATISFIED) {
        return accumulator;
      }
      return { amount: accumulator.amount + current.amount };
    },
    { amount: 0 }
  );
  let close = CinData?.cIN_Charges?.reduce(
    function (accumulator, current) {
      if (!current.datE_SATISFIED) {
        return accumulator;
      }
      return { amount: accumulator.amount + current.amount };
    },
    { amount: 0 }
  );

  //Email
  const getValue = (description) => {
    dispatch(GetGSTCINDetailByEmail({ emailId: description }));
  };
  React.useEffect(() => {
    if (isGetGSTCINDetailByEmail) {
      setModal2Open(true);
      dispatch(updateState({ isGetGSTCINDetailByEmail: false }));
      const data = GetGSTCINDetailByEmailData?.data?.gstDetail.map(
        (item, _) => {
          return {
            key: item,
            name: _ + 1,
            gstin: item,
            view: item,
          };
        }
      );
      setEmailTogst(data);
    }
  }, [isGetGSTCINDetailByEmail]);
  const columns = [
    {
      title: "No",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "GSTIN",
      dataIndex: "gstin",
      key: "gstin",
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
      render: (text) => (
        <button
          disabled={isloading}
          onClick={() => [
            Service.walletBalanceFunction(
              ServiceApiName.Gstsearch,
              dispatch,
              Ewallet,
              text
            ),
          ]}
          className="flex items-center gap-2 text-blue-700"
        >
          <EyeOutlined className="cursor-pointer text-xl" /> View
        </button>
      ),
    },
  ];
  const handleRefresh = () => {
    const search = CinData?.cin;
    if (!isloading) {
      if (search) {
        Service.walletBalanceFunction(productsName, dispatch, Ewallet, search);
      }
    }
  };

  const BoxCardData = [
    { no: 1, name: "Company Name", description: CinData?.companyName ? Service.toCapitalize(CinData?.companyName) : "Not Found" },
    { no: 2, name: "ROC Name", description: CinData?.companyROCcode ? Service.toCapitalize(CinData?.companyROCcode) : "Not Found" },
    { no: 3, name: "Registration Number", description: CinData?.registrationNumber ? Service.toCapitalize(CinData?.registrationNumber) : "Not Found" },
    { no: 4, name: "Status", description: CinData?.companyStatus },
    { no: 5, name: "Email Id", description: CinData?.email ? CinData?.email : "", maskEmail: true },
    { no: 6, name: "Phone Number", description: CinData?.phoneNumber ? CinData?.phoneNumber : "", maskPhoneNumber: true },
    { no: 7, name: "Listed in Stock Exchange(s) (Y/N)", description: CinData?.suspendedAtStockExchange ? "Yes" : "No" },
    { no: 6, name: "Registered Address", description: CinData?.registered_Office_Address, map: setModal1Open },
    { no: 8, name: "Incorporation", description: Service.dateFormating(CinData?.companyRegistrationdate_date) },
    { no: 9, name: "Class of Company", description: CinData?.companyClass },
    { no: 10, name: "Subcategory of the Company", description: CinData?.companySubCategory },
    { no: 11, name: "Nature Of Business", description: CinData?.natureOfBusiness },
    { no: 12, name: "Status For Efiling", description: CinData?.statusForEfiling },
    { no: 13, name: "Status Under CIRP", description: CinData?.statusUnderCirp },
    {
      no: 14, name: "Total Directors",
      description: CinData?.cIN_DINs?.length > 1 ? (
        <>
          <Tooltip
            placement="bottom"
            title={`No. of Directors:  ${CinData?.cIN_DINs?.length}`}
          >
            <div>
              <HiUserGroup className="text-2xl" />
            </div>
          </Tooltip>{" "}
        </>
      ) : (
        CinData?.cIN_DINs?.length && (
          <>
            <Tooltip
              placement="bottom"
              title={`No. of Directors:  ${CinData?.cIN_DINs?.length}`}
            >
              <div>
                <FaUser className="text-2xl" />
              </div>
            </Tooltip>{" "}
          </>
        )
      )
    },
    { no: 15, name: "Pan", description: CinData?.pan },
    { no: 16, name: "Authorised Capital (Rs)", description: `₹ ${Service.numberFormat(CinData?.authorizedCapital)}` },
    { no: 17, name: "Paid up Capital (Rs)", description: `₹ ${Service.numberFormat(CinData?.paidupCapital)}` },
    { no: 18, name: "Date of last AGM", description: Service.dateFormating(CinData?.last_AGM) },
    { no: 19, name: "Date of last Balance Sheet", description: Service.dateFormating(CinData?.last_BalanceSheet) },
    { no: 20, name: "Company Age", description: Service.calculateAge(Service.dateFormating(CinData?.companyRegistrationdate_date), "all") + "" },
    { no: 21, name: "Category of Company", description: CinData?.companyCategory },
    { no: 22, name: "Nic Code", description: CinData?.nic_code ? CinData?.nic_code : "" },
    { no: 23, name: "Nature of Industry", description: CinData?.sector ? Service.toCapitalize(CinData?.sector) : "" },
    { no: 24, name: "Categories", description: CinData?.categories ? Service.toCapitalize(CinData?.categories) : "" },
    { no: 25, name: "Description", description: CinData?.description ? Service.toCapitalize(CinData?.description) : "" },
    { no: 26, name: "Details", description: CinData?.details ? Service.toCapitalize(CinData?.details) : "" },
    { no: 27, name: "Registered Place", description: CinData?.rdName ? Service.toCapitalize(CinData?.rdName) : "" },
    { no: 28, name: "Registered Region", description: CinData?.rdRegion ? Service.toCapitalize(CinData?.rdRegion) : "" },
    { no: 29, name: "Number Of Partners", description: CinData?.numberOfPartners },
    { no: 30, name: "Number Of Designated Partners", description: CinData?.numberOfDesignatedPartners },
  ]
  return (
    <>
      <div className="">
        <div className="content-wrapper relative mt-3 grid grid-cols-1 gap-5 overflow-hidden">
          <Card extra={"w-full h-full p-3"}>
            <div className="flex flex-wrap justify-center gap-x-2 md:flex-nowrap md:justify-between">
              <div className="mb-8 mt-2 flex text-center md:text-left">
                <div className="">
                  <div className="flex items-center gap-x-2 px-2 text-2xl font-bold text-navy-700 dark:text-white">
                    {CinData?.companyName
                      ? Service.toCapitalize(CinData?.companyName)
                      : "--"}
                    <div
                      className={` ${CinData?.companyStatus == "Active" ||
                        CinData?.companyStatus == "active"
                        ? "text-green-800"
                        : "text-red-900"
                        }`}
                    >
                      <span className={`hidden text-sm `}>Active</span>
                      <span
                        className={`inline-block h-3 w-3 overflow-hidden rounded-full text-sm ${CinData?.companyStatus?.toLowerCase() == "active"
                          ? "bg-green-800"
                          : "bg-red-900"
                          }`}
                      ></span>
                    </div>
                  </div>
                  <p className="px-3 text-lg font-bold text-blue-500">
                    {CinData?.cin}
                  </p>
                </div>
              </div>

              <div className="mb-2 flex w-full flex-row items-center gap-x-2 md:mb-0 md:w-auto">
                <LastUpdatedDate date={CinData?.updated} />
                <div className="w-10">
                  <div className="flex flex-col">
                    {/* <RefreshBtn handleRefresh={handleRefresh}>
                      <div className="flex items-end justify-center">
                        <SpinAnimate
                          loading={isCinRefreshCINDetailsFetching || isEwallet}
                        ></SpinAnimate>{" "}
                      </div>
                    </RefreshBtn> */}
                    <div className="flex justify-end">
                      <PdfDownload apiName={ServiceApiName.Cinsearch} NameOfCompany={CinData?.companyName} title={CinData?.cin} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-2 grid grid-cols-1 gap-2 px-2 xl:grid-cols-2">
              <div className="grid grid-rows-1 gap-x-4 gap-y-2">
                {BoxCardData.slice(0, 16).map((item) => (
                  <BoxCard
                    key={item.no}
                    no={item.no}
                    name={item.name}
                    description={item.description}
                    icon={item.icon}
                  ></BoxCard>
                ))}
              </div>
              <div className="grid grid-rows-1 gap-2">
                {BoxCardData.slice(16, 32).map((item) => (
                  <BoxCard
                    key={item.no}
                    no={item.no}
                    name={item.name}
                    description={item.description}
                    icon={item.icon}
                  ></BoxCard>
                ))}
              </div>
            </div>
          </Card>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <Card extraextra="rounded-[20px]">
              <div className="mb-5 mt-2 flex w-full items-center justify-between  p-1 md:p-3">
                <div>
                  <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
                    All Directors
                  </h4>
                  <p className="px-2 text-base text-gray-600">
                    Total Directors:{" "}
                    <span className="font-bold">
                      {new Set(CinData?.cIN_DINs?.map((item) => item.din)).size}
                    </span>
                  </p>
                </div>
                {/* <div>
                <Tooltip
                  placement="bottom"
                  title={
                    <div className="">
                      <div className="flex flex-col gap-2">
                        <div className="items-center gap-2">
                          <div className="text-sm font-semibold">
                            Refresh DINDetails
                          </div>
                          <div className="text-sm font-semibold">
                            (Mobile and Email)
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                >
                  <div>
                    <RefreshBtn
                      handleRefresh={() =>
                        CinData?.cin &&
                        !isRefreshCinDINDetailsFetching &&
                        dispatch(RefreshCinDINDetails({ cin: CinData?.cin }))
                      }
                    >
                      <div className="flex items-end justify-center">
                        <SpinAnimate
                          loading={isEwallet || isRefreshCinDINDetailsFetching}
                        ></SpinAnimate>{" "}
                      </div>
                    </RefreshBtn>
                  </div>
                </Tooltip>
              </div> */}
              </div>
              <div className="p-2">
                <AllDirectors
                  isloading={isloading}
                  cIN_DINs={CinData?.cIN_DINs}
                />
              </div>
            </Card>
            <Card extra=" rounded-[20px]">
              <div className="mb-1 mt-2 w-full  p-1 md:p-3">
                <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
                  Cin Charge
                </h4>
                <div className="flex flex-wrap justify-between px-2">
                  <p className="flex flex-col p-1 text-center text-base text-gray-800 dark:text-gray-300">
                    Open
                    <span className="font-bold text-red-800 dark:text-red-800">
                      {Service.formatNumber(open?.amount)}
                    </span>
                  </p>
                  <p className="flex flex-col p-1 text-center text-base text-gray-800 dark:text-gray-300">
                    Close
                    <span className="font-bold text-green-900 dark:text-green-900">
                      {Service.formatNumber(close?.amount)}
                    </span>
                  </p>
                  <p className="flex flex-col p-1 text-center text-base text-gray-800 dark:text-gray-300">
                    Total
                    <span className="font-bold text-orange-600 dark:text-orange-600">
                      {Service.formatNumber(total?.amount)}
                    </span>
                  </p>
                </div>
              </div>
              <div className="p-2">
                <CINCharges cIN_Charges={CinData?.cIN_Charges} />
              </div>
            </Card>
            {CinData?.companyCategory === "LLP" && (
              <Card extra=" rounded-[20px]">
                <div className="mb-1 mt-2 w-full  p-1 md:p-3">
                  <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
                    Annual Return Filling Info
                  </h4>
                </div>
                <div className="p-2">
                  <AnnualReturnFillingInfo annualReturnFillingInfo={CinData?.annualReturnFillingInfo} />
                </div>
              </Card>
            )}
            {CinData?.companyCategory === "LLP" && (
              <Card extra=" rounded-[20px]">
                <div className="mb-1 mt-2 w-full  p-1 md:p-3">
                  <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
                    Balance Sheet
                  </h4>
                </div>
                <div className="p-2">
                  <BalanceSheet balanceSheet={CinData?.balanceSheet} />
                </div>
              </Card>
            )}
          </div>
        </div>
        <AntModalComponents
          title={
            CinData?.companyName
              ? `Map Of ${Service.toCapitalize(CinData?.companyName)}`
              : "Map"
          }
          width={900}
          ModalOpen={modal1Open}
          handleCancel={setModal1Open}
        >
          <GoogleMaps
            latitude={CinData?.latitude}
            longitude={CinData?.longitude}
            name={
              CinData?.companyName
                ? Service.toCapitalize(CinData?.companyName)
                : "Company Name"
            }
          />
        </AntModalComponents>
        <AntModalComponents
          title={
            <div className="mt-10 flex justify-between text-xl">
              {"GST"}
              <span className="pr-5 text-gray-700">
                {`NO. OF GST:`}{" "}
                <span className="text-black text-xl">{EmailTogst.length}</span>
              </span>
            </div>
          }
          width={500}
          ModalOpen={modal2Open}
          handleCancel={setModal2Open}
        >
          <TableComponents
            scrollx={400}
            columns={columns}
            dataSource={EmailTogst}
          />
        </AntModalComponents>
      </div>
      <div className="hidden py-2 space-y-6 min-h-screen">
        <div>
          {/* <h2 className="text-lg font-semibold text-gray-700 mb-2">Your activities today (5)</h2> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="md:col-span-4 lg:col-span-3 sm:col-span-2 col-span-1">
              <div className="grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4" >
                <Card extra="bg-[#E3F2FD] rounded-2xl p-4 shadow-sm">
                  <p className="text-lg font-bold text-gray-700">
                    {CinData?.cin}
                  </p>
                  <p className="font-semibold text-gray-800">
                    {CinData?.companyName
                      ? Service.toCapitalize(CinData?.companyName)
                      : "--"}
                  </p>
                  <div
                    className={` absolute top-1 right-1  ${CinData?.companyStatus == "Active" ||
                      CinData?.companyStatus == "active"
                      ? "text-green-800"
                      : "text-red-900"
                      }`}
                  >
                    <span className={`hidden text-sm `}>Active</span>
                    <span
                      className={`inline-block h-3 w-3 overflow-hidden rounded-full text-sm ${CinData?.companyStatus?.toLowerCase() == "active"
                        ? "bg-green-800"
                        : "bg-red-900"
                        }`}
                    ></span>
                  </div>
                </Card>
                <div className="bg-[#FCE4EC] rounded-2xl p-4 shadow-sm">
                  <p className="font-semibold text-gray-800">Analytics Tools</p>
                </div>
                <div className="bg-[#FCE4EC] rounded-2xl p-4 shadow-sm">
                  <p className="font-semibold text-gray-800">Analytics Tools</p>
                </div>
                <Card extra="bg-[#E3F2FD] rounded-2xl p-4 shadow-sm">
                  <p className="text-lg font-bold text-gray-700">
                    {CinData?.cin}
                  </p>
                  <p className="font-semibold text-gray-800">
                    {CinData?.companyName
                      ? Service.toCapitalize(CinData?.companyName)
                      : "--"}
                  </p>
                  <div
                    className={` absolute top-1 right-1  ${CinData?.companyStatus == "Active" ||
                      CinData?.companyStatus == "active"
                      ? "text-green-800"
                      : "text-red-900"
                      }`}
                  >
                    <span className={`hidden text-sm `}>Active</span>
                    <span
                      className={`inline-block h-3 w-3 overflow-hidden rounded-full text-sm ${CinData?.companyStatus?.toLowerCase() == "active"
                        ? "bg-green-800"
                        : "bg-red-900"
                        }`}
                    ></span>
                  </div>
                </Card>
                <div className="bg-[#FCE4EC] rounded-2xl p-4 shadow-sm">
                  <p className="font-semibold text-gray-800">Analytics Tools</p>
                </div>
                <div className="bg-[#FCE4EC] rounded-2xl p-4 shadow-sm">
                  <p className="font-semibold text-gray-800">Analytics Tools</p>
                </div>
                <Card extra="bg-[#E3F2FD] rounded-2xl p-4 shadow-sm">
                  <p className="text-lg font-bold text-gray-700">
                    {CinData?.cin}
                  </p>
                  <p className="font-semibold text-gray-800">
                    {CinData?.companyName
                      ? Service.toCapitalize(CinData?.companyName)
                      : "--"}
                  </p>
                  <div
                    className={` absolute top-1 right-1  ${CinData?.companyStatus == "Active" ||
                      CinData?.companyStatus == "active"
                      ? "text-green-800"
                      : "text-red-900"
                      }`}
                  >
                    <span className={`hidden text-sm `}>Active</span>
                    <span
                      className={`inline-block h-3 w-3 overflow-hidden rounded-full text-sm ${CinData?.companyStatus?.toLowerCase() == "active"
                        ? "bg-green-800"
                        : "bg-red-900"
                        }`}
                    ></span>
                  </div>
                </Card>
                <div className="bg-[#FCE4EC] rounded-2xl p-4 shadow-sm">
                  <p className="font-semibold text-gray-800">Analytics Tools</p>
                </div>
                <div className="bg-[#FCE4EC] rounded-2xl p-4 shadow-sm">
                  <p className="font-semibold text-gray-800">Analytics Tools</p>
                </div>
              </div>
            </div>
            <div className="md:col-span-4 lg:col-span-1 sm:col-span-2 col-span-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {/* <h2 className="text-lg font-semibold text-gray-700 mb-2 pl-5">Date Register</h2> */}
                <MiniCalendar />
                <MiniCalendar />
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Schedule */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Lesson schedule</h2>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="font-bold text-gray-800">July 2024</p>
            <div className="grid grid-cols-7 gap-2 mt-4 text-sm">
              {[...Array(31)].map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${i + 1 === 16 ? "bg-black text-white" : "hover:bg-gray-200 text-gray-700"
                    }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-xl font-bold text-gray-800">18</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-sm text-gray-500">Your Score</p>
            <p className="text-xl font-bold text-gray-800">72</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-sm text-gray-500">Active</p>
            <p className="text-xl font-bold text-gray-800">11</p>
          </div>
        </div>

        {/* Learning Progress */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">IT & Software</p>
              <p className="font-bold text-gray-800">Interface motion</p>
              <p className="text-sm text-gray-400">63/124 lessons</p>
            </div>
            <PlayCircleFilled className="text-blue-500 w-6 h-6" />
          </div>
          <div className="mt-3 h-2 w-full bg-gray-200 rounded-full">
            <div className="h-2 bg-yellow-400 rounded-full" style={{ width: "50%" }}></div>
          </div>
        </div>

        {/* Upcoming Lessons */}
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "Webinar: How to create a web hierarchy?",
            "Lesson: Client psychology and communication strategy",
            "Lesson: Colour gradients"
          ].map((title, idx) => (
            <div key={idx} className="bg-[#E3F2FD] p-4 rounded-xl flex items-center gap-3 shadow-sm">
              <LiaCalendarDaySolid className="text-blue-500 w-5 h-5" />
              <p className="text-sm text-gray-800 font-medium">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}