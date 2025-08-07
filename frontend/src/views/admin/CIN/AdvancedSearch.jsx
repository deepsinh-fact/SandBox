import React from "react";
import Card from "../../../components/card";
import { useForm } from "react-hook-form";
import { useNotificationContext } from "../../../createContextStore/NotificationContext";
import { useDispatch, useSelector } from "react-redux";
import { TBSelector } from "../../../Store/Reducers/TBSlice";
import InputField from "../../../components/fields/InputField";
import SelectFild from "../../../components/fields/SelectFild";
import { DatePicker } from "antd";
import moment from "moment";
import { CinGetIndustryList } from "../../../Store/Reducers/TBSlice";
import { CinGetSegmentList } from "../../../Store/Reducers/TBSlice";
import { SearchCINByAdvanceSearch } from "../../../Store/Reducers/TBSlice";
import { GetPincodeLatLong } from "../../../Store/Reducers/TBSlice";
import { updateState } from "../../../Store/Reducers/TBSlice";
import Infodata from "../../../data/Infodata";
const dateFormat = "YYYY/MM/DD";

const { RangePicker } = DatePicker;

const AdvancedSearch = () => {
  const { openNotification } = useNotificationContext();
  const {
    CinGetIndustryListData,
    CinGetSegmentListData,
    isSearchCINByAdvanceSearchFetching,
    isSearchCINByAdvanceSearch,
    location,
    GetPincodeLatLongData,
    isGetPincodeLatLong,
    isGetPincodeLatLongFetching,
  } = useSelector(TBSelector);
  const [dateRange, setDateRange] = React.useState(null);
  const [industry, setIndustry] = React.useState("");
  const { register, handleSubmit, setValue, errors, reset } = useForm();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(CinGetSegmentList({ industryName: industry }));
  }, [industry]);

  const onSubmit = (data) => {
    if (
      data.location ||
      data.companyname ||
      data.companystatus ||
      data.listingstatus ||
      data.classification ||
      industry ||
      data.Category ||
      dateRange?.[0]?.format("YYYY-MM-DD") ||
      dateRange?.[1]?.format("YYYY-MM-DD")
    ) {
      if (data.location || data.companyname) {
        if (data.companyname && data.companyname.length < 3) {
          openNotification(
            "info",
            "Please enter company name",
            "Company name must be at least 3 characters long",
            true,
            true
          );
        } else {
          if (data.location && data.location.length < 3) {
            openNotification(
              "info",
              "Please enter company name",
              "Location name must be at least 3 characters long",
              true,
              true
            );
          } else {
            dispatch(
              SearchCINByAdvanceSearch({
                location: data.location || "",
                companyName: data.companyname || "",
                fromIncDate: dateRange?.[0]?.format("YYYY-MM-DD") || "",
                toIncDate: dateRange?.[1]?.format("YYYY-MM-DD") || "",
                companyStatus: data.companystatus || "",
                listingStatus: data.listingstatus || "",
                classification: data.classification || "",
                industry: industry || "",
                segment: data.Category || "",
                authorizedCapital: Number(data.authorizedcapital) || 0,
                paidupCapital: Number(data.paidupcapital) || 0,
              })
            );
          }
        }
      } else {
        openNotification(
          "info",
          "Please",
          "Please enter company name OR location",
          true,
          true
        );
      }
    } else {
      openNotification(
        "info",
        "Please",
        "Please enter company name OR location",
        true,
        true
      );
    }
  };

  React.useEffect(() => {
    dispatch(CinGetIndustryList());
  }, []);
  //React
  React.useEffect(() => {
    if (isSearchCINByAdvanceSearch) {
      reset();
      setDateRange(null);
    }
  }, [isSearchCINByAdvanceSearch]);

  //Lat And Long
  const PinCode = () => {
    if (!location.latitude && !location.longitude) {
      openNotification(
        "error",
        "Error",
        "Please Allow Location Access",
        true,
        true
      );
      return;
    } else {
      dispatch(
        GetPincodeLatLong({
          latitude: `${location.latitude}`,
          longitude: `${location.longitude}`,
        })
      );
    }
  };
  React.useEffect(() => {
    if (isGetPincodeLatLong) {
      dispatch(updateState({ isGetPincodeLatLong: false }));
      setValue(
        "location",
        GetPincodeLatLongData[GetPincodeLatLongData.length - 1].long_name
      );
    }
  }, [isGetPincodeLatLong]);
  return (
    <div className="mt-1 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
      {/* <Menuslider name={"CINSECTOR"} color={Infodata.color.cin} /> */}
      <Card extra={"w-full h-full pt-4 pb-7 sm:overflow-auto px-6"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5 h-full  gap-x-3 md:grid md:grid-cols-2">
            <InputField
              variant="auth"
              extra="mb-0"
              label="Company Name"
              placeholder="eg, Company Name"
              type="text"
              maxLength={50}
              {...register("companyname")}
            />
            <InputField
              variant="auth"
              extra="mb-0"
              label="Location"
              placeholder="eg, City, State, Pincode , Address"
              type="text"
              maxLength={50}
              onClickIcon={PinCode}
              {...register("location")}
            />
            <SelectFild
              variant="auth"
              extra="mb-0"
              label="Company Status"
              placeholder="Company Status"
              type="text"
              maxLength={50}
              options={Infodata.CompanyStatus}
              {...register("companystatus")}
            />
            <div className="mb-0 items-center justify-center">
              <label
                className={`ml-1.5 text-sm font-medium text-navy-700 dark:text-white`}
              >
                Incorporation Date
              </label>
              <RangePicker
                onClick={() => setDateRange(null)}
                onChange={(dates) => setDateRange(dates)}
                className="mt-2 w-full p-3"
                format={dateFormat}
                value={dateRange}
                disabledDate={(current) => {
                  if (dateRange && dateRange[0]) {
                    return current && current > dateRange[0].startOf("day");
                  }
                  return current && current > moment().startOf("day");
                }}
              />
            </div>
            <SelectFild
              variant="auth"
              extra="mb-0"
              label="Listing Status"
              placeholder="Listing Status"
              type="text"
              maxLength={50}
              options={Infodata.ListingStatus}
              {...register("listingstatus")}
            />
            <SelectFild
              variant="auth"
              extra="mb-0"
              label="Classi Fication"
              placeholder="Classi Fication"
              type="text"
              maxLength={50}
              options={Infodata.Classification}
              {...register("classification")}
            />
            <SelectFild
              variant="auth"
              extra="mb-0"
              label="Authorized Capital"
              placeholder="Authorized Capital"
              type="text"
              maxLength={50}
              defaultValue={0}
              options={Infodata.AuthorizedCapital}
              {...register("authorizedcapital")}
            />
            <SelectFild
              variant="auth"
              extra="mb-0"
              label="Paid Up Capital"
              placeholder="Paid Up Capital"
              type="text"
              maxLength={50}
              defaultValue={0}
              options={Infodata.PaidUpCapital}
              {...register("paidupcapital")}
            />

            <div className={``}>
              <label
                className={`ml-1.5 text-sm font-medium text-navy-700 dark:text-white`}
              >
                Nature of Industry
              </label>
              <div className="relative mt-2">
                <select
                  className={`flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none `}
                  placeholder={"Industry"}
                  onChange={(e) => setIndustry(e.target.value)}
                // {...register("industry")}
                >
                  <option defaultValue value={""}>
                    All
                  </option>
                  {CinGetIndustryListData?.map((option, index) => (
                    <option key={index} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <SelectFild
              variant="auth"
              extra="mb-0"
              label="Nature of Business"
              placeholder="Segment"
              type="text"
              maxLength={50}
              options={CinGetSegmentListData?.map((item) => {
                return { name: item?.name, value: item?.value };
              })}
              {...register("Category")}
            />
            <div className="col-span-2 mb-5 mt-5 ">
              <button
                disabled={isSearchCINByAdvanceSearchFetching}
                className="linear mt-2 w-full rounded-xl bg-cin py-[12px] text-base font-medium text-white transition duration-200 hover:bg-cin active:bg-cin dark:bg-cin dark:text-white dark:hover:bg-cin dark:active:bg-cin"
              >
                {isSearchCINByAdvanceSearchFetching && (
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
                )}
                {isSearchCINByAdvanceSearchFetching ? "Searching..." : "Search"}
              </button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default AdvancedSearch;
