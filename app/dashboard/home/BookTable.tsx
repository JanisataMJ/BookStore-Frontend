"use client";
import React, { useState, useEffect } from "react";
import { Flex, Table, Tag, ConfigProvider, Input } from "antd";
import type { TableProps } from "antd";
import { Button } from "antd";
import EditBookInfo from "./EditBookInfo";
import DeleteBook from "./DeleteBook";
import AddBook from "./AddBook";
import { Pencil, Trash } from "lucide-react";
import { postBooks } from "@/services/book_service";

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

const BookTable: React.FC<Props> = ({ books, setBooks, refreshBooks }) => {
  const [searchText, setSearchText] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<DataType | null>(null);
  const { Search } = Input;

  // const handleAddBook = async (newBook: any) => {
  //   // const bookWithKey: DataType = {
  //   //   key: Date.now().toString(),
  //   //   TITLE: newBook.TITLE,
  //   //   AUTHOR_NAME: newBook.AUTHOR_NAME,
  //   //   CATEGORY_NAME: newBook.CATEGORY_NAME,
  //   //   PRICE: newBook.PRICE,
  //   //   STOCK_QTY: newBook.STOCK_QTY,
  //   //   manage: "",
  //   // };

  //   // setBooks((prev) => [...prev, bookWithKey]);
  //   await postBooks(newBook);
  //   refreshBooks();
  // };

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

  const handleDeleteBook = (key: string) => {
    setBooks((prev) => prev.filter((book) => book.BOOK_ID !== key));
  };

  const handleUpdateBook = (updatedBook: any) => {
    setBooks((prev) =>
      prev.map((book) => (book.BOOK_ID === updatedBook.key ? updatedBook : book)),
    );
  };

  const filteredData = (books || []).filter((item) => {
    const keyword = (searchText || "").toLowerCase();

    return (
      item?.TITLE?.toLowerCase().includes(keyword) ||
      item?.AUTHOR_NAME?.toLowerCase().includes(keyword) ||
      item?.CATEGORY_NAME?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="p-5 bg-white shadow-md rounded-md mt-8">
      <div className="flex justify-between">
        <div className="text-xl mb-4 font-bold">รายการหนังสือทั้งหมด</div>
        <AddBook refreshBooks={refreshBooks} open={addModalOpen} />
      </div>

      <div className="flex gap-4">
        <Search
          placeholder="ค้นหาหนังสือ..."
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full mb-3"
        />
      </div>
      <div>
          <Table<DataType>
            columns={columns}
            //{/*dataSource={books} */}
            dataSource={filteredData}
            rowKey="BOOK_ID"
            //{/*rowKey={(record) => record.key} */}
            //scroll={{ y: 400 }}
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
