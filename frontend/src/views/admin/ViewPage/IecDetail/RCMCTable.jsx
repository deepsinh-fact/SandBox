import TableComponents from 'components/ant/TableComponents'
import React from 'react'

export default function RCMCTable({ classifications }) {
    const columns = [
        {
            title: 'No',
            dataIndex: 'No',
            key: 'No',
        },
        {
            title: 'Rcmc Issue Date',
            dataIndex: 'rcmc_issue_date',
            key: 'rcmc_issue_date',
        },
        {
            title: 'Rcmc Exp Date',
            dataIndex: 'rcmc_exp_date',
            key: 'rcmc_exp_date',
        },
        {
            title: 'Rcmc Issued By',
            dataIndex: 'rcmc_issued_by',
            key: 'rcmc_issued_by',
        },
        {
            title: 'Type',
            dataIndex: 'Type',
            key: 'Type',
        },
    ];
    const data = []
    classifications?.map((item, index) => (data.push({ key: index, No: item.rcmc_no, Type: item.rcmc_type, rcmc_issue_date: item.rcmc_issue_date, rcmc_exp_date: item.rcmc_exp_date, rcmc_issued_by: item.rcmc_issued_by })))
    return (
        <TableComponents columns={columns} dataSource={data} pagination={false} />
    )
}
