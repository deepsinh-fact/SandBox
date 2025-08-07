import { Button, Input, Space } from "antd";
import TableComponents from "components/ant/TableComponents";
import React from "react";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useDispatch } from "react-redux";
import { Ewallet } from "Store/Reducers/TBSlice";
import ServiceApiName from "Service/ServiceApiName";
import Service from "Service/Service";
import moment from "moment"; 
import { Pagination } from "antd";
import { SearchGSTByAdvanceSearchMore } from "Store/Reducers/TBSlice";

const CompanyDetailGstTable = ({
  SearchGSTByAdvanceSearchData,
  isloading,
  SearchGSTByAdvanceSearchUserdata,
  SearchGSTByAdvanceSearchTotalData,
}) => {
  const [dataSource, setdataSource] = React.useState([]);
  const [current, setCurrent] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const searchInput = React.useRef(null);
  const [searchText, setSearchText] = React.useState("");
  const [searchedColumn, setSearchedColumn] = React.useState("");
  const dispatch = useDispatch();
  let productsName = ServiceApiName.Gstsearch;
 
  // const handleSearch = (selectedKeys, confirm, dataIndex) => {
  //   confirm();
  //   setSearchText(selectedKeys[0]);
  //   setSearchedColumn(dataIndex);
  // };
  // const getColumnSearchProps = (dataIndex) => ({
  //   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
  //     <div
  //       style={{
  //         padding: 8,
  //       }}
  //       onKeyDown={(e) => e.stopPropagation()}
  //     >
  //       <Input
  //         ref={searchInput}
  //         placeholder={`Search ${dataIndex}`}
  //         value={selectedKeys[0]}
  //         onChange={(e) =>
  //           setSelectedKeys(e.target.value ? [e.target.value] : [])
  //         }
  //         onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //         style={{
  //           marginBottom: 8,
  //           display: "block",
  //         }}
  //       />
  //       <Space>
  //         <Button
  //           type="primary"
  //           onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //           icon={<SearchOutlined />}
  //           size="small"
  //           style={{
  //             width: 90,
  //           }}
  //         >
  //           Search
  //         </Button>
  //       </Space>
  //     </div>
  //   ),
  //   filterIcon: (filtered) => (
  //     <SearchOutlined
  //       style={{
  //         color: filtered ? "#1677ff" : undefined,
  //       }}
  //     />
  //   ),
  //   onFilter: (value, record) =>
  //     record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  //   render: (text) =>
  //     searchedColumn === dataIndex ? (
  //       <Highlighter
  //         highlightStyle={{
  //           backgroundColor: "#ffc069",
  //           padding: 0,
  //         }}
  //         searchWords={[searchText]}
  //         autoEscape
  //         textToHighlight={text ? text.toString() : ""}
  //       />
  //     ) : (
  //       text
  //     ),
  // });
  React.useEffect(() => {
    // if (SearchCompanyNameData) {
    const data = SearchGSTByAdvanceSearchData?.map((item, index) => ({
      key: (current - 1) * pageSize + index + 1,
      no: (current - 1) * pageSize + index + 1,
      gstin: item.gstin || "",
      legalNameofBusiness: item.legalNameofBusiness || "",
      tradeName: item.tradeName || "",
      date:
        (item.effectiveDateofregistration &&
          moment(item.effectiveDateofregistration).format("L")) ||
        "",
      gstinStatus: item.gstinStatus || "",
      taxpayerType: item.taxpayerType || "",
      aggregateTurnOver: item.aggregateTurnOver || "",
      district: item.district || "",
      stateName: item.stateName || "",
      principalPlaceofBusiness: item.principalPlaceofBusiness || "",
      businessNature: item.businessNature || "",
    }));
    setdataSource(data);
    // }
  }, [SearchGSTByAdvanceSearchData]);

  const handlePagination = (page, pageSize) => {
    dispatch(
      SearchGSTByAdvanceSearchMore({
        location: SearchGSTByAdvanceSearchUserdata.location || "",
        name: SearchGSTByAdvanceSearchUserdata.name || "",
        fromIncDate: SearchGSTByAdvanceSearchUserdata.fromIncDate || "",
        toIncDate: SearchGSTByAdvanceSearchUserdata.toIncDate || "",
        gstinStatus: SearchGSTByAdvanceSearchUserdata.gstinStatus || "",
        taxpayerType: SearchGSTByAdvanceSearchUserdata.taxpayerType || "",
        businessNature: SearchGSTByAdvanceSearchUserdata.businessNature || "",
        pageNumber: page,
        pageSize: pageSize,
      })
    );
    setCurrent(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "GSTIN",
      dataIndex: "gstin",
      key: "gstin",
    },
    {
      title: "Legal Name of Business",
      dataIndex: "legalNameofBusiness",
      key: "legalNameofBusiness",
    },
    {
      title: "Trade Name",
      dataIndex: "tradeName",
      key: "tradeName",
    },
    {
      title: "Registration Date",
      dataIndex: "date",
      key: "date",
      render: (text) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "Status",
      dataIndex: "gstinStatus",
      key: "gstinStatus",
    },
    {
      title: "Taxpayer Type",
      dataIndex: "taxpayerType",
      key: "taxpayerType",
    },
    {
      title: "Aggregate Turnover",
      dataIndex: "aggregateTurnOver",
      key: "aggregateTurnOver",
    },
    {
      title: "District",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "State Name",
      dataIndex: "stateName",
      key: "stateName",
    },
    {
      title: "Principal Place of Business",
      dataIndex: "principalPlaceofBusiness",
      key: "principalPlaceofBusiness",
    },
    {
      title: "Business Nature",
      dataIndex: "businessNature",
      key: "businessNature",
    },
    {
      title: "View",
      key: "view",
      render: (_, record) => (
        <Button
          disabled={isloading}
          type="link"
          icon={<EyeOutlined />}
          onClick={() =>
            Service.walletBalanceFunction(
              productsName,
              dispatch,
              Ewallet,
              record.gstin
            )
          }
        >
          View
        </Button>
      ),
    },
  ];
  return (
    <>
      <TableComponents
        scrollx={750}
        columns={columns}
        dataSource={dataSource}
        total={SearchGSTByAdvanceSearchTotalData}
        pageSize={pageSize}
        current={current}
        onChange={(page, pageSize) => {
          handlePagination(page, pageSize);
        }}
      />
    </>
  );
};

export default CompanyDetailGstTable;
