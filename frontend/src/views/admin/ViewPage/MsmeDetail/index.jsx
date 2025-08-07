import BoxCard from 'components/BoxCard';
import Card from 'components/card'
import PdfDownload from 'components/PdfDownload';
import RefreshBtn from 'components/RefreshBtn';
import SpinAnimate from 'components/RefreshBtn/SpinAnimate';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Service from 'Service/Service'
import ServiceApiName from 'Service/ServiceApiName';
import { Ewallet } from 'Store/Reducers/TBSlice';
import { TBSelector } from 'Store/Reducers/TBSlice';
import ClassificationsTable from 'views/admin/ViewPage/MsmeDetail/ClassificationsTable';

export default function MsmeDetail() {
    const { isEwallet, MsmeData, isloading, isMsmeRefreshDetailsFetching } = useSelector(TBSelector);
    const dispatch = useDispatch();
    const [officialAddress, setofficialAddress] = useState({})
    const [nicCodes, setnicCodes] = useState([])
    let productsName = ServiceApiName.MsmeRefresh;
    // (MsmeData)
    React.useEffect(() => {
        if (MsmeData?.officialAddress) {
            setofficialAddress(MsmeData?.officialAddress)
        }
        if (MsmeData?.nicCodes) {
            setnicCodes(MsmeData?.nicCodes)

        }
    }, [MsmeData])

    const handleRefresh = () => {
        if (MsmeData?.reg) {
            if (!isloading) {
                Service.walletBalanceFunction(productsName, dispatch, Ewallet, MsmeData?.reg)
            }
        }
    }
    return (
        <>
            <div className='grid mb-2 grid-cols-1 xl:grid-cols-1 gap-2 px-0'>
                <Card extra={"w-full h-full p-3"}>
                    <div className='flex md:justify-between justify-center md:flex-nowrap flex-wrap gap-x-2'>
                        <div className="mt-2 mb-8 md:text-left text-center">
                            <h4 className="px-2 text-2xl font-bold text-navy-700 dark:text-white">
                                {MsmeData?.entity ? Service.toCapitalize(MsmeData?.entity) : "--"}
                            </h4>
                            <p className="text-base text-gray-600 px-3">{MsmeData?.reg}</p>

                        </div>

                        <div className='md:w-auto w-full md:mb-0 mb-2'>
                            {/* <div className="flex justify-end">
                                <RefreshBtn handleRefresh={handleRefresh} >
                                    <SpinAnimate loading={isEwallet || isMsmeRefreshDetailsFetching}></SpinAnimate> Refresh
                                </RefreshBtn>
                            </div> */}
                            <div className="flex justify-end">
                                <PdfDownload apiName={ServiceApiName.Msmesearch} NameOfCompany={MsmeData?.entity} title={MsmeData?.reg} />
                            </div>
                        </div>
                    </div>
                    <div className="grid xl:grid-cols-2 grid-cols-1 gap-x-5 gap-y-2">
                        <div className='grid grid-cols-1 gap-2'>
                            <div className="flex flex-col gap-2">
                                <BoxCard no={1} name={"Enterprise Name"} description={MsmeData?.entity ? Service.toCapitalize(MsmeData?.entity) : "--"}></BoxCard>
                                <BoxCard no={2} name={"Mobile Number"} description={officialAddress?.maskedMobile}></BoxCard>
                                <BoxCard no={1} name={"Email Id"} maskEmail={true} description={officialAddress?.maskedEmail}></BoxCard>
                                <BoxCard no={1} name={"Company Type"} description={MsmeData?.type}></BoxCard>
                                <BoxCard no={1} name={"Social Category"} description={MsmeData?.socialCategory}></BoxCard>
                                <BoxCard no={1} name={"Incorporation Date"} description={MsmeData?.incorporated}></BoxCard>
                                <BoxCard no={1} name={"Commencement Date"} description={MsmeData?.commenced}></BoxCard>
                                <BoxCard no={1} name={"Registration Date"} description={MsmeData?.registered}></BoxCard>
                                <BoxCard no={1} name={"Address"} description={
                                    officialAddress?.unitNumber
                                    + ", " + officialAddress?.building
                                    + ", " + officialAddress?.villageOrTown
                                    + ", " + officialAddress?.block
                                    + ", " + officialAddress?.road
                                    + ", " + officialAddress?.city
                                    + ", " + officialAddress?.state
                                    + ", " + officialAddress?.district
                                    + ", " + officialAddress?.zip
                                }></BoxCard>
                            </div>
                        </div>
                        <div className='md:mt-0 mt-5'>
                            <div className="mt-6 xl:absolute top-2 mb-2  md:text-left text-center">
                                <h4 className="px-2 text-2xl font-bold text-navy-700 dark:text-white">
                                    Classifications
                                </h4>
                            </div>
                            <ClassificationsTable classifications={MsmeData?.classifications} />

                            <div className='h-96 overflow-y-auto'>
                                {nicCodes?.map((item, _) => (
                                    <div key={`${item.digit2} ,${_}`}>
                                        <div className="mt-1 top-2 mb-2  md:text-left text-center">
                                            <h4 className="px-2 text-2xl font-bold text-navy-700 dark:text-white">
                                                Nic Codes
                                            </h4>
                                            <p className='text-base text-gray-600 px-3'>{item.date}</p>
                                        </div>
                                        <div className='grid grid-cols-1 gap-2'>
                                            <BoxCard no={1} name={"Digit 2"} description={item.digit2}></BoxCard>
                                            <BoxCard no={2} name={"Digit 4"} description={item.digit4}></BoxCard>
                                            <BoxCard no={1} name={"Digit 5"} description={item.digit5}></BoxCard>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}
