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
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBooks = async () => {
    // setLoading(true);
    // const res = await getAllBooks();

    // setBooks(res.data);
    // console.log("res : ", res.data);
    setLoading(true);
    try {
      const res = await getAllBooks();
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

  return (
    <div className="box-border">
      <BookCard books={books} />
      <BookTable books={books} setBooks={setBooks} refreshBooks={fetchBooks} />
    </div>
  );
};

export default Dashboard;
