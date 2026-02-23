"use client";
import React from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Select,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const Manage: React.FC = () => {
  const [form] = Form.useForm();
  const variant = Form.useWatch("variant", form);
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-screen-sm flex flex-col">
        <Link
          rel="stylesheet"
          href="/dashboard"
          className="flex items-center hover:text-blue-600 mb-3"
        >
          <ArrowLeftOutlined className="mr-3" />
          <div className="text-l">กลับไปหน้ารายการ</div>
        </Link>
        <div
          style={{
            backgroundColor: "#ffffff",
            paddingTop: "25px",
            paddingLeft: "25px",
            paddingRight: "25px",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(150, 150, 150, 0.24)",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "auto",
          }}
        >
          <div className="mb-5 font-bold text-2xl">เพิ่มหนังสือใหม่</div>
          <Form
            {...formItemLayout}
            form={form}
            labelAlign="left"
            variant={variant || "outlined"}
            style={{
              maxWidth: 600,
              display: "flex",
              flexDirection: "column",
            }}
            initialValues={{ variant: "outlined" }}
          >
            <Row gutter={24}>
              <Col className="gutter-row" span={24}>
                <Form.Item
                  label="ชื่อหนังสือ"
                  name="BookName"
                  rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col className="gutter-row" span={24}>
                <Form.Item
                  label="ผู้แต่ง"
                  name="Author"
                  rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col className="gutter-row" span={12}></Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="หมวดหมู่"
                  name="Category"
                  rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
                >
                  <Select
                    options={[
                      { value: "Programming", label: "Programming" },
                      {
                        value: "Software Engineering",
                        label: "Software Engineering",
                      },
                      { value: "Computer", label: "Computer" },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="ราคา"
                  name="Price"
                  rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="จำนวนสต็อก"
                  name="Stock"
                  rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label={null} className="mt-3">
              <Button type="primary" htmlType="submit" className="mr-3">
                บันทึก
              </Button>
              <Button htmlType="reset">ยกเลิก</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Manage;
