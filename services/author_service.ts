import axios from "axios";
import Error from "next/error";


export async function getAllAuthors() {
  try {
    const res = await fetch("http://localhost:8000/api/authors", {
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
