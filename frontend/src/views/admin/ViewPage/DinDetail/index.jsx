import React from "react";
import Card from "components/card";
import { useDispatch, useSelector } from "react-redux";
import { Cin } from "Store/Reducers/TBSlice";
import Service from "Service/Service";
import { TBSelector } from "Store/Reducers/TBSlice";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Tooltip } from "antd";
import Highlighter from "react-highlight-words";
import moment from "moment";
import { Mobile360 } from "Store/Reducers/TBSlice";
import TableComponents from "components/ant/TableComponents";
import { MobileToMultipleUPI } from "Store/Reducers/TBSlice";
import ServiceApiName from "Service/ServiceApiName";
import { Ewallet } from "Store/Reducers/TBSlice";
import OptionsChart from "data/ChartServich/OptionsChart";
import Chart from "react-apexcharts";
import SeriesChart from "data/ChartServich/SeriesChart";
import OptionsChartDin from "data/ChartServich/OptionsChartInDin";
import Infodata from "data/Infodata";
import "./styles.css";
import RefreshBtn from "components/RefreshBtn";
import SpinAnimate from "components/RefreshBtn/SpinAnimate";
import { MdEmail, MdOutlinePhone } from "react-icons/md";
import PdfDownload from "components/PdfDownload";

export default function DinDetail() {
  const { isCinFetching, isloading, DinData, viewPortal } =
    useSelector(TBSelector);
  const dispatch = useDispatch();
  const [series, setSeries] = React.useState([{ name: "Default", data: [] }]);
  const [Options, setOptions] = React.useState({
    chart: { type: "bar" },
    xaxis: { categories: [] },
  });
  const [searchText, setSearchText] = React.useState("");
  const [searchedColumn, setSearchedColumn] = React.useState("");
  const searchInput = React.useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  React.useEffect(() => {
    if (DinData?.length > 0) {
      const chartData = DinData.map((item) =>
        Service.calculateAge(item?.companyRegistrationdate_date, "years")
      );
      setSeries(SeriesChart(`DIN ${DinData?.[0]?.din}`, chartData));
    }
    const chartData = DinData?.map((item) =>
      moment(item?.datE_JOIN, "DD/MM/YYYY").format("YYYY")
    );
    const chartName = DinData?.map((item) => item);
    setOptions(
      OptionsChartDin(
        chartName,
        Infodata.color.din,
        Math.max(chartData),
        Math.min(chartData)
      )
    );
  }, [DinData]);

  const data = [];
  DinData?.map((item, index) => {
    const Fil1 = {
      key: (index + 1).toString(),
      No: (index + 1).toString(),
      CIN: item?.cin,
      companyName: Service.toCapitalize(item?.companyName),
      Designation: item?.designation,
      companyROCcode: Service.toCapitalize(item?.companyROCcode),
      DateOfJoin: item?.datE_JOIN,
      emailId: Service.maskEmailAdvanced(item?.emailId) || "",
      dob: Service.calculateAge(item?.datE_JOIN, "yearsMonth"),
      noOfCompanies: item?.noOfCompanies || "",
      mobileNumber: Service.maskNumber(item?.mobileNumber) || "",
      view: (
        <Tooltip
          title={`View CIN Details`}
          placement="bottom"
        >
          <button
            className={`${isloading ? "" : "cursor-pointer text-blue-700"
              } flex items-center gap-2`}
            disabled={isloading}
            onClick={() =>
              Service.walletBalanceFunction(
                ServiceApiName.Cinsearch,
                dispatch,
                Ewallet,
                item?.cin
              )
            }
          >
            <EyeOutlined className={`mx-auto text-xl`} />
          </button>
        </Tooltip>
      ),
    };
    data.push(Fil1);
  });

  const columns = [
    {
      title: "No",
      dataIndex: "No",
      key: "No",
      // width: '30%',
      // ...getColumnSearchProps('No'),
    },
    {
      title: "CIN",
      dataIndex: "CIN",
      key: "CIN",
      // width: '20%',
      ...getColumnSearchProps("CIN"),
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      // width: '20%',
      ...getColumnSearchProps("companyName"),
    },
    {
      title: "Designation",
      dataIndex: "Designation",
      key: "Designation",
      // width: '20%',
      // ...getColumnSearchProps('Designation'),
    },
    {
      title: "Date Of Join",
      dataIndex: "DateOfJoin",
      key: "DateOfJoin",
      sorter: (a, b) => {
        const dateA = moment(a.DateOfJoin, "DD/MM/YYYY");
        const dateB = moment(b.DateOfJoin, "DD/MM/YYYY");

        return dateA - dateB; // Ascending order (older dates first)
      },
      // width: '20%',
      // ...getColumnSearchProps('Designation'),
    },
    {
      title: "Company ROC",
      dataIndex: "companyROCcode",
      key: "companyROCcode",
      // width: '20%',
      ...getColumnSearchProps("companyROCcode"),
    },
    {
      title: "No Of Companies",
      dataIndex: "noOfCompanies",
      key: "noOfCompanies",
      className: "text-center",
      // width: '20%',
      // ...getColumnSearchProps('companyROCcode'),
    },
    {
      title: "Director Year",
      dataIndex: "dob",
      key: "dob",
      className: "text-center",
      // width: '20%',
      // ...getColumnSearchProps('companyROCcode'),
    },
    // {
    //   title: "Mobile Number",
    //   dataIndex: "mobileNumber",
    //   key: "mobileNumber",
    //   className: "text-center",
    //   // render: (text) => <div className={`cursor-pointer ${text ? "text-blue-600" : ""}`} onClick={() => [dispatch(MobileToMultipleUPI({ "mobileNumber": text.replace("+", "") })), dispatch(Mobile360({ "searchNumber": text }))]
    //   // render: (text) => <button disabled={isloading} className={`cursor-pointer ${text ? "text-blue-600" : ""}`} onClick={() => [Service.walletBalanceFunction(ServiceApiName.Mobile360search, dispatch, Ewallet, text)]
    //   // }> {text}</button>,
    //   // width: '20%',
    //   // ...getColumnSearchProps('companyROCcode'),
    // },
    // {
    //   title: "Email",
    //   dataIndex: "emailId",
    //   key: "emailId",
    //   className: "text-center",
    //   // width: '20%',
    //   // ...getColumnSearchProps('companyROCcode'),
    // },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
      align: "center",
      // width: '20%',
      // ...getColumnSearchProps('Designation'),
    },
  ];

  return (
    <div className="mt-3 grid grid-cols-1 gap-5 overflow-hidden">
      <Card extra={"w-full h-full p-3 relative"}>
        <div className="flex flex-col flex-wrap justify-center gap-x-2 md:flex-row md:flex-nowrap md:justify-between">
          <div className="mt-2 text-left md:mb-8">
            <h4 className="px-2 text-2xl font-bold text-navy-700 dark:text-white">
              {DinData?.[0]?.name}
            </h4>
            <p className="px-3 text-base text-gray-600">
              Total Companies:{" "}
              <span className="font-bold">{DinData?.length}</span>
            </p>
          </div>
          <div className="mb-1 mt-2 text-left">
            <div className="flex flex-wrap gap-x-5">
              <p className="flex items-center gap-x-2 px-3 text-base text-navy-700">
                <MdEmail />{" "}
                {!DinData?.[0]?.emailIdRe && (
                  <span className="font-bold">
                    {"Refresh Din To Email Update"}
                  </span>
                )}
                <span className="font-bold">{DinData?.[0]?.emailIdRe}</span>
              </p>
              <p className="flex items-center gap-x-2 px-3 text-base text-navy-700">
                <MdOutlinePhone />{" "}
                {!DinData?.[0]?.mobileNumberRe && (
                  <span className="font-bold">
                    {"Refresh Din To Mobile Update"}
                  </span>
                )}
                <span className="font-bold">{DinData?.[0]?.mobileNumberRe}</span>
              </p>
            </div>
          </div>
          <div className="mb-8 mt-2 text-left">
            <div>
              <p className="px-3 text-base text-gray-600">
                DIN Number:{" "}
                <span className="font-bold">{DinData?.[0]?.din}</span>
              </p>
            </div>
            <div className="ml-auto w-full">
              <div className="flex flex-row justify-end items-center gap-2">
                <div className="flex justify-end">
                  <PdfDownload apiName={ServiceApiName.Dinsearch} NameOfCompany={DinData?.[0]?.companyName} title={DinData?.[0]?.din} />
                </div>
                <Tooltip
                  placement="bottom"
                  title={
                    <div className="">
                      <div className="flex flex-col gap-2">
                        <div className="items-center gap-2">
                          <div className="text-sm font-semibold">
                            Refresh DINDetails
                          </div>
                          <div className="text-sm font-semibold">
                            (Mobile and Email)
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                >
                  <div>
                    <RefreshBtn
                      handleRefresh={() =>
                        DinData?.[0]?.din &&
                        Service.walletBalanceFunction(
                          ServiceApiName.DinMoblieEmail,
                          dispatch,
                          Ewallet,
                          DinData?.[0]?.din
                        )
                      }
                    >
                      <div className="flex items-end justify-center">
                        <SpinAnimate loading={isloading}></SpinAnimate>{" "}
                      </div>
                    </RefreshBtn>
                  </div>
                </Tooltip>

              </div>
            </div>
          </div>
        </div>
        <div className="content-wrapper relative overflow-hidden">
          <div
            className={`
              content-transition
              ${viewPortal === "FaList"
                ? "content-enter translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
              }
              
            `}
          >
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

          <div
            className={`
              content-transition absolute left-0 top-0
              w-full
             ${viewPortal === "FaRegChartBar"
                ? "content-enter translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
              }
            `}
          >
            {viewPortal === "FaRegChartBar" && (
              <div className="mb-2 grid grid-cols-1 gap-2 px-2 xl:grid-cols-1">
                <div className="chart-container shadow-transition p-2">
                  {Options && series && (
                    <Chart
                      options={Options}
                      series={series}
                      type="bar"
                      height={500}
                      className="animate-chart"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
