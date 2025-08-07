import TableComponents from 'components/ant/TableComponents'
import React from 'react'

export default function ClassificationsTable({ classifications }) {
    const columns = [
        {
            title: 'Year',
            dataIndex: 'Year',
            key: 'Year',
        },
        {
            title: 'Date',
            dataIndex: 'Date',
            key: 'Date',
        },
        {
            title: 'Type',
            dataIndex: 'Type',
            key: 'Type',
        },
    ];
    const data = []
    classifications?.map((item, index) => (data.push({ key: index, Year: item.year, Date: item.date, Type: item.type })))
    return (
        <TableComponents columns={columns} dataSource={data} pagination={false} />
    )
}
