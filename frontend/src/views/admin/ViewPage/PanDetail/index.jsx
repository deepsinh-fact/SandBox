import BoxCard from 'components/BoxCard';
import Card from 'components/card'
import PdfDownload from 'components/PdfDownload';
import RefreshBtn from 'components/RefreshBtn';
import SpinAnimate from 'components/RefreshBtn/SpinAnimate';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Service from 'Service/Service'
import ServiceApiName from 'Service/ServiceApiName';
import { Ewallet } from 'Store/Reducers/TBSlice';
import { TBSelector } from 'Store/Reducers/TBSlice';

export default function PanDetail() {
    const { isEwallet, PanSearchData, BusinessPanSearchData, isloading, isPansearchRefreshDetailsFetching } = useSelector(TBSelector);
    const dispatch = useDispatch();
    let productsName = ServiceApiName.PanRefresh;

    const handleRefresh = () => {
        if (PanSearchData?.pan_number) {
            if (!isloading) {
                Service.walletBalanceFunction(productsName, dispatch, Ewallet, PanSearchData?.pan_number)
            }
        }
    }
    const getDinnumber = (number) => {
        Service.walletBalanceFunction(ServiceApiName.Dinsearch, dispatch, Ewallet, number)
    }

    return (
        <>
            <div className='grid mb-2 grid-cols-1 xl:grid-cols-2 gap-2 px-0'>
                <Card extra={"w-full h-full p-3"}>
                    <div className='flex md:justify-between justify-center md:flex-nowrap flex-wrap gap-x-2'>
                        <div className="mt-2 mb-8 md:text-left text-center">
                            <h4 className="px-2 text-2xl font-bold text-navy-700 dark:text-white">
                                {PanSearchData?.full_name ? Service.toCapitalize(PanSearchData?.full_name) : "--"}
                            </h4>
                            <p className="text-base text-gray-600 px-3">{PanSearchData?.pan_type ? `${Service.PanType(PanSearchData?.pan_type)} Pan` : "Personal PAN"} : {PanSearchData?.pan_number || BusinessPanSearchData?.director_or_sole_proprietor_details?.pan}</p>
                            <p className="text-base text-gray-600 px-3"></p>
                        </div>

                        <div className='md:w-auto w-full md:mb-0 mb-2'>
                            <div className="flex justify-end">
                                {/* <RefreshBtn handleRefresh={handleRefresh} >
                                    <SpinAnimate loading={isEwallet || isPansearchRefreshDetailsFetching}></SpinAnimate> Refresh
                                </RefreshBtn> */}
                                <div className="flex py-2 justify-end">
                                    <PdfDownload apiName={ServiceApiName.Pansearch} NameOfCompany={PanSearchData?.full_name} title={PanSearchData?.pan_number} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className='grid grid-rows-1 gap-2'>
                            <BoxCard no={1} name={"Full Name"} description={PanSearchData?.full_name ? Service.toCapitalize(PanSearchData?.full_name) : BusinessPanSearchData?.director_or_sole_proprietor_details?.full_name ? Service.toCapitalize(BusinessPanSearchData?.director_or_sole_proprietor_details?.full_name) : ""}></BoxCard>
                            <BoxCard no={2} name={"Gender"} description={[PanSearchData?.gender === "M" ? "Male" : "", PanSearchData?.gender === "F" ? "Female" : "", BusinessPanSearchData?.director_or_sole_proprietor_details?.gender === "M" ? "Male" : "", BusinessPanSearchData?.director_or_sole_proprietor_details?.gender === "F" ? "Female" : ""]}></BoxCard>
                            <BoxCard no={1} name={"Aadhaar Number"} description={PanSearchData?.masked_aadhaar || BusinessPanSearchData?.director_or_sole_proprietor_details?.aadhaar || ""}></BoxCard>
                            <BoxCard no={1} name={"Address"} description={PanSearchData?.address?.full ? Service.toCapitalize(PanSearchData?.address?.full) : ""}></BoxCard>
                            <BoxCard no={1} name={"Email"} description={PanSearchData?.email || BusinessPanSearchData?.director_or_sole_proprietor_details?.email || ""}></BoxCard>
                            <BoxCard no={1} name={"Tax"} description={PanSearchData?.tax || ""}></BoxCard>
                            <BoxCard no={1} name={"Phone Number"} description={PanSearchData?.phone_number || BusinessPanSearchData?.director_or_sole_proprietor_details?.mobile || ""}></BoxCard>
                            <BoxCard no={1} name={"Date Of Birth"} description={PanSearchData?.dob || BusinessPanSearchData?.director_or_sole_proprietor_details?.date_of_birth || ""}></BoxCard>
                            <BoxCard no={1} name={"Aadhaar Linked"} description={PanSearchData?.aadhaar_linked ? "Yes" : "-"}></BoxCard>
                            <BoxCard no={1} name={"Category"} description={PanSearchData?.category}></BoxCard>
                            <BoxCard no={1} name={"Director"} description={PanSearchData?.is_director?.found || BusinessPanSearchData?.director_or_sole_proprietor_details?.pan_type}></BoxCard>
                            {PanSearchData?.din_info?.din && <BoxCard getValue={getDinnumber} no={1} name={"DIN"} description={PanSearchData?.din_info?.din}></BoxCard>}
                            {PanSearchData?.din_info?.dinAllocationDate && <BoxCard no={1} name={"Din Allocation Date"} description={PanSearchData?.din_info?.dinAllocationDate}></BoxCard>}
                            {PanSearchData?.din_info?.company_list &&
                                PanSearchData?.din_info?.company_list.map((key, index) => (
                                    <div key={index} className='grid grid-rows-1 gap-2'>
                                        <BoxCard getValue={(number) => Service.walletBalanceFunction(ServiceApiName.Cinsearch, dispatch, Ewallet, number)} no={1} name={"CIN"} description={key.cin}></BoxCard>
                                        <BoxCard no={1} name={"Company Name"} description={key.company_name}></BoxCard>
                                    </div>
                                ))
                            }
                            {PanSearchData?.is_director?.info.length ?
                                PanSearchData?.is_director?.info.map((key, index) => (
                                    <div key={index} className='grid grid-rows-1 gap-2'>
                                        <BoxCard getValue={(number) => Service.walletBalanceFunction(ServiceApiName.Gstsearch, dispatch, Ewallet, number)} no={1} name={"GST"} description={key.gst}></BoxCard>
                                    </div>
                                ))
                                :
                                null
                            }
                        </div>
                    </div>
                </Card>
                <Card extra={"w-full h-full p-3"}>
                    <div className='flex md:justify-between justify-center md:flex-nowrap flex-wrap gap-x-2'>
                        <div className="mt-2 mb-8 md:text-left text-center">
                            <h4 className="px-2 text-2xl font-bold text-navy-700 dark:text-white">
                                {BusinessPanSearchData?.organisation_name ? Service.toCapitalize(BusinessPanSearchData?.organisation_name) : "--"}
                            </h4>
                            <p className="text-base text-gray-600 px-3">Business PAN : {BusinessPanSearchData?.pan}</p>
                            <p className="text-base text-gray-600 px-3"></p>
                        </div>
                        <div className='md:w-auto w-full md:mb-0 mb-2'>
                            <div className="flex justify-end">
                                {/* <RefreshBtn handleRefresh={handleRefresh} >
                                    <SpinAnimate loading={isEwallet || isPansearchRefreshDetailsFetching}></SpinAnimate> Refresh
                                </RefreshBtn> */}
                                <div className="flex py-2 justify-end">
                                    <PdfDownload apiName={ServiceApiName.Pansearch} NameOfCompany={BusinessPanSearchData?.organisation_name} title={BusinessPanSearchData?.pan} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className='grid grid-rows-1 gap-2'>
                            <BoxCard no={1} name={"Full Name"} description={BusinessPanSearchData?.organisation_name ? Service.toCapitalize(BusinessPanSearchData?.organisation_name) : ""}></BoxCard>
                            <BoxCard no={2} name={"Organisation Incorporate Date"} description={BusinessPanSearchData?.organisation_incorporate_date}></BoxCard>
                            <BoxCard no={1} name={"Cin"} description={BusinessPanSearchData?.cin}></BoxCard>
                            <BoxCard no={1} name={"Director DIN"} description={BusinessPanSearchData?.director_din}></BoxCard>
                            <BoxCard no={1} name={"Director PAN"} description={BusinessPanSearchData?.director_pan}></BoxCard>
                            <BoxCard no={1} name={"Address"} description={`${BusinessPanSearchData?.organisation_address?.address_line_1 || ""}
                                                                               ${BusinessPanSearchData?.organisation_address?.address_line_2 || ""} 
                                                                               ${BusinessPanSearchData?.organisation_address?.address_line_3 || ""} 
                                                                               ${BusinessPanSearchData?.organisation_address?.address_line_4 || ""} 
                                                                               ${BusinessPanSearchData?.organisation_address?.address_line_5 || ""} 
                                                                               ${BusinessPanSearchData?.organisation_address?.pin_code || ""} 
                                                                                `}></BoxCard>
                            <BoxCard no={1} name={"Email"} description={BusinessPanSearchData?.director_or_sole_proprietor_details?.email}></BoxCard>
                            <BoxCard no={1} name={"Phone Number"} description={BusinessPanSearchData?.director_or_sole_proprietor_details?.mobile}></BoxCard>
                            <BoxCard no={1} name={"Category"} description={""}></BoxCard>
                            <BoxCard no={1} name={"Director"} description={""}></BoxCard>
                            <BoxCard no={1} name={"Business PAN"} description={BusinessPanSearchData?.pan}></BoxCard>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}
