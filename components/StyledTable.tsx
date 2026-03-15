import React, { useState } from "react";
import { Table, TableProps } from "antd";
import { Loader } from "lucide-react";


interface StyledTableProps<T = any> extends TableProps<T> {
  compact?: boolean;
  showTotal?: boolean;
  disableSelection?: boolean;
}


function StyledTable<T extends object = any>({
  compact = true,
  showTotal = true,
  disableSelection = false,
  loading,
  pagination,
  size,
  scroll,
  className = "",
  ...restProps
}: Readonly<StyledTableProps<T>>) {
  const [pageSize, setPageSize] = useState(10);


  return (
    <>
      <Table<T>
        loading={
          loading === true
            ? {
                spinning: true,
                indicator: <Loader className="animate-spin" />,
              }
            : false
        }
        scroll={scroll ?? { x: "max-content" }}
        size={size || (compact ? "small" : "middle")}
        pagination={
          pagination === false
            ? false
            : {
                pageSize,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: showTotal
                  ? (total, range) => `${range[0]}-${range[1]} of ${total} items`
                  : undefined,
                size: "small",
                pageSizeOptions: ["5", "10", "20", "30", "40", "50"],
                onShowSizeChange: (current, size) => setPageSize(size),
                onChange: (page, size) => {
                  if (size !== pageSize) setPageSize(size);
                },
                ...((pagination as any)),
              }
        }
        className={`${compact ? "styled-table-compact" : ""}
          [&_.ant-table-container]:border
          [&_.ant-table-container]:rounded-sm
          [&_.ant-table-container]:border-slate-400
          [&_.ant-table-thead>tr>th]:bg-white
          [&_.ant-table-thead>tr>th]:text-slate-900
          [&_.ant-table-thead>tr>th]:border-slate-400
          [&_.ant-table-tbody>tr>td]:border-slate-200
          [&_.ant-table-cell::before]:hidden
          ${disableSelection ? "[&_.ant-table-tbody>tr>td]:select-none" : ""}
          ${className}`}
        {...restProps}
      />


      {/* Inject CSS for compact table */}
      {compact && (
        <style>
          {`
            .styled-table-compact .ant-table-tbody > tr > td {
              padding: 2px 8px !important;
              font-size: 12px !important;
              line-height: 1.2 !important;
            }
           
            .styled-table-compact .ant-table-thead > tr > th {
              padding: 6px 8px !important;
              font-size: 12px !important;
              font-weight: 500 !important;
            }
           
            .styled-table-compact .ant-btn {
              height: 24px !important;
              padding: 0 6px !important;
              font-size: 11px !important;
            }
           
            .styled-table-compact .ant-btn-icon-only {
              width: 24px !important;
              padding: 0 !important;
            }
           
            .styled-table-compact .ant-space-item {
              margin-right: 4px !important;
            }
           
            .styled-table-compact .ant-pagination {
              margin-top: 8px !important;
            }
           
            .styled-table-compact .ant-pagination-options-size-changer {
              font-size: 11px !important;
            }
          `}
        </style>
      )}
    </>
  );
}


export default StyledTable;




