import React from "react";
import { useSelector } from "react-redux";
import { TBSelector } from "Store/Reducers/TBSlice";
import Card from "components/card";
import SocialmediaRenderNestedData from "functions/socialmediaRenderNestedData";
export default function Osintnumber() {
  const { GetFactAppInfoByPhoneData } = useSelector(TBSelector);
  //Data Store in State
  const [data, setData] = React.useState(() => {
    return {
      criteria: "",
      datas: [],
      sources: [],
      status: "", // "progress", "success", "error"
      message: "",
    };
  });

  //Data Store in State useEffect
  React.useEffect(() => {
    setData((e) => {
      return {
        criteria: "",
        datas: [],
        sources: [],
        status: "", // "progress", "success", "error"
        message: "",
      };
    });
    setData((e) => {
      return {
        ...e,
        criteria: GetFactAppInfoByPhoneData?.criteria,
        datas: GetFactAppInfoByPhoneData?.data,
        sources: GetFactAppInfoByPhoneData?.sources,
        status: GetFactAppInfoByPhoneData?.status,
        message: GetFactAppInfoByPhoneData?.message,
      };
    });
  }, [GetFactAppInfoByPhoneData]);

  return (
    <div className="mb-2 mt-5 grid grid-cols-1 gap-x-6 gap-y-6 px-0  xl:grid-cols-3">
      {data?.message && (
        <Card extra={"w-full col-span-3 h-full p-3"}>
          <div className="">
            <div className="mb-2 mt-2 rounded-md py-2 text-center md:text-left">
              <h4 className="px-2 text-2xl font-bold text-navy-700 dark:text-white">
                {data?.message}
              </h4>
            </div>
          </div>
        </Card>
      )}
      {!data?.message && (
        <Card extra={"w-full col-span-3 h-full p-3"}>
          <div className="">
            <div className="mb-2 mt-2 rounded-md bg-[#344cb7] py-2 text-center md:text-left">
              <h4 className="px-2 text-2xl font-bold text-white">
                Social Media Info {data?.criteria}
              </h4>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-6 xl:grid-cols-1">
            <div className="mb-2 grid grid-cols-1  px-0">
              <Card extra={"w-full h-full p-2"}>
                <div>
                  <div className="">
                    {SocialmediaRenderNestedData(
                      data?.datas,
                      "Address",
                      "display"
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
