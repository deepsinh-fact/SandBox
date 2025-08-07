import React from 'react';
import Card from 'components/card';
import InputGloble from 'components/fields/InputGloble';
import ServiceRegExr from 'Service/RegExr';
import { useForm } from 'react-hook-form';
import { useNotificationContext } from 'createContextStore/NotificationContext';
import { useDispatch, useSelector } from 'react-redux';
import { TBSelector, BankPincode, updateState } from 'Store/Reducers/TBSlice';
import { Table, Spin } from 'antd';
import moment from 'moment';

const BankSearch = () => {
    const { openNotification } = useNotificationContext();
    const { isBankPincode, isBankPincodeFetching, BankPincodeData = [] } = useSelector(TBSelector);
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const [totalCount, setTotalCount] = React.useState(null);

    const onSubmit = (data) => {
        const number = data.searchNumber.trim();
        if (ServiceRegExr.bankRegExr.test(number)) {
            dispatch(BankPincode({ searchNumber: number }));
        } else {
            openNotification('error', 'Error', "Invalid Format", true, true);
        }
    };

    React.useEffect(() => {
        if (isBankPincode) {
            dispatch(updateState({ isBankPincode: false }));
        }
    }, [isBankPincode, dispatch]);

    React.useEffect(() => {
        setTotalCount(BankPincodeData.length);
    }, [BankPincodeData]);

    const groupedData = Object.entries(
        BankPincodeData.reduce((acc, item) => {
            const key = item.bankName;
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
        }, {})
    ).map(([bankName, records], index) => ({
        key: `${bankName}-${index}`,
        bankName,
        children: records.map((item, idx) => ({ key: `${bankName}-${idx}`, ...item })),
    }));


    const columns = [
        { title: "Bank Name", dataIndex: "bankName", key: "bankName" },
    ];

    const childColumns = [
        { title: "Sr No", dataIndex: "srNo", key: "srNo" },
        { title: "Region", dataIndex: "region", key: "region" },
        { title: "State", dataIndex: "state", key: "state" },
        { title: "District", dataIndex: "district", key: "district" },
        { title: "Sub-District", dataIndex: "subDistrict", key: "subDistrict" },
        { title: "Address", dataIndex: "address", key: "address" },
        { title: "IFSC", dataIndex: "ifsc", key: "ifsc", render: (v) => v || "-" },
        { title: "Opened", dataIndex: "dateOfOpening", key: "dateOfOpening", render: (d) => moment(d).format("YYYY-MM-DD") },
        { title: "Type", dataIndex: "bankingChannelType", key: "bankingChannelType" },
        { title: "MICR", dataIndex: "micr", key: "micr", render: (v) => v || "-" },
    ];

    return (
        <div className='mt-5 grid h-full'>
            <div className='mt-0 grid h-full grid-cols-1 gap-5 lg:grid-cols-4'>
                <Card extra={"w-full flex col-span-4 h-[80vh] overflow-y-scroll pb-2 sm:overflow-auto px-6"}>
                    <header className="relative flex items-center justify-between pt-4">
                        <div className="text-xl font-bold text-navy-700 dark:text-white">
                            Pincode Search
                        </div>
                    </header>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 mt-4 items-end">
                        <InputGloble
                            placeholder="Enter Pincode"
                            type="number"
                            label="Din Number"
                            name="searchNumber"
                            maxLength={6}
                            {...register("searchNumber", {
                                required: "This number is required",
                            })}
                        />
                    </form>

                    <div className="p-2 mt-5">
                        <div className="flex justify-between items-center pr-6 border-b mb-6">
                            <div className="flex gap-2 items-center">
                                <span className="text-blue-800 font-bold">No.</span>
                                <h2 className="font-bold text-left text-blue-800">Bank Name</h2>
                            </div>
                            <div>
                                <span className="text-blue-800 font-bold">Count</span>
                            </div>
                        </div>

                        {isBankPincodeFetching ? (
                            <div className="flex justify-center my-10">
                                <Spin size="large" />
                            </div>
                        ) : (
                            <Table
                                columns={columns}
                                dataSource={groupedData}
                                expandable={{
                                    expandedRowRender: (record) => (
                                        <Table
                                            columns={childColumns}
                                            dataSource={record.children}
                                            pagination={false}
                                        />
                                    ),
                                    rowExpandable: (record) => record?.children?.length > 0,
                                }}
                                pagination={false}
                            />
                        )}

                        <div className="flex justify-end gap-10 items-center pr-6 mb-6 mt-4">
                            <h2 className="font-bold text-left text-blue-800">Total Count</h2>
                            <span className="text-blue-800 font-bold">{totalCount ?? 0}</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default BankSearch;
