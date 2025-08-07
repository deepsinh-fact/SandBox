import React from 'react'
import NewCountCalendar from 'components/calendar/NewCountCalendar'
import Card from 'components/card'

import { useDispatch, useSelector } from 'react-redux';
import { updateState } from 'Store/Reducers/TBSlice';
import { GetCINDetailsCountByLastXDays } from 'Store/Reducers/TBSlice';
import { TBSelector } from 'Store/Reducers/TBSlice';
import { Skeleton } from 'antd';
import { GSTByLastDays } from 'Store/Reducers/TBSlice';
import { GetPincodeLatLong } from 'Store/Reducers/TBSlice';
import { GetPincodeLatLongGST } from 'Store/Reducers/TBSlice';
import NewGstTable from './NewGstTable';
import { useNotificationContext } from 'createContextStore/NotificationContext';


export default function NewGstDay() {
    const [events, setEvents] = React.useState([]);
    const [location, setLocation] = React.useState({});
    const { openNotification } = useNotificationContext();
    const dispatch = useDispatch();
    const [date, setdate] = React.useState('');

    const {
        isCINDetailsByDate, isGSTByLastDays, GSTByLastDaysData, isGSTByLastDaysFetching, isCINDetailsByDateFetching, CINDetailsByDateData,
        isCinFetching, isCin, isMe,
        isGetCINDetailsCountByLastXDays, GetCINAddressByPinData, isGetCINAddressByPin, isGetCINAddressByPinFetching,
        GetPincodeLatLongData, isGetPincodeLatLongFetching, isGetPincodeLatLong,
        isGetCINDetailsCountByLastXDaysFetching, GetCINDetailsCountByLastXDaysData, GetPincodeLatLongGSTData } = useSelector(TBSelector);


    const CountByDay = () => {
        dispatch(GSTByLastDays({
            Days: "90",
        }))
    }
    React.useEffect(() => {
        CountByDay()
    }, [])
    // Lat And Log
    React.useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    setLocation(newLocation)
                },
                (error) => console.log(error),
                { enableHighAccuracy: true }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);
    const eventsDataPicker = (data) => {
        if (isMe.credit < 0 || isMe.credit == "") {
            openNotification(
                "error",
                "Error",
                "This feature requires additional credits. Please check your plan or add credits to proceed.",
                true,
                true
            );
            return;
        }
        // console.log("arg.dateStr", arg.dateStr);
        if (!location.latitude && !location.longitude) {
            openNotification('error', 'Error', "Please Allow Location Access", true, true);
            return;
        }
        if (!isGetPincodeLatLongFetching && !isGetCINAddressByPinFetching) {
            dispatch(GetPincodeLatLong({
                "latitude": `${location.latitude}`,
                "longitude": `${location.longitude}`
            }))
            setdate(`${data.end}`)
        };

    }

    React.useEffect(() => {
        let updatedEvents = [];
        if (isGSTByLastDays) {
            GSTByLastDaysData?.map((key) => {
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
            dispatch(updateState({ isCINDetailsByDate: false, isGSTByLastDays: false }))
        }
    }, [isGSTByLastDays, GSTByLastDaysData])
    React.useEffect(() => {
        if (isGetPincodeLatLong) {
            dispatch(GetPincodeLatLongGST({
                "pincode": `${GetPincodeLatLongData[GetPincodeLatLongData.length - 1].long_name}`,
                "effectiveDateofregistration": `${date}`
            }))
            dispatch(updateState({ isGetPincodeLatLong: false }))
        }
    }, [GetPincodeLatLongGST, isGetPincodeLatLong]);
    return (
        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
            <Card extra="p-4">
                {isGSTByLastDaysFetching ?
                    (
                        <>
                            <Skeleton active />
                            <Skeleton active />
                            <Skeleton active />
                            <Skeleton active />
                        </>
                    ) :
                    (
                        <NewCountCalendar events={events} eventsDataPicker={eventsDataPicker} />
                    )
                }
            </Card>
            <Card extra="p-4">
                <NewGstTable GetPincodeLatLongGSTData={GetPincodeLatLongGSTData} />
            </Card>
        </div>
    )
}
