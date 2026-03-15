//import DepartmentGuard from "@/components/guards/DepartmentGuard";
import React, { Suspense } from "react";
//import { loadSearchParams, SearchParamsType } from "@/utils/searchParamsUtils";
//import { globalParamsSchema } from "@/types/departmentTypes";
//import KawaiiLoading from "@/components/common/KawaiiLoading";
import ScanInOut from "./scanio";
import { Pencil, Trash, X, Upload, Plus } from "lucide-react";
import { Tabs } from 'antd';
//import Unavailable from "@/components/common/Unavaliable";
import { BizPlant } from "../../types/departmentTypes";


// interface Props {
//   searchParams: Promise<SearchParamsType>;
// }

interface Props {
  dept: BizPlant;
  // toleranceWeightData: GetToleranceWeightPayload[];
  // putToleranceWeightData: UpdateToleranceWeightPayload[];
}


const Page = async ({ dept }: Props) => {
  //const searchParamsData = await loadSearchParams(searchParams, globalParamsSchema);
    //const { dept } = searchParamsData;


    // if (!dept) {
    //   return <Unavailable message="Please select a department." />;
    // }
  // const params = await loadSearchParams(searchParams, globalParamsSchema);
  // const { dept } = params;


  return (
    // <DepartmentGuard dept={dept}>
    //   <Suspense fallback={<KawaiiLoading />}>
    //   <ScanInOut dept={dept}/>
     
    //   </Suspense>
    // </DepartmentGuard>
    <Suspense >
      <ScanInOut dept={dept}/>
     
      </Suspense>
  );
};


export default Page;
