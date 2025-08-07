import TableComponents from 'components/ant/TableComponents'
import React from 'react'

export default function DirectorsTable({ classifications }) {
    const columns = [
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Contact No',
            dataIndex: 'contact_no',
            key: 'contact_no',
        },
        {
            title: 'Dir Name',
            dataIndex: 'dir_name',
            key: 'dir_name',
        },
        {
            title: 'Father Name',
            dataIndex: 'father_name',
            key: 'father_name',
        },

    ];
    const data = []
    classifications?.map((item, index) => (data.push({ key: index, address: item.address, contact_no: item.contact_no, dir_name: item.dir_name, father_name: item.father_name })))
    return (
        <TableComponents columns={columns} dataSource={data} pagination={false} />
    )
}
