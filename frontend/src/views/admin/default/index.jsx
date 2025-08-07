import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";

import { columnsDataCheck } from "./variables/columnsData";
import Widget from "components/widget/Widget";
import NewCinChart from "views/admin/default/components/NewCinChart";
import NewgstChart from "views/admin/default/components/NewgstChart";
import tableDataCheck from "./variables/tableDataCheck.json";
import { TBSelector } from "Store/Reducers/TBSlice";
import { useSelector } from "react-redux";

//infodata
import infodata from "data/Infodata";
import { Link } from "react-router-dom";
import Infodata from "data/Infodata";
import AllCountShowChart from "components/card/AllCountShowChart";
import Card from "components/card";
import WidgetUpload from "components/widget/WidgetUpload";

const Dashboard = () => {
  const { GetDashboardCountData, isGetDashboardCategoryCountFetching } = useSelector(TBSelector);
  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Link to={"/admin/gst"}>
          <Widget
            icon={infodata.gstw}
            iconBgColor={"bg-gst"}
            title={"GST"}
            subtitle={`${GetDashboardCountData?.gstCount || "0"}`}
          />
        </Link>
        <Link to={"/admin/cin"}>
          <Widget
            icon={infodata.cinw}
            iconBgColor={"bg-cin"}
            title={"CIN"}
            subtitle={`${GetDashboardCountData?.cinCount || "0"}`}
          />
        </Link>
        <Link to={"/admin/din"}>
          <Widget
            icon={infodata.dinw}
            iconBgColor={"bg-din"}
            title={"DIN"}
            subtitle={`${GetDashboardCountData?.dinCount || "0"}`}
          />
        </Link>
        <Link to={"/admin/pan"}>
          <Widget
            icon={infodata.panw}
            iconBgColor={"bg-pan"}
            title={"PAN"}
            subtitle={`${GetDashboardCountData?.panCount || "0"}`}
          />
        </Link>
        <Widget
          icon={infodata.upiw}
          iconBgColor={"bg-upi"}
          title={"UPI"}
          subtitle={`${GetDashboardCountData?.upiCount || "0"}`}
        />
        <Link to={"/admin/msme"}>
          <Widget
            icon={infodata.msmew}
            iconBgColor={"bg-msme"}
            title={"MSME"}
            subtitle={`${GetDashboardCountData?.msmeCount || "0"}`}
          />
        </Link>
      </div>
      <div style={{ display: "none" }} className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <Link to={"/view/upload?tab=gst"}>
          <WidgetUpload
            icon={infodata.gstw}
            iconBgColor={"bg-gst"}
            title={"GST UPLOAD"}
          />
        </Link>
        <Link to={"/view/upload?tab=cin"}>
          <WidgetUpload
            icon={infodata.cinw}
            iconBgColor={"bg-cin"}
            title={"CIN UPLOAD"}
          />
        </Link>
        <Link to={"/view/upload?tab=iec"}>
          <WidgetUpload
            icon={infodata.iecw}
            iconBgColor={"bg-iec"}
            title={"IEC UPLOAD"}
          />
        </Link>
        <Link to={"/view/upload?tab=darpandin"}>
          <WidgetUpload
            icon={infodata.ngow}
            iconBgColor={"bg-pan"}
            title={"DARPAN UPLOAD"}
          />
        </Link>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div>
          <NewCinChart
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div>
        <div>
          <NewgstChart
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div>
        <div>
          <Card extra={"w-full h-full sm:overflow-auto px-6"}>
            <header className="relative flex items-center justify-between pt-4">
              <div className="text-xl font-bold text-navy-700 dark:text-white">
                PAN
              </div>
            </header>

            <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
              <AllCountShowChart paring={isGetDashboardCategoryCountFetching} name={"PAN"} color={Infodata.color.pan} />
            </div>
          </Card>
        </div>
        <div>
          <Card extra={"w-full h-full sm:overflow-auto px-6"}>
            <header className="relative flex items-center justify-between pt-4">
              <div className="text-xl font-bold text-navy-700 dark:text-white">
                DIN
              </div>
            </header>

            <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
              <AllCountShowChart paring={isGetDashboardCategoryCountFetching} name={"CINSECTOR"} color={Infodata.color.din} />
            </div>
          </Card>
        </div>
      </div>
    </div >
  );
};

export default Dashboard;
