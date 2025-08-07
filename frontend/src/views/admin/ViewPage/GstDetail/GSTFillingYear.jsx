import React from 'react'
import Service from 'Service/Service';
import TableComponents from 'components/ant/TableComponents';
export default function GSTFillingYear({ GSTfiling }) {
    let data = GSTfiling?.map((item, index) => ({
        key: index,
        financialyear: item.fy,
        TAX: Service.toCapitalize(item.taxp),
        MOF: Service.toCapitalize(item.mof),
        DOF: item.dof,
    }));


    const columns = [
        {
            title: 'Financial Year',
            dataIndex: 'financialyear',
            responsive: ['xs', 'sm', 'md', 'lg'],  // Responsive visibility
        },
        {
            title: 'TAX',
            dataIndex: 'TAX',
            responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
            title: 'MOF',
            dataIndex: 'MOF',
            responsive: ['xs', 'sm', 'md', 'lg'],  // Hide on small and extra small screens
            filters: [
                { text: 'Online', value: 'Online' },
            ],
            onFilter: (value, record) => record.MOF === value,
        },
        {
            title: 'DOF',
            dataIndex: 'DOF',
            responsive: ['xs', 'sm', 'md', 'lg'],  // Hide on extra small screens
        },
    ];

    return (
        <TableComponents columns={columns} dataSource={data} />
    )
}
