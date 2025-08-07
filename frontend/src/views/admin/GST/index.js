import React from "react";
import Card from "components/card";
import InputGloble from "components/fields/InputGloble";
import ServiceRegExr from "Service/RegExr";
import ServiceApiName from "Service/ServiceApiName";
import Service from "Service/Service";
import SearchHistory from "components/searchHistory";
import { useForm } from "react-hook-form";
import { useNotificationContext } from "createContextStore/NotificationContext";
import { useDispatch, useSelector } from "react-redux";
import { Ewallet } from "Store/Reducers/TBSlice";
import Infodata from "data/Infodata";
import AllCountShowChart from "components/card/AllCountShowChart";
import PopularsearchHistory from "components/searchHistory/PopularsearchHistory";
import { TBSelector } from "Store/Reducers/TBSlice";
import { Gstsearch } from "Store/Reducers/TBSlice";
import Slide from "components/Slide";
import Menuslider from "components/menuslider";
import IndiaMapWhitCount from "components/IndiaMapWhitCount";

const GstSearch = () => {
  const { openNotification } = useNotificationContext();
  const { register, handleSubmit } = useForm();
  let productsName = ServiceApiName.Gstsearch;
  const [recentSearches, setrecentSearches] = React.useState([]);
  const dispatch = useDispatch();
  const { PopularsearchData, isGetDashboardCategoryCountFetching } =
    useSelector(TBSelector);

  const onSubmit = (data) => {
    const number = data.gstin;
    if (ServiceRegExr.gstRegExr.test(number)) {
      const search = Service.toUpperCase(number);
      setrecentSearches(Service.GetRecentSearches(productsName));
      Service.walletBalanceFunction(productsName, dispatch, Ewallet, search);
    } else {
      openNotification("error", "Error", "Invalid Format", true, true);
    }
  };

  //recent && Popular Api Call
  const ApiCallForPopularSearch = (data) => {
    const number = data;
    const search = Service.toUpperCase(number);
    setrecentSearches(Service.GetRecentSearches(productsName));
    Service.walletBalanceFunction(productsName, dispatch, Ewallet, search);
  };
  const ApiCallForRecentSearch = (data) => {
    const number = data;
    const search = Service.toUpperCase(number);
    setrecentSearches(Service.GetRecentSearches(productsName));
    dispatch(Gstsearch({ gstin: search }));
  };

  //recent search history
  React.useEffect(() => {
    setrecentSearches(Service.GetRecentSearches(productsName));
  }, [productsName]);

  return (
    <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
      {/* <Menuslider name={"GSTState"} color={Infodata.color.gst} /> */}
      {/* <Card extra={"w-full h-full pt-4 pb-7 sm:overflow-auto px-6"}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputGloble
                        placeholder="Enter GST Number"
                        type="text"
                        label="GST Number"
                        maxLength={50}
                        {...register("gstin", {
                            required: "This number is required",
                        })}
                    />
                </form>
            </Card> */}
      <div className="mt-0 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <Card
          extra={"w-full flex justify-end h-full pb-2 overflow-auto px-6"}
        >
          <IndiaMapWhitCount
            paring={isGetDashboardCategoryCountFetching}
            name={"GSTState"}
            color={Infodata.color.gst}
          />
        </Card>

        <div>
          <Card extra={"mb-5 z-5 overflow-hidden"}>
            <SearchHistory
              products={recentSearches}
              ApiCallForRecentSearch={ApiCallForRecentSearch}
              name={"recent search history"}
              coloer={"gst"}
            />
          </Card>
          <Card extra={"mb-0 z-5 overflow-hidden"}>
            <PopularsearchHistory
              ApiCallForPopularSearch={ApiCallForPopularSearch}
              products={PopularsearchData.GstDetail}
              name={"popular search history"}
              coloer={"gst"}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GstSearch;
