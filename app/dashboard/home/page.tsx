"use client";
import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import BookTable from "./BookTable";
import { getAllBooks } from "@/services/book_service";

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

const Dashboard = () => {
  const [books, setBooks] = useState<DataType[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await getAllBooks({
        page: 1,
        pageSize: 10,
      });
      setBooks(res.data);
      console.log("data: ", res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  const refreshBooks = async () => {
    await fetchBooks();        // refresh ตาราง
    setRefreshKey((k) => k + 1); // trigger การ์ด
  };

  useEffect(() => {
    refreshBooks();
  }, []);

  return (
    <div className="box-border">
      <BookCard refreshKey={refreshKey} />
      <BookTable
        books={books}
        setBooks={setBooks}
        refreshBooks={refreshBooks}
      />
    </div>
  );
};

export default Dashboard;
