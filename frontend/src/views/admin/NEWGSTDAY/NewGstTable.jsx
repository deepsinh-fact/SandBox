import AntModalComponents from 'components/ant/AntModalComponents';
import TableComponents from 'components/ant/TableComponents';
import GoogleMaps from 'components/GoogleMaps';
import React, { useState } from 'react'
import { TfiMapAlt } from 'react-icons/tfi';
import { useDispatch, useSelector } from 'react-redux';
import Service from 'Service/Service';
import ServiceApiName from 'Service/ServiceApiName';
import { TBSelector } from 'Store/Reducers/TBSlice';
import { Ewallet } from 'Store/Reducers/TBSlice';
import { Gstsearch } from 'Store/Reducers/TBSlice';

export default function NewGstTable({ GetPincodeLatLongGSTData }) {
    const dispatch = useDispatch();
    const { isloading } = useSelector(TBSelector);
    const [modal1Open, setModal1Open] = React.useState(false);
    const [CinData, setMapView] = useState([])
    const Columns1 = [
        {
            title: 'GSTIN',
            dataIndex: 'gstin',
            fixed: 'left',
            key: '1',
        },
        {
            title: 'Company Name',
            dataIndex: 'legalNameOfBusiness',
            key: '2',
        },

        {
            title: 'Place Of Business',
            dataIndex: 'principalPlaceOfBusiness',
            key: '2',
        },
        {
            title: 'TradeName',
            dataIndex: 'tradeName',
            key: '3',
        },
        {
            title: 'Date',
            dataIndex: 'effectiveDateOfRegistration',
            key: "4",
        },
        {
            title: 'Map view',
            dataIndex: 'mapView',
            key: "5",
        },

    ];
    const dataSource1 = GetPincodeLatLongGSTData?.data?.map((_, i) => (
        {
            key: _.gstin,
            gstin: <button disabled={isloading} className={`${isloading ? "" : "text-blue-700"} cursor-pointer`} onClick={() => Service.walletBalanceFunction(ServiceApiName.Gstsearch, dispatch, Ewallet, _.gstin)}>{_.gstin}</button>,
            effectiveDateOfRegistration: _.effectiveDateOfRegistration,
            legalNameOfBusiness: _.legalNameofBusiness,
            principalPlaceOfBusiness: _.principalPlaceofBusiness,
            tradeName: _.tradeName,
            mapView:
                <TfiMapAlt onClick={() => [setMapView({ "companyName": _.tradeName, "latitude": _.latitude, "longitude": _.longitude }), setModal1Open(true)]
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
