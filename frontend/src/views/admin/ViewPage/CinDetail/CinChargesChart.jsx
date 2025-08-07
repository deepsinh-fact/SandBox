import React from 'react';
import Chart from 'react-apexcharts';
import Service from 'Service/Service';

export default function ChargePieChart({ openAmount, closeAmount }) {
    const categories = ["Open Charges", "Closed Charges"];
    const series = [openAmount || 0, closeAmount || 0];

    const piechartOptions = {
        labels: categories,
        colors: [
            "#f93838",//red
            "#307830"//green
        ],
        chart: {
            width: "100%",
            fontFamily: 'DM Sans, sans-serif',
            background: 'transparent',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            }
        },
        legend: {
            show: true,
            position: 'bottom',
            fontSize: '14px',
            fontWeight: 500,
            labels: {
                colors: '#555',
            },
            markers: {
                width: 12,
                height: 12,
                radius: 6,
            },
            itemMargin: {
                horizontal: 15,
                vertical: 5
            },
            formatter: function (seriesName, opts) {
                const value = opts.w.globals.series[opts.seriesIndex];
                const total = opts.w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(0);
                return `${seriesName} - ₹${Service.formatNumber(value)} (${percentage}%)`;
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
                const value = opts.w.globals.series[opts.seriesIndex];
                return `₹${Service.formatNumber(value)}`;
            },
            style: {
                fontSize: '14px',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: '600',
                colors: ["#fff"]
            },
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 1,
                left: 1,
                blur: 3,
                opacity: 0.2
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '22px',
                            fontWeight: 600,
                            color: '#7D60D8',
                            offsetY: -10
                        },
                        value: {
                            show: true,
                            fontSize: '26px',
                            fontWeight: 700,
                            color: '#7D60D8',
                            offsetY: 5,
                            formatter: function (val) {
                                return `₹${Service.formatNumber(val)}`;
                            }
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            fontSize: '16px',
                            fontWeight: 600,
                            color: '#7D60D8',
                            formatter: function (w) {
                                const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                return `₹${Service.formatNumber(total)}`;
                            }
                        }
                    }
                }
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: "vertical",
                opacityFrom: 0.85,
                opacityTo: 0.95,
                stops: [0, 100]
            }
        },
        stroke: {
            width: 2,
            colors: ['#fff']
        },
        tooltip: {
            custom: function ({ series, seriesIndex, w }) {
                const value = series[seriesIndex];
                const total = series.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(0);
                const label = w.config.labels[seriesIndex];
                const color = w.config.colors[seriesIndex];

                return `
          <div style="
            background: ${color};
            padding: 8px 12px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          ">
            <div style="color: #fff; font-size: 14px; font-weight: 600;">
              ${label}: ₹${Service.formatNumber(value)} (${percentage}%)
            </div>
          </div>
        `;
            }
        },
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-center text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Charge Breakdown
            </h2>
            <Chart options={piechartOptions} series={series} type="donut" height={350} />
        </div>
    );
}
