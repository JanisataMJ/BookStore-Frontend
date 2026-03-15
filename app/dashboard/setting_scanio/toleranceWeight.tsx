"use client";
import { Button, Modal, Select, InputNumber, Divider } from "antd";
import type { InputNumberProps } from "antd";
import React, { useState, useEffect } from "react";
import { getToleranceWeight, putToleranceWeight } from "../../../services/setting_service";
import { BizPlant } from "../../types/departmentTypes";
import { UpdateToleranceWeightPayload, GetToleranceWeightPayload } from "../../types/settingType";
import { toast } from "react-toastify";
import { Pencil } from "lucide-react";
import StyledTable from "../../../components/StyledTable";
import { ColumnsType } from "antd/es/table";


interface Props {
  dept: BizPlant;
  // toleranceWeightData: GetToleranceWeightPayload[];
  // putToleranceWeightData: UpdateToleranceWeightPayload[];
}


const ToleranceWeight = ({ dept }: Props) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataSource, setDataSource] = useState<GetToleranceWeightPayload[]>([]);
  const [selectedItem, setSelectedItem] = useState<UpdateToleranceWeightPayload | null>(null);


  const showModal = (item: UpdateToleranceWeightPayload) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };


  const handleOk = () => {
    setEditModalOpen(false);
  };


  const handleCancel = () => {
    setEditModalOpen(false);
  };


  const onChange: InputNumberProps["onChange"] = (value) => {
    console.log("changed", value);
  };


  const columns: ColumnsType<GetToleranceWeightPayload> = [
    {
      title: "Product Type",
      dataIndex: "level_part",
      key: "level_part",
    },
    {
      title: "Tolerance Weight Spec",
      dataIndex: "tolerance",
      key: "tolerance",
      render: (value: number) => {
        const number = value.toFixed(3);
        return <span>± {number}</span>;
      },
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button
          type="text"
          size="small"
          onClick={() => showModal(record)}
          icon={<Pencil size={15} strokeWidth={2} />}
          className="!text-red-800"
        >
          Edit
        </Button>
      ),
    },
  ];


  const fetchData = async () => {
    setLoading(true);
    console.log("dept:", dept);
    try {
      const response = await getToleranceWeight({ biz: dept });
      console.log("API Response:", response);
      console.log("API Response.data:", response.data);
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


  if (loading) {
    return <div>Loading...</div>;
  }


  console.log("dataSource:", dataSource);


  const handleSubmit = async () => {
    if (!selectedItem) return;
    console.log("selectedItem: ", selectedItem);


    try {
      setLoading(true);


      const payload: UpdateToleranceWeightPayload = {
        ...selectedItem,
      };
      console.log("payload before put : ", payload);


      await putToleranceWeight(payload);
      console.log("payload: ", payload);
      console.log("payload type: ", typeof payload);


      toast.success("Update Tolerance Weight successfully");
      setEditModalOpen(false);


      fetchData();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update Tolerance Weight");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <StyledTable columns={columns} dataSource={dataSource} rowKey="level_part" />


      <Modal
        title={<Divider>{selectedItem?.level_part}</Divider>}
        closable={{ "aria-label": "Custom Close Button" }}
        open={editModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <div className="flex gap-4 justify-between">
          <div>
            <p className="mb-2">Tolerance</p>
            <InputNumber
              value={selectedItem?.tolerance}
              onChange={(value) =>
                setSelectedItem((prev) => (prev ? { ...prev, tolerance: Number(value) } : prev))
              }
              style={{ width: 250 }}
            />
          </div>
          <div>
            <p className="mb-2">Unit</p>
            <Select
              value={selectedItem?.unit}
              style={{ width: 200 }}
              onChange={(value) =>
                setSelectedItem((prev) => (prev ? { ...prev, unit: value } : prev))
              }
            >
              <Select.Option value="g">g</Select.Option>
              <Select.Option value="kg">kg</Select.Option>
            </Select>
          </div>
        </div>
      </Modal>
    </>
  );
};


export default ToleranceWeight;


