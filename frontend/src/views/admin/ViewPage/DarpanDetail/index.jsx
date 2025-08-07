import React from "react";
import BoxCard from "components/BoxCard";
import Card from "components/card";
import Service from "Service/Service";
import moment from "moment";
import { useLocation } from "react-router-dom";

export default function DarpanDetail() {
    const location = useLocation();
    const [data, setData] = React.useState({});

    React.useEffect(() => {
        setData(location?.state?.data || {});
    }, [location]);
    const BoxCardData = [
        { no: 1, name: "NGO Name", description: data?.ngO_NAME ? Service.toCapitalize(data?.ngO_NAME) : "Not Found" },
        { no: 2, name: "Registration No.", description: data?.reG_NO ? Service.toCapitalize(data?.reG_NO) : "Not Found" },
        { no: 3, name: "District", description: data?.district ? Service.toCapitalize(data?.district) : "Not Found" },
        { no: 4, name: "State", description: data?.state ? Service.toCapitalize(data?.state) : "Not Found" },
        { no: 5, name: "Address", description: data?.address ? Service.toCapitalize(data?.address) : "Not Found" },
        { no: 6, name: "Pincode", description: data?.pincode ? Service.toCapitalize(data?.pincode) : "Not Found" },
        { no: 7, name: "Sub District", description: data?.suB_DISTRICT ? Service.toCapitalize(data?.suB_DISTRICT) : "Not Found" },
        { no: 8, name: "Registration Date", description: data?.reG_DATE ? moment(data?.reG_DATE).format("DD-MM-YYYY") : "Not Found" },
        { no: 9, name: "NGO Type", description: data?.ngO_TYPE ? Service.toCapitalize(data?.ngO_TYPE) : "Not Found" },
        { no: 10, name: "Registration Authority", description: data?.reG_AUTH ? Service.toCapitalize(data?.reG_AUTH) : "Not Found" },
        { no: 11, name: "Act Name", description: data?.acT_NAME ? Service.toCapitalize(data?.acT_NAME) : "Not Found" },
        { no: 12, name: "Email", description: data?.email ? data?.email : null },
        { no: 13, name: "Mobile", description: data?.mobile ? data?.mobile : null },
        { no: 14, name: "URL", description: data?.url ? data?.url : "Not Found" },
        { no: 15, name: "Submit Date", description: data?.submiT_DATE ? moment(data?.submiT_DATE).format("DD-MM-YYYY") : "Not Found" },
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
                                        {data?.ngO_NAME
                                            ? Service.toCapitalize(data?.ngO_NAME)
                                            : "--"}
                                    </div>
                                    <p className="px-3 text-lg font-bold text-blue-500">
                                        {data?.reG_NO}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mb-2 grid grid-cols-1 gap-2 px-2 xl:grid-cols-1">
                            <div className="grid grid-rows-1 gap-x-4 gap-y-2">
                                {BoxCardData.map((item) => (
                                    <BoxCard
                                        key={item.no}
                                        no={item.no}
                                        name={item.name}
                                        description={!item?.description ? <span className="text-gray-300">Not Found</span> : item?.description}
                                    />
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}
