import Card from 'components/card';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { TBSelector } from 'Store/Reducers/TBSlice';
import { useNotificationContext } from 'createContextStore/NotificationContext';
import { Skeleton } from 'antd';
import { GetMADReportClientConfig } from 'Store/Reducers/MADSlice';
import { MADSelector } from 'Store/Reducers/MADSlice';
import { SaveMADReportClientConfig } from 'Store/Reducers/MADSlice';
import CustomizationBtn from 'components/button/CustomizationBtn';
import CustomInput from 'components/fields/CustomInput';
import { updateStateMad } from 'Store/Reducers/MADSlice';

export default function MADReportClientConfig() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm();
    const { openNotification } = useNotificationContext();
    const [accountType, setAccountType] = useState("individual");
    const { isMe } = useSelector(TBSelector);
    const { GetMADReportClientConfigData, isSaveMADReportClientConfig, isSaveMADReportClientConfigFetching, isGetMADReportClientConfigFetching } = useSelector(MADSelector);
    const [clindConfigData, setClindConfigData] = useState([]);
    // const [totalWeightSum, setTotalWeightSum] = useState(0);
    const dispatch = useDispatch();

    // const totalWeight = watch();

    // React.useEffect(() => {
    //     var totalWeightSum = 0;
    //     totalWeightSum = Object.keys(totalWeight).reduce((acc, key) => {
    //         if (key.endsWith("-weight") && totalWeight[key] !== "") {
    //             acc += parseFloat(totalWeight[key]);
    //         }
    //         return acc;
    //     }, 0);
    //     setTotalWeightSum(totalWeightSum);
    // }, [totalWeight]);
    const onSubmit = (data) => {
        const score = clindConfigData?.map((check) => ({
            ...check,
            score: data[`${check.paramId}-score`] || check.score,
            weight: data[`${check.paramId}-weight`] || check.weight,
        }));
        const totalWeight = score.reduce((acc, check) => acc + parseFloat(check.weight), 0);
        if (totalWeight >= 101) {
            openNotification("error", "Weight", "Total weight must be 100%");
            return;
        }
        const ApiData = { ...GetMADReportClientConfigData, "clientConfigData": score, reportType: data.reportType }
        dispatch(SaveMADReportClientConfig(ApiData));
    };

    React.useEffect(() => {
        reset();
        dispatch(updateStateMad({ GetMADReportClientConfigData: {}, isSaveMADReportClientConfig: false }));
        setClindConfigData([]);
        dispatch(GetMADReportClientConfig({ username: isMe?.email, reportType: accountType === "individual" ? "1" : "2" }));
    }, [isSaveMADReportClientConfig]);
    React.useEffect(() => {
        // reset({ reportType: accountType === "individual" ? "1" : "2" });
        dispatch(updateStateMad({ GetMADReportClientConfigData: {} }));
        setClindConfigData([]);
        dispatch(GetMADReportClientConfig({ username: isMe?.email, reportType: accountType === "individual" ? "1" : "2" }));
    }, [accountType]);

    React.useEffect(() => {
        if (GetMADReportClientConfigData?.clientConfigData) {
            const defaults = {};
            GetMADReportClientConfigData.clientConfigData.forEach((item) => {
                defaults[`${item.paramId}-score`] = item.score;
                defaults[`${item.paramId}-weight`] = item.weight;
            });
            defaults["reportType"] = accountType === "individual" ? "1" : "2";
            reset(defaults);
            setClindConfigData(GetMADReportClientConfigData.clientConfigData);
        }
        //reset value all input
    }, [GetMADReportClientConfigData])

    return (
        <div className="w-full mx-auto">
            <div className="flex flex-col gap-y-4">
                <div className="mb-0 flex justify-center space-x-4">
                    <div
                        className={`flex items-center rounded-lg border px-6 py-2 ${accountType === "individual"
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                    >
                        <input
                            type="radio"
                            id="individual"
                            value="1"
                            checked={accountType === "individual"}
                            onClick={() => setAccountType("individual")}
                            onChange={() => setAccountType("individual")}
                            className="mr-2 accent-red-500"
                        />
                        <label htmlFor="individual" className="font-medium">
                            Individual
                        </label>
                    </div>
                    <div
                        className={`flex items-center rounded-lg border px-6 py-2 ${accountType === "business"
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                    >
                        <input
                            type="radio"
                            id="business"
                            value="2"
                            checked={accountType === "business"}
                            onClick={() => setAccountType("business")}
                            onChange={() => setAccountType("business")}
                            className="mr-2 cursor-pointer accent-red-500"
                        />
                        <label htmlFor="business" className="font-medium">
                            Business
                        </label>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* KYC Checks Score */}
                    <div className="relative mt-16">
                        <h2 className="absolute rounded-lg border-2 -top-16 px-9 pt-5 pb-10 text-lg bg-[#ecf1fc] dark:bg-navy-900 z-[1] font-semibold text-gray-700">
                            KYC Checks Score
                        </h2>

                        <Card
                            extra={`relative z-[2] flex border-2 flex-col shadow-xl  w-full h-full gap-1 !p-6 3xl:p-![18px] bg-white`}
                        >
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 dark:bg-navy-700 px-2 rounded-sm">
                                        <tr >
                                            <th className="py-3 px-3 text-left text-sm font-medium text-gray-600">
                                                Parameter
                                            </th>
                                            <th className="py-3 px-3 text-left text-sm font-medium text-gray-600">
                                                Score
                                            </th>
                                            <th className="py-3 px-3 text-left text-sm font-medium text-gray-600">
                                                Weight (%)
                                                {/* <span className={`${totalWeightSum >= 101 ? "text-red-500" : "text-gray-700"} inline-block px-2 `}>{totalWeightSum}</span> */}
                                            </th>
                                        </tr>
                                    </thead>
                                    {!isGetMADReportClientConfigFetching && (
                                        <tbody className="divide-y divide-gray-100">
                                            {clindConfigData?.map((check, index) => (
                                                check.paramType === "1" &&
                                                <tr key={index}>
                                                    <td className="py-4 px-3 text-sm text-gray-600 w-[70%]">
                                                        {check.paramName}
                                                    </td>
                                                    <td className="py-4 px-3 text-center text-sm text-gray-700 w-[15%]">
                                                        {console.log(check.score)}
                                                        <CustomInput
                                                            min="0"
                                                            max="10"
                                                            {...register(`${check.paramId}-score`, {
                                                                required: true,
                                                                min: {
                                                                    value: 0,
                                                                    message: "Value must be at least 0",
                                                                },
                                                                max: {
                                                                    value: 10,
                                                                    message: "Value must be 10 or less",
                                                                },
                                                                pattern: {
                                                                    value: /^[0-9]+$/,
                                                                    message: "Invalid number format",
                                                                }
                                                            })} defaultValue={check.score || 0} className={`border-b-2 w-full  pb-2 ${errors[`${check.paramId}-score`] ? "border-red-500" : ""}`} type="number"
                                                        />
                                                    </td>
                                                    <td className="py-4 px-3 text-center text-sm text-gray-700 w-[15%]">
                                                        <CustomInput
                                                            min="0"
                                                            max="10"
                                                            {...register(`${check.paramId}-weight`, {
                                                                required: true,
                                                                min: {
                                                                    value: 0,
                                                                    message: "Value must be at least 0",
                                                                },
                                                                max: {
                                                                    value: 10,
                                                                    message: "Value must be 10 or less",
                                                                },
                                                                pattern: {
                                                                    value: /^[0-9]+$/,
                                                                    message: "Invalid number format",
                                                                }
                                                            })} defaultValue={check.weight || 0} className={`border-b-2 w-full  pb-2 ${errors[`${check.paramId}-weight`] ? "border-red-500" : ""}`} type="number"
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    )}
                                </table>
                                {isGetMADReportClientConfigFetching && (
                                    <>
                                        <Skeleton className='!w-full py-2' active />
                                        <Skeleton className='!w-full py-2' active />
                                        <Skeleton className='!w-full py-2' active />
                                    </>
                                )}
                            </div>
                        </Card>
                    </div>
                    {/* Digital Behaviour Linkages */}
                    <div className="relative mt-16">
                        <h2 className="absolute rounded-lg border-2 -top-16 px-9 pt-5 pb-10 text-lg bg-[#ecf1fc] dark:bg-navy-900 z-[1] font-semibold text-gray-700">
                            Digital Behaviour Linkages
                        </h2>
                        <Card
                            extra={`relative z-[2] flex border-2 flex-col shadow-xl  w-full h-full gap-1 !p-6 3xl:p-![18px] bg-white`}
                        >
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 dark:bg-navy-700 px-2 rounded-sm">
                                        <tr >
                                            <th className="py-3 px-3 text-left text-sm font-medium text-gray-600">
                                                Parameter
                                            </th>
                                            <th className="py-3 px-3 text-left text-sm font-medium text-gray-600">
                                                Score
                                            </th>
                                            <th className="py-3 px-3 text-left text-sm font-medium text-gray-600">
                                                Weight (%)
                                                {/* <span className={`${totalWeightSum >= 101 ? "text-red-500" : "text-gray-700"} inline-block px-2 `}>{totalWeightSum}</span> */}
                                            </th>
                                        </tr>
                                    </thead>
                                    {!isGetMADReportClientConfigFetching && (
                                        <tbody className="divide-y divide-gray-100">
                                            {clindConfigData?.map((check, index) => (
                                                check.paramType === "2" &&
                                                <tr key={index}>
                                                    <td className="py-4 px-3 text-sm text-gray-600 w-[70%]">
                                                        {check.paramName}
                                                    </td>
                                                    <td className="py-4 px-3 text-center text-sm text-gray-700 w-[15%]">
                                                        <CustomInput
                                                            min="0"
                                                            max="10"
                                                            {...register(`${check.paramId}-score`, {
                                                                required: true,
                                                                min: {
                                                                    value: 0,
                                                                    message: "Value must be at least 0",
                                                                },
                                                                max: {
                                                                    value: 10,
                                                                    message: "Value must be 10 or less",
                                                                },
                                                                pattern: {
                                                                    value: /^[0-9]+$/,
                                                                    message: "Invalid number format",
                                                                }
                                                            })} defaultValue={check.score || 0} className={`border-b-2 w-full  pb-2 ${errors[`${check.paramId}-score`] ? "border-red-500" : ""}`} type="number"
                                                        />
                                                    </td>
                                                    <td className="py-4 px-3 text-center text-sm text-gray-700 w-[15%]">
                                                        <CustomInput
                                                            min="0"
                                                            max="10"
                                                            {...register(`${check.paramId}-weight`, {
                                                                required: true,
                                                                min: {
                                                                    value: 0,
                                                                    message: "Value must be at least 0",
                                                                },
                                                                max: {
                                                                    value: 10,
                                                                    message: "Value must be 10 or less",
                                                                },
                                                                pattern: {
                                                                    value: /^[0-9]+$/,
                                                                    message: "Invalid number format",
                                                                }
                                                            })} defaultValue={check.weight || 0} className={`border-b-2 w-full  pb-2 ${errors[`${check.paramId}-weight`] ? "border-red-500" : ""}`} type="number"
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    )}
                                </table>
                                {isGetMADReportClientConfigFetching && (
                                    <>
                                        <Skeleton className='!w-full py-2' active />
                                        <Skeleton className='!w-full py-2' active />
                                        <Skeleton className='!w-full py-2' active />
                                    </>
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* Public Record Validation */}
                    <div className="relative mt-16">
                        <h2 className="absolute rounded-lg border-2 -top-16 px-9 pt-5 pb-10 text-lg bg-[#ecf1fc] dark:bg-navy-900 z-[1] font-semibold text-gray-700">
                            Public Record Validation
                        </h2>
                        <Card
                            extra={`relative z-[2] flex border-2 flex-col shadow-xl  w-full h-full gap-1 !p-6 3xl:p-![18px] bg-white`}
                        >
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 dark:bg-navy-700 px-2 rounded-sm">
                                        <tr >
                                            <th className="py-3 px-3 text-left text-sm font-medium text-gray-600">
                                                Parameter
                                            </th>
                                            <th className="py-3 px-3 text-left text-sm font-medium text-gray-600">
                                                Score
                                            </th>
                                            <th className="py-3 px-3 text-left text-sm font-medium text-gray-600">
                                                Weight (%)
                                                {/* <span className={`${totalWeightSum >= 101 ? "text-red-500" : "text-gray-700"} inline-block px-2 `}>{totalWeightSum}</span> */}
                                            </th>
                                        </tr>
                                    </thead>
                                    {!isGetMADReportClientConfigFetching && (
                                        <tbody className="divide-y divide-gray-100">
                                            {clindConfigData?.map((check, index) => (
                                                check.paramType === "3" &&
                                                <tr key={index}>
                                                    <td className="py-4 px-3 text-sm text-gray-600 w-[70%]">
                                                        {check.paramName}
                                                    </td>
                                                    <td className="py-4 px-3 text-center text-sm text-gray-700 w-[15%]">
                                                        <CustomInput
                                                            min="0"
                                                            max="10"
                                                            {...register(`${check.paramId}-score`, {
                                                                required: true,
                                                                min: {
                                                                    value: 0,
                                                                    message: "Value must be at least 0",
                                                                },
                                                                max: {
                                                                    value: 10,
                                                                    message: "Value must be 10 or less",
                                                                },
                                                                pattern: {
                                                                    value: /^[0-9]+$/,
                                                                    message: "Invalid number format",
                                                                }
                                                            })} defaultValue={check.score || 0} className={`border-b-2 w-full  pb-2 ${errors[`${check.paramId}-score`] ? "border-red-500" : ""}`} type="number"
                                                        />
                                                    </td>
                                                    <td className="py-4 px-3 text-center text-sm text-gray-700 w-[15%]">
                                                        <CustomInput
                                                            min="0"
                                                            max="10"
                                                            {...register(`${check.paramId}-weight`, {
                                                                required: true,
                                                                min: {
                                                                    value: 0,
                                                                    message: "Value must be at least 0",
                                                                },
                                                                max: {
                                                                    value: 10,
                                                                    message: "Value must be 10 or less",
                                                                },
                                                                pattern: {
                                                                    value: /^[0-9]+$/,
                                                                    message: "Invalid number format",
                                                                }
                                                            })} defaultValue={check.weight || 0} className={`border-b-2 w-full  pb-2 ${errors[`${check.paramId}-weight`] ? "border-red-500" : ""}`} type="number"
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    )}
                                </table>
                                {isGetMADReportClientConfigFetching && (
                                    <>
                                        <Skeleton className='!w-full py-2' active />
                                        <Skeleton className='!w-full py-2' active />
                                        <Skeleton className='!w-full py-2' active />
                                    </>
                                )}
                            </div>
                        </Card>
                    </div>
                    <div className="flex justify-end">
                        <CustomizationBtn type="submit" disabled={isSaveMADReportClientConfigFetching} >SUBMIT</CustomizationBtn>
                    </div>
                </form>
            </div>
        </div>
    )
}
