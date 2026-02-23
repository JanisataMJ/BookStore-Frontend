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

/*export const getBooks = async (
    data: GetBooksPayload,
    mode: ScMode,
): Promise<APIResponse> => {
    try {
        const endpoint = mode === M
        const payload = {
            biz: data.biz,
            serial: data.product_fno,
        };

        const response = await mai.get(`/books`, {
            params: {
                ...payload,
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("API Error:", error.response?.data || error.message);
        } else {
            console.error("Unexpected Error:", error);
        }
        throw error;
    }
};*/

/*export const getUsers = async (): Promise<Response> => {
  try {
    const response = await axios.get(`/users`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
};*/

export async function getAllBooks() {
  try {
    const res = await fetch("http://localhost:8000/books/joinCatAu", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error({
        message: `API error: ${res.status}`,
        code: res.status,
      } as any);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching books:", error);
  }
  throw Error;
}

// export async function putBooks() {
//   try {
//     const res = await fetch("http://localhost:8000/books/:id", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error({
//         message: `API error: ${res.status}`,
//         code: res.status,
//       } as any);
//     }

//     return await res.json();
//   } catch (error) {
//     console.error("Error fetching books:", error);
//   }
//   throw Error;
// }

export async function putBooks(id: number, payload: any) {
  const res = await fetch(`http://localhost:8000/books/${id}`, {
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
  const res = await fetch(`http://localhost:8000/books`, {
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
  const res = await fetch(`http://localhost:8000/books/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text as any);
  }

  return res.json();
}