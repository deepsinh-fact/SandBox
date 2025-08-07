import { Skeleton } from "antd";
import Card from "components/card";
import React from "react";
import { useSelector } from "react-redux";
import { TBSelector } from "Store/Reducers/TBSlice";
import CompanyDetailGstTable from "./CompanyDetailGstTable";
const CompanyDetailGst = () => {
  const {
    isSearchGSTByAdvanceSearchFetching,
    SearchGSTByAdvanceSearchData,
    SearchGSTByAdvanceSearchTotalData,
    SearchGSTByAdvanceSearchUserdata,
    isloading,
  } = useSelector(TBSelector);
  return (
    <div className="mb-2 grid grid-cols-1 gap-x-4 gap-y-5 px-0 py-3  xl:grid-cols-1">
      <Card extra={"w-full h-full p-3"}>
        <div className="flex flex-wrap justify-center gap-x-2 md:flex-nowrap md:justify-between">
          <div className="mb-8 mt-2 text-center md:text-left">
            <h4 className="px-2 text-2xl font-bold text-navy-700 dark:text-white">
              Company Advance Search Result Count :
              <span className="mx-2 text-gray-900">
                {SearchGSTByAdvanceSearchTotalData}
              </span>
            </h4>
          </div>
        </div>
        <div>
          <CompanyDetailGstTable
            SearchGSTByAdvanceSearchData={SearchGSTByAdvanceSearchData}
            SearchGSTByAdvanceSearchUserdata={SearchGSTByAdvanceSearchUserdata}
            SearchGSTByAdvanceSearchTotalData={
              SearchGSTByAdvanceSearchTotalData
            }
            isloading={isloading}
          />
        </div>
      </Card>
    </div>
  );
};

export default CompanyDetailGst;
