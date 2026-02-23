"use client";
import { Form, Input, InputNumber, Row, Col, Select, Modal } from "antd";
import { useEffect, useState } from "react";
import { putBooks } from "@/services/book_service";
import { getAllAuthors } from "@/services/author_service";
import { getAllCategories } from "@/services/category.service";

interface Props {
  open: boolean;
  book: any;
  onClose: () => void;
  onUpdate: (book: any) => void;
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

export default function EditBookInfo({ open, onClose, book, onUpdate, refreshBooks }: Props) {
  const [form] = Form.useForm();
  const variant = Form.useWatch("variant", form);
  const [authors, setAuthors] = useState<DataType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  //const [updateBook, setUpdateBook] = useState();

  useEffect(() => {
    if (book) {
      form.setFieldsValue({
        TITLE: book.TITLE,
        AUTHOR_NAME: book.AUTHOR_NAME,
        CATEGORY_NAME: book.CATEGORY_NAME,
        AUTHOR_ID: book.AUTHOR_ID,
        CATEGORY_ID: book.CATEGORY_ID,
        PRICE: book.PRICE,
        STOCK_QTY: book.STOCK_QTY,
      });
    }
  }, [book, form]);

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
    if (open) {
      fetchAuthors();
    }
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
    if (open) {
      fetchAuthors();
    }
  }, [open]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("BOOK_ID : ", book.BOOK_ID);

      if (!book?.BOOK_ID) {
        console.log("No ID found");
        return;
      }

      console.log("values book : ", values);
      const payload = {
        TITLE: values.TITLE,
        AUTHOR_ID: values.AUTHOR_ID,
        CATEGORY_ID: values.CATEGORY_ID,
        PRICE: values.PRICE,
        STOCK_QTY: values.STOCK_QTY,
      }
      console.log("payload book : ", payload);
      await putBooks(book.BOOK_ID,payload );

      refreshBooks();

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <Modal
      title="แก้ไขข้อมูลหนังสือ"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="บันทึก"
      cancelText="ยกเลิก"
      mask={{ closable: false }}
    >
      {book && (
        <div>
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
            <Col>
              <Form.Item
                label="ชื่อหนังสือ"
                name="TITLE"
                rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
              >
                <Input placeholder="กรอกชื่อหนังสือ" />
              </Form.Item>

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

            <Row gutter={24}>
              <Col className="gutter-row" span={24}>
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
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="ราคา"
                  name="PRICE"
                  rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="กรอกราคา"
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
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
          </Form>
        </div>
      )}
    </Modal>
  );
}
