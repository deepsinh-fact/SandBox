import React from 'react'
import NewCountCalendar from 'components/calendar/NewCountCalendar'
import Card from 'components/card'

import { useDispatch, useSelector } from 'react-redux';
import { updateState } from 'Store/Reducers/TBSlice';
import { TBSelector } from 'Store/Reducers/TBSlice';
import { Skeleton, Tooltip } from 'antd';
import { GetNewGSTDetailsCountByLastXDays } from 'Store/Reducers/TBSlice';
import NewGstTableAll from './NewGstTableAll';
import PincodeCrud from 'components/PincodeCrud';
import { BiExport, BiSolidCalendar, BiTable } from 'react-icons/bi';
import { GetGSTDetailsBySelectedDateAllData } from 'Store/Reducers/TBSlice';
import ExcelDownload from 'components/ExcelDownload';
import { FaHistory } from 'react-icons/fa';
import UserLogList from 'components/UserLogList';


export default function AllGstDay() {
    const [events, setEvents] = React.useState([]);
    const dispatch = useDispatch();
    const [viewType, setViewType] = React.useState("calendar");
    const [date, setDate] = React.useState("");
    const {
        isGetNewGSTDetailsCountByLastXDays, GetNewGSTDetailsCountByLastXDaysData, isGetNewGSTDetailsCountByLastXDaysFetching,
        GetGSTDetailsBySelectedDateAllDataData, isGetGSTDetailsBySelectedDateAllData, isMe
    } = useSelector(TBSelector);


    const CountByDay = () => {
        dispatch(GetNewGSTDetailsCountByLastXDays({
            Days: "90",
            "userName": isMe?.email
        }))
    }
    React.useEffect(() => {
        if (isMe?.email) {
            CountByDay()
        }
    }, [isMe?.email])

    const eventsDataPicker = (data) => {
        setDate(data.end);
        dispatch(GetGSTDetailsBySelectedDateAllData({
            "effectiveDateofregistration": `${data.end}`,
            "userName": isMe?.email
        }))
    }

    React.useEffect(() => {
        let updatedEvents = [];
        if (isGetNewGSTDetailsCountByLastXDays) {
            GetNewGSTDetailsCountByLastXDaysData?.map((key) => {
                const newEvent = {
                    title: `GST Count `,
                    count: `${key.gstCount}`,
                    start: key?.createdDate,
                    end: key?.createdDate,
                    className: "bg-gst"
                };
                updatedEvents.push(newEvent)
            })
            setEvents(updatedEvents);
            dispatch(updateState({ isGetNewGSTDetailsCountByLastXDays: false }))
        }
    }, [isGetNewGSTDetailsCountByLastXDays, GetNewGSTDetailsCountByLastXDaysData])

    React.useEffect(() => {
        if (isGetGSTDetailsBySelectedDateAllData) {
            setViewType("table")
            dispatch(updateState({ isGetGSTDetailsBySelectedDateAllData: false }))
        }
    }, [isGetGSTDetailsBySelectedDateAllData])


    return (
        <div className="mt-5 grid grid-cols-1 gap-5">
            <Card extra="p-4">
                <div className="space-y-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center border-b pb-4">
                        <div className="text-center sm:text-left">
                            <h2 className="text-3xl font-semibold mt-2">All GST By Date</h2>
                        </div>
                        <PincodeCrud bg="bg-gst" />
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
                            <Tooltip title="Table">
                                <BiTable onClick={() => setViewType("table")}
                                    className={`text-[35px] cursor-pointer rounded-lg bg-gray-50 border border-gray-500 p-2 ${viewType === "table" ? "text-blue-500" : ""}`} />
                            </Tooltip>
                            <Tooltip onClick={() => setViewType("userLog")} title="User Log">
                                <FaHistory onClick={() => setViewType("userLog")}
                                    className={`text-[35px] cursor-pointer rounded-lg bg-gray-50 border border-gray-500 p-2 ${viewType === "userLog" ? "text-blue-500" : ""}`} />
                            </Tooltip>
                            <Tooltip title="Download">
                                <ExcelDownload data={date} Apiname="GST" />
                            </Tooltip>
                        </div>
                    </div>
                    {isGetNewGSTDetailsCountByLastXDaysFetching ? (
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
                            <NewGstTableAll data={GetGSTDetailsBySelectedDateAllDataData} />
                        ) : (
                            <UserLogList name="GST" />
                        )
                    )}
                </div>
            </Card>
        </div>
    )
}
