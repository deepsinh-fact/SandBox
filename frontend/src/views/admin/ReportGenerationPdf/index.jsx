import Card from "components/card";
import { useNotificationContext } from "createContextStore/NotificationContext";
import React from "react";
import { useForm } from "react-hook-form";
import { TBSelector } from "Store/Reducers/TBSlice";
import { useDispatch, useSelector } from "react-redux";
import TableComponents from "components/ant/TableComponents";
import RefreshBtn from "components/RefreshBtn";
import SpinAnimate from "components/RefreshBtn/SpinAnimate";
import moment from "moment";
import CountdownTimer from "components/CountdownTimer.jsx";
import { FaPlus } from "react-icons/fa6";
import PdfDownload from "components/PdfDownload";
import { updateState } from "Store/Reducers/TBSlice";
import { SavePdfRequest } from "Store/Reducers/TBSlice";
import Service from "Service/Service";
import { IoMdRefresh } from "react-icons/io";
import { GetPdfRequestList } from "Store/Reducers/TBSlice";
import ServiceApiName from "Service/ServiceApiName";
import { Ewallet } from "Store/Reducers/TBSlice";
import Counter from "components/CounterTImer";

export default function ReportGenerationPdf() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch
    } = useForm();
    const { isMe, isSavePdfRequest, isSavePdfRequestFetching, isGetPdfRequestListFetching, GetPdfRequestListData } = useSelector(TBSelector);
    const dispatch = useDispatch();
    const { openNotification } = useNotificationContext();
    const productsName = ServiceApiName.Pdfsearch;
    const watchAccountType = watch("accountType");
    const onSubmit = (data) => {
        if (watchAccountType) {
            Service.walletBalanceFunction(productsName, dispatch, Ewallet, data.searchNumber, {
                pdfType: watchAccountType,
                searchNumber: data.searchNumber,
                requestType: "2",
                userName: isMe?.email
            });
            // dispatch(SavePdfRequest({
            //     pdfType: watchAccountType,
            //     searchNumber: data.searchNumber,
            //     requestType: "2",
            //     userName: isMe?.email
            // }))
        } else {
            openNotification("error", "Error", "Please select account type", true, true);
        }
    };

    const GetPdfRequestListApiCallFun = () => {
        if (isMe?.email) {
            dispatch(GetPdfRequestList({ userName: isMe?.email }));
        }
    }
    React.useEffect(() => {
        GetPdfRequestListApiCallFun()
    }, [isMe]);


    React.useEffect(() => {
        if (isSavePdfRequest) {
            dispatch(updateState({ isSavePdfRequest: false }))
            reset()
            GetPdfRequestListApiCallFun()
            openNotification('success', 'Success', "Data saved successfully", true, true)
        }

    }, [isSavePdfRequest, dispatch, reset, openNotification])


    const columns = [
        {
            title: "Number",
            dataIndex: "number",
        },
        {
            title: <span>PDF&nbsp;Type</span>,
            dataIndex: "pdfType",
        },
        {
            title: <span>Search&nbsp;Number</span>,
            dataIndex: "searchNumber",
        },
        {
            title: <span>Created&nbsp;Date</span>,
            dataIndex: "createdDate",
        },
        {
            title: <span>Request&nbsp;Min</span>,
            dataIndex: "requestMin",
        },
        {
            title: <span>PDF&nbsp;Download</span>,
            dataIndex: "pdfDownload",
        },
    ];


    const dataSource = GetPdfRequestListData?.map((_, i) => ({
        key: _.reportId,
        number: i + 1,
        pdfType: _.pdfType,
        searchNumber: _.searchNumber,
        requestMin: <CountdownTimer startDate={_.createdDate} isGenerated={0} minite={0.30} />,
        createdDate: moment(_.createdDate).format("LL"),
        pdfDownload: <PdfDownload
            title={_.searchNumber}
            apiName={Service.apiMap[_.pdfType]}
            reportId={_.reportId}
            type="2" />,
    }));
    return (
        <>
            <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
                <Card extra={"w-full h-full pt-20 pb-10 sm:overflow-auto px-6"}>
                    <div className="mb-14 text-center">
                        <h1 className="mb-6 text-3xl font-bold text-gray-800 dark:text-white">
                            PDF Report Generation
                        </h1>
                        <p className="text-gray-600">
                            Enter Your Number Which you want to search information
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mx-auto w-full max-w-3xl"
                    >


                        {/* PAN Number */}
                        <div className="mb-4 flex sm:flex-nowrap flex-wrap justify-between items-start gap-y-2 gap-x-1 sm:gap-y-0">
                            <div className="w-full sm:w-[20%] sm:pr-2">
                                <div className="rounded-lg border p-3">
                                    <select
                                        {...register("accountType")}
                                        className="w-full">
                                        <option value="">Select</option>
                                        <option value="PAN">PAN</option>
                                        <option value="GST">GST</option>
                                        <option value="CIN">CIN</option>
                                        <option value="DIN">DIN</option>
                                        <option value="MSME">MSME</option>
                                        <option value="IEC">IEC</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full sm:w-[70%]">
                                <div
                                    className={`flex items-center rounded-lg border p-3 ${errors.searchNumber ? "border-red-500" : ""
                                        }`}
                                >
                                    <input
                                        type="text"
                                        className={`bg-transparent placeholder:capitalize w-full uppercase focus:outline-none`}
                                        placeholder={watchAccountType ? `Search By ${watchAccountType} Number` : "Searchs"}
                                        {...register("searchNumber", {
                                            required: true,
                                            pattern: Service.getValidationRule(watchAccountType),
                                        })}
                                    />
                                    <div className="text-red-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                {errors.searchNumber && (
                                    <p className="text-red-500">
                                        {errors.searchNumber.message}
                                    </p>
                                )}
                            </div>
                            <div className="w-full sm:w-[10%] flex items-center">
                                <button
                                    disabled={isSavePdfRequestFetching}
                                    type="submit"
                                    className="rounded-lg w-full flex items-center justify-center bg-gray-100/10 border px-5 py-4 h-full font-bold text-white hover:bg-gray-100"
                                >
                                    {isSavePdfRequestFetching ? (
                                        <IoMdRefresh className={`animate-spin text-gray-700`} />
                                    ) : (
                                        <FaPlus className="text-gray-700" />
                                    )}
                                </button>
                            </div>
                        </div>

                    </form>
                    <Card extra={"w-full h-full pt-4 pb-7 sm:overflow-auto px-6"}>
                        <div className="flex justify-end py-3">
                            <RefreshBtn
                                handleRefresh={() =>
                                    isMe?.email &&
                                    dispatch(GetPdfRequestList({ userName: isMe?.email }))
                                }
                            >
                                <div className="flex items-end justify-center">
                                    <SpinAnimate
                                        loading={isGetPdfRequestListFetching}
                                    ></SpinAnimate>{" "}
                                </div>
                            </RefreshBtn>
                        </div>
                        <div className="flex h-full flex-col justify-center">
                            <TableComponents
                                scrollx={1200}
                                columns={columns}
                                dataSource={dataSource}
                            />
                        </div>
                    </Card>
                </Card>
            </div>
        </>
    );
}
