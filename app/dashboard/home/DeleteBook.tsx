"use client";
import { Modal } from "antd";
import { deleteBooks } from "@/services/book_service";

interface Props {
  open: boolean;
  onCancel: () => void;
  onClose: () => void;
  book: any;
  onDelete: (key: string) => void;
  refreshBooks: () => void;
}

export default function DeleteBook({
  open,
  onCancel,
  onClose,
  book,
  onDelete,
  refreshBooks
}: Props) {
  const handleConfirmDelete = async () => {
    try {
      if (!book) return;
      
      await deleteBooks(book.BOOK_ID);
      onDelete(book.BOOK_ID);
      console.log("Deleted!!");
      refreshBooks();
      onClose();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <Modal
      title="ลบข้อมูลหนังสือ"
      open={open}
      onCancel={onCancel}
      cancelText="ยกเลิก"
      onOk={handleConfirmDelete}
      okText="ยืนยัน"
      okButtonProps={{ danger: true }}
      mask={{ closable: false }}
    >
      <p>
        คุณต้องการลบหนังสือ <b>{book?.bookName}</b> ใช่หรือไม่?
      </p>
    </Modal>
  );
}
