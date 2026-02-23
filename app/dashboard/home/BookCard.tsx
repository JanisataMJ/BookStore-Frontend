import React from "react";
import { Card, Col, Row, ConfigProvider } from "antd";
import { BookOpenText, Box, DollarSign } from "lucide-react";

interface Book {
  PRICE: number;
  STOCK_QTY: number;
}

interface Props {
  books?: {
    PRICE: number;
    STOCK_QTY: number;
  }[];
}

const BookCard: React.FC<Props> = ({ books = [] }) => {
  const totalBooks = books.length;
  const totalStock = books.reduce(
    (sum, book) => sum + (Number(book.STOCK_QTY) || 0),
    0,
  );
  const totalValue = books.reduce(
    (sum, book) =>
      sum + (Number(book.PRICE) || 0) * (Number(book.STOCK_QTY) || 0),
    0,
  );
  console.log("books >>> : ", books);

  console.log("totalBooks >>> : ", totalBooks);
  console.log("totalStock >>> : ", totalStock);
  console.log("totalValue >>> : ", totalValue);

  return (
    <div className="mb-5 mt-6">
      <ConfigProvider
        theme={{
          components: {
            Card: {
              colorBgContainer: "#ffffff",
              boxShadowTertiary: "0 4px 10px rgba(150, 150, 150, 0.24)",
            },
          },
        }}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Card variant="borderless" className="h-28 md:h-auto">
              <div className="flex items-center">
                <div className="flex bg-blue-100 rounded-2xl w-14 h-14 items-center justify-center mr-6">
                  <BookOpenText
                    size={30}
                    strokeWidth={1.75}
                    className="text-blue-600"
                  />
                </div>
                <div>
                  <div className="text-sm md:text-base">จำนวนหนังสือ</div>
                  <div className="text-2xl font-bold md:text-3xl break-all">
                    {totalBooks}
                  </div>
                </div>
              </div>
            </Card>
          </Col>

          <Col span={8}>
            <Card variant="borderless" className="h-28 md:h-auto">
              <div className="flex items-center">
                <div className="flex bg-yellow-100 rounded-2xl w-14 h-14 items-center justify-center mr-6">
                  <Box
                    size={30}
                    strokeWidth={1.75}
                    className="text-yellow-600"
                  />
                </div>
                <div>
                  <div className="text-sm md:text-base">สต็อกทั้งหมด</div>
                  <div className="text-2xl font-bold md:text-3xl break-all">
                    {totalStock}
                  </div>
                </div>
              </div>
            </Card>
          </Col>

          <Col span={8}>
            <Card variant="borderless" className="md:h-auto">
              <div className="flex items-center">
                <div className="flex bg-green-100 rounded-2xl w-14 h-14 items-center justify-center mr-6">
                  <DollarSign
                    size={30}
                    strokeWidth={1.75}
                    className="text-green-600"
                  />
                </div>
                <div>
                  <div className="text-sm md:text-base">มูลค่ารวม</div>
                  <div className="text-2xl font-bold md:text-3xl break-all">
                    ฿{totalValue.toLocaleString()}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </ConfigProvider>
    </div>
  );
};

export default BookCard;
