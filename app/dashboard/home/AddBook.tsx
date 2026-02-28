"use client";
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Select,
  Button,
  Modal,
  Divider,
} from "antd";
import { postBooks } from "@/services/book_service";
import { getAllAuthors } from "@/services/author_service";
import { getAllCategories } from "@/services/category.service";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refreshBooks: () => void;
}

export interface DataType {
  AUTHOR_ID: number;
  AUTHOR_NAME: string;
}

export interface CategoryType {
  CATEGORY_ID: number;
  CATEGORY_NAME: string;
}

const AddBook: React.FC<Props> = ({ open, setOpen, refreshBooks }) => {
  //const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [books, setBooks] = useState<any[]>([]);
  const [createBook, setCreateBook] = useState<DataType[]>([]);
  const [authors, setAuthors] = useState<DataType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    async function fetchAuthors() {
      try {
        const res = await getAllAuthors();
        setAuthors(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchAuthors();
  }, [open]);

  useEffect(() => {
    async function fetchAuthors() {
      try {
        const res = await getAllCategories();
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchAuthors();
  }, [open]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const newBook = {
        BOOK_ID: values.BOOK_ID,
        TITLE: values.TITLE,
        AUTHOR_ID: values.AUTHOR_ID,
        CATEGORY_ID: values.CATEGORY_ID,
        PRICE: values.PRICE,
        STOCK_QTY: values.STOCK_QTY,
      };

      const response = await postBooks(newBook);

      setCreateBook(response.data);
      form.resetFields();
      setOpen(false);
      refreshBooks();
    } catch (error: any) {
  console.log("Full error:", error);

  const backendMessage =
    error?.response?.data?.message ||
    error?.response?.data ||
    error?.message;

  if (backendMessage?.includes("already exists")) {
    toast.error("ชื่อหนังสือนี้มีอยู่แล้วในระบบ");
  } else {
    toast.error(backendMessage || "บันทึกข้อมูลไม่สำเร็จ");
  }
}
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const handleDeleteBook = (key: string) => {
    setBooks((prev) => prev.filter((book) => book.key !== key));
  };

  return (
    <>
      <Modal
        title={<div className="text-center m-2">เพิ่มหนังสือใหม่</div>}
        open={open}
        footer={null}
        onCancel={handleCancel}
        mask={{ closable: false }}
        //onOk={handleSubmit}
      >
        <Divider className="size-0.5 bg-gray-200" />
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          key={"BOOK_ID"}
        >
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="ชื่อหนังสือ"
                name="TITLE"
                rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
              >
                <Input placeholder="กรอกชื่อหนังสือ" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="ผู้แต่ง"
                name="AUTHOR_ID"
                rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
              >
                <Select
                  placeholder="เลือกผู้แต่ง"
                  options={authors.map((aut) => ({
                    value: aut.AUTHOR_ID,
                    label: aut.AUTHOR_NAME,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="หมวดหมู่"
                name="CATEGORY_ID"
                rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
              >
                <Select
                  placeholder="เลือกผู้แต่ง"
                  options={categories.map((cat) => ({
                    value: cat.CATEGORY_ID,
                    label: cat.CATEGORY_NAME,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="ราคา"
                name="PRICE"
                rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
              >
                <InputNumber style={{ width: "100%" }} placeholder="กรอกราคา" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="จำนวนสต็อก"
                name="STOCK_QTY"
                rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="กรอกจำนวนสต็อก"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="mt-3 text-center">
            <Button type="primary" htmlType="submit" className="mr-3">
              บันทึก
            </Button>
            <Button onClick={handleCancel}>ยกเลิก</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddBook;
