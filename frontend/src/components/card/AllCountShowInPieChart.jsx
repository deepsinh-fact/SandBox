import PieChart from 'components/charts/PieChart';
import React from 'react'
import { useSelector } from 'react-redux';
import { TBSelector } from 'Store/Reducers/TBSlice';
import ChartData from 'data/PieChartServich/ChartData';
import ChartOptions from 'data/PieChartServich/ChartOptions';
import { Skeleton } from 'antd';



export default function AllCountShowInPieChart({ color, name, paring = false }) {
    const { GetDashboardCategoryCountData } = useSelector(TBSelector);
    const [countChart, setCountChart] = React.useState([]);
    const [series, setSeries] = React.useState([]);
    const [category, setCategory] = React.useState([]);
    // Chart
    React.useEffect(() => {
        if (GetDashboardCategoryCountData?.length > 0) {
            setCountChart(GetDashboardCategoryCountData?.filter((el) => el.categoryType === name))
        }
    }, [GetDashboardCategoryCountData])
    React.useEffect(() => {
        const chartData = countChart.map((item) => item.totalCount)
        const chatcategory = countChart.map((item) => item.category)
        setSeries(ChartData(chartData));
        setCategory(chatcategory);
    }, [countChart])
    const chartOptions = ChartOptions(category, color);

    return (
        <>
            {paring ?
                <>
                    <div className='py-2'></div>
                    <Skeleton active />
                    <div className='py-1'></div>
                    <Skeleton active />
                    <div className='py-1'></div>
                    <Skeleton active />
                    <div className='py-1'></div>
                    <Skeleton active />
                    <div className='py-2'></div>
                </>
                :
                <PieChart options={chartOptions} series={series} />
            }
        </>
    )
}

