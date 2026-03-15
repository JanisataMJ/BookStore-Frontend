"use client";
import { Button, Modal, Select, Switch, Divider, Input, Col, Row } from "antd";
import React, { useState, useEffect } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { BizPlant } from "../../types/departmentTypes";
import type { InputNumberProps } from "antd";
import StyledTable from "../../../components/StyledTable";
import { ColumnsType } from "antd/es/table";
import {
  GetProductcodeAccessoryPayload,
  UpdateProductcodeAccessoryPayload,
  UpdateToleranceWeightPayload,
  AddProductcodeAccessoryPayload,
} from "../../types/settingType";
import {
  getProductcodeAccessory,
  putProductcodeAccessory,
  addProductcodeAccessory,
} from "../../../services/setting_service";
import { Plus, Pencil } from "lucide-react";
import { toast } from "react-toastify";


interface Props {
  dept: BizPlant;
  //productcodeAccessoryData: GetProductcodeAccessoryPayload[];
}


const Accessory = ({ dept }: Props) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataSource, setDataSource] = useState<GetProductcodeAccessoryPayload[]>([]);
  const [addAcessory, setAddAcessory] = useState<AddProductcodeAccessoryPayload | null>(null);
  const [selectedItem, setSelectedItem] = useState<UpdateProductcodeAccessoryPayload | null>(null);


  const ItemModal = () => {
    setItemModalOpen(true);
  };


  // const editModal = (item: UpdateProductcodeAccessoryPayload) => {
  //   setSelectedItem(item);
  //   setEditModalOpen(true);
  // };


  const handleOk = () => {
    //setAddModalOpen(false);
    setItemModalOpen(false);
  };


  const handleCancel = () => {
    setEditModalOpen(false);
    setAddModalOpen(false);
    setItemModalOpen(false);
    setModalOpen(false);
  };


  const openModal = (mode: "add" | "edit", item?: UpdateProductcodeAccessoryPayload) => {
    setModalMode(mode);
    if (mode === "edit" && item) {
      setSelectedItem(item);
    }
    if (mode === "add") {
      setAddAcessory({
        biz: dept,
        product_code: "",
        body_sn: false,
        lens_sn1: false,
        lens_sn2: false,
        card_warrantee: false,
      });
    }
    setModalOpen(true);
  };


  const handleSubmit = async () => {
    if (modalMode === "add") {
      if (!addAcessory) return;


      try {
        setLoading(true);


        const payload: AddProductcodeAccessoryPayload = addAcessory;
        const res = await addProductcodeAccessory(payload);
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
        toast.error("Failed to create Accessory");
      } finally {
        setLoading(false);
      }
    } else {
      if (!selectedItem) return;
      try {
        setLoading(true);
        const payload: UpdateProductcodeAccessoryPayload = { ...selectedItem };
        const res = await putProductcodeAccessory(payload);
        const result = res.data?.[0];


        if (!res.status || !result || result.status !== 1) {
          toast.error(result?.message || res.message || "Update failed");
          return;
        }


        toast.success("Update Accessory successfully");
        setModalOpen(false);
        fetchData();
      } catch (error) {
        toast.error("Operation failed");
      } finally {
        setLoading(false);
      }
    }
  };


  type Item = {
    product_code: string;
    body_sn: boolean;
    lens_sn1: boolean;
    lens_sn2: boolean;
    card_warrantee: boolean;
  };


  const handleChange = <K extends keyof Item>(key: K, value: Item[K]) => {
    setSelectedItem((prev) => (prev ? { ...prev, [key]: value } : prev));
  };


  const columns: ColumnsType<GetProductcodeAccessoryPayload> = [
    {
      title: "Product Code",
      dataIndex: "product_code",
      key: "product_code",
    },
    {
      title: "Body SN",
      dataIndex: "body_sn",
      key: "body_sn",
      render: (_, record) => (
        <Switch
          checked={record.card_warrantee}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          disabled
          size="small"
        />
      ),
    },
    {
      title: "Lens SN1",
      dataIndex: "lens_sn1",
      key: "lens_sn1",
      render: (_, record) => (
        <Switch
          checked={record.card_warrantee}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          disabled
          size="small"
        />
      ),
    },
    {
      title: "Lens SN2",
      dataIndex: "lens_sn2",
      key: "lens_sn2",
      render: (_, record) => (
        <Switch
          checked={record.card_warrantee}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          disabled
          size="small"
        />
      ),
    },
    {
      title: "Card Warrantee",
      dataIndex: "card_warrantee",
      key: "card_warrantee",
      render: (_, record) => (
        <Switch
          checked={record.card_warrantee}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          disabled
          size="small"
        />
      ),
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
            className="!text-[9px] !h-[14px]"
            onClick={() => openModal("edit", record)}
            icon={<Pencil size={15} strokeWidth={2} />}
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
      const response = await getProductcodeAccessory({ biz: dept });
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


  const handleSwitchChange = (field: keyof UpdateProductcodeAccessoryPayload, value: boolean) => {
    if (!selectedItem) return;


    setSelectedItem({
      ...selectedItem,
      [field]: value,
    });
  };


  return (
    <>
      <div className="flex justify-end gap-3 mb-4 mr-4">
        <div>
          <Button
            type="primary"
            size="small"
            icon={<Plus size={15} strokeWidth={2} />}
            onClick={() => openModal("add", { biz: dept })}
          >
            Product Code
          </Button>
        </div>
        <div>
          <Button
            type="primary"
            size="small"
            onClick={ItemModal}
            icon={<Plus size={15} strokeWidth={2} />}
          >
            Item
          </Button>
          <Modal
            title={<Divider>Add Accessory Check</Divider>}
            closable={{ "aria-label": "Custom Close Button" }}
            open={itemModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Accessory Name</p>
            <Input
              value={selectedItem?.product_code}
              onChange={(e) => handleChange("product_code", e.target.value)}
              style={{ width: "full" }}
            />
          </Modal>
        </div>
      </div>
      <StyledTable columns={columns} dataSource={dataSource} rowKey="setting_pk" />


      <Modal
        title={modalMode === "add" ? "Add Accessory FG" : "Edit Accessory FG"}
        open={modalOpen}
        onOk={handleSubmit}
        onCancel={() => setModalOpen(false)}
      >
        <p>Product Code</p>
        <Input
          value={modalMode === "add" ? addAcessory?.product_code : selectedItem?.product_code}
          onChange={(e) => {
            if (modalMode === "add") {
              setAddAcessory({
                ...addAcessory!,
                product_code: e.target.value,
              });
            } else {
              setSelectedItem({
                ...selectedItem!,
                product_code: e.target.value,
              });
            }
          }}
        />
        {modalMode === "edit" && (
          <>
            <p>Accessory Config</p>
            <Row gutter={16}>
              <Col className="gutter-row" span={6}>
                <div>body_sn</div>
                <Switch
                  checked={selectedItem?.body_sn}
                  onChange={(checked) => handleChange("body_sn", checked)}
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Col>
              <Col className="gutter-row" span={6}>
                <div>lens_sn1</div>
                <Switch
                  checked={selectedItem?.lens_sn1}
                  onChange={(checked) => handleChange("lens_sn1", checked)}
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Col>
              <Col className="gutter-row" span={6}>
                <div>lens_sn2</div>
                <Switch
                  checked={selectedItem?.lens_sn2}
                  onChange={(checked) => handleChange("lens_sn2", checked)}
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Col>
              <Col className="gutter-row" span={6}>
                <div>card_warrantee</div>
                <div>{selectedItem?.card_warrantee}</div>
                {/* <Switch
              checked={selectedItem?.card_warrantee}
              onChange={(checked) => handleChange("card_warrantee", checked)}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            /> */}
                <Switch
                  checked={selectedItem?.card_warrantee}
                  onChange={(checked) => handleSwitchChange("card_warrantee", checked)}
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Col>
            </Row>
          </>
        )}
      </Modal>
    </>
  );
};


export default Accessory;
