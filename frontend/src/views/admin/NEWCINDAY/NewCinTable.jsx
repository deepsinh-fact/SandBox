import AntModalComponents from 'components/ant/AntModalComponents';
import TableComponents from 'components/ant/TableComponents';
import GoogleMaps from 'components/GoogleMaps';
import React, { useState } from 'react'
import { TfiMapAlt } from 'react-icons/tfi';
import { useDispatch, useSelector } from 'react-redux';
import Service from 'Service/Service';
import ServiceApiName from 'Service/ServiceApiName';
import { Cin, Ewallet } from 'Store/Reducers/TBSlice';
import { TBSelector } from 'Store/Reducers/TBSlice';

export default function NewCinTable({ GetCINAddressByPinData }) {
    const dispatch = useDispatch();
    const { isloading } = useSelector(TBSelector);
    const [modal1Open, setModal1Open] = React.useState(false);
    const [CinData, setMapView] = useState([])
    const Columns1 = [
        {
            title: 'CIN',
            dataIndex: 'cin',
        },
        {
            title: <span>Company</span>,
            dataIndex: 'companyName',
        },
        {
            title: 'Date',
            dataIndex: 'companyRegistrationDate',
        },

        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'registeredOfficeAddress',
        },
        {
            title: 'Din Count',
            dataIndex: 'dinCount',
            className: "text-center",
        },
        {
            title: 'Map View',
            dataIndex: 'mapView',
        },
    ];
    const dataSource1 = GetCINAddressByPinData?.data?.map((_, i) => (
        {
            key: _.key,
            cin: <button disabled={isloading} className={`${isloading ? "" : "text-blue-700"} cursor-pointer`} onClick={() => Service.walletBalanceFunction(ServiceApiName.Cinsearch, dispatch, Ewallet, _.cin)}>{_.cin}</button>,
            companyName: _.companyName,
            companyRegistrationDate: Service.dateFormatingyymmdd(_.companyRegistrationDate),
            email: _.email,
            dinCount: _.dinCount,
            registeredOfficeAddress: _.registeredOfficeAddress,
            mapView:
                <TfiMapAlt onClick={() => [setMapView({ "companyName": _.companyName, "latitude": _.latitude, "longitude": _.longitude }), setModal1Open(true)]
                } className="w-6 text-xl text-navy-500 mx-auto cursor-pointer" />
        }
    ));
    return (
        <>
            <TableComponents scrollx={1200} columns={Columns1} dataSource={dataSource1} pagination={false} />
            <AntModalComponents title={CinData?.companyName ? `Map Of ${Service.toCapitalize(CinData?.companyName)}` : "Map"} width={900} ModalOpen={modal1Open} handleCancel={setModal1Open}>
                <GoogleMaps latitude={CinData?.latitude} longitude={CinData?.longitude} name={CinData?.companyName ? Service.toCapitalize(CinData?.companyName) : "Company Name"} />
            </AntModalComponents>
        </>
    )
}
