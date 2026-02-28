export async function postUpload(file: File) {
  const formData = new FormData();
  formData.append("excel", file);


  const res = await fetch("http://localhost:8000/api/uploadFile", {
    method: "POST",
    body: formData,
  });


  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }


  return res.json();
}
