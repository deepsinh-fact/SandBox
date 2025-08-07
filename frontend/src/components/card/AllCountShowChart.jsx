import { Skeleton } from 'antd';
import OptionsChart from 'data/ChartServich/OptionsChart';
import SeriesChart from 'data/ChartServich/SeriesChart';
import Infodata from 'data/Infodata';
import React from 'react'
import Chart from "react-apexcharts";
import { useSelector } from 'react-redux';
import { TBSelector } from 'Store/Reducers/TBSlice';

export default function AllCountShowChart({ color, name, paring = false }) {
    const { GetDashboardCategoryCountData } = useSelector(TBSelector);
    const [countChart, setCountChart] = React.useState([]);
    const [series, seseries] = React.useState([]);
    const [category, setcategory] = React.useState([]);


    // Chart
    React.useEffect(() => {
        if (GetDashboardCategoryCountData?.length > 0) {
            setCountChart(GetDashboardCategoryCountData?.filter((el) => el.categoryType === name))
        }
    }, [GetDashboardCategoryCountData])
    React.useEffect(() => {
        const chartData = countChart?.map((item) => item.totalCount)
        const chatcategory = countChart?.map((item) => item.category)
        seseries(SeriesChart(`${name} Count`, chartData));
        setcategory(chatcategory);
    }, [countChart])
    const chartOptions = OptionsChart(category, color);
    return (
        <>{paring ?
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
            <Chart options={chartOptions} series={series} type="bar" height={500} />
        }
        </>

    )
}
