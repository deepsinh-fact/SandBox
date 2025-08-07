import React from 'react'
import NewCountCalendar from 'components/calendar/NewCountCalendar'
import Card from 'components/card'

import { useDispatch, useSelector } from 'react-redux';
import { updateState } from 'Store/Reducers/TBSlice';
import { TBSelector } from 'Store/Reducers/TBSlice';
import { Skeleton, Tooltip } from 'antd';
import NewIECTableAll from './NewIECTableAll';
import PincodeCrud from 'components/PincodeCrud';
import { BiSolidCalendar, BiTable } from 'react-icons/bi';
import ExcelDownload from 'components/ExcelDownload';
import { IECByLastDays } from 'Store/Reducers/TBSlice';
import { GetIECDetailsBySelectedDate } from 'Store/Reducers/TBSlice';
import { FaHistory } from 'react-icons/fa';
import UserLogList from 'components/UserLogList';


export default function AllIECDay() {
    const [events, setEvents] = React.useState([]);
    const dispatch = useDispatch();
    const [viewType, setViewType] = React.useState("calendar");
    const [date, setDate] = React.useState("");
    const {
        isIECByLastDays, IECByLastDaysData, isIECByLastDaysFetching,
        GetIECDetailsBySelectedDateData, isGetIECDetailsBySelectedDate, isMe
    } = useSelector(TBSelector);

    const CountByDay = () => {
        dispatch(IECByLastDays({
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
        dispatch(GetIECDetailsBySelectedDate({
            "effectiveDateofregistration": `${data.end}`,
            "userName": isMe?.email
        }))
    }

    React.useEffect(() => {
        let updatedEvents = [];
        if (isIECByLastDays) {
            IECByLastDaysData?.map((key) => {
                const newEvent = {
                    title: `IEC Count `,
                    count: `${key.iecCount}`,
                    start: key?.createdDate,
                    end: key?.createdDate,
                    className: "bg-pan"
                };
                updatedEvents.push(newEvent)
            })
            setEvents(updatedEvents);
            dispatch(updateState({ isIECByLastDays: false }))
        }
    }, [isIECByLastDays, IECByLastDaysData])

    React.useEffect(() => {
        if (isGetIECDetailsBySelectedDate) {
            setViewType("table")
            dispatch(updateState({ isGetIECDetailsBySelectedDate: false }))
        }
    }, [isGetIECDetailsBySelectedDate])


    return (
        <div className="mt-5 grid grid-cols-1 gap-5">
            <Card extra="p-4">
                <div className="space-y-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center border-b pb-4">
                        <div className="text-center sm:text-left">
                            <h2 className="text-3xl font-semibold mt-2">NEW IEC By Date</h2>
                        </div>
                        <PincodeCrud bg="bg-pan" />
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
                                <ExcelDownload data={date} Apiname="IEC" />
                            </Tooltip>
                        </div>
                    </div>
                    {isIECByLastDaysFetching ? (
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
                            <NewIECTableAll data={GetIECDetailsBySelectedDateData.map((key, index) => ({ ...key, no: index + 1 }))} />
                        ) : (
                            <UserLogList name="IEC" />
                        )
                    )}
                </div>
            </Card>
        </div>
    )
}
