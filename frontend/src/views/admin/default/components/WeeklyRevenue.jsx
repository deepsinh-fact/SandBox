import Card from "components/card";
import BarChart from "components/charts/BarChart";
import {
  barChartDataWeeklyRevenue,
  barChartOptionsWeeklyRevenue,
} from "variables/charts";

const WeeklyRevenue = ({ count, icon, color }) => {
  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="mb-auto flex items-center justify-between px-6">
        <div className={`${color} rounded-[10px]  p-3`}>
          <span className="flex items-center h-8 w-8">
            <img src={icon} alt={icon} className="w-12 aspect-square object-contain"></img>
          </span>
        </div>
        <h2 className=" md:text-[30px] lg:text-[28px] xl:text-[25px] 2xl:text-[30px] text-[25px] font-bold text-navy-700 dark:text-white">
          {count} M
        </h2>
      </div>

      <div className="md:mt-16 lg:mt-0">
        <div className="h-[220px] w-full xl:h-[220px]">
          <BarChart
            chartData={barChartDataWeeklyRevenue}
            chartOptions={barChartOptionsWeeklyRevenue}
          />
        </div>
      </div>
    </Card>
  );
};

export default WeeklyRevenue;
