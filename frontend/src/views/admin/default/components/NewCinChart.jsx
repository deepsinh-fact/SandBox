import React from "react";
import Card from "components/card";
import { useDispatch, useSelector } from "react-redux";
import { TBSelector } from "Store/Reducers/TBSlice";
import moment from "moment";
import Chart from "react-apexcharts";
import { GetCINDetailsCountByLastXDays } from "Store/Reducers/TBSlice";
import { updateState } from "Store/Reducers/TBSlice";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Skeleton } from "antd";

function CheckTable() {
  const {
    GetCINDetailsCountByLastXDaysData,
    isGetCINDetailsCountByLastXDays,
    isGetCINDetailsCountByLastXDaysFetching,
  } = useSelector(TBSelector);
  const [Chartdata, setChartdata] = React.useState([]);
  const [SelctChart, setSelectdTab] = React.useState("yearly");
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(GetCINDetailsCountByLastXDays({ Days: "360" }));
  }, []);
  React.useEffect(() => {
    if (isGetCINDetailsCountByLastXDays) {
      dispatch(updateState({ isGetCINDetailsCountByLastXDays: false }));
    }
  }, [isGetCINDetailsCountByLastXDays]);

  React.useEffect(() => {
    if (SelctChart == "yearly") {
      let monthCounts = {};
      GetCINDetailsCountByLastXDaysData.forEach((item) => {
        const monthYear = moment(item.registrationDates).format("YYYY-MM");
        if (!monthCounts[monthYear]) {
          monthCounts[monthYear] = 0;
        }
        monthCounts[monthYear] += item.cinCount;
      });
      const resultArray = Object.keys(monthCounts).map((month) => ({
        label: moment(month).format("MMM"), // Use the month (e.g., '2024-01')
        value: monthCounts[month], // The total count for that month
      }));
      setChartdata(resultArray);
      // console.log("resultArray>>>", resultArray)
    } else if (SelctChart == "monthly") {
      //curunt End date to curunt-30 days start date
      const startOfMonth = moment().subtract(30, "days"); // Subtract 30 days and get the start of the month
      const endOfMonth = moment();
      let weeksWithCounts = [];
      let currentWeekStart = startOfMonth.clone().startOf("week"); // Start of first week
      while (
        currentWeekStart.isBefore(endOfMonth) ||
        currentWeekStart.isSame(endOfMonth, "week")
      ) {
        let currentWeekEnd = currentWeekStart.clone().endOf("week"); // End of the current week
        if (
          currentWeekEnd.isAfter(startOfMonth) &&
          currentWeekStart.isBefore(endOfMonth)
        ) {
          const weekDataCount = GetCINDetailsCountByLastXDaysData.filter(
            (item) => {
              const itemDate = moment(item.registrationDates);
              return itemDate.isBetween(
                currentWeekStart,
                currentWeekEnd,
                null,
                "[]"
              );
            }
          ).reduce((sum, item) => sum + item.cinCount, 0); // Sum the counts of items in this week
          weeksWithCounts.push({
            weekStart: currentWeekStart.format("DD-MM"),
            weekEnd: currentWeekEnd.format("DD-MM"),
            label: `${currentWeekStart.format(
              "DD-MM"
            )} To ${currentWeekEnd.format("DD-MM")}`,
            value: weekDataCount,
          });
        }
        currentWeekStart.add(1, "week");
      }
      setChartdata(weeksWithCounts);
    }
  }, [GetCINDetailsCountByLastXDaysData, SelctChart]);

  const chartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      enabledOnSeries: undefined,
      shared: true,
      followCursor: true,
      intersect: false,
      inverseOrder: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const data = series[seriesIndex][dataPointIndex];
        const seriesName = w.config.series[seriesIndex].name;
        const calendarIconPath =
          "M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z";
        const iconColor = w.config.fill.gradient.colorStops[0][0].color;

        return `
                    <div class="bg-cin/40 border-cin border-2" style="padding: 10px; color: white; border-radius: 5px; font-size: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
                         <div style="margin-top: 5px; font-size: 12px; font-weight: bold;" class="bg-cin rounded text-white">
                            <span class="text-xl dark:text-white inline-block px-2 py-1">${seriesName}</span>
                         </div>
                         <div class="bg-white/20 text-navy-800 dark:text-white border-[1px] border-white rounded px-2 py-2 my-2 text-xl font-bold" style="display: flex; align-items: center; margin-bottom: 5px;">
                            <svg viewBox="0 0 24 24" width="16" height="16" style="margin-right: 5px;">
                                <path d="${calendarIconPath}" fill="${iconColor}"/>
                            </svg>
                            <strong>${w.config.xaxis.categories[dataPointIndex]}</strong>
                        </div>
                        <div class="text-3xl text-navy-800 dark:text-white font-bold flex justify-center text-center" style="margin-top: 3px;">
                            <span>${data}</span>
                        </div>
                    </div>
                `;
      },
      hideEmptySeries: true,
      fillSeriesColor: false,
      theme: false,
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      onDatasetHover: {
        highlightDataSeries: false,
      },
      x: {
        show: true,
        format: "dd MMM",
        formatter: undefined,
      },
      y: {
        formatter: undefined,
        title: {
          formatter: (seriesName) => seriesName,
        },
      },
      z: {
        formatter: undefined,
        title: "Size: ",
      },
      marker: {
        show: true,
      },
      items: {
        display: "flex",
      },
      fixed: {
        enabled: false,
        position: "topRight",
        offsetX: 0,
        offsetY: 0,
      },
    },
    xaxis: {
      categories: Chartdata.map((item) => item.label),
      show: true,
      labels: {
        show: true,
        style: {
          colors: "#A3AED0",
          fontSize: "16px",
          fontWeight: "700",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      color: "black",
      labels: {
        show: true,
        style: {
          colors: "#CBD5E0",
          fontSize: "14px",
        },
      },
    },
    grid: {
      show: false,
      strokeDashArray: 5,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          [
            {
              offset: 0,
              color: "#F9BA5D",
              opacity: 1,
            },
            {
              offset: 100,
              color: "#F9BA5D",
              opacity: 0.28,
            },
          ],
        ],
      },
    },
    dataLabels: {
      enabled: false,
      formatter: function (val) {
        return val;
      },
      style: {
        fontSize: "12px",
        fontFamily: undefined,
        colors: ["#A3AED0"],
        rotate: 90,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "40px",
        dataLabels: {
          position: "top",
        },
      },
      dataLabels: {
        enabled: false,
        style: {
          colors: ["#333"],
        },
        offsetX: 30,
        enabledOnSeries: [0],
      },
    },
  };

  const series = [
    {
      name: "New CIN",
      data: Chartdata.map((item) => item.value),
    },
  ];
  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          New CIN By{" "}
          {moment(moment().format("YYYY-MM-DD"))
            .subtract(12, "months")
            .format("YYYY")}
          -{moment().format("YYYY")}
        </div>
        <div className="mb-0 flex items-center justify-center">
          <select
            value={SelctChart}
            onChange={(e) => setSelectdTab(e.target.value)}
            className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 outline-none hover:cursor-pointer dark:!bg-navy-800 dark:text-white"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </header>
      {isGetCINDetailsCountByLastXDaysFetching ? (
        <>
          <div className="py-2"></div>
          <Skeleton active />
          <div className="py-1"></div>
          <Skeleton active />
          <div className="py-1"></div>
          <Skeleton active />
          <div className="py-2"></div>
        </>
      ) : (
        <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
          <Chart
            options={chartOptions}
            series={series}
            type="bar"
            height={350}
          />
        </div>
      )}
    </Card>
  );
}

export default CheckTable;

// React.useEffect(() => {
//     if (SelectdTab == 2 && SelctChart.id == 1) {
//         let monthCounts = {};
//         GetCINByLastXDaysData.forEach(item => {
//             const monthYear = moment(item.registrationDates).format('YYYY-MM');
//             if (!monthCounts[monthYear]) {
//                 monthCounts[monthYear] = 0;
//             }
//             monthCounts[monthYear] += item.cinCount
//         });
//         const resultArray = Object.keys(monthCounts).map(month => ({
//             label: moment(month).format('MMM'), // Use the month (e.g., '2024-01')
//             value: monthCounts[month] // The total count for that month
//         }));
//         setChartdata(resultArray)
//         // console.log("resultArray>>>", resultArray)
//     } else if (SelectdTab == 2 && SelctChart.id == 2) {
//         const startOfMonth = moment().startOf('month');
//         const endOfMonth = moment().endOf('month');
//         let weeksWithCounts = [];
//         let currentWeekStart = startOfMonth.clone().startOf('week'); // Start of first week
//         while (currentWeekStart.isBefore(endOfMonth) || currentWeekStart.isSame(endOfMonth, 'week')) {
//             let currentWeekEnd = currentWeekStart.clone().endOf('week'); // End of the current week
//             if (currentWeekEnd.isAfter(startOfMonth) && currentWeekStart.isBefore(endOfMonth)) {
//                 const weekDataCount = GetCINByLastXDaysData.filter(item => {
//                     const itemDate = moment(item.registrationDates);
//                     return itemDate.isBetween(currentWeekStart, currentWeekEnd, null, '[]');
//                 }).reduce((sum, item) => sum + item.cinCount, 0); // Sum the counts of items in this week
//                 weeksWithCounts.push({
//                     weekStart: currentWeekStart.format('DD-MM'),
//                     weekEnd: currentWeekEnd.format('DD-MM'),
//                     label: `${currentWeekStart.format('DD-MM')} To ${currentWeekEnd.format('DD-MM')}`,
//                     value: weekDataCount
//                 });
//             }
//             currentWeekStart.add(1, 'week');
//         }
//         setChartdata(weeksWithCounts)
//     }
// }, [GetCINByLastXDaysData, SelctChart])
