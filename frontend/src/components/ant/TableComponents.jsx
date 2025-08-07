import { Table } from "antd";
import React from "react";

export default function TableComponents({
  columns,
  dataSource,
  scrollx = 500,
  pagination = true,
  current,
  pageSize,
  total = 0,
  onChange,
  props,
  loading,
}) {
  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{
          x: scrollx,
        }}
        pagination={
          pagination
            ? {
              showSizeChanger: pagination,
              showQuickJumper: pagination,
              total: total,
              align: "start",
              current: current,
              pageSize: pageSize,
              onChange: onChange,
            }
            : false
        }
        className="custom-table"
        loading={loading}
        {...props}
      />
    </>
  );
}