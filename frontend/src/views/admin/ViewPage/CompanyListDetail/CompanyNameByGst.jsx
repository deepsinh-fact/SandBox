import { Button, Input, Space } from 'antd';
import TableComponents from 'components/ant/TableComponents';
import React from 'react';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { useDispatch } from 'react-redux';
import { Gstsearch } from 'Store/Reducers/TBSlice';
export default function CompanyNameByGst({ SearchCompanyNameData, isloading }) {
    const [dataSource, setdataSource] = React.useState([]);
    const searchInput = React.useRef(null);
    const [searchedColumngst, setSearchedColumngst] = React.useState('');
    const [searchTextgst, setSearchTextgst] = React.useState('');
    const dispatch = useDispatch();


    React.useEffect(() => {
        const data = SearchCompanyNameData?.map((item, index) => ({
            key: item.autoId,
            no: index + 1,
            gst: item.gstin,
            companyNamegst: item.tradeName || "",
            active: item.gstinStatus || "",
            date: item.registrationDate || "",
        }));
        setdataSource(data);
        // }
    }, [SearchCompanyNameData])

    const handleSearchgst = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchTextgst(selectedKeys[0]);
        setSearchedColumngst(dataIndex);
    };
    const getColumnSearchPropsgst = (dataIndex) => ({
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
                    onPressEnter={() => handleSearchgst(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearchgst(selectedKeys, confirm, dataIndex)}
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
            record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()) || false,
        render: (text) =>
            searchedColumngst === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchTextgst]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });


    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: 'GST',
            dataIndex: 'gst',
            key: 'gst',
            ...getColumnSearchPropsgst('gst'),
        },
        {
            title: 'Trade Name',
            dataIndex: 'companyNamegst',
            key: 'companyNamegst',
            ...getColumnSearchPropsgst('companyNamegst'),
        },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            ...getColumnSearchPropsgst('active'),
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
                    type="link"
                    disabled={isloading}
                    icon={<EyeOutlined />}
                    onClick={() => dispatch(Gstsearch({ "gstin": record.gst }))}
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

//dispatch(Gstsearch({ "gstin": record.gst }))