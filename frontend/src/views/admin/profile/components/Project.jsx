import React from "react";
import { MdOutlineManageHistory } from "react-icons/md";
import Card from "components/card";
import { useDispatch, useSelector } from "react-redux";
import { TBSelector } from "Store/Reducers/TBSlice";
import { EwalletHistory } from "Store/Reducers/TBSlice";
import moment from "moment";

const Project = () => {
  const { EwalletHistoryData, isEwalletHistory } = useSelector(TBSelector);
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(EwalletHistory())
  }, [dispatch])
  return (
    <Card extra={"w-full p-4 h-[600px] overflow-y-scroll"}>
      <div className="mb-2 sticky w-full">
        <h4 className="text-xl ml-5 font-bold text-navy-700 dark:text-white">
          Credit History
        </h4>
      </div>
      {isEwalletHistory
        &&
        EwalletHistoryData?.slice(0, 20)?.map((item) => (
          <div key={item.id || item.createDate} className="mt-4 flex w-full items-center justify-between rounded-3xl bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out dark:bg-navy-800 dark:shadow-none dark:hover:shadow-xl">
            <div className="flex items-center space-x-4">
              <div className="ml-4">
                <p className="text-lg font-semibold text-navy-800 dark:text-white">
                  {item.description}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span
                    className="font-medium text-brand-500 hover:text-brand-600 dark:text-white dark:hover:text-brand-400"
                  >
                    {moment(item.createDate).format('lll')}
                  </span>
                  <span className="ml-2 text-gray-700 dark:text-gray-400">
                    {item.used}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center text-gray-500 dark:text-white hover:text-brand-500 dark:hover:text-brand-400">
              <MdOutlineManageHistory className="text-xl" />
            </div>
          </div>
        ))
      }
    </Card>
  );
};

export default Project;


