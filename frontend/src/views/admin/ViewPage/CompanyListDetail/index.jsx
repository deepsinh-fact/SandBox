import { Skeleton } from "antd";
import Card from "components/card";
import React from "react";
import { useSelector } from "react-redux";
import { TBSelector } from "Store/Reducers/TBSlice";
import CompanyNameByCin from "./CompanyNameByCin";
import CompanyNameByGst from "./CompanyNameByGst";

export default function CompanyListDetail() {
  const {
    isSearchCompanyNameFetching,
    isSearchCompanyNameGStFetching,
    SearchCompanyNameGStData,
    SearchCompanyNameData,
    isloading,
  } = useSelector(TBSelector);
  return (
    <div className="mb-2 grid grid-cols-1 gap-x-4 gap-y-5 px-0 py-3  xl:grid-cols-2">
      <Card extra={"w-full h-full p-3"}>
        <div className="flex flex-wrap justify-center gap-x-2 md:flex-nowrap md:justify-between">
          <div className="mb-8 mt-2 text-center md:text-left">
            <h4 className="px-2 text-2xl font-bold text-navy-700 dark:text-white">
              CIN
            </h4>
          </div>
        </div>
        <div>
          {isSearchCompanyNameFetching ? (
            <Skeleton />
          ) : (
            <CompanyNameByCin
              SearchCompanyNameData={SearchCompanyNameData}
              isloading={isloading}
            />
          )}
        </div>
      </Card>
      <Card extra={"w-full h-full p-3"}>
        <div className="flex flex-wrap justify-center gap-x-2 md:flex-nowrap md:justify-between">
          <div className="mb-8 mt-2 text-center md:text-left">
            <h4 className="px-2 text-2xl font-bold text-navy-700 dark:text-white">
              GSTIN
            </h4>
          </div>
        </div>
        <div>
          {isSearchCompanyNameGStFetching ? (
            <Skeleton />
          ) : (
            <CompanyNameByGst
              SearchCompanyNameData={SearchCompanyNameGStData}
              isloading={isloading}
            />
          )}
        </div>
      </Card>
    </div>
  );
}
