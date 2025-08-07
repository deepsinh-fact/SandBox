import React from "react";
import Card from "components/card";
import ServiceRegExr from "Service/RegExr";
import ServiceApiName from "Service/ServiceApiName";
import Service from "Service/Service";
import SearchHistory from "components/searchHistory";
import { useForm } from "react-hook-form";
import { useNotificationContext } from "createContextStore/NotificationContext";
import { useDispatch, useSelector } from "react-redux";
import { Ewallet, TBSelector } from "Store/Reducers/TBSlice";
import Infodata from "data/Infodata";
import AllCountShowChart from "components/card/AllCountShowChart";
import PopularsearchHistory from "components/searchHistory/PopularsearchHistory";
import { Cin } from "Store/Reducers/TBSlice";
import Menuslider from "components/menuslider";

const CinSearch = () => {
  const { openNotification } = useNotificationContext();
  const { PopularsearchData, isGetDashboardCategoryCountFetching } =
    useSelector(TBSelector);
  const { register, handleSubmit } = useForm();
  let productsName = ServiceApiName.Cinsearch;
  const [recentSearches, setrecentSearches] = React.useState([]);
  const dispatch = useDispatch();
  const cinRegExr = ServiceRegExr.cinRegExr;
  const cinRegExrllp = ServiceRegExr.cinRegExrllp;
  const cinRegExrf = ServiceRegExr.cinRegExrf;

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
    dispatch(Cin({ searchNumber: search }));
    // dispatch(GetMCAReport({ "cin": "U74999KA2021PTC145256" }));
  };

  //recent search history
  React.useEffect(() => {
    setrecentSearches(Service.GetRecentSearches(productsName));
  }, [productsName]);

  return (
    <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
      <Menuslider name={"CINSECTOR"} color={Infodata.color.cin} />
      <div className="mt-0 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <Card
          extra={"w-full flex justify-end h-full pb-2 sm:overflow-auto px-6"}
        >
          <header className="relative flex items-center justify-between pt-4">
            <div className="text-xl font-bold text-navy-700 dark:text-white">
              CIN Count
            </div>
          </header>
          <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
            <AllCountShowChart
              paring={isGetDashboardCategoryCountFetching}
              name={"CIN"}
              color={Infodata.color.cin}
            />
          </div>
        </Card>

        <div>
          <Card extra={"mb-5 z-5 overflow-hidden"}>
            <SearchHistory
              ApiCallForRecentSearch={ApiCallForRecentSearch}
              products={recentSearches}
              name={"recent search history"}
              coloer={"cin"}
            />
          </Card>
          <Card extra={"mb-0 z-5 overflow-hidden"}>
            <PopularsearchHistory
              ApiCallForPopularSearch={ApiCallForPopularSearch}
              products={PopularsearchData.CinDetail}
              name={"popular search history"}
              coloer={"cin"}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};
export default CinSearch;
