"use client";
import StyledTable from "../../../components/StyledTable";
import { ColumnsType } from "antd/es/table";
import { Button, Modal, Select, InputNumber, Form, Switch, Input, Radio } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import type { InputNumberProps } from "antd";
import React, { useState, useEffect, useRef } from "react";
import {
  getLeaderConfirm,
  putLeaderConfirm,
  addUploadFile,
  addLeaderConfirm,
  deleteLeaderConfirm,
} from "../../../services/setting_service";
import { BizPlant } from "../../types/departmentTypes";
import {
  UpdateLeaderConfirmPayload,
  GetLeaderConfirmPayload,
  AddLeaderConfirmPayload,
} from "../../types/settingType";
import { toast } from "react-toastify";
import { Pencil, Plus, X, Upload, Download } from "lucide-react";


interface Props {
  dept: BizPlant;
}


const LeaderConfirm = ({ dept }: Props) => {
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataSource, setDataSource] = useState<GetLeaderConfirmPayload[]>([]);
  const [selectedItem, setSelectedItem] = useState<UpdateLeaderConfirmPayload | null>(null);
  const [addleader, setAddleader] = useState<AddLeaderConfirmPayload | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  type Item = {
    product_code: string;
    body_sn: boolean;
    lens_sn1: boolean;
    lens_sn2: boolean;
    card_warrantee: boolean;
  };


  // const swChange = <K extends keyof Item>(key: K, value: Item[K]) => {
  //   setSelectedItem((prev) => (prev ? { ...prev, [key]: value } : prev));
  // };


  const onChange: InputNumberProps["onChange"] = (value) => {
    console.log("changed", value);
  };


  const openModal = (mode: "add" | "edit", item?: UpdateLeaderConfirmPayload) => {
    setModalMode(mode);
    if (mode === "edit" && item) {
      setSelectedItem(item);
    }
    if (mode === "add") {
      setAddleader({
        biz: dept,
        emp_id: "",
        //emp_name: "",
      });
    }
    setModalOpen(true);
  };


  const handleSubmit = async () => {
    if (modalMode === "add") {
      if (!addleader) return;


      try {
        setLoading(true);


        const payload: AddLeaderConfirmPayload = addleader;
        const res = await addLeaderConfirm(payload);
        const result = res.data?.[0];


        if (!result || result.status !== 1) {
          toast.error(result?.message || "Insert failed");
          return;
        }


        toast.success("Create Leader Confirm successfully");
        setModalMode("add");
        setModalOpen(false);
        fetchData();
      } catch (error) {
        toast.error("Failed to create Leader Confirm");
      } finally {
        setLoading(false);
      }
    } else {
      if (!selectedItem) return;
      try {
        setLoading(true);
        const payload: UpdateLeaderConfirmPayload = { ...selectedItem };


        if (payload.flag_active) {
          const res = await putLeaderConfirm(payload);
          const result = res.data?.[0];


          if (!res.status || !result || result.status !== 1) {
            toast.error(result?.message || res.message || "Update failed");
            return;
          }


          toast.success("Update Leader Confirm successfully");
        } else {
          const res = await deleteLeaderConfirm(payload);
          if (!res.status) {
            toast.error(res.message || "Delete failed");
            return;
          }
          toast.success("Delete Leader Confirm successfully");
        }


        setModalOpen(false);
        fetchData();
      } catch (error) {
        toast.error("Operation failed");
      } finally {
        setLoading(false);
      }
    }
  };


  const columns: ColumnsType<GetLeaderConfirmPayload> = [
    {
      title: "GID",
      dataIndex: "emp_id",
      key: "emp_id",
    },
    {
      title: "Name",
      dataIndex: "emp_name",
      key: "emp_name",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <Button
            type="text"
            size="small"
            onClick={() => openModal("edit", record)}
            icon={<Pencil size={15} strokeWidth={2} />}
            className="!text-red-800"
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];


  const fetchData = async () => {
    setLoading(true);
    console.log("dept:", dept);
    try {
      const response = await getLeaderConfirm({ biz: dept });
      console.log("API Response Leader Confirm:", response);
      console.log("API Response Leader Confirm data:", response.data);
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


  const handleAddOrUpload = async () => {
    if (file) {
      setLoading(true);
      try {
        await addUploadFile(file);
        toast.success("Upload file successfully");
        setFile(null);
        fetchData();
      } catch (error) {
        toast.error("Failed to upload file");
      } finally {
        setLoading(false);
      }
      return;
    }
    openModal("add");
  };


  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (
        selectedFile.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && // .xlsx
        selectedFile.type !== "application/vnd.ms-excel"
      ) {
        toast.error("Please upload Excel (.xlsx/.xls) only!");
        return;
      }
      setFile(selectedFile);
    }
  };


  const handleInputChange = (field: keyof UpdateLeaderConfirmPayload, value: string) => {
    if (!selectedItem) return;


    setSelectedItem({
      ...selectedItem,
      [field]: value,
    });
  };


  const handleSwitchChange = (field: keyof UpdateLeaderConfirmPayload, value: boolean) => {
    if (!selectedItem) return;


    setSelectedItem({
      ...selectedItem,
      [field]: value,
    });
  };


  return (
    <>
      <div className="flex justify-end items-center mb-4 mr-4 gap-3">
        <Form className="flex justify-center items-center">
          <Radio.Group size="small">
            <Radio.Button value="template" className="flex items-center gap-2 text-xs px-3 hover:bg-gray-100 text-slate-600" >
              <a
                href="/templete/Leader(IM-C)-templete.xlsx"
                download
                className="flex items-center gap-2 text-xs text-slate-600"
              >
                <Download size={14} />
                Template
              </a>
            </Radio.Button>
            {/* <Radio.Button value="start">Templete</Radio.Button> */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <Radio.Button value="excel" className="!hover:bg-gray-100" onClick={() => fileInputRef.current?.click()}>
              <div className="flex items-center text-xs gap-2 text-gray-400 truncate ">
                <Upload size={13} />
                <span className={file ? "text-green-600" : ""}>
                  {file ? file.name : "Upload Excel File"}
                </span>
              </div>
              {file && (
                <X
                  size={14}
                  className="text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                />
              )}
            </Radio.Button>
          </Radio.Group>
        </Form>
        <Button
          type="primary"
          size="small"
          onClick={handleAddOrUpload}
          icon={<Plus size={15} strokeWidth={2} />}
        >
          Add
        </Button>
        <Modal
          title={modalMode === "add" ? "Add Leader Confirm" : "Edit Leader Confirm"}
          open={modalOpen}
          onOk={handleSubmit}
          onCancel={() => setModalOpen(false)}
        >
          <p>GID</p>
          <Input
            value={modalMode === "add" ? addleader?.emp_id : selectedItem?.emp_id}
            onChange={(e) => {
              if (modalMode === "add") {
                setAddleader({
                  ...addleader!,
                  emp_id: e.target.value,
                });
              } else {
                setSelectedItem({
                  ...selectedItem!,
                  emp_id: e.target.value,
                });
              }
            }}
          />
          {modalMode === "edit" && (
            <>
              <p>Active</p>
              <Switch
                checked={selectedItem?.flag_active}
                onChange={(checked) => handleSwitchChange("flag_active", checked)}
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
              />
            </>
          )}
        </Modal>
      </div>


      <StyledTable columns={columns} dataSource={dataSource} rowKey="autho_pk" />
    </>
  );
};


export default LeaderConfirm;
