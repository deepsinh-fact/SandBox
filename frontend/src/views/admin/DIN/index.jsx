
import React from 'react'
import Card from 'components/card';
import InputGloble from 'components/fields/InputGloble';
import ServiceRegExr from 'Service/RegExr';
import ServiceApiName from 'Service/ServiceApiName';
import Service from 'Service/Service';
import SearchHistory from 'components/searchHistory';
import { useForm } from 'react-hook-form';
import { useNotificationContext } from 'createContextStore/NotificationContext';
import { useDispatch, useSelector } from 'react-redux';
import { Ewallet } from 'Store/Reducers/TBSlice';
import PopularsearchHistory from 'components/searchHistory/PopularsearchHistory';
import { TBSelector } from 'Store/Reducers/TBSlice';
import { Din } from 'Store/Reducers/TBSlice';
import AllCountShowInPieChart from 'components/card/AllCountShowInPieChart';


const DinSearch = () => {
    const { openNotification } = useNotificationContext();
    const { register, handleSubmit } = useForm()
    let productsName = ServiceApiName.Dinsearch;
    const [recentSearches, setrecentSearches] = React.useState([]);
    const dispatch = useDispatch();
    const { PopularsearchData, isGetDashboardCategoryCountFetching } = useSelector(TBSelector);

    const onSubmit = (data) => {
        const number = data.searchNumber.trim()
        if (ServiceRegExr.dinRegExr.test(number)) {
            const search = Service.toUpperCase(number);
            setrecentSearches(Service.GetRecentSearches(productsName));
            Service.walletBalanceFunction(productsName, dispatch, Ewallet, search)
        } else {
            openNotification('error', 'Error', "Invalid Format", true, true)
        }
    }

    //recent && Popular Api Call
    const ApiCallForPopularSearch = (data) => {
        const number = data
        const search = Service.toUpperCase(number);
        setrecentSearches(Service.GetRecentSearches(productsName));
        Service.walletBalanceFunction(productsName, dispatch, Ewallet, search)
    }
    const ApiCallForRecentSearch = (data) => {
        const number = data
        const search = Service.toUpperCase(number);
        setrecentSearches(Service.GetRecentSearches(productsName));
        dispatch(Din({ "searchNumber": search }));
        // Service.walletBalanceFunction(productsName, dispatch, Ewallet, search)
    }

    //recent search history
    React.useEffect(() => {
        setrecentSearches(Service.GetRecentSearches(productsName));
    }, [productsName])




    return (
        <div className='mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1'>
            {/* <Card extra={"w-full h-full pt-4 pb-7 sm:overflow-auto px-6"}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputGloble
                        placeholder="Enter Din Number"
                        type="text"
                        label="Din Number"
                        maxLength={50}
                        {...register("searchNumber", {
                            required: "This number is required",
                        })}
                    />
                </form>
            </Card> */}
            <div className='mt-0 grid h-full grid-cols-1 gap-5 md:grid-cols-2'>
                <Card extra={"w-full flex justify-between h-full pb-2 sm:overflow-auto px-6"}>
                    <header className="relative flex items-center justify-between pt-4">
                        <div className="text-xl font-bold text-navy-700 dark:text-white">
                            DIN
                        </div>
                    </header>
                    <AllCountShowInPieChart paring={isGetDashboardCategoryCountFetching} name={"CINSECTOR"} />
                </Card>
                <div>
                    <Card extra={"mb-5 z-5 overflow-hidden"}>
                        <SearchHistory ApiCallForRecentSearch={ApiCallForRecentSearch} products={recentSearches} name={"recent search history"} coloer={"din"} />
                    </Card>
                    <Card extra={"mb-0 z-5 overflow-hidden"}>
                        <PopularsearchHistory ApiCallForPopularSearch={ApiCallForPopularSearch} products={PopularsearchData.DinDetail} name={"popular search history"} coloer={"din"} />
                    </Card>
                </div>

            </div>
        </div>
    )
}
export default DinSearch;
