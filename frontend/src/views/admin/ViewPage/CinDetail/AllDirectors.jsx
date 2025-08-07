import { Button, Tooltip } from "antd";
import TableComponents from "components/ant/TableComponents";
import moment from "moment";
import React from "react";
import { EyeOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import Service from "Service/Service";
import { Din } from "Store/Reducers/TBSlice";
import ServiceApiName from "Service/ServiceApiName";
import { Ewallet } from "Store/Reducers/TBSlice";
import { TbReload } from "react-icons/tb";

export default function AllDirectors({ cIN_DINs, isloading }) {
  const dispatch = useDispatch();
  // cIN_DINs
  const columns = [
    {
      title: <span>View&nbsp;Details</span>,
      dataIndex: "view",
      key: "view",
    },
    {
      title: <span>View&nbsp;Contact</span>,
      dataIndex: "fme",
      key: "fme",
    },
    {
      title: <span>No</span>,
      dataIndex: "No",
      key: "No",
    },
    {
      title: <span>DIN</span>,
      dataIndex: "CIN",
      key: "CIN",
    },

    {
      title: <span>Name</span>,
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: <span>Designation</span>,
      dataIndex: "Designation",
      key: "Designation",
    },
    {
      title: <span>Email</span>,
      dataIndex: "emailId",
      key: "emailId",
    },
    {
      title: <span>Mobile</span>,
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      className: "text-center",
    },
    {
      title: <span>No&nbsp;Of&nbsp;Companies</span>,
      dataIndex: "noOfCompanies",
      key: "noOfCompanies",
      className: "text-center",
    },
    {
      title: <span>DOJ</span>,
      dataIndex: "DateOfJoin",
      key: "DateOfJoin",
      sorter: (a, b) => {
        const dateA = moment(a.DateOfJoin, "DD/MM/YYYY");
        const dateB = moment(b.DateOfJoin, "DD/MM/YYYY");
        return dateA - dateB; // Ascending order (older dates first)
      },
    },
  ];

  const datas = [];
  cIN_DINs?.map((item, index) => {
    const Fil1 = {
      key: (index + 1).toString(),
      No: (index + 1).toString(),
      CIN: item?.din,
      Name: Service.toCapitalize(item?.name),
      Designation: item?.designation,
      noOfCompanies: item?.noOfCompanies,
      emailId: item?.emailIdRe || "***************",
      mobileNumber: item?.mobileNumberRe || "**********",
      DateOfJoin: item?.datE_JOIN || "-",
      view: (
        <Tooltip
          title="view Din Details"
          placement="bottom">
          <button
            className={`${isloading ? "" : "cursor-pointer text-blue-700"
              } flex items-center gap-2`}
            disabled={isloading}
            onClick={() =>
              Service.walletBalanceFunction(
                ServiceApiName.Dinsearch,
                dispatch,
                Ewallet,
                item?.din
              )
            }
          >
            <EyeOutlined className={`mx-auto text-xl`} />
          </button>
        </Tooltip>
      ),
      fme: (
        <Tooltip
          title="Get Number And Email"
          placement="bottom"
        >
          <button
            className={`${isloading || (item?.emailIdRe && item?.mobileNumberRe) ? "" : "cursor-pointer text-blue-700"
              } flex items-center gap-2`}
            disabled={isloading || (item?.emailIdRe && item?.mobileNumberRe)}
            onClick={() =>
              item?.din &&
              Service.walletBalanceFunction(
                ServiceApiName.DinMoblieEmail,
                dispatch,
                Ewallet,
                item?.din
              )
            }
          >
            <TbReload
              className={`mx-auto text-xl ${isloading ? "animate-spin" : ""}`}
            />{" "}
          </button>
        </Tooltip>
      ),
    };
    datas.push(Fil1);
  });
  return (
    <TableComponents columns={columns} dataSource={datas}></TableComponents>
  );
}
