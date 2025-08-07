import React from "react";
import NewCountCalendar from "components/calendar/NewCountCalendar";
import Card from "components/card";

import { useDispatch, useSelector } from "react-redux";
import { updateState } from "Store/Reducers/TBSlice";
import { GetCINDetailsCountByLastXDays } from "Store/Reducers/TBSlice";
import { TBSelector } from "Store/Reducers/TBSlice";
import { Skeleton } from "antd";
import { GetPincodeLatLong } from "Store/Reducers/TBSlice";
import { GetCINAddressByPin } from "Store/Reducers/TBSlice";
import { useNotificationContext } from "createContextStore/NotificationContext";
import NewCinTable from "./NewCinTable";

export default function NewCinDay() {
  const [events, setEvents] = React.useState([]);
  const { openNotification } = useNotificationContext();
  const [location, setLocation] = React.useState({});
  const [date, setdate] = React.useState("");
  const dispatch = useDispatch();
  const { isMe } = useSelector(TBSelector);

  const {
    isGetCINDetailsCountByLastXDays,
    GetCINAddressByPinData,
    isGetCINAddressByPinFetching,
    GetPincodeLatLongData,
    isGetPincodeLatLongFetching,
    isGetPincodeLatLong,
    GetCINDetailsCountByLastXDaysData,
    isGetCINDetailsCountByLastXDaysFetching,
  } = useSelector(TBSelector);

  const CountByDay = () => {
    dispatch(
      GetCINDetailsCountByLastXDays({
        Days: "90",
      })
    );
  };
  React.useEffect(() => {
    CountByDay();
  }, []);

  // Lat And Log
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(newLocation);
        },
        (error) => console.log(error),
        { enableHighAccuracy: true }
      );
    }
  }, []);
  const eventsDataPicker = (data) => {
    if (isMe.credit < 0) {
      openNotification(
        "error",
        "Error",
        "This feature requires additional credits. Please check your plan or add credits to proceed.",
        true,
        true
      );
      return;
    }
    dispatch(updateState({ isGetCINAddressByPin: false }));
    // console.log("arg.dateStr", arg.dateStr);
    if (!location.latitude && !location.longitude) {
      openNotification(
        "error",
        "Error",
        "Please Allow Location Access",
        true,
        true
      );
      return;
    }
    if (!isGetPincodeLatLongFetching && !isGetCINAddressByPinFetching) {
      dispatch(
        GetPincodeLatLong({
          latitude: `${location.latitude}`,
          longitude: `${location.longitude}`,
        })
      );

      setdate(`${data.end}`);
    }
  };
  React.useEffect(() => {
    let updatedEvents = [];
    if (isGetCINDetailsCountByLastXDays) {
      GetCINDetailsCountByLastXDaysData?.map((key) => {
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
          isCINDetailsByDate: false,
          isGetCINDetailsCountByLastXDays: false,
        })
      );
    }
  }, [isGetCINDetailsCountByLastXDays, GetCINDetailsCountByLastXDaysData]);

  React.useEffect(() => {
    if (isGetPincodeLatLong) {
      dispatch(
        GetCINAddressByPin({
          pincode: `${GetPincodeLatLongData[GetPincodeLatLongData.length - 1].long_name
            }`,
          companyRegistrationdate_date: `${date}`,
          // "pincode": `110001`,
          // "companyRegistrationdate_date": `2024-05-31`
        })
      );
      dispatch(updateState({ isGetPincodeLatLong: false }));
    }
  }, [GetPincodeLatLong, isGetPincodeLatLong]);
  return (
    <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
      <Card extra="p-4">
        {isGetCINDetailsCountByLastXDaysFetching ? (
          <>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </>
        ) : (
          <NewCountCalendar
            events={events}
            eventsDataPicker={eventsDataPicker}
          />
        )}
      </Card>
      <Card extra="p-4">
        <NewCinTable GetCINAddressByPinData={GetCINAddressByPinData} />
      </Card>
    </div>
  );
}