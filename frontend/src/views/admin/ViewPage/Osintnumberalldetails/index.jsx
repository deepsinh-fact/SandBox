import React from "react";
import Card from "components/card";
import BoxCard from "components/BoxCard";
import HeadersCard from "components/BoxCard/HeadersCard";
import renderNestedData from "functions/renderNestedData";
import { useSelector } from "react-redux";
import { TBSelector } from "Store/Reducers/TBSlice";
export default function Osintnumberalldetails() {
  const { GetFactAppInfoMoreByPhoneData } = useSelector(TBSelector);

  //Data Store in State
  const [data, setData] = React.useState(() => {
    return {
      criteria: "",
      person: {},
      sources: [],
      status: "", // "progress", "success", "error"
      message: "",
    };
  });

  //Data Store in State useEffect
  React.useEffect(() => {
    setData((e) => {
      return {
        ...e,
        criteria: "",
        person: {},
        sources: [],
        status: "", // "progress", "success", "error"
        message: "",
      };
    });
    setData((e) => {
      return {
        ...e,
        criteria: GetFactAppInfoMoreByPhoneData?.criteria,
        person: Array.isArray(GetFactAppInfoMoreByPhoneData?.data?.[0])
          ? GetFactAppInfoMoreByPhoneData?.data?.[1]?.luna?.person ||
          GetFactAppInfoMoreByPhoneData?.data?.[1]?.luna?.possiblePersons?.[0]
          : GetFactAppInfoMoreByPhoneData?.data?.[0]?.luna?.person ||
          GetFactAppInfoMoreByPhoneData?.data?.[0]?.luna
            ?.possiblePersons?.[0],
        sources: GetFactAppInfoMoreByPhoneData?.data?.[0]?.luna?.sources,
        status: GetFactAppInfoMoreByPhoneData?.status,
        message: GetFactAppInfoMoreByPhoneData?.message,
      };
    });
  }, [GetFactAppInfoMoreByPhoneData]);
  console.log(data?.person?.addresses);

  return (
    <div className="mb-2 mt-5 grid grid-cols-1 gap-x-6 gap-y-6 px-0  xl:grid-cols-3">
      {data.message && (
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
      {!data.message && (
        <Card extra={"w-full col-span-3 h-full p-3"}>
          <div className="">
            <div className="mb-2 mt-2 rounded-md bg-[#344cb7] py-2 text-center md:text-left">
              <h4 className="px-2 text-2xl font-bold text-white">
                Person Info {data?.criteria}
              </h4>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-6 xl:grid-cols-3">
            <div className="mb-2 grid grid-cols-1  px-0">
              <Card extra={"w-full h-full p-2"}>
                <div className="">
                  <HeadersCard>Names</HeadersCard>
                  <div className="">
                    {renderNestedData(data?.person?.names, "Name", "display")}
                  </div>
                </div>
                <div>
                  <HeadersCard className="pt-2">Addresses</HeadersCard>
                  <div className="">
                    {renderNestedData(
                      data?.person?.addresses,
                      "Address",
                      "display"
                    )}
                  </div>
                </div>
                <div>
                  <HeadersCard className="pt-2">URLs</HeadersCard>
                  <div className="">
                    {renderNestedData(data?.person?.urls, "URL", "name")}
                  </div>
                </div>
              </Card>
            </div>
            <div className="mb-2 grid grid-cols-1  px-0">
              <Card extra={"w-full h-full p-2"}>
                <div className="">
                  <HeadersCard>Emails</HeadersCard>
                  <div className="">
                    {renderNestedData(data?.person?.emails, "Email", "address")}
                  </div>
                </div>
                <div className="">
                  <HeadersCard className="pt-2">Gender</HeadersCard>
                  <div className="">
                    <div className="grid grid-rows-1 gap-2">
                      {Object.keys(data?.person?.gender || {}).map(
                        (key, index) =>
                          data?.person?.gender[key] && (
                            <BoxCard
                              key={key}
                              no={index}
                              name={key}
                              description={`${data?.person?.gender[key]}`}
                            ></BoxCard>
                          )
                      )}
                    </div>
                  </div>
                </div>
                <div className="">
                  <HeadersCard className="pt-2">Educations</HeadersCard>
                  <div className="">
                    {renderNestedData(
                      data?.person?.educations,
                      "Education",
                      "degree"
                    )}
                  </div>
                </div>
                <div className="">
                  <HeadersCard className="pt-2">UserIds</HeadersCard>
                  <div className="">
                    {renderNestedData(
                      data?.person?.userIds,
                      "UserIds",
                      "content"
                    )}
                  </div>
                </div>
              </Card>
            </div>
            <div className="mb-2 grid grid-cols-1  px-0">
              <Card extra={"w-full h-full p-2"}>
                <div className="">
                  <HeadersCard>Jobs</HeadersCard>
                  <div className="">
                    {renderNestedData(
                      data?.person?.jobs,
                      "Employment",
                      "title"
                    )}
                  </div>
                </div>
                <div className="">
                  <HeadersCard className="pt-2">User Names</HeadersCard>
                  <div>
                    {renderNestedData(
                      data?.person?.usernames,
                      "User Names",
                      "content"
                    )}
                  </div>
                </div>
                <div>
                  <HeadersCard className="pt-2">Phones</HeadersCard>
                  <div className="">
                    {renderNestedData(data?.person?.phones, "Phone", "number")}
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
