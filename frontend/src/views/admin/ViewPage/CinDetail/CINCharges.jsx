import TableComponents from 'components/ant/TableComponents'
import moment from 'moment';
import React from 'react'
import Service from 'Service/Service';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';

export default function CINCharges({ cIN_Charges }) {
    const [searchText, setSearchText] = React.useState('');
    const [searchedColumn, setSearchedColumn] = React.useState('');
    const searchInput = React.useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    // Data & Column
    const DataSrig = [];
    cIN_Charges?.map((item, index) => {
        const file1 = {
            key: (index + 1).toString(),
            No: (index + 1).toString(),
            Srn: item.srn,
            ChargeHolder: Service.toCapitalize(item.chargE_HOLDER),
            DateCreate: Service.dateFormating(item.datE_CREATE),
            DateSatisfied: Service.dateFormating(item.datE_SATISFIED),
            datE_MODIFIED: Service.dateFormating(item.datE_MODIFIED),
            Amount: Service.formatNumber(item.amount),
            Address: Service.toCapitalize(item.address)
        }
        DataSrig.push(file1)
    });

    const columns = [
        {
            title: 'No',
            dataIndex: 'No',
            key: 'No',
            width: '30px',
        },
        {
            title: 'SRN',
            dataIndex: 'Srn',
            key: 'Srn',
            width: '20%',
            ...getColumnSearchProps('Srn'),
        },
        {
            title: <span>Charge&nbsp;Holder</span>,
            dataIndex: 'ChargeHolder',
            key: 'ChargeHolder',
            // width: '20%',
            ...getColumnSearchProps('ChargeHolder'),
        },
        {
            title: <span>Create&nbsp;Date</span>,
            dataIndex: 'DateCreate',
            key: 'DateCreate',
            sorter: (a, b) => {
                const dateA = moment(a.DateCreate, 'DD-MM-YYYY');
                const dateB = moment(b.DateCreate, 'DD-MM-YYYY');

                return dateA - dateB; // Ascending order (older dates first)
            }
        },
        {
            title: <span>Satisfied&nbsp;Date</span>,
            dataIndex: 'DateSatisfied',
            key: 'DateSatisfied',
        },
        {
            title: <span>Modified&nbsp;Date</span>,
            dataIndex: 'datE_MODIFIED',
            key: 'datE_MODIFIED',
        },
        {
            title: 'Amount',
            dataIndex: 'Amount',
            key: 'Amount',
            ...getColumnSearchProps('Amount'),
        },
        {
            title: <span>Reg&nbsp;Name</span>,
            dataIndex: 'RegisteredName',
            key: 'RegisteredName',
        },
        {
            title: <span>Property</span>,
            dataIndex: 'PropertyIntUnRegdFlag',
            key: 'PropertyIntUnRegdFlag',
        },
        {
            title: <span>Charge&nbsp;Name</span>,
            dataIndex: 'ChargeName',
            key: 'ChargeName',
        },
        {
            title: <span>Country</span>,
            dataIndex: "country",
            key: "country",
        },
        {
            title: <span>Address</span>,
            dataIndex: 'Address',
            key: 'Address',
            width: "80%",
            ...getColumnSearchProps('Address'),
        },
    ];

    return (<TableComponents columns={columns} dataSource={DataSrig} ></TableComponents>)
}
