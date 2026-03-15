"use client";
import { Button, Modal, Space, Switch } from "antd";
import React, { useState, useEffect } from "react";
import StyledTable from "../../../components/StyledTable";
import { ColumnsType } from "antd/es/table";
import { BizPlant } from "../../types/departmentTypes";
import { GetProductcodeRobberyPayload, UpdateProductcodeRobberyPayload } from "../../types/settingType";
import { getProductcodeRobbery } from "../../../services/setting_service";
import { Plus, Pencil } from "lucide-react";


interface Props {
  dept: BizPlant;
  //productcodeAccessoryData: GetProductcodeAccessoryPayload[];
}


const Robbery = ({ dept }: Props) => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataSource, setDataSource] = useState<GetProductcodeRobberyPayload[]>([]);
  const [selectedItem, setSelectedItem] = useState<UpdateProductcodeRobberyPayload | null>(null);
 


  const showEditModal = (item: UpdateProductcodeRobberyPayload) => {


    setEditModalOpen(true);
  };


  const handleOk = () => {
    setEditModalOpen(false);
    setAddModalOpen(false);
  };


  const showAddModal = () => {
    setAddModalOpen(true);
  };


  const handleCancel = () => {
    setEditModalOpen(false);
    setAddModalOpen(false);
  };


  const columns: ColumnsType<GetProductcodeRobberyPayload> = [
    {
      title: "Product Code",
      dataIndex: "product_code",
      key: "product_code",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button type="text" size="small" onClick={() => showEditModal(record)} icon={<Pencil size={15} strokeWidth={2} />}>
          Edit
        </Button>
      ),
    },
  ];


  const fetchData = async () => {
    setLoading(true);
    console.log("dept:", dept);
    try {
      const response = await getProductcodeRobbery({ biz: dept });
      console.log("API Response:", response);
      setDataSource(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      <div className="flex justify-end mb-4 mr-4">
        <Button type="primary" size="small" onClick={showAddModal} icon={<Plus size={15} strokeWidth={2} />}>
          Product Code
        </Button>
        <Modal
          title="Basic Modal"
          closable={{ "aria-label": "Custom Close Button" }}
          open={addModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>SFG(ดึงProduct Typeมาใส่) - Master Carton </p>
          <p>Tolerance</p>
          <p>Unit</p>
        </Modal>
      </div>


      <StyledTable columns={columns} dataSource={dataSource} rowKey="setting_pk" />


      {/* <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-body ">
          <thead className="bg-slate-600 border-b border-default border-radius-tl-base radius-tr-base border border-slate-600">
            <tr>
              {columns.map((column) => (
                <th key={column.key} scope="col" className="px-4 py-3 text-center text-white">
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataSource.map((data) => (
              <tr key={data.setting_pk} className="hover:bg-gray-50">
                <td className="text-center w-2/3 py-3 border">{data.product_code}</td>
                <td className="text-center border">
                  <Button
                    type="primary"
                    onClick={showEditModal}
                    icon={<Pencil size={15} strokeWidth={2} />}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
            <Modal
              title="Basic Modal"
              closable={{ "aria-label": "Custom Close Button" }}
              open={editModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>SFG(ดึงProduct Typeมาใส่) - Master Carton </p>
              <p>Tolerance</p>
              <p>Unit</p>
            </Modal>
          </tbody>
        </table>
      </div> */}
    </>
  );
};


export default Robbery;
