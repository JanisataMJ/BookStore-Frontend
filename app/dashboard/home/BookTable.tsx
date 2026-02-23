"use client";
import React, { useState, useEffect } from "react";
import { Table, Input, Select } from "antd";
import type { TableProps } from "antd";
import { Button } from "antd";
import EditBookInfo from "./EditBookInfo";
import DeleteBook from "./DeleteBook";
import AddBook from "./AddBook";
import { Pencil, Trash } from "lucide-react";
import { postBooks } from "@/services/book_service";
import { getAllBooks } from "@/services/book_service";
import { getAllCategories } from "@/services/category.service";

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
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "ชื่อหนังสือ",
      dataIndex: "TITLE",
      key: "TITLE",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "ผู้แต่ง",
      dataIndex: "AUTHOR_NAME",
      key: "AUTHOR_NAME",
    },
    {
      title: "หมวดหมู่",
      key: "CATEGORY_NAME",
      dataIndex: "CATEGORY_NAME",
    },
    {
      title: "ราคา (฿)",
      dataIndex: "PRICE",
      key: "PRICE",
    },
    {
      title: "สต็อก",
      dataIndex: "STOCK_QTY",
      key: "STOCK_QTY",
    },
    {
      title: "จัดการ",
      key: "manage",
      dataIndex: "manage",
      render: (_, record) => (
        <div className="flex gap-2">
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
    console.log("searchText:", searchText);
  console.log("categoryId:", categoryId);
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

  return (
    <div className="p-5 bg-white shadow-md rounded-md mt-8">
      <div className="flex justify-between">
        <div className="text-xl mb-4 font-bold">รายการหนังสือทั้งหมด</div>
        <AddBook refreshBooks={refreshBooks} open={addModalOpen} />
      </div>
      <div className="flex gap-4 mb-3">
        <Input
          placeholder="ค้นหาชื่อหนังสือ/ผู้แต่ง"
          allowClear
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 250, marginRight: 10 }}
        />

        <Select
          placeholder="ฟิลเตอร์หมวดหมู่"
          options={categories.map((cat: any) => ({
            value: cat.CATEGORY_ID,
            label: cat.CATEGORY_NAME,
          }))}
          allowClear
          style={{ width: 200, marginRight: 10 }}
          onChange={(value) => setCategoryId(value)}
        />

        <Button
          type="primary"
          onClick={() => handleSearch(1, pagination.pageSize)}
        >
          ค้นหา
        </Button>
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
