"use client";
import React from 'react'
import Accessory from "./accessory";
import LeaderConfirm from "./leaderConfirm";
import Robbery from "./robbery";
import ToleranceWeight from "./toleranceWeight";
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { BizPlant } from "../../types/departmentTypes";


const onChange = (key: string) => {
  console.log(key);
};

interface Props {
  dept: BizPlant;
}



const ScanInOut = ({dept}: Props) => {
  const items: TabsProps['items'] = [
  {
    key: '1',
    label: <div className='from-accent-darker font-bold'>Tolerance Weight</div>,
    children: <ToleranceWeight dept={dept}/>,
  },
  {
    key: '2',
    label: <div className='from-accent-darker font-bold'>Accessory</div>,
    children: <Accessory  dept={dept}/>,
  },
  {
    key: '3',
    label: <div className='from-accent-darker font-bold'>Robbery</div>,
    children: <Robbery  dept={dept}/>,
  },
  {
    key: '4',
    label: <div className='from-accent-darker font-bold'>Leader Confirm</div>,
    children: <LeaderConfirm  dept={dept}/>,
  },
];

  return (
    <div>ScanInOut Page
       <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}


export default ScanInOut
