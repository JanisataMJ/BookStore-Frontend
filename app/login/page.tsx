"use client";
import { Form, Input, Button, Card, ConfigProvider, App } from "antd";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import { toast } from 'react-toastify';

export default function LoginPage() {
  const router = useRouter();
  const notify = () => toast("เข้าสู่ระบบสำเร็จ");

  const onFinish = (values: any) => {
    const { email, password } = values;
    if (email === "user@gmail.com" && password === "1234") {
      localStorage.setItem("isLoggedIn", "true");
      toast.success("เข้าสู่ระบบสำเร็จ");
      setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  } else {
      toast.error("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col bg-slate-800">
      <div className="flex items-center mb-5">
        <div className="text-blue-500 mr-2">
          <BookOpen size={70} />
        </div>
        <div className="font-bold text-5xl text-white">BookStore</div>
      </div>
      <Card title="เข้าสู่ระบบ" className="w-96 shadow-lg text-center">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "กรุณากรอกอีเมล" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}
          >
            <Input.Password />
          </Form.Item>
            <Button type="primary" htmlType="submit" block color="red">
              Login
            </Button>
        </Form>
      </Card>
    </div>
  );
}
