"use client";
import React from 'react';
import { DownOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps, Button } from 'antd';
import { Dropdown, Space } from 'antd';
import { useRouter } from "next/navigation";
import { CircleUserRound } from 'lucide-react';



const DropdownProfile: React.FC = () => {
  const router = useRouter();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "My Account",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Profile",
    },
    {
      key: "3",
      label: "Settings",
      icon: <SettingOutlined />,
    },
    {
      key: "4",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: () => {
        localStorage.removeItem("isLoggedIn");
        router.push("/login");
      },
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <div className="font-bold">Profile</div>
          <CircleUserRound size={40} strokeWidth={1.25} />
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropdownProfile;