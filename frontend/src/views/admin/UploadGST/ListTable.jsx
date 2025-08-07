import TableComponents from "components/ant/TableComponents";
import moment from "moment";
import Service from "Service/Service";

export default function ListTable({ data, loading }) {
    const columns = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
        },
        {
            title: "User Name",
            dataIndex: "userName",
            key: "userName",
        },
        {
            title: "Module Type",
            dataIndex: "moduleType",
            key: "moduleType",
            filters: Service.unique(data.map((item) => item.moduleType)).map((item) => ({
                text: item,
                value: item,
            })),
            onFilter: (value, record) => record.moduleType === value,
        },
        {
            title: "Action Type",
            dataIndex: "actionType",
            key: "actionType",
        },
        {
            title: "File Name",
            dataIndex: "fileName",
            key: "fileName",
        },
        {
            title: "Log Date",
            dataIndex: "logDate",
            key: "logDate",
            render: (text) => moment(text).format("DD-MM-YYYY HH:mm:ss"),
        },
        {
            title: "No Of Records",
            dataIndex: "noOfRecords",
            key: "noOfRecords",
        },
    ];
    return (
        <TableComponents
            scrollx={1200}
            columns={columns}
            dataSource={data.map((item, index) => ({
                ...item,
                no: index + 1
            }))}
            loading={loading}
            rowKey="autoId"
        />
    )
}