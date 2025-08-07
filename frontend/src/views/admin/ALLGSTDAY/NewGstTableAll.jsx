import TableComponents from 'components/ant/TableComponents';
import moment from 'moment';
import React from 'react'

export default function NewGstTableAll({ data }) {
    const Columns1 = [
        {
            title: <span>GSTIN</span>,
            dataIndex: 'gstin',
            key: 'gstin',
        },
        {
            title: <span>Mobile</span>,
            dataIndex: 'mobile',
            key: 'mobile',
        },
        {
            title: <span>Email</span>,
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: <span>Legal&nbsp;Name</span>,
            dataIndex: 'legal_Name',
            key: 'legal_Name',
        },
        {
            title: <span>Trade&nbsp;Name</span>,
            dataIndex: 'trade_Name',
            key: 'trade_Name',
        },
        {
            title: <span>Business&nbsp;Constitution</span>,
            dataIndex: 'business_Constitution',
            key: 'business_Constitution',
        },
        {
            title: <span>Business&nbsp;Nature</span>,
            dataIndex: 'business_Nature',
            key: 'business_Nature',
        },
        {
            title: <span>Taxpayer&nbsp;Type</span>,
            dataIndex: 'taxpayer_Type',
            key: 'taxpayer_Type',
        },
        {
            title: <span>Status</span>,
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: <span>District</span>,
            dataIndex: 'district',
            key: 'district',
        },
        {
            title: <span>State</span>,
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: <span>Pan</span>,
            dataIndex: 'pan',
            key: 'pan',
        },
        {
            title: <span>Registration&nbsp;Date</span>,
            dataIndex: 'reg_Date',
            key: 'reg_Date',
        },
        {
            title: <span>Aggre&nbsp;Turn&nbsp;Over&nbsp;FY</span>,
            dataIndex: 'aggreTurnOverFY',
            key: 'aggreTurnOverFY',
        },
        {
            title: <span>Aggre&nbsp;Turn&nbsp;Over</span>,
            dataIndex: 'aggreTurnOver',
            key: 'aggreTurnOver',
        },
        {
            title: <span>Address</span>,
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: <span>Company&nbsp;Registration&nbsp;Date</span>,
            dataIndex: 'comp_Reg_Date',
            key: 'comp_Reg_Date',
            render: (text) => moment(text).format("DD-MM-YYYY"),
        },


    ];

    return (
        <>
            <TableComponents scrollx={1200} columns={Columns1} dataSource={data} />
        </>
    )
}
