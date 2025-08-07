import BoxCard from 'components/BoxCard';
import Card from 'components/card'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Service from 'Service/Service'
import { TBSelector, PanSearch, Mobile360, MobileToMultipleUPI, Businesspansearch } from 'Store/Reducers/TBSlice';
import RCMCTable from './RCMCTable';
import DirectorsTable from './DirectorsTable';
import ServiceApiName from 'Service/ServiceApiName';
import { Ewallet } from 'Store/Reducers/TBSlice';
import PdfDownload from 'components/PdfDownload';


export default function IecDetail() {
    const { IESDetailApiData } = useSelector(TBSelector);
    const dispatch = useDispatch();
    const getValuePan = (description) => {
        if (description[3].toLowerCase() === "f") {
            Service.walletBalanceFunction(ServiceApiName.BusinessPansearch, dispatch, Ewallet, description)
        } else {
            Service.walletBalanceFunction(ServiceApiName.Pansearch, dispatch, Ewallet, description)
        }
    }
    const getValueMobile = (description) => {
        Service.walletBalanceFunction(ServiceApiName.Mobile360search, dispatch, Ewallet, description)
    }
    return (
        <>
            <div className='grid mb-2 grid-cols-1 xl:grid-cols-1 gap-2 px-0'>
                <Card extra={"w-full h-full p-3"}>
                    <div className='flex md:justify-between justify-center md:flex-nowrap flex-wrap gap-x-2'>
                        <div className="mt-2 mb-8 md:text-left text-center">
                            <h4 className="px-2 text-2xl font-bold text-navy-700 dark:text-white">
                                {IESDetailApiData?.name ? Service.toCapitalize(IESDetailApiData?.name) : "--"}
                            </h4>
                            <p className="text-base text-gray-600 px-3">{IESDetailApiData?.snumber}</p>

                        </div>
                        <div className='md:w-auto w-full md:mb-0 mb-2'>
                            <div className="flex justify-end">
                                <PdfDownload apiName={ServiceApiName.Iecsearch} NameOfCompany={IESDetailApiData?.name} title={IESDetailApiData?.snumber} />
                            </div>
                        </div>
                    </div>
                    <div className="grid xl:grid-cols-2 grid-cols-1 gap-x-5 gap-y-2">
                        <div className='grid grid-cols-1 gap-2'>
                            <BoxCard no={1} name={"Enterprise Name"} description={IESDetailApiData?.name ? Service.toCapitalize(IESDetailApiData?.name) : "--"}></BoxCard>
                            <BoxCard no={2} getValue={getValuePan} name={"Pan Number"} description={IESDetailApiData?.pan}></BoxCard>
                            <BoxCard no={3} name={"Bin Pan Extension"} description={IESDetailApiData?.bin_pan_extension}></BoxCard>
                            <BoxCard no={4} maskNum={true} name={"Mobile Number"} description={IESDetailApiData?.phone_no}></BoxCard>
                            <BoxCard no={5} name={"Email Id"} maskEmail={true} description={IESDetailApiData?.e_mail}></BoxCard>
                            <BoxCard no={6} name={"Company Type"} description={IESDetailApiData?.nature_of_concern}></BoxCard>
                            <BoxCard no={7} name={"Category of Exporters"} description={IESDetailApiData?.exporter_type}></BoxCard>
                            <BoxCard no={8} name={"IEC Status"} description={IESDetailApiData?.iec_status}></BoxCard>
                            <BoxCard no={9} name={"ICEGATE Status"} description={IESDetailApiData?.iecgate_status}></BoxCard>
                            <BoxCard no={10} name={"File Number"} description={IESDetailApiData?.file_number}></BoxCard>
                            <BoxCard no={11} name={"File Date"} description={IESDetailApiData?.file_date}></BoxCard>
                            <BoxCard no={14} name={"Date Of Incorporation "} description={IESDetailApiData?.date_of_establishment}></BoxCard>
                            <BoxCard no={12} name={"IEC Allotment Date"} description={IESDetailApiData?.iec_allotment_date}></BoxCard>
                            <BoxCard no={13} name={"Party Name And Address"} description={IESDetailApiData?.party_name_and_address}></BoxCard>
                        </div>
                        <div className='md:mt-0 mt-5'>
                            <div className="mt-6 xl:absolute top-2 mb-2  md:text-left text-center">
                                <h4 className="px-2 text-2xl font-bold text-navy-700 dark:text-white">
                                    RCMC
                                </h4>
                            </div>
                            <RCMCTable classifications={IESDetailApiData?.rcmc_details} />
                            <div className="mt-1 top-2 mb-2  md:text-left text-center">
                                <h4 className="px-2 text-2xl font-bold text-navy-700 dark:text-white">
                                    Branch
                                </h4>
                            </div>
                            <div className='grid grid-cols-1 gap-2'>
                                {IESDetailApiData?.branches?.map((item, _) => (
                                    <div key={`${item.digit2} ,${_}`}>
                                        <BoxCard no={1} name={`Address ${item.branch_code}`} description={item.address}></BoxCard>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-x-5 gap-y-2">
                        <div className='md:mt-0 mt-5'>
                            <div className="mt-6 top-2 mb-2  md:text-left text-center">
                                <h4 className="px-2 text-2xl font-bold text-navy-700 dark:text-white">
                                    Directors
                                </h4>
                            </div>
                            <DirectorsTable classifications={IESDetailApiData?.directors} />
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}
