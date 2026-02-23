import { message } from "antd";
import axios from "axios";
import Error from "next/error";

interface BookInterface {
  BOOK_ID: number;
  TITLE: string;
  AUTHOR_NAME: string;
  CATEGORY_NAME: string;
  STOCK_QTY: number;
  PRICE: number;
}

export async function getAllBooks(filters: {
  title?: string;
  author?: string;
  category?: number;
  page?: number;
  pageSize?: number;
}) {
  const query = new URLSearchParams();

  if (filters.title) query.append("title", filters.title);
  if (filters.author) query.append("author", filters.author);
  if (filters.category) query.append("category", filters.category.toString());
  if (filters.page) query.append("page", filters.page.toString());
  if (filters.pageSize) query.append("pageSize", filters.pageSize.toString());

  const res = await fetch(
    `http://localhost:8000/api/books/joinCatAu?${query.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
        throw new Error({
          message: `API error: ${res.status}`,
          code: res.status,
        } as any);
      }

  return res.json();
}

export interface TotalBooksType {
  totalBooks: number;
  totalPrice: number;
  totalStock: number;
}

interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export const getTotalBooks = async (): Promise<TotalBooksType> => {
  const res = await fetch("http://localhost:8000/api/bookstotal", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    message.error({
      content: text,
    });
  }

  const json: ApiResponse<TotalBooksType> = await res.json();
  return json.data;
};

export async function putBooks(id: number, payload: any) {
  const res = await fetch(`http://localhost:8000/api/books/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text as any);
  }

  return res.json();
}

export async function postBooks(payload: any) {
  const res = await fetch(`http://localhost:8000/api/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text as any);
  }

  return res.json();
}

export async function deleteBooks(id: number) {
  const res = await fetch(`http://localhost:8000/api/books/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text as any);
  }

  return res.json();
}
