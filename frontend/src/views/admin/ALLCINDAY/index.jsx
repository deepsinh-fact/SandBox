
import React from "react";
import NewCountCalendar from "components/calendar/NewCountCalendar";
import Card from "components/card";

import { BiExport, BiSolidCalendar, BiTable } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "Store/Reducers/TBSlice";
import { GetNewCINDetailsCountByLastXDays } from "Store/Reducers/TBSlice";
import { TBSelector } from "Store/Reducers/TBSlice";
import { Skeleton, Tooltip } from "antd";
import AllCinTable from "./AllCinTable";
import { GetCINAddressByPin } from "Store/Reducers/TBSlice";
import PincodeCrud from "components/PincodeCrud";
import { CinGetCompanyAndDirectorDetailBySelected } from "Store/Reducers/TBSlice";
import ExcelDownload from "components/ExcelDownload";
import UserLogList from "components/UserLogList";
import { FaHistory } from "react-icons/fa";


export default function NewCinDay() {
    const [events, setEvents] = React.useState([]);
    const dispatch = useDispatch();
    const [viewType, setViewType] = React.useState("calendar");
    const [date, setDate] = React.useState("");
    const {
        isGetNewCINDetailsCountByLastXDays,
        GetNewCINDetailsCountByLastXDaysData,
        isGetNewCINDetailsCountByLastXDaysFetching,
        isCinGetCompanyAndDirectorDetailBySelected,
        CinGetCompanyAndDirectorDetailBySelectedData,
        isMe
    } = useSelector(TBSelector);

    const CountByDay = () => {
        dispatch(
            GetNewCINDetailsCountByLastXDays({
                Days: "90",
                "userName": isMe?.email
            })
        );
    };
    React.useEffect(() => {
        if (isMe?.email) {
            CountByDay()
        }
    }, [isMe?.email])
    const eventsDataPicker = (data) => {
        setDate(data.end);
        dispatch(
            CinGetCompanyAndDirectorDetailBySelected({
                effectiveDateofregistration: `${data.end}`,
                "userName": isMe?.email

            })
        );
    }
    React.useEffect(() => {
        let updatedEvents = [];
        if (isGetNewCINDetailsCountByLastXDays) {
            GetNewCINDetailsCountByLastXDaysData?.map((key) => {
                const newEvent = {
                    title: `CIN Count`,
                    count: `${key.cinCount}`,
                    start: key?.registrationDates,
                    end: key?.registrationDates,
                    className: "bg-cin",
                };
                updatedEvents.push(newEvent);
            });
            setEvents(updatedEvents);
            dispatch(
                updateState({
                    isGetNewCINDetailsCountByLastXDays: false,
                })
            );
        }
    }, [isGetNewCINDetailsCountByLastXDays, GetNewCINDetailsCountByLastXDaysData]);

    React.useEffect(() => {
        if (isCinGetCompanyAndDirectorDetailBySelected) {
            setViewType("table");
            dispatch(updateState({
                isCinGetCompanyAndDirectorDetailBySelected: false,
            }));
        }
    }, [isCinGetCompanyAndDirectorDetailBySelected]);

    return (
        <div className="mt-5 grid grid-cols-1 gap-5">
            <Card extra="p-4">
                <div className="space-y-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center border-b pb-4">
                        <div className="text-center sm:text-left">
                            <h2 className="text-3xl font-semibold mt-2">All CIN By Date</h2>
                        </div>
                        <PincodeCrud bg="bg-cin" />
                    </div>
                </div>
                <div className="space-y-8">
                    <div className="flex flex-col sm:flex-row justify-between flex-wrap mt-5 items-center">
                        <div className="text-center sm:text-left">
                            <h2 className="text-xl font-semibold mt-2">{viewType === "calendar" ? "View By Calendar" : "View By Table"}</h2>
                        </div>
                        <div className="text-center flex gap-4 sm:text-left">
                            <Tooltip title="Calendar">
                                <BiSolidCalendar onClick={() => setViewType("calendar")}
                                    className={`text-[35px] cursor-pointer rounded-lg bg-gray-50 border border-gray-500 p-2 ${viewType === "calendar" ? "text-blue-500" : ""}`} />
                            </Tooltip>
                            <Tooltip onClick={() => setViewType("table")} title="Table">
                                <BiTable onClick={() => setViewType("table")}
                                    className={`text-[35px] cursor-pointer rounded-lg bg-gray-50 border border-gray-500 p-2 ${viewType === "table" ? "text-blue-500" : ""}`} />
                            </Tooltip>
                            <Tooltip onClick={() => setViewType("userLog")} title="User Log">
                                <FaHistory onClick={() => setViewType("userLog")}
                                    className={`text-[35px] cursor-pointer rounded-lg bg-gray-50 border border-gray-500 p-2 ${viewType === "userLog" ? "text-blue-500" : ""}`} />
                            </Tooltip>
                            <Tooltip title="Download">
                                <ExcelDownload data={date} Apiname="CIN" />
                            </Tooltip>
                        </div>
                    </div>
                    {isGetNewCINDetailsCountByLastXDaysFetching ? (
                        <>
                            <Skeleton active />
                            <Skeleton active />
                            <Skeleton active />
                            <Skeleton active />
                        </>
                    ) : (
                        viewType === "calendar" ? (
                            <NewCountCalendar
                                events={events}
                                eventsDataPicker={eventsDataPicker}
                            />
                        ) : viewType === "table" ? (
                            <AllCinTable data={CinGetCompanyAndDirectorDetailBySelectedData.map((_, i) => ({ ..._, key: i + 1 }))} />
                        ) : (
                            <UserLogList name="CIN" />
                        )
                    )}
                </div>
            </Card>
        </div>
    );
}
