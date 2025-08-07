import React from "react";
import Card from "components/card";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import SearchButton from "components/button/SearchButton";
import { useDispatch, useSelector } from "react-redux";
import { TBSelector } from "Store/Reducers/TBSlice";
import { Ewallet } from "Store/Reducers/TBSlice";
import Service from "Service/Service";
import ServiceApiName from "Service/ServiceApiName";
import ServiceRegExr from "Service/RegExr";
import { useNotificationContext } from "createContextStore/NotificationContext";
import { GetFactAppInfoByUserName } from "Store/Reducers/TBSlice";
import TableComponents from "components/ant/TableComponents";
import moment from "moment";
import { EyeOutlined } from "@ant-design/icons";
import { GetFactAppInfoByPhone } from "Store/Reducers/TBSlice";
import { GetFactAppInfoMoreByPhone } from "Store/Reducers/TBSlice";
import { GetFactAppInfoByEmail } from "Store/Reducers/TBSlice";
import { GetFactAppInfoMoreByEmail } from "Store/Reducers/TBSlice";
import { Tooltip } from "antd";
import SpinAnimate from "components/RefreshBtn/SpinAnimate";
import RefreshBtn from "components/RefreshBtn";
import CountdownTimer from "components/CountdownTimer.jsx";


const OsintSearch = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [value, setValue] = React.useState();
  const [searchtype, setsearchtype] = React.useState("number");
  const dispatch = useDispatch();
  const {
    isloading,
    isMe,
    GetFactAppInfoByUserNameData,
    isGetFactAppInfoByUserNameFetching,
  } = useSelector(TBSelector);
  const { openNotification } = useNotificationContext();

  const onSubmit = (data) => {
    if (searchtype === "number") {
      if (value) {
        if (isValidPhoneNumber(value)) {
          const number = data.phone;
          const numberWithoutSpaces = number.replace(/\s+/g, "");
          Service.walletBalanceFunction(
            ServiceApiName.InfoByPhonesearch,
            dispatch,
            Ewallet,
            value
          );
        } else {
          openNotification("error", "Error", "Invalid phone number", true, true);
        }
      }
    } else if (searchtype === "numberalldetails") {
      if (value) {
        if (isValidPhoneNumber(value)) {
          const number = data.phone;
          const numberWithoutSpaces = number.replace(/\s+/g, "");
          Service.walletBalanceFunction(
            ServiceApiName.InfoMoreByPhonesearch,
            dispatch,
            Ewallet,
            value
          );
        } else {
          openNotification("error", "Error", "Invalid phone number", true, true);
        }
      }
    } else if (searchtype === "email") {
      if (ServiceRegExr.emailRegExr.test(data.email)) {
        const email = data.email;
        const emailWithoutSpaces = email.replace(/\s+/g, "");
        Service.walletBalanceFunction(
          ServiceApiName.InfoByEmailsearch,
          dispatch,
          Ewallet,
          emailWithoutSpaces
        );
      } else {
        openNotification("error", "Error", "Invalid email", true, true);
      }
    } else if (searchtype === "emailalldetails") {
      if (ServiceRegExr.emailRegExr.test(data.email)) {
        const email = data.email;
        const emailWithoutSpaces = email.replace(/\s+/g, "");
        Service.walletBalanceFunction(
          ServiceApiName.InfoMoreByEmailsearch,
          dispatch,
          Ewallet,
          emailWithoutSpaces
        );
      } else {
        openNotification("error", "Error", "Invalid email", true, true);
      }
    } else {
      openNotification("error", "Error", "Invalid search type", true, true);
    }
  };

  React.useEffect(() => {
    if (isMe?.email) {
      dispatch(GetFactAppInfoByUserName({ userName: isMe?.email }));
    }
  }, [isMe]);

  const columns = [
    {
      title: "ID",
      dataIndex: "autoId",
    },
    {
      title: <span>Search Detail</span>,
      dataIndex: "inputParameter",
    },
    {
      title: "Date",
      dataIndex: "createdDate",
    },
    {
      title: "Info By",
      dataIndex: "dataType",
    },
    {
      title: "Request Min",
      dataIndex: "requestMin",
    },
    {
      title: "View",
      dataIndex: "view",
    },
  ];
  const AllFourApiCall = (apiName, number) => {
    if (apiName == "1") {
      dispatch(GetFactAppInfoByPhone({ phoneNumber: number }));
    } else if (apiName == "2") {
      dispatch(GetFactAppInfoMoreByPhone({ phoneNumber: number }));
    } else if (apiName == "3") {
      dispatch(GetFactAppInfoByEmail({ email: number }));
    } else if (apiName == "4") {
      dispatch(GetFactAppInfoMoreByEmail({ email: number }));
    }
  };

  const dataSource1 = GetFactAppInfoByUserNameData?.map((_, i) => ({
    key: _.autoId,
    autoId: _.autoId,
    createdDate: moment(_.createdDate).format("LL"),
    // dataType: _.dataType,
    dataType:
      _.dataType === 1
        ? _.inputParameter.includes("@")
          ? "Email To Social Media"
          : "Phone To Social Media"
        : _.inputParameter.includes("@")
          ? "Email To All"
          : "Phone To All",
    inputParameter: _.inputParameter,
    requestId: _.requestId,
    // requestMin: _.requestMin,
    requestMin: <CountdownTimer minite={7} startDate={_?.createdDate} isGenerated={0} />,
    view: (
      <Tooltip
        title={
          Number(_.requestMin) <= 7
            ? `Data Call will happen after ${7 - Number(_.requestMin)} minutes`
            : _.dataType === 1
              ? _.inputParameter.includes("@")
                ? "Email To Social Media"
                : "Phone To Social Media"
              : _.inputParameter.includes("@")
                ? "Email To All"
                : "Phone To All"
        }
        // color="#22c55e"
        placement="bottom"
      >
        <button
          className={`${isloading || Number(_.requestMin) <= 7
            ? ""
            : "cursor-pointer text-blue-700"
            } flex items-center gap-2`}
          disabled={isloading || (Number(_.requestMin) <= 7 ? true : false)}
          onClick={() =>
            AllFourApiCall(
              _.dataType === 1
                ? _.inputParameter.includes("@")
                  ? "3"
                  : "1"
                : _.inputParameter.includes("@")
                  ? "4"
                  : "2",
              _.inputParameter
            )
          }
        >
          <EyeOutlined className={`mx-auto text-xl`} /> View
        </button>
      </Tooltip>
    ),

    // mapView: (
    //   <TfiMapAlt
    //     onClick={() => [
    //       setMapView({
    //         companyName: _.companyName,
    //         latitude: _.latitude,
    //         longitude: _.longitude,
    //       }),
    //       setModal1Open(true),
    //     ]}
    //     className="mx-auto w-6 cursor-pointer text-xl text-navy-500"
    //   />
    // ),
  }));


  return (
    <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
      <Card extra={"w-full h-full pt-4 pb-7 sm:overflow-auto px-6"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-row flex-wrap items-start justify-center gap-x-1 gap-y-3 space-y-4 md:flex-nowrap md:justify-between"
        >
          <div className="mb-0 flex w-full items-center justify-center md:w-auto">
            <select
              value={searchtype}
              onChange={(e) => setsearchtype(e.target.value)}
              className="justify mr-2 flex w-full items-center
                             justify-center rounded-lg bg-lightPrimary px-3 py-4 text-sm font-bold text-gray-400 outline-none hover:cursor-pointer dark:bg-navy-900 md:w-auto"
            >
              <option value="number">Number To Social Media</option>
              <option value="numberalldetails">Number To All Details</option>
              <option value="email">Email To Social Media</option>
              <option value="emailalldetails">Email To All Details</option>
            </select>
          </div>
          {(searchtype === "numberalldetails" || searchtype === "number") && (
            <div className="!mt-0 w-full">
              <PhoneInput
                placeholder="Enter phone number"
                value={value}
                disabled={isloading}
                initialValueFormat="national"
                {...register("phone", {
                  // required: 'Phone number is required',
                  // validate: (value) => isValidPhoneNumber(value) || 'Invalid phone number',
                })}
                onChange={(value) => setValue(value)} // Updates the form state
                className="custom-phone-input  !mt-0 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          )}
          {(searchtype === "emailalldetails" || searchtype === "email") && (
            <div className="!mt-0 w-full">
              <input
                disabled={isloading}
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  required: "Email is required",
                })}
                className="bg-transparent !mt-0 w-full rounded-md border border-gray-300 px-2 py-3 focus:outline-none"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          )}
          <SearchButton disabled={isloading} type="submit">
            Submit
          </SearchButton>
        </form>
      </Card>

      <Card extra={"w-full h-full pt-4 pb-7 sm:overflow-auto px-6"}>
        <div className="flex justify-end py-3">
          <RefreshBtn
            handleRefresh={() =>
              isMe?.email &&
              dispatch(GetFactAppInfoByUserName({ userName: isMe?.email }))
            }
          >
            <div className="flex items-end justify-center">
              <SpinAnimate
                loading={isGetFactAppInfoByUserNameFetching}
              ></SpinAnimate>{" "}
            </div>
          </RefreshBtn>
        </div>
        <div className="flex h-full flex-col justify-center">
          <TableComponents
            scrollx={1200}
            columns={columns}
            dataSource={dataSource1}
            pagination={false}
          />
        </div>
      </Card>
      {/* {value && (
                <div className="text-sm mt-3">
                    Is possible: {isPossiblePhoneNumber(value) ? 'true' : 'false'}
                </div>
            )}
            {value && (
                <div className="text-sm">
                    Is valid: {isValidPhoneNumber(value) ? 'true' : 'false'}
                </div>
            )}
            {value && (
                <div className="text-sm">
                    National: {formatPhoneNumber(value)}
                </div>
            )}
            {value && (
                <div className="text-sm">
                    International: {formatPhoneNumberIntl(value)}
                </div>
            )} */}
    </div>
  );
};

export default OsintSearch;
