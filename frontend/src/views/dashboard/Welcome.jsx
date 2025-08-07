import React from 'react';
import { useSelector } from 'react-redux';
import { TBSelector } from '../../Store/Reducers/TBSlice';
import Service from '../../Service/Service';
import TableComponents from '../../components/ant/TableComponents';

export default function Welcome() {
    const userData = Service.getUserdata();
    const { user } = useSelector(TBSelector);

    // Sample columns for the welcome dashboard table
    const columns = [
        {
            title: 'API',
            dataIndex: 'feature',
            key: 'feature',
        },
        {
            title: 'Edit',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span className={`px-2 py-1 rounded-full text-xs ${status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                    {status}
                </span>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
    ];

    const data = [
        {
            key: '1',
            feature: 'Dashboard',
            status: 'Active',
            description: 'dashboard',
        },
        {
            key: '2',
            feature: 'User Profile',
            status: 'Active',
            description: 'userprofile',
        },
     
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-navy-900 dark:to-navy-800">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-navy-700 dark:text-white mb-4">
                        Welcome to Dashboard!!{userData?.name ? `, ${userData.name}` : ''}!
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        You have successfully logged in to your dashboard
                    </p>
                </div>

                {/* Features Table */}
                <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-4">
                        Available Features
                    </h2>


                    <div className="mb-2 grid grid-cols-1 gap-2 px-2 xl:grid-cols-1">
                        <div className="table-container shadow-transition p-2">
                            <TableComponents
                                columns={columns}
                                dataSource={data}
                                scrollx={600}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
