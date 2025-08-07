import TableComponents from 'components/ant/TableComponents';
import moment from 'moment';
import React from 'react'

export default function NewIECTableAll({ data }) {
    const Columns1 = [
        {
            title: <span>No</span>,
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: <span>IEC&nbsp;Number</span>,
            dataIndex: 'ieC_Number',
            key: 'ieC_Number',
        },
        {
            title: <span>PAN&nbsp;Number</span>,
            dataIndex: 'paN_Number',
            key: 'paN_Number',
        },
        {
            title: <span>DOB</span>,
            dataIndex: 'dob',
            key: 'dob',
            render: (text) => moment(text).format("DD-MM-YYYY"),
        },
        {
            title: <span>Issuance&nbsp;Date</span>,
            dataIndex: 'issuance_Date',
            key: 'issuance_Date',
            render: (text) => moment(text).format("DD-MM-YYYY"),
        },
        {
            title: <span>IEC&nbsp;Status</span>,
            dataIndex: 'ieC_Status',
            key: 'ieC_Status',
        },
        {
            title: <span>Del&nbsp;Status</span>,
            dataIndex: 'deL_Status',
            key: 'deL_Status',
        },
        {
            title: <span>Cancelled&nbsp;Date</span>,
            dataIndex: 'cancelled_Date',
            key: 'cancelled_Date',
            render: (text) => moment(text).format("DD-MM-YYYY"),
        },
        {
            title: <span>Suspended&nbsp;Date</span>,
            dataIndex: 'suspended_Date',
            key: 'suspended_Date',
            render: (text) => moment(text).format("DD-MM-YYYY"),
        },
        {
            title: <span>DGF&nbsp;T&nbsp;RA&nbsp;Office</span>,
            dataIndex: 'dgfT_RA_Office',
            key: 'dgfT_RA_Office',
        },
        {
            title: <span>Nature&nbsp;of&nbsp;Concern&nbsp;Firm</span>,
            dataIndex: 'nature_of_concern_firm',
            key: 'nature_of_concern_firm',
        },
        {
            title: <span>Category&nbsp;of&nbsp;Exporter</span>,
            dataIndex: 'category_of_Exporters',
            key: 'category_of_Exporters',
        },
        {
            title: <span>Firm&nbsp;Name</span>,
            dataIndex: 'firm_Name',
            key: 'firm_Name',
        },
        {
            title: <span>IEC&nbsp;Address</span>,
            dataIndex: 'iec_Address',
            key: 'iec_Address',
        },
        {
            title: <span>Pincode</span>,
            dataIndex: 'pincode',
            key: 'pincode',
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


    ];

    return (
        <>
            <TableComponents scrollx={1200} columns={Columns1} dataSource={data} />
        </>
    )
}
