import React from 'react'
import TableComponents from 'components/ant/TableComponents'
import moment from 'moment';

export default function AnnualReturnFillingInfo({ annualReturnFillingInfo }) {
    const columns = [
        {
            title: "No",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Financial Year",
            dataIndex: "financialYear",
            key: "financialYear",
            render: (text) => moment(text).format("DD-MM-YYYY"),
        },
        {
            title: "Data Of Filling",
            dataIndex: "dataOfFilling",
            key: "dataOfFilling",
            render: (text) => moment(text).format("DD-MM-YYYY"),
        },
    ];
    const datas = annualReturnFillingInfo?.map((item, index) => {
        return {
            ...item,
            key: index + 1,
            name: index + 1,
        };
    });
    return (
        <div>
            <TableComponents columns={columns} dataSource={datas}></TableComponents>
        </div>
    )
}
