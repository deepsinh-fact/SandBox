import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TBSelector } from '../../Store/Reducers/TBSlice';
import Service from '../../Service/Service';
import TableComponents from '../../components/ant/TableComponents';
// import 
export default function Client() {
    const userData = Service.getUserdata();
    const { user } = useSelector(TBSelector);
    const [clientData, setClientData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const columns = [
        {
            title: 'Client ID',
            dataIndex: 'ClientId',
            key: 'ClientId',
            width: 100,
            render: (id) => (
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {id}
                </span>
            ),
        },
        {
            title: 'Client Name',
            dataIndex: 'ClientName',
            key: 'ClientName',
            width: 200,
            render: (name) => (
                <span className="font-medium text-gray-900 dark:text-white">
                    {name}
                </span>
            ),
        },
        {
            title: 'Address',
            dataIndex: 'Address',
            key: 'Address',
            width: 300,
            render: (address) => (
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {address}
                </span>
            ),
        },
        {
            title: 'Mobile Number',
            dataIndex: 'MobileNumber',
            key: 'MobileNumber',
            width: 150,
            render: (mobile) => (
                <span className="font-mono text-sm px-2 py-1 rounded">
                    {mobile}
                </span>
            ),
        },
        {
            title: 'Secret Key',
            dataIndex: 'SecretKey',
            key: 'SecretKey',
            width: 150,
            render: (secretKey) => (
                <span className="font-mono text-sm  px-2 py-1 rounded border">
                    {secretKey}
                </span>
            ),
        },
    ];

   
    useEffect(() => {
        const fetchClientData = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3000/api/client');
                const result = await response.json();
                console.log('API Response:', result);
                
                if (result.success) {
                    const transformedData = result.data.map(client => ({
                        ...client,
                        key: client.ClientId.toString()
                    }));
                    console.log('Transformed data:', transformedData);
                    setClientData(transformedData);
                } else {
                    setError(result.message || 'Failed to fetch client data');
                }
            } catch (err) {
                console.error('Fetch error:', err);
                setError('Error connecting to server: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchClientData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-navy-900 dark:to-navy-800">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-navy-700 dark:text-white mb-4">
                        Welcome to Client page!!{userData?.name ? `, ${userData.name}` : ''}!
                    </h1>
                 
                </div>

                {/* Client Data Table */}
                <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-4">
                        Client Information
                    </h2>

                    {error && (
                        <div className="mb-4 p-4 border text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    {!loading && !error && (
                        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                            Total Clients: <span className="font-semibold">{clientData.length}</span>
                        </div>
                    )}

                    <div className="mb-2 grid grid-cols-1 gap-2 px-2 xl:grid-cols-1">
                        <div className="table-container shadow-transition p-2">
                            <TableComponents
                                columns={columns}
                                dataSource={clientData}
                                loading={loading}
                                scrollx={900}
                                pagination={{
                                    pageSize: 10,
                                    showSizeChanger: true,
                                    showQuickJumper: true,
                                    showTotal: (total, range) => 
                                        `${range[0]}-${range[1]} of ${total} clients`
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
