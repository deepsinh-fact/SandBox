import Infodata from 'data/Infodata';
import React, { useState, useMemo } from 'react';
import Chart from "react-apexcharts";

const getYearsSinceJoining = (joinDateStr) => {
    const [day, month, year] = joinDateStr.split("/").map(Number);
    const joinDate = new Date(year, month - 1, day);
    const today = new Date();

    let years = today.getFullYear() - joinDate.getFullYear();
    const m = today.getMonth() - joinDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < joinDate.getDate())) {
        years--;
    }
    return years;
};

export default function CinDinChart({ data }) {
    const color = Infodata.color.cin;
    const [selectedDesignation, setSelectedDesignation] = useState("All");
    const [sortOrder, setSortOrder] = useState("default"); // default, asc, desc

    const designations = useMemo(() => {
        const unique = new Set(data.map((item) => item.designation).filter(Boolean));
        return ["All", ...Array.from(unique)];
    }, [data]);

    const chartData = useMemo(() => {
        return data.map((item) => ({
            name: item.name,
            din: item.din,
            designation: item.designation,
            joinDate: item.datE_JOIN,
            yearsOfService: getYearsSinceJoining(item.datE_JOIN)
        }));
    }, [data]);

    const filteredData = useMemo(() => {
        let result = selectedDesignation === "All"
            ? [...chartData]
            : chartData.filter(item => item.designation === selectedDesignation);

        if (sortOrder === "asc") {
            result.sort((a, b) => a.yearsOfService - b.yearsOfService);
        } else if (sortOrder === "desc") {
            result.sort((a, b) => b.yearsOfService - a.yearsOfService);
        }

        return result;
    }, [chartData, selectedDesignation, sortOrder]);

    const chartOptions = {
        chart: {
            toolbar: {
                show: true,  // Changed from false to true
                tools: {
                    download: false,
                    selection: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false
                },
                autoSelected: 'zoom'
            },
        },
        chart: { type: "bar", height: 350, zoom: { enabled: true } },
        xaxis: {
            categories: filteredData.map((item) => item.name),
            labels: {
                rotate: -45,
                style: {
                    colors: "#000",
                    fontSize: "14px",
                    fontWeight: "600"
                },
                formatter: function (value) {
                    let name = value.length > 5 ? value.slice(0, 5) + '...' : value
                    return name;
                }
            },
            title: { text: "Director" },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            scrollbar: {
                enabled: true, // Enable scrolling for the x-axis
            },
            overflow: "scroll",
        },
        yaxis: {
            title: { text: "Years of Service" },
            labels: {
                style: { colors: "#000" }
            }
        },
        tooltip: {
            enabled: true,
            enabledOnSeries: undefined,
            shared: true,
            followCursor: true,
            intersect: false,
            inverseOrder: false,
            custom: function ({ dataPointIndex }) {
                const point = filteredData[dataPointIndex];
                return `
          <div style="padding: 10px; background: #1E293B; color: white; border-radius: 8px; font-size: 12px;">
            <div><strong>DIN:</strong> ${point?.din}</div>
            <div><strong>Name:</strong> ${point?.name}</div>
            <div><strong>Designation:</strong> ${point?.designation}</div>
            <div><strong>Join Date:</strong> ${point?.joinDate}</div>
            <div><strong>Years of Service:</strong> ${point?.yearsOfService} years</div>
          </div>
        `;
            },
            fillSeriesColor: false,
            hideEmptySeries: true,
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "light",
                type: "vertical",
                opacityFrom: 0.9,
                opacityTo: 0.4,
                colorStops: [
                    [
                        { offset: 0, color: color, opacity: 1 },
                        { offset: 100, color: color, opacity: 0.7 }
                    ]
                ]
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 6,
                columnWidth: "45px"
            }
        },
        dataLabels: {
            enabled: true,
            style: { colors: ["#E5E7EB"] }
        },
        grid: {
            show: true,
            strokeDashArray: 5,
            yaxis: {
                lines: {
                    show: true,
                },
                color: color,
            },
            xaxis: {
                lines: {
                    show: false,
                },
                color: color,
            },
        },
    };

    const chartSeries = [
        {
            name: "Years of Service",
            data: filteredData.map((item) => item.yearsOfService)
        }
    ];

    const chartWidth = filteredData.length * 100 || 600;

    return (
        <div className="w-full mx-auto mt-1">
            {/* <h2 className="text-xl font-semibold text-left mb-4 text-gray-800 dark:text-white">
                Chart of Years of Service Since Joining
            </h2> */}

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
                <div className="flex items-center">
                    <label className="mr-2 text-sm font-medium text-gray-600 dark:text-gray-200">Filter by Designation:</label>
                    <select
                        className="px-3 py-1 border rounded text-sm bg-white dark:bg-gray-800 dark:text-white"
                        value={selectedDesignation}
                        onChange={(e) => setSelectedDesignation(e.target.value)}
                    >
                        {designations.map((designation) => (
                            <option key={designation} value={designation}>
                                {designation}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center">
                    <label className="mr-2 text-sm font-medium text-gray-600 dark:text-gray-200">Sort:</label>
                    <select
                        className="px-3 py-1 border rounded text-sm bg-white dark:bg-gray-800 dark:text-white"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="default">Default</option>
                        <option value="asc">Low to High</option>
                        <option value="desc">High to Low</option>
                    </select>
                </div>
            </div>

            {/* Scrollable chart container */}
            <div className="overflow-x-auto">
                <div style={{ width: "100%" }}>
                    <Chart
                        options={chartOptions}
                        series={chartSeries}
                        type="bar"
                        height={400}
                    />
                </div>
            </div>
        </div>
    );
}
