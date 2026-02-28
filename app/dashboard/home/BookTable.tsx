"use client";
import React, { useState, useEffect } from "react";
import { Table, Input, Select, Form, UploadFile, Button } from "antd";
import type { TableProps } from "antd";
import EditBookInfo from "./EditBookInfo";
import DeleteBook from "./DeleteBook";
import AddBook from "./AddBook";
import { Pencil, Trash, X, Upload, Plus } from "lucide-react";
import { getAllBooks } from "@/services/book_service";
import { getAllCategories } from "@/services/category.service";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { postUpload } from "@/services/upload_service";
import { toast } from "react-toastify";
import { useRef } from "react";

interface Props {
  books: DataType[];
  setBooks: React.Dispatch<React.SetStateAction<DataType[]>>;
  refreshBooks: () => void;
}

export interface DataType {
  BOOK_ID: string;
  TITLE: string;
  AUTHOR_NAME: string;
  CATEGORY_NAME: string;
  PRICE: number;
  STOCK_QTY: number;
  manage: string;
}

export interface CategoryType {
  CATEGORY_ID: number;
  CATEGORY_NAME: string;
}

const BookTable: React.FC<Props> = ({ books, setBooks, refreshBooks }) => {
  const [searchText, setSearchText] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<DataType | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      // ตรวจสอบ type
      if (
        selectedFile.type !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && // .xlsx
        selectedFile.type !== "application/vnd.ms-excel" // .xls
      ) {
        alert("กรุณาอัปโหลดไฟล์ Excel (.xlsx หรือ .xls) เท่านั้น");
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleAddOrUpload = async () => {
    // ถ้ามีไฟล์ → upload
    if (file) {
      setLoading(true);

      try {
        await postUpload(file);
        toast.success("อัปโหลดไฟล์สำเร็จ");
        setFile(null); // reset file
        refreshBooks();
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "อัปโหลดไฟล์ไม่สำเร็จ";

        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }

      return;
    }

    // ถ้าไม่มีไฟล์ → เปิด modal เพิ่มหนังสือปกติ
    setAddModalOpen(true);
  };

  //useState<File | null>(null) ไฟล์เดียว
  //useState<File[]>([]) หลายไฟล์

  const columns: TableProps<DataType>["columns"] = [
    {
      title: <div className="text-center">ชื่อหนังสือ</div>,
      dataIndex: "TITLE",
      key: "TITLE",
      render: (text) => <a>{text}</a>,
    },
    {
      title: <div className="text-center">ผู้แต่ง</div>,
      dataIndex: "AUTHOR_NAME",
      key: "AUTHOR_NAME",
    },
    {
      title: <div className="text-center">หมวดหมู่</div>,
      key: "CATEGORY_NAME",
      dataIndex: "CATEGORY_NAME",
    },
    {
      title: "ราคา (฿)",
      dataIndex: "PRICE",
      key: "PRICE",
      align: "center",
    },
    {
      title: "สต็อก",
      dataIndex: "STOCK_QTY",
      key: "STOCK_QTY",
      align: "center",
    },
    {
      title: "จัดการ",
      key: "manage",
      dataIndex: "manage",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <Button
            shape="circle"
            icon={<Pencil size={20} strokeWidth={1.75} />}
            className="text-green-700 border-green-700"
            size="middle"
            onClick={() => {
              setSelectedBook(record);
              setEditModalOpen(true);
            }}
            title="แก้ไขข้อมูล"
          />

          <Button
            shape="circle"
            icon={<Trash size={20} strokeWidth={1.75} />}
            size="middle"
            className="text-red-600 border-red-700"
            onClick={() => {
              setSelectedBook(record);
              setDeleteModalOpen(true);
            }}
            title="ลบข้อมูล"
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await getAllCategories();
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchCategories();
  }, []);

  const handleDeleteBook = (key: string) => {
    setBooks((prev) => prev.filter((book) => book.BOOK_ID !== key));
  };

  const handleUpdateBook = (updatedBook: any) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.BOOK_ID === updatedBook.key ? updatedBook : book,
      ),
    );
  };

  const handleSearch = async (page = 1, pageSize = 10) => {
    const res = await getAllBooks({
      title: searchText,
      author: searchText,
      category: categoryId,
      page,
      pageSize,
    });

    setBooks(res.data);
    setPagination({
      current: page,
      pageSize,
      total: res.total,
    });
  };

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      handleSearch(1, pagination.pageSize);
    }, 100);

    return () => clearTimeout(delay);
  }, [searchText, categoryId]);

  // const handleSubmit = async () => {
  //   setLoading(true);
  //   if (!file) return;

  //   try {
  //     await postUpload(file);
  //     console.log("Upload success");
  //     toast.success("อัปโหลดไฟล์สำเร็จ");
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("อัปโหลดไฟล์ไม่สำเร็จ");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleRemoveFile = () => {
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-5 bg-white shadow-md rounded-md mt-8">
      <div className="text-xl mb-4 font-bold ">รายการหนังสือทั้งหมด</div>
      <div className="flex flex-col gap-4 mb-4 md:flex-row md:justify-between md:items-center">
        <div className="flex flex-col gap-3 w-full md:flex-row md:w-auto">
          <Input
            prefix={<MagnifyingGlassIcon className="w-5 h-5 text-gray-300" />}
            placeholder="ค้นหาชื่อหนังสือ/ผู้แต่ง"
            allowClear
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full md:w-64"
          />
          <Select
            placeholder="เลือกหมวดหมู่"
            options={categories.map((cat: any) => ({
              value: cat.CATEGORY_ID,
              label: cat.CATEGORY_NAME,
            }))}
            allowClear
            onChange={(value) => setCategoryId(value)}
            className="w-full md:w-64"
          />
        </div>
        <div className="flex gap-2 items-center">
          <Form className="w-full md:w-64">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleChange}
              style={{ display: "none" }}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-between gap-2 px-4 py-2 border border-dashed border-gray-400 rounded-lg hover:bg-gray-100 w-full md:w-64"
            >
              <div className="flex items-center gap-2 text-gray-500 truncate">
                <Upload size={18} />
                <span className={file ? "text-green-600" : ""}>
                  {file ? file.name : "อัปโหลดไฟล์ Excel"}
                </span>
              </div>

              {file && (
                <X
                  size={16}
                  className="text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                />
              )}
            </button>
          </Form>
          <Button
            type="primary"
            onClick={handleAddOrUpload}
            loading={loading}
            icon={<Plus size={20} strokeWidth={2} />}
            className="w-full md:w-auto"
          >
            เพิ่มหนังสือใหม่
          </Button>
          <AddBook
            refreshBooks={refreshBooks}
            open={addModalOpen}
            setOpen={setAddModalOpen}
          />
        </div>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={books}
          rowKey="BOOK_ID"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
          }}
          onChange={(pag) => {
            handleSearch(pag.current!, pag.pageSize!);
          }}
        />
        <EditBookInfo
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          book={selectedBook}
          onUpdate={() => handleUpdateBook}
          refreshBooks={refreshBooks}
        />

        <DeleteBook
          open={deleteModalOpen}
          onCancel={() => setDeleteModalOpen(false)}
          onClose={() => setDeleteModalOpen(false)}
          book={selectedBook}
          onDelete={handleDeleteBook}
          refreshBooks={refreshBooks}
        />
      </div>
    </div>
  );
};

export default BookTable;
