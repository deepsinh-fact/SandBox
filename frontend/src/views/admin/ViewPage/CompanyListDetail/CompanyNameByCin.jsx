import { Button, Input, Space } from 'antd';
import TableComponents from 'components/ant/TableComponents';
import React from 'react';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { useDispatch } from 'react-redux';
import { Cin } from 'Store/Reducers/TBSlice';
export default function CompanyNameByCin({ SearchCompanyNameData, isloading }) {
    const [dataSource, setdataSource] = React.useState([]);
    const searchInput = React.useRef(null);
    const [searchText, setSearchText] = React.useState('');
    const [searchedColumn, setSearchedColumn] = React.useState('');
    const dispatch = useDispatch();
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
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
    React.useEffect(() => {
        // if (SearchCompanyNameData) {
        const data = SearchCompanyNameData?.map((item, index) => ({
            key: item.autoId,
            no: index + 1,
            cin: item.cin,
            companyName: item.companyName || "",
            active: item.companyStatus || "",
            date: item.registrationDate || "",
        }));
        setdataSource(data);
        // }
    }, [SearchCompanyNameData])

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: 'CIN',
            dataIndex: 'cin',
            key: 'cin',
            ...getColumnSearchProps('cin'),

        },
        {
            title: 'Company Name',
            dataIndex: 'companyName',
            key: 'companyName',
            ...getColumnSearchProps('companyName'),
        },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'View',
            key: 'view',
            render: (_, record) => (
                <Button
                    disabled={isloading}
                    type="link"
                    icon={<EyeOutlined />}
                    onClick={() => dispatch(Cin({ "searchNumber": record.cin }))}
                >
                    View
                </Button>
            ),
        },
    ];
    return (
        <TableComponents scrollx={750} columns={columns} dataSource={dataSource} />
    )
}

