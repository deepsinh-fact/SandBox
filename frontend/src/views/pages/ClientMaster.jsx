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
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        ClientName: '',
        ClientContactNumber: '',
        ClientAddress: '',
        ClientPAN: '',
        ClientGST: '',
        ClientCIN: '',
        Client_SecreteKey: ''
    });
    const [formLoading, setFormLoading] = useState(false);

    const columns = [
        {
            title: 'Client ID',
            dataIndex: 'Client_ClientId',
            key: 'Client_ClientId',
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
            title: 'Contact Number',
            dataIndex: 'ClientContactNumber',
            key: 'ClientContactNumber',
            width: 150,
            render: (contact) => (
                <span className="font-mono text-sm px-2 py-1 rounded">
                    {contact}
                </span>
            ),
        },
        {
            title: 'Address',
            dataIndex: 'ClientAddress',
            key: 'ClientAddress',
            width: 300,
            render: (address) => (
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {address}
                </span>
            ),
        },
        {
            title: 'PAN',
            dataIndex: 'ClientPAN',
            key: 'ClientPAN',
            width: 120,
            render: (pan) => (
                <span className="font-mono text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                    {pan}
                </span>
            ),
        },
        {
            title: 'GST',
            dataIndex: 'ClientGST',
            key: 'ClientGST',
            width: 120,
            render: (gst) => (
                <span className="font-mono text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                    {gst}
                </span>
            ),
        },
        {
            title: 'Secret Key',
            dataIndex: 'Client_SecreteKey',
            key: 'Client_SecreteKey',
            width: 150,
            render: (secretKey) => (
                <span className="font-mono text-sm px-2 py-1 rounded border">
                    {secretKey}
                </span>
            ),
        },
        {
            title: 'Created By',
            dataIndex: 'CreatedBy',
            key: 'CreatedBy',
            width: 120,
            render: (createdBy) => (
                <span className="text-sm px-2 py-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                    {createdBy}
                </span>
            ),
        },
        {
            title: 'Created Date',
            dataIndex: 'CreatedDate',
            key: 'CreatedDate',
            width: 120,
            render: (date) => (
                <span className="text-sm px-2 py-1 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">
                    {new Date(date).toLocaleDateString()}
                </span>
            ),
        },

    ];


    useEffect(() => {
        fetchClientData();
    }, []);

    const fetchClientData = async () => {
        try {
            setLoading(true);
            const result = await Service.fetchClientMasters();
            console.log('ClientMaster API Response:', result);

            if (result.success) {
                const transformedData = result.data
                    .map(client => ({
                        ...client,
                        key: client.AutoId.toString()
                    }))
                    .sort((a, b) => {
                        // Sort by Client_ClientId in ascending order
                        if (a.Client_ClientId && b.Client_ClientId) {
                            return a.Client_ClientId.localeCompare(b.Client_ClientId, undefined, { numeric: true });
                        }
                        // Fallback to AutoId if Client_ClientId is not available
                        return a.AutoId - b.AutoId;
                    });
                console.log('ClientMaster transformed data:', transformedData);
                setClientData(transformedData);
            } else {
                setError(result.message || 'Failed to fetch client data');
            }
        } catch (err) {
            console.error('ClientMaster fetch error:', err);
            setError('Error connecting to server: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddClient = async (e) => {
        e.preventDefault();

        // Basic validation - only ClientName is required now
        if (!formData.ClientName) {
            setError('Client Name is required');
            return;
        }

        try {
            setFormLoading(true);
            const result = await Service.createClientMaster({
                ...formData,
                CreatedBy: userData?.name || 'Unknown'
            });

            if (result.success) {
                // Refresh the data from server to get the latest list
                await fetchClientData();

                // Reset form and close modal
                setFormData({
                    ClientName: '',
                    ClientContactNumber: '',
                    ClientAddress: '',
                    ClientPAN: '',
                    ClientGST: '',
                    ClientCIN: '',
                    Client_SecreteKey: ''
                });
                setShowAddModal(false);
                setError(null);
            } else {
                setError(result.message || 'Failed to add client');
            }
        } catch (err) {
            console.error('Add client error:', err);
            setError('Error connecting to server: ' + err.message);
        } finally {
            setFormLoading(false);
        }
    };

    const closeModal = () => {
        setShowAddModal(false);
        setFormData({
            ClientName: '',
            ClientContactNumber: '',
            ClientAddress: '',
            ClientPAN: '',
            ClientGST: '',
            ClientCIN: '',
            Client_SecreteKey: ''
        });
        setError(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-navy-900 dark:to-navy-800">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-navy-700 dark:text-white mb-4">
                        Welcome to Client Master page !!{userData?.name ? `, ${userData.name}` : ''}!
                    </h1>

                </div>

                {/* Client Data Table */}
                <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white">
                            Client Information
                        </h2>
                        <div className="flex gap-2">
                            <button
                                onClick={fetchClientData}
                                disabled={loading}
                                className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                {loading ? 'Refreshing...' : 'Refresh'}
                            </button>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add Client
                            </button>
                        </div>
                    </div>

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
                                scrollx={1400}
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

            {/* Add Client Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-navy-800 rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-navy-700 dark:text-white">
                                Add New Client
                            </h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleAddClient} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Client Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="ClientName"
                                        value={formData.ClientName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-navy-700 dark:text-white"
                                        placeholder="Enter client name"
                                    />
                                </div>


                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Contact Number
                                    </label>
                                    <input
                                        type="text"
                                        name="ClientContactNumber"
                                        value={formData.ClientContactNumber}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-navy-700 dark:text-white"
                                        placeholder="Enter contact number"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Secret Key
                                    </label>
                                    <input
                                        type="text"
                                        name="Client_SecreteKey"
                                        value={formData.Client_SecreteKey}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-navy-700 dark:text-white"
                                        placeholder="Enter secret key"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        PAN Number
                                    </label>
                                    <input
                                        type="text"
                                        name="ClientPAN"
                                        value={formData.ClientPAN}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-navy-700 dark:text-white"
                                        placeholder="Enter PAN number"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        GST Number
                                    </label>
                                    <input
                                        type="text"
                                        name="ClientGST"
                                        value={formData.ClientGST}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-navy-700 dark:text-white"
                                        placeholder="Enter GST number"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        CIN Number
                                    </label>
                                    <input
                                        type="text"
                                        name="ClientCIN"
                                        value={formData.ClientCIN}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-navy-700 dark:text-white"
                                        placeholder="Enter CIN number"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Address
                                </label>
                                <textarea
                                    name="ClientAddress"
                                    value={formData.ClientAddress}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-navy-700 dark:text-white"
                                    placeholder="Enter client address"
                                />
                            </div>

                            {error && (
                                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                    {error}
                                </div>
                            )}

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={formLoading}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                                >
                                    {formLoading ? 'Adding...' : 'Add Client'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
