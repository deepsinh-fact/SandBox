import React from "react";
import BoxCard from "components/BoxCard";
import Card from "components/card";
import { EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Service from "Service/Service";
import { AntModalComponents } from "components/ant";
import GoogleMaps from "components/GoogleMaps";
import {
  updateState,
  Cin,
  PanSearch,
  Ewallet,
  TBSelector,
  GetGSTCINDetailByEmail,
} from "Store/Reducers/TBSlice";
import TableComponents from "components/ant/TableComponents";
import RefreshBtn from "components/RefreshBtn";
import SpinAnimate from "components/RefreshBtn/SpinAnimate";
import ServiceApiName from "Service/ServiceApiName";
import GSTFillingYear from "./GSTFillingYear";
import { Button } from "antd";
import { Businesspansearch } from "Store/Reducers/TBSlice";
import PdfDownload from "components/PdfDownload";

export default function GstDetail() {
  const {
    isGetGSTCINDetailByEmail,
    GstsearchData,
    isPanSearchFetching,
    isBusinesspansearchFetching,
    isloading,
    GetGSTCINDetailByEmailData,
    isGstsearchRefreshDetailsFetching,
    isEwallet,
  } = useSelector(TBSelector);
  const [modal1Open, setModal1Open] = React.useState(false);
  const [modal2Open, setModal2Open] = React.useState(false);
  const [EmailTogst, setEmailTogst] = React.useState([]);
  const dispatch = useDispatch();
  let productsName = ServiceApiName.GstRefresh;

  //Email
  const getValue = (description) => {
    dispatch(GetGSTCINDetailByEmail({ emailId: description }));
  };
  React.useEffect(() => {
    if (isGetGSTCINDetailByEmail) {
      setModal2Open(true);
      dispatch(updateState({ isGetGSTCINDetailByEmail: false }));
      const data = GetGSTCINDetailByEmailData?.data?.cinDetail.map(
        (item, _) => {
          return {
            key: item,
            no: _ + 1,
            cin: item,
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
      dataIndex: "no",
      key: "no",
    },
    {
      title: "CIN",
      dataIndex: "cin",
      key: "cin",
    },
    {
      title: "View",
      key: "view",
      render: (_, record) => (
        <Button
          disabled={isloading}
          type="link"
          icon={<EyeOutlined />}
          onClick={() =>
            Service.walletBalanceFunction(
              ServiceApiName.Cinsearch,
              dispatch,
              Ewallet,
              _.cin
            )
          }
        >
          View
        </Button>
      ),
    },
  ];

  const getValuePan = (search) => {
    if (!isPanSearchFetching || !isBusinesspansearchFetching || !isloading) {
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
    }
  };
  const getValueMobile = (search) => {
    if (!isloading) {
      Service.walletBalanceFunction(
        ServiceApiName.Mobile360search,
        dispatch,
        Ewallet,
        search
      );
    }
  };
  const handleRefresh = () => {
    const search = GstsearchData?.gstin;
    if (search) {
      if (!isloading) {
        Service.walletBalanceFunction(productsName, dispatch, Ewallet, search);
      }
    }
  };
  return (
    <div className="mt-3 grid grid-cols-1 gap-5">
      <Card extra={"w-full h-full p-3"}>
        <div className="flex flex-wrap justify-center gap-x-2 md:flex-nowrap md:justify-between">
          <div className="mb-8 mt-2 text-center md:text-left">
            <h4 className="px-2 text-2xl font-bold text-navy-700 dark:text-white">
              {GstsearchData?.legal_name
                ? Service.toCapitalize(GstsearchData?.legal_name)
                : "--"}
            </h4>
            <p className="px-3 text-base text-gray-600">
              {GstsearchData?.gstin}
            </p>
          </div>

          <div className="mb-2 w-full md:mb-0 md:w-auto">
            <div className="flex justify-end">
              {/* <RefreshBtn handleRefresh={handleRefresh}>
                <SpinAnimate
                  loading={isGstsearchRefreshDetailsFetching || isEwallet}
                ></SpinAnimate>{" "}
                Refresh
              </RefreshBtn> */}
              <div className="flex justify-end">
                <PdfDownload apiName={ServiceApiName.Gstsearch} NameOfCompany={GstsearchData?.legal_name} title={GstsearchData?.gstin} />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-2 grid grid-cols-1 gap-2 px-2 xl:grid-cols-2">
          <div className="grid grid-rows-1 gap-2">
            <BoxCard
              no={1}
              name={"Trade Name"}
              description={
                GstsearchData?.trade_name
                  ? Service.toCapitalize(GstsearchData?.trade_name)
                  : ""
              }
            ></BoxCard>
            <BoxCard
              no={2}
              name={"Email Id"}
              maskEmail={true}
              description={GstsearchData?.emailId}
            ></BoxCard>
            <BoxCard
              no={2}
              name={"Mobile Number"}
              maskNum={true}
              description={GstsearchData?.mobileNumber}
            ></BoxCard>
            <BoxCard
              no={3}
              name={"Pan Number"}
              getValue={getValuePan}
              description={GstsearchData?.gstin?.slice(2, 12)}
            ></BoxCard>
            <BoxCard
              no={3}
              name={"Entity Name"}
              description={Service.toCapitalize(GstsearchData?.legal_name)}
            ></BoxCard>
            <BoxCard
              no={4}
              name={"Business Constitution"}
              description={GstsearchData?.business_constitution}
            ></BoxCard>
            <BoxCard
              no={4}
              name={"Status"}
              description={GstsearchData?.current_registration_status}
            ></BoxCard>
            <BoxCard
              no={5}
              name={"Effective Date of registration"}
              description={Service.dateFormating(GstsearchData?.register_date)}
            ></BoxCard>
            <BoxCard
              no={6}
              name={"Nature Of Business"}
              description={GstsearchData?.business_nature?.[0]}
            ></BoxCard>
            <BoxCard
              no={7}
              name={"Address"}
              map={setModal1Open}
              description={
                GstsearchData?.primary_business_address?.registered_address
              }
            ></BoxCard>
            <BoxCard
              no={8}
              name={"Aggregate Turn Over Slabs"}
              description={GstsearchData?.aggregate_turn_over}
            ></BoxCard>
            <BoxCard
              no={8}
              name={"Aggregate Turn Over FY"}
              description={GstsearchData?.turnoverFinancialYear}
            ></BoxCard>
            <BoxCard
              no={9}
              name={"Gross Total Income"}
              description={GstsearchData?.gross_total_income}
            ></BoxCard>
            <BoxCard
              no={9}
              name={"Gross Total Income FY"}
              description={GstsearchData?.gross_total_income_financial_year}
            ></BoxCard>
            <BoxCard
              no={9}
              name={"Tax Payer Type"}
              description={GstsearchData?.tax_payer_type}
            ></BoxCard>
            <BoxCard
              no={9}
              name={"Cancellation Date"}
              description={GstsearchData?.register_cancellation_date}
            ></BoxCard>
            <BoxCard
              no={9}
              name={"Financial Year"}
              description={GstsearchData?.gross_total_income_financial_year}
            ></BoxCard>
            <BoxCard
              no={9}
              name={"Total Income"}
              description={GstsearchData?.gross_total_income}
            ></BoxCard>
            <BoxCard
              no={9}
              name={"State Jurisdiction"}
              description={GstsearchData?.central_jurisdiction}
            ></BoxCard>
          </div>
          <div className="">
            <div className="top-5 mb-2 mt-6 text-center  md:text-left xl:absolute">
              <h4 className="px-2 text-2xl font-bold text-navy-700 dark:text-white">
                GST Filling Year
              </h4>
            </div>
            <Card extraextra="rounded-[20px]">
              <div className="p-2">
                <GSTFillingYear GSTfiling={GstsearchData?.filing_status?.[0]} />
              </div>
            </Card>
          </div>
        </div>
      </Card>
      <AntModalComponents
        title={
          GstsearchData?.trade_name
            ? `Map Of ${Service.toCapitalize(GstsearchData?.trade_name)}`
            : "Map"
        }
        width={900}
        ModalOpen={modal1Open}
        handleCancel={setModal1Open}
      >
        <GoogleMaps
          latitude={GstsearchData?.latitude}
          longitude={GstsearchData?.longitude}
          name={
            GstsearchData?.trade_name
              ? Service.toCapitalize(GstsearchData?.trade_name)
              : "Company Name"
          }
        />
      </AntModalComponents>
      <AntModalComponents
        title={
          <div className="mt-10 flex justify-between text-xl">
            {"CIN"}
            <span className="pr-5 text-gray-700">
              {`NO. OF CIN:`}{" "}
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
  );
}
