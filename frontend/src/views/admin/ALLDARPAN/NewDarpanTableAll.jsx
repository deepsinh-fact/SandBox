import TableComponents from 'components/ant/TableComponents';
import moment from 'moment';
import React from 'react'

export default function NewDarpanTableAll({ data }) {
    const Columns1 = [
        {
            title: <span>No</span>,
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: <span>NGO&nbsp;ID</span>,
            dataIndex: 'ngoId',
            key: 'ngoId',
        },
        {
            title: <span>NGO&nbsp;Name</span>,
            dataIndex: 'ngoName',
            key: 'ngoName',
        },
        {
            title: <span>Registration&nbsp;No</span>,
            dataIndex: 'regNo',
            key: 'regNo',
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
            title: <span>Address</span>,
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: <span>Pincode</span>,
            dataIndex: 'pincode',
            key: 'pincode',
        },
        {
            title: <span>Sub&nbsp;District</span>,
            dataIndex: 'subDistrict',
            key: 'subDistrict',
        },
        {
            title: <span>Registration&nbsp;Date</span>,
            dataIndex: 'regDate',
            key: 'regDate',
            render: (text) => moment(text).format("DD-MM-YYYY"),
        },
        {
            title: <span>NGO&nbsp;Type</span>,
            dataIndex: 'ngoType',
            key: 'ngoType',
        },
        {
            title: <span>Registration&nbsp;Authority</span>,
            dataIndex: 'regAuth',
            key: 'regAuth',
        },
        {
            title: <span>Activity&nbsp;Name</span>,
            dataIndex: 'actName',
            key: 'actName',
        },
        {
            title: <span>Email</span>,
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: <span>Mobile</span>,
            dataIndex: 'mobile',
            key: 'mobile',
        },
        {
            title: <span>URL</span>,
            dataIndex: 'url',
            key: 'url',
            render: (text) => <a href={text} target="_blank">{text}</a>,
        },
        {
            title: <span>Submit&nbsp;Date</span>,
            dataIndex: 'submitDate',
            key: 'submitDate',
            render: (text) => moment(text).format("DD-MM-YYYY"),
        },


    ];

    return (
        <>
            <TableComponents scrollx={1200} columns={Columns1} dataSource={data} />
        </>
    )
}
