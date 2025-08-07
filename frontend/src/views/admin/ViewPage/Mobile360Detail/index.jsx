import BoxCard from "components/BoxCard";
import Card from "components/card";
import React from "react";
import UpiBoxCard from "components/BoxCard/UpiBoxCard";
import { useDispatch, useSelector } from "react-redux";
import { TBSelector } from "Store/Reducers/TBSlice";
import Service from "Service/Service";
import { Ewallet } from "Store/Reducers/TBSlice";
import ServiceApiName from "Service/ServiceApiName";

export default function Mobile360Detail() {
  const dispatch = useDispatch();
  const {
    isGstsearchFetching,
    MobileToMultipleUPIData,
    Mobile360Data,
    isPanSearchFetching,
    isBusinesspansearchFetching,
    isMsmeFetching,
  } = useSelector(TBSelector);
  const [Mobiledata, setMobiledata] = React.useState({});
  const [Bankinfo, setBankinfo] = React.useState({});
  const [WhatsappInfo, setWhatsappInfo] = React.useState({});
  const [MobileAgeinfo, setMobileAgeinfo] = React.useState({});
  const [Telcoinfo, setTelcoinfo] = React.useState({});
  const [GSTinfo, setGSTinfo] = React.useState([]);
  const [msmeinfo, setmsmeinfo] = React.useState([]);

  //
  React.useEffect(() => {
    setTelcoinfo({});
    setMobileAgeinfo({});
    setBankinfo({});
    setWhatsappInfo({});
    setGSTinfo([]);
    setmsmeinfo([]);
    setMobiledata({});
    if (Mobile360Data?.telco_info?.data) {
      setTelcoinfo(Mobile360Data?.telco_info?.data);
    }
    if (Mobile360Data?.mobile_age_info?.data) {
      setMobileAgeinfo(Mobile360Data?.mobile_age_info?.data);
    }
    if (Mobile360Data?.digital_payment_id_info?.data) {
      setBankinfo(Mobile360Data?.digital_payment_id_info?.data);
    }
    if (Mobile360Data?.whatsapp_info?.data) {
      setWhatsappInfo(Mobile360Data?.whatsapp_info?.data);
    }
    if (
      Mobile360Data?.gst_list?.data &&
      Mobile360Data?.gst_list?.data.length > 0
    ) {
      setGSTinfo(Mobile360Data?.gst_list?.data);
    }
    if (
      Mobile360Data?.msme_info?.data &&
      Mobile360Data?.msme_info?.data.length > 0
    ) {
      setmsmeinfo(Mobile360Data?.msme_info?.data);
    }
    setMobiledata(Mobile360Data);
  }, [Mobile360Data]);

  const GstCall = (gst) => {
    if (!isGstsearchFetching) {
      Service.walletBalanceFunction(
        ServiceApiName.Gstsearch,
        dispatch,
        Ewallet,
        gst
      );
      // dispatch(Gstsearch({ "gstin": gst }));
    }
  };
  const PanCarddata = (search) => {
    if (!isPanSearchFetching || !isBusinesspansearchFetching) {
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

  const msmeApiCall = (msme) => {
    if (!isMsmeFetching) {
      Service.walletBalanceFunction(
        ServiceApiName.Msmesearch,
        dispatch,
        Ewallet,
        msme
      );
      // dispatch(Msme({ "searchNumber": msme }));
    }
  };

  return (
    <div className="mb-2 mt-5 grid grid-cols-1 gap-x-6 gap-y-6 px-0  xl:grid-cols-3">
      <Card extra={"w-full h-full p-3"}>
        <div className="">
          <div className="mb-5 mt-2 rounded-md bg-[#344cb7] py-2 text-center md:text-left">
            <h4 className="px-2 text-2xl font-bold text-white">Telecominfo</h4>
          </div>
        </div>
        <div className="">
          <div className="grid grid-rows-1 gap-2">
            <BoxCard
              no={1}
              name={"Full Name"}
              description={Bankinfo?.name}
            ></BoxCard>
            <BoxCard
              no={2}
              name={"Mobile"}
              description={Telcoinfo?.msisdn?.msisdn}
            ></BoxCard>
            <BoxCard
              no={3}
              name={"Address"}
              description={
                Mobile360Data?.lpg_info?.data[0]?.address ||
                Mobile360Data?.userAddress
              }
            ></BoxCard>
            <BoxCard
              no={3}
              name={"Connection Type"}
              description={Telcoinfo.connection_type}
            ></BoxCard>
            <BoxCard
              no={3}
              name={"Mobile Age"}
              description={MobileAgeinfo?.mobile_age}
            ></BoxCard>
            <BoxCard
              no={3}
              name={"Network Name"}
              description={MobileAgeinfo?.ported_telecom}
            ></BoxCard>
            <BoxCard
              no={3}
              name={"Network Region"}
              description={MobileAgeinfo.ported_region}
            ></BoxCard>
            <BoxCard
              no={3}
              name={"Roaming"}
              description={Telcoinfo.is_roaming ? "Yes" : "No"}
            ></BoxCard>
            <BoxCard
              no={3}
              name={"Current Network Name"}
              description={Telcoinfo.current_service_provider?.network_name}
            ></BoxCard>
            <BoxCard
              no={3}
              name={"Original Network Name"}
              description={Telcoinfo.original_service_provider?.network_name}
            ></BoxCard>
            <BoxCard
              no={3}
              name={"Current Network region"}
              description={
                Telcoinfo.current_service_provider?.network_region +
                ", " +
                Telcoinfo.current_service_provider?.country_name
              }
            ></BoxCard>
            <BoxCard
              no={3}
              name={"Original Network region"}
              description={
                Telcoinfo.original_service_provider?.network_region +
                ", " +
                Telcoinfo.original_service_provider?.country_name
              }
            ></BoxCard>
          </div>
        </div>
      </Card>
      <div className="mb-2 grid grid-cols-1  gap-y-6  px-0">
        <Card extra={"w-full h-full p-3"}>
          <div className="">
            <div className="mb-1 mt-2 rounded-md bg-[#344cb7] py-2 text-center md:text-left">
              <h4 className="px-2 text-2xl font-bold text-white">
                Financial Details{" "}
                {Mobile360Data?.digital_payment_id_info?.code.includes("NRF") &&
                  "NRF"}
              </h4>
            </div>
          </div>
          <div className="">
            <div className="">
              <div className="mb-1 mt-2 rounded-md bg-gray-700 py-2 text-center md:text-left">
                <h4 className="px-2 text-xl font-bold text-white">
                  UPI Details{" "}
                  {Mobile360Data?.digital_payment_id_info?.code.includes(
                    "NRF"
                  ) && "NRF"}
                </h4>
              </div>
            </div>
            <div className="grid grid-rows-1 gap-2">
              {MobileToMultipleUPIData?.upi?.map((item, index) => {
                return (
                  <UpiBoxCard
                    key={item}
                    no={index + 1}
                    name={item}
                    info={
                      Service.PrasonAndBusinessUPICheck(item)
                        ? "Approved"
                        : "Disable"
                    }
                  ></UpiBoxCard>
                );
              })}
              <div className="">
                <div className="mb-1 mt-2 rounded-md bg-gray-700 py-2 text-center md:text-left">
                  <h4 className="px-2 text-xl font-bold text-white">
                    Primary Bank Details{" "}
                    {Mobile360Data?.digital_payment_id_info?.code.includes(
                      "NRF"
                    ) && "NRF"}
                  </h4>
                </div>
              </div>
              <BoxCard
                no={4}
                name={"Bank"}
                description={Bankinfo?.bank || "NRF"}
              ></BoxCard>
              <BoxCard
                no={5}
                name={"Branch"}
                description={Bankinfo?.branch || "NRF"}
              ></BoxCard>
              <BoxCard
                no={6}
                name={"Address"}
                description={Bankinfo?.address || "NRF"}
              ></BoxCard>
              <BoxCard
                no={6}
                name={"Contact"}
                description={Bankinfo?.contact ? "Yes" : "No"}
              ></BoxCard>
            </div>
          </div>
        </Card>
        <Card extra={"w-full h-full p-3"}>
          <div className="">
            <div className="mb-5 mt-2 rounded-md bg-[#344cb7] py-2 text-center md:text-left">
              <h4 className="px-2 text-2xl font-bold text-white">PAN Card</h4>
            </div>
          </div>
          <div className="">
            <div className="grid grid-rows-1 gap-2">
              {GSTinfo.map((item, index) => {
                return (
                  <BoxCard
                    key={`${item?.slice(2, 12)} ${index}`}
                    no={index + 1}
                    name={`${Service.PanType(item?.slice(2, 12))} Pan`}
                    getValue={PanCarddata}
                    description={item?.slice(2, 12)}
                  ></BoxCard>
                );
              })}
              {Mobiledata?.director_pan_info?.data.map((item, index) => {
                return (
                  <BoxCard
                    key={item}
                    no={index + 1}
                    getValue={PanCarddata}
                    name={`Director Pan Info`}
                    description={item}
                  ></BoxCard>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
      <div className="mb-2 grid grid-cols-1  gap-y-6  px-0">
        <Card extra={"w-full h-full p-3"}>
          <div className="">
            <div className="mb-5 mt-2 rounded-md bg-[#344cb7] py-2 text-center md:text-left">
              <h4 className="px-2 text-2xl font-bold text-white">
                Corporate Information
              </h4>
            </div>
          </div>
          <div className="">
            <div className="grid grid-rows-1 gap-2">
              {GSTinfo.map((item, index) => {
                return (
                  <BoxCard
                    key={index}
                    no={index + 1}
                    name={`GST`}
                    getValue={GstCall}
                    description={item}
                  ></BoxCard>
                );
              })}

              {Mobiledata?.epfo_info?.data.map((item, index) => {
                return (
                  <BoxCard
                    key={index}
                    no={index + 1}
                    name={`EPFO Info`}
                    description={item}
                  ></BoxCard>
                );
              })}
              {msmeinfo?.map((item, index) => {
                return (
                  <BoxCard
                    key={index}
                    name={`MSME`}
                    getValue={msmeApiCall}
                    description={item?.udyam_number}
                  ></BoxCard>
                );
              })}
            </div>
          </div>
        </Card>
        <Card extra={"w-full h-full p-3"}>
          <div className="">
            <div className="mb-5 mt-2 rounded-md bg-[#344cb7] py-2 text-center md:text-left">
              <h4 className="px-2 text-2xl font-bold text-white">Utility</h4>
            </div>
          </div>
          <div className="">
            <div className="">
              {Mobile360Data?.lpg_info?.data.map((item, index) => {
                return (
                  <div
                    className="grid grid-rows-1 gap-2"
                    key={item?.gas_provider}
                  >
                    <BoxCard
                      no={index + 1}
                      name={`Gas Provider`}
                      description={item?.gas_provider}
                    ></BoxCard>
                    <BoxCard
                      no={index + 2}
                      name={`Name`}
                      description={item?.name}
                    ></BoxCard>
                    <BoxCard
                      no={index + 3}
                      name={`Consumer Mobile`}
                      description={item?.consumer_details?.consumer_mobile}
                    ></BoxCard>
                    <BoxCard
                      no={index + 4}
                      name={`Consumer ID`}
                      description={item?.consumer_details?.consumer_id}
                    ></BoxCard>
                    <BoxCard
                      no={index + 5}
                      name={`Consumer Status`}
                      description={item?.consumer_details?.consumer_status}
                    ></BoxCard>
                    <BoxCard
                      no={index + 6}
                      name={`Consumer Type`}
                      description={item?.consumer_details?.consumer_type}
                    ></BoxCard>
                    <BoxCard
                      no={index + 7}
                      name={`Address`}
                      description={item?.address}
                    ></BoxCard>
                    <BoxCard
                      no={index + 7}
                      name={`Distributor Name`}
                      description={item?.distributor_details?.distributor_name}
                    ></BoxCard>
                    <BoxCard
                      no={index + 7}
                      name={`Distributor Contact`}
                      description={
                        item?.distributor_details?.distributor_contact
                      }
                    ></BoxCard>
                    <BoxCard
                      no={index + 7}
                      name={`Distributor Address`}
                      description={
                        item?.distributor_details?.distributor_address
                      }
                    ></BoxCard>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
