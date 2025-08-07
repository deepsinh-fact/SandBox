import React from 'react'
import TableComponents from 'components/ant/TableComponents';
import moment from 'moment';
import { Tooltip } from 'antd';

export default function sAllCinTable({ data }) {
    const Columns1 = [
        {
            title: <span className='whitespace-nowrap'>S.No</span>,
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: <span className='whitespace-nowrap'>CIN</span>,
            dataIndex: 'cin',
            key: 'cin',
        },
        {
            title: <span className='whitespace-nowrap'>Company&nbsp;Name</span>,
            dataIndex: 'companyName',
            key: 'companyName',
        },
        {
            title: <span className='whitespace-nowrap'>Date&nbsp;Of&nbsp;Registration</span>,
            dataIndex: 'dateOfRegistration',
            key: 'dateOfRegistration',
            render: (text) => moment(text).format("DD-MM-YYYY"),
        },
        {
            title: <span className='whitespace-nowrap'>Pincode</span>,
            dataIndex: 'pincode',
            key: 'pincode',
        },
        {
            title: <span className='whitespace-nowrap'>City</span>,
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: <span className='whitespace-nowrap'>State</span>,
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: <span className='whitespace-nowrap'>Country</span>,
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: <span className='whitespace-nowrap'>ROC</span>,
            dataIndex: 'roc',
            key: 'roc',
        },
        {
            title: <span className='whitespace-nowrap'>Category</span>,
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: <span className='whitespace-nowrap'>Class</span>,
            dataIndex: 'class',
            key: 'class',
        },
        {
            title: <span className='whitespace-nowrap'>Sub&nbsp;Category</span>,
            dataIndex: 'subCategory',
            key: 'subCategory',
        },
        {
            title: <span className='whitespace-nowrap'>Authorized&nbsp;Capital</span>,
            dataIndex: 'authorizedCapital',
            key: 'authorizedCapital',
        },
        {
            title: <span className='whitespace-nowrap'>Paidup&nbsp;Capital</span>,
            dataIndex: 'paidupCapital',
            key: 'paidupCapital',
        },
        {
            title: <span className='whitespace-nowrap'>Total&nbsp;Obligation&nbsp;Contribution</span>,
            dataIndex: 'totalObligationContribution',
            key: 'totalObligationContribution',
        },
        {
            title: <span className='whitespace-nowrap'>Activity&nbsp;Code</span>,
            dataIndex: 'activityCode',
            key: 'activityCode',
        },
        {
            title: <span className='whitespace-nowrap'>Activity&nbsp;Description</span>,
            dataIndex: 'activityDescription',
            key: 'activityDescription',
        },
        {
            title: <span className='whitespace-nowrap'>NIC&nbsp;Code&nbsp;1</span>,
            dataIndex: 'nicCode1',
            key: 'nicCode1',
        },
        {
            title: <span className='whitespace-nowrap'>NIC&nbsp;Code&nbsp;1&nbsp;Description</span>,
            dataIndex: 'nicCode1Desc',
            key: 'nicCode1Desc',
        },
        {
            title: <span className='whitespace-nowrap'>Registered&nbsp;Office&nbsp;Address</span>,
            dataIndex: 'registeredOfficeAddress',
            key: 'registeredOfficeAddress',
        },
        {
            title: <span className='whitespace-nowrap'>Address&nbsp;Other&nbsp;Than&nbsp;RO</span>,
            dataIndex: 'addressOtherThanRO',
            key: 'addressOtherThanRO',
        },
        {
            title: <span className='whitespace-nowrap'>Company&nbsp;Email</span>,
            dataIndex: 'companyEmail',
            key: 'companyEmail',
        },
        {
            title: <span className='whitespace-nowrap'>DIN</span>,
            dataIndex: 'din',
            key: 'din',
        },
        {
            title: <span className='whitespace-nowrap'>Director&nbsp;Name</span>,
            dataIndex: 'directorName',
            key: 'directorName',
        },
        {
            title: <span className='whitespace-nowrap'>Date&nbsp;Join</span>,
            dataIndex: 'dateJoin',
            key: 'dateJoin',
            render: (text) => moment(text).format("DD-MM-YYYY"),
        },
        {
            title: <span className='whitespace-nowrap'>Designation</span>,
            dataIndex: 'designation',
            key: 'designation',
        },
        {
            title: <span className='whitespace-nowrap'>Date&nbsp;of&nbsp;Birth</span>,
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
            render: (text) => moment(text).format("DD-MM-YYYY"),
        },
        {
            title: <span className='whitespace-nowrap'>Mobile</span>,
            dataIndex: 'mobile',
            key: 'mobile',
        },
        {
            title: <span className='whitespace-nowrap'>Email</span>,
            dataIndex: 'email',
            key: 'email',
        },


    ];
    return (
        <div>
            <TableComponents scrollx={1800} columns={Columns1} dataSource={data} />
        </div>
    )
}
