import React, { useState } from "react";
import { Table, Steps, Button, message } from "antd";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler, registerables } from "chart.js";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import ApexCharts from "react-apexcharts";
import Service from "Service/Service";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler, ...registerables);

const GstReportPage = () => {
    const columns = [
        {
            title: "Month",
            dataIndex: "month",
            key: "month",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Filing Date",
            dataIndex: "filingDate",
            key: "filingDate",
        },
    ];

    const data = [
        {
            key: "1",
            month: "Apr 2022",
            status: "Filed",
            filingDate: "20-Apr-2022",
        },
        {
            key: "2",
            month: "May 2022",
            status: "Filed",
            filingDate: "20-May-2022",
        },
    ];

    return (
        <div className="overflow-hidden shadow-md rounded-2xl">
            <div className="w-full mx-auto bg-white  p-2" data-aos="fade-up">
                <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-left">GST Data Analysis Report</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold text-blue-700">Basic Information</h2>
                        <p>GSTIN: <strong>24AAFCABC123B</strong></p>
                        <p>Legal Name: <strong>ABC PRIVATE LIMITED</strong></p>
                        <p>Status Jurisdiction: <strong>Ghatak 8 (Ahmedabad)</strong></p>
                        <p>State Jurisdiction: <strong>Gujarat</strong></p>
                        <p>Constitution of Business: <strong>Partnership</strong></p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold text-green-700">PAN Information</h2>
                        <p>PAN: <strong>AAFCABC1</strong></p>
                        <p>Taxpayer Type: <strong>Regular</strong></p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold text-purple-700">GST Filing Frequency Details</h2>
                        <p>Filing Frequency: <strong>Monthly</strong></p>
                    </div>
                </div>
                <div className="mb-6" data-aos="fade-left">
                    <h2 className="text-lg font-semibold text-indigo-700">Return Filing Information</h2>
                    <Table
                        bordered
                        size="small"
                        scroll={{ x: "max-content" }}
                        className="hover:bg-gray-50 rounded-lg shadow-sm"
                        columns={columns} dataSource={data} pagination={false} />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow" data-aos="fade-right">
                    <h2 className="text-lg font-semibold text-indigo-700">Sales Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p>Invoices: <strong>₹10,93,51,669.70</strong></p>
                        <p>Advance Payment: <strong>₹0.00</strong></p>
                        <p>Debit Notes: <strong>₹0.00</strong></p>
                        <p>NIL Rated, Exempted, and Non-GST Supplies: <strong>₹66,247.20</strong></p>
                        <p>Credit Notes: <strong>₹0.00</strong></p>
                        <p>Total: <strong>₹10,92,85,422.50</strong></p>
                    </div>
                </div>
            </div>
        </div>
    );
};
const SalesChart = () => {
    const salesData = {
        series: [
            {
                name: "Inter Sales Summary (Apr 2022 - Mar 2023)",
                data: [10500000, 8500000, 12500000, 15500000, 11300000, 9500000, 14500000, 3100000, 1100000, 600000, 350000, 250000],
            },
            {
                name: "Intra Sales Summary (Apr 2022 - Mar 2023)",
                data: [9500000, 7800000, 11800000, 14800000, 10700000, 8900000, 13800000, 2900000, 1000000, 500000, 300000, 200000],
            },
        ],
        options: {
            chart: {
                height: 350,
                type: "line",
                toolbar: {
                    show: false,
                    enabled: false,

                },
            },
            stroke: {
                width: 2,
                curve: "smooth",
            },
            title: {
                text: "Sales Summary (Apr 2022 - Mar 2023)",
                align: "center",
                style: {
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#333",
                },
            },
            xaxis: {
                categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
                title: {
                    text: "Months",
                    style: {
                        color: "#333",
                    },
                },
            },
            yaxis: {
                title: {
                    text: "Sales (in millions)",
                    style: {
                        color: "#333",
                    },
                },
            },
            fill: {
                opacity: 0.3,
            },
            markers: {
                size: 5,
                hover: {
                    size: 8,
                },
            },
            grid: {
                borderColor: '#e7e7e7',
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            legend: {
                position: "top",
                horizontalAlign: "right",
                offsetX: 20,
                floating: true,
                offsetY: -25,
                offsetX: -5,
                labels: {
                    useSeriesColors: true,
                    style: {
                        fontSize: "14px", // Custom font size
                        fontWeight: "bold", // Custom font weight
                        colors: ['#4CAF50', '#FF9800'], // Custom colors for the series names
                        fontFamily: "Arial, sans-serif", // Custom font family
                        fill: "#333", // Custom fill color
                    },
                },
            },
        },
    };

    const columns = [
        { title: "Month", dataIndex: "month", key: "month" },
        { title: "Invoices", dataIndex: "invoices", key: "invoices" },
        { title: "Credit Notes", dataIndex: "creditNotes", key: "creditNotes" },
    ];

    const data = [
        { key: "1", month: "Apr", invoices: 127, creditNotes: 2 },
        { key: "2", month: "May", invoices: 118, creditNotes: 0 },
        { key: "3", month: "Jun", invoices: 140, creditNotes: 1 },
        { key: "4", month: "Jul", invoices: 114, creditNotes: 3 },
        { key: "5", month: "Aug", invoices: 131, creditNotes: 2 },
        { key: "6", month: "Sep", invoices: 125, creditNotes: 1 },
    ];

    const gstColumns = [
        { title: "Tax Rate", dataIndex: "taxRate", key: "taxRate" },
        { title: "Sales Amount", dataIndex: "salesAmount", key: "salesAmount" },
    ];

    const gstData = [
        { key: "1", taxRate: "5%", salesAmount: "1,75,000" },
        { key: "2", taxRate: "12%", salesAmount: "3,50,000" },
        { key: "3", taxRate: "18%", salesAmount: "5,50,000" },
    ];

    const salesBifurcationData = [
        { key: "1", month: "Apr", invoices: 127, creditNotes: 2 },
        { key: "2", month: "May", invoices: 118, creditNotes: 0 },
        { key: "3", month: "Jun", invoices: 140, creditNotes: 1 },
        { key: "4", month: "Jul", invoices: 114, creditNotes: 3 },
        { key: "5", month: "Aug", invoices: 131, creditNotes: 2 },
        { key: "6", month: "Sep", invoices: 125, creditNotes: 1 },
    ];

    const salesBifurcationColumns = [
        { title: "Month", dataIndex: "month", key: "month" },
        { title: "Invoices", dataIndex: "invoices", key: "invoices" },
        { title: "Credit Notes", dataIndex: "creditNotes", key: "creditNotes" },
    ];

    return (
        <div className="p-8 bg-gradient-to-r from-blue-50 to-gray-100 min-h-screen" data- aos="fade-up" >
            <h1 className="text-4xl font-bold text-left mb-6 text-gray-800 shadow-md p-4 rounded-lg bg-white">Sales Dashboard</h1>

            <div className="mt-6 bg-white p-6 rounded-lg shadow-xl transition duration-500 hover:shadow-2xl">
                <ApexCharts
                    options={salesData.options}
                    series={salesData.series}
                    type="line"
                    height={350}
                    className="rounded-lg shadow-lg"
                />
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-xl transition duration-500 hover:shadow-2xl">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sales Documents Bifurcation</h2>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    bordered
                    size="small"
                    scroll={{ x: "max-content" }}
                    className="hover:bg-gray-50 rounded-lg shadow-sm"
                />
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-xl transition duration-500 hover:shadow-2xl">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sales Bifurcation</h2>
                <Table
                    columns={salesBifurcationColumns}
                    dataSource={salesBifurcationData}
                    pagination={false}
                    bordered
                    size="small"
                    scroll={{ x: "max-content" }}
                    className="hover:bg-gray-50 rounded-lg shadow-sm"
                />
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-xl transition duration-500 hover:shadow-2xl">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">GST Tax Rate Wise Sales Bifurcation</h2>
                <Table
                    columns={gstColumns}
                    dataSource={gstData}
                    pagination={false}
                    bordered
                    size="small"
                    scroll={{ x: "max-content" }}
                    className="hover:bg-gray-50 rounded-lg shadow-sm"
                />
            </div>
        </div>
    );
};


const Third = () => {
    const lineData = {
        series: [
            {
                name: "Apr 2022 - Mar 2023",
                data: [10000000, 12000000, 15000000, 22000000, 18000000, 14000000, 13000000, 17000000, 20000000, 5000000, 2000000, 1000000],
            },
            {
                name: "Apr 2021 - Mar 2022",
                data: [9000000, 8000000, 12000000, 20000000, 16000000, 13000000, 12000000, 15000000, 18000000, 4000000, 1500000, 800000],
            },
        ],
        options: {
            chart: {
                type: 'x',
                height: 350,
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false,
                    show: false,
                    autoScaleYaxis: true
                },

                animations: {
                    enabled: true, // Enable chart animations
                    easing: 'easeinout',
                    speed: 800, // Animation speed
                    animateGradually: {
                        enabled: true,
                        delay: 150,
                    },
                },
            },
            stroke: {
                width: 2,
                curve: 'smooth',
            },
            title: {
                text: "Previous Year vs Current Year Sales Trend",
                align: "center",
                style: {
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#333",
                },
            },
            xaxis: {
                categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
                title: {
                    text: "Months",
                    style: {
                        color: "#333",
                    },
                },
            },
            yaxis: {
                title: {
                    text: "Sales Amount",
                    style: {
                        color: "#333",
                    },
                },
            },
            fill: {
                opacity: 0.3,
            },
            markers: {
                size: 5,
                hover: {
                    size: 8,
                },
            },
            grid: {
                borderColor: '#e7e7e7',
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            tooltip: {
                shared: false,
                y: {
                    formatter: function (val) {
                        return (val / 1000000).toFixed(0)
                    }
                }
            },
            legend: {
                position: "top", // Position legend at the top
                horizontalAlign: "right", // Align it to the center
                offsetX: 0,
                floating: true,
                offsetY: -25,
                offsetX: -5,
                labels: {
                    useSeriesColors: true,
                    style: {
                        fontSize: "14px", // Custom font size
                        fontWeight: "bold", // Custom font weight
                        colors: ['#4CAF50', '#FF9800'], // Custom colors for the series names
                        fontFamily: "Arial, sans-serif", // Custom font family
                        fill: "#333", // Custom fill color
                    },
                },
            },

        },
    };

    const doughnutData = {
        series: [90, 10],
        options: {
            chart: {
                type: 'donut',
                height: 350,
            },
            labels: ['Gujarat', 'Dadra and Nagar Haveli'],
            colors: ["#a855f7", "#f43f5e"],
            title: {
                text: 'State Wise Sales Bifurcation',
                align: 'center',
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#333',
                },
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                floating: false,
            },
        },
    };

    const columns = [
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
        },
    ];

    const data = [
        { key: "1", category: "Invoices", amount: "9,22,61,858.14" },
        { key: "2", category: "Debit Notes", amount: "0.00" },
        { key: "3", category: "Credit Notes", amount: "1,78,249.20" },
        { key: "4", category: "Total", amount: "9,20,83,608.94" },
    ];

    return (
        <>
            <div className="p-6 space-y-6">
                <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="shadow-lg p-4 rounded-lg">
                        <h2 className="text-lg font-bold mb-4">Previous Year vs Current Year Sales Trend</h2>
                        <ApexCharts
                            options={lineData.options}
                            series={lineData.series}
                            type="line"
                            height={350}
                            className="rounded-lg shadow-lg"
                        />
                    </div>

                    <div className="shadow-lg p-4 rounded-lg flex justify-center items-center">
                        <div className="md:w-1/2">
                            <ApexCharts
                                options={doughnutData.options}
                                series={doughnutData.series}
                                type="donut"
                                height={350}
                            />
                        </div>
                    </div>
                </div>

                <div data-aos="fade-up" className="bg-blue-100 p-4 rounded-lg">
                    <h2 className="text-lg font-bold text-blue-700">NA</h2>
                    <p className="text-gray-600">Previous Month Sales</p>
                </div>

                <div data-aos="fade-up" className="bg-blue-100 p-4 rounded-lg">
                    <h2 className="text-lg font-bold text-blue-700">NA</h2>
                    <p className="text-gray-600">Current Month Sales</p>
                </div>

                <div data-aos="fade-up" className="bg-red-100 p-4 rounded-lg">
                    <h2 className="text-lg font-bold mb-4">Purchase Information</h2>
                    <Table
                        bordered
                        size="small"
                        scroll={{ x: "max-content" }}
                        className="hover:bg-gray-50 rounded-lg shadow-sm"
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                    />
                </div>
            </div>
        </>
    );
};

const Fourth = () => {
    const salesBifurcationData = {
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
        datasets: [
            {
                label: "Total Sales",
                data: [18000000, 11000000, 15000000, 19000000, 18000000, 14000000, 13000000, 17000000, 21000000, 3000000, 1000000, 500000],
                backgroundColor: "#2196f3",
            },
            {
                label: "B2B Credit Notes",
                data: [2000000, 1000000, 800000, 1500000, 1200000, 1100000, 1000000, 900000, 800000, 500000, 300000, 200000],
                backgroundColor: "#ff9800",
            },
        ],
    };

    const purchaseBifurcationData = {
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
        datasets: [
            {
                label: "Total Purchase",
                data: [15000000, 14000000, 9000000, 16000000, 15000000, 13000000, 12000000, 16000000, 20000000, 2500000, 900000, 400000],
                backgroundColor: "#2196f3",
            },
            {
                label: "B2B Credit Notes",
                data: [1800000, 1200000, 900000, 1400000, 1300000, 1000000, 900000, 800000, 700000, 400000, 250000, 150000],
                backgroundColor: "#ff9800",
            },
        ],
    };

    const topCustomersColumns = [
        { title: "Return Period", dataIndex: "returnPeriod", key: "returnPeriod" },
        { title: "Total Sales", dataIndex: "totalSales", key: "totalSales" },
        { title: "Customer Name", dataIndex: "customerName", key: "customerName" },
        { title: "GSTIN", dataIndex: "gstin", key: "gstin" },
        { title: "State Name", dataIndex: "stateName", key: "stateName" },
        { title: "Amount", dataIndex: "amount", key: "amount" },
        { title: "Total % of Top 10 Customers", dataIndex: "percentage", key: "percentage" },
    ];

    const topCustomersData = [
        { key: "1", returnPeriod: "Apr", totalSales: "1,32,35,782.84", customerName: "Mansukhbhai Dobariya", gstin: "24AKP9870Z1F", stateName: "Gujarat", amount: "12,09,951.02", percentage: "52.46%" },
        { key: "2", returnPeriod: "Apr", totalSales: "", customerName: "Hasmukhlal Shah", gstin: "24AQC9871S1F", stateName: "Gujarat", amount: "9,44,765.95", percentage: "" },
        { key: "3", returnPeriod: "May", totalSales: "70,00,000.00", customerName: "Bhavesh Patel", gstin: "24BCT5471J1G", stateName: "Maharashtra", amount: "6,00,000.00", percentage: "15.35%" },
        { key: "4", returnPeriod: "Jun", totalSales: "", customerName: "Vijay Rathod", gstin: "24ACT9842K1H", stateName: "Rajasthan", amount: "4,50,000.00", percentage: "" },
    ];

    // Modify the table data to include merged cells
    const topCustomersWithMergedCells = [
        {
            key: "1",
            returnPeriod: "Apr",
            totalSales: "1,32,35,782.84",
            customerName: "Mansukhbhai Dobariya",
            gstin: "24AKP9870Z1F",
            stateName: "Gujarat",
            amount: "12,09,951.02",
            percentage: "52.46%",
            colSpan: 3, // Merging columns
            rowSpan: 2, // Merging rows
        },
        {
            key: "2",
            returnPeriod: "Apr",
            totalSales: "",
            customerName: "Hasmukhlal Shah",
            gstin: "24AQC9871S1F",
            stateName: "Gujarat",
            amount: "9,44,765.95",
            percentage: "",
        },
        {
            key: "3",
            returnPeriod: "May",
            totalSales: "70,00,000.00",
            customerName: "Bhavesh Patel",
            gstin: "24BCT5471J1G",
            stateName: "Maharashtra",
            amount: "6,00,000.00",
            percentage: "15.35%",
        },
        {
            key: "4",
            returnPeriod: "Jun",
            totalSales: "",
            customerName: "Vijay Rathod",
            gstin: "24ACT9842K1H",
            stateName: "Rajasthan",
            amount: "4,50,000.00",
            percentage: "",
        },
    ];

    return (
        <div className="p-6 sm:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div data-aos="fade-up" className="bg-gradient-to-r from-green-50 via-green-100 to-green-50 p-6 rounded-lg shadow-lg transition duration-500 hover:shadow-xl">
                    <h2 className="text-lg sm:text-3xl font-semibold text-gray-800 mb-4">Credit/Debit Notes Raised Against Above Sales Bifurcation</h2>
                    <Bar data={salesBifurcationData} options={{ responsive: true }} className="rounded-lg" />
                </div>
                <div data-aos="fade-up" className="bg-gradient-to-r from-red-50 via-red-100 to-red-50 p-6 rounded-lg shadow-lg transition duration-500 hover:shadow-xl">
                    <h2 className="text-lg sm:text-3xl font-semibold text-gray-800 mb-4">Credit/Debit Notes Raised Against Above Purchase Bifurcation</h2>
                    <Bar data={purchaseBifurcationData} options={{ responsive: true }} className="rounded-lg" />
                </div>
            </div>
            <div data-aos="fade-up" className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 p-6 rounded-lg shadow-lg transition duration-500 hover:shadow-xl">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">Top 10 Customers Against Total Sales</h2>
                <Table
                    bordered
                    size="small"
                    scroll={{ x: "max-content" }}
                    columns={topCustomersColumns}
                    dataSource={topCustomersWithMergedCells}
                    pagination={false}
                    className="hover:bg-gray-50 rounded-lg shadow-sm"
                    rowClassName="cursor-pointer"
                    render={(text, record, index) => {
                        if (record.colSpan) {
                            return (
                                <td colSpan={record.colSpan} rowSpan={record.rowSpan}>
                                    {record.customerName}
                                </td>
                            );
                        }
                        return <td>{text}</td>;
                    }}
                />
            </div>
        </div>
    );
};




const steps = [
    {
        title: "",
        content: <GstReportPage />,
    },
    {
        title: "",
        content: <SalesChart />,
    },
    {
        title: "",
        content: <Third />,
    },
    {
        title: "",
        content: <Fourth />,
    },
];

export default function AnalysisReport() {
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));
    return (
        <>
            <Steps current={current} items={items} />
            <div className='rounded-md p-1 min-h-80 my-2'>{steps[current].content}</div>
            <div
                className="mt-6 text-right"
            >
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => [next(), Service.scroll0()]}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => [message.success('Processing complete!'), Service.scroll0(), setCurrent(0)]}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button
                        className="ml-2"
                        onClick={() => [prev(), Service.scroll0()]}
                    >
                        Previous
                    </Button>
                )}
            </div>
        </>
    )
}
