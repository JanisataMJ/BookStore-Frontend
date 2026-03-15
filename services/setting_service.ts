//import { axios } from "@/lib/api/base";
import {
  GetToleranceWeightPayload,
  GetProductcodeAccessoryPayload,
  GetProductcodeRobberyPayload,
  UpdateToleranceWeightPayload,
  UpdateProductcodeAccessoryPayload,
  AddProductcodeAccessoryPayload,
  GetLeaderConfirmPayload,
  UpdateLeaderConfirmPayload,
} from "../app/types/settingType";
import { APIResponse } from "../app/types/index";
import axios from "axios";


const MODULE_NAME = "setting";


export const getToleranceWeight = async (data: GetToleranceWeightPayload): Promise<APIResponse> => {
  try {
    const payload = {
      biz: data.biz,
      item_pk: data.item_pk,
      product_type: data.level_part,
      tolerance: data.tolerance,
    };
    const response = await axios.get(
      `http://localhost:8000/api/scaniosampling/gettolerance_weight`,
      {
        params: {
          ...payload,
        },
      },
    );


    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      console.error("API Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
};


export const getProductcodeAccessory = async (
  data: GetProductcodeAccessoryPayload,
): Promise<APIResponse> => {
  try {
    const payload = {
      biz: data.biz,
      setting_pk: data.setting_pk,
      product_code: data.product_code,
      body_sn: data.body_sn,
      lens_sn1: data.lens_sn1,
      lens_sn2: data.lens_sn2,
      card_warrantee: data.card_warrantee,
    };
    const response = await axios.get(
      `http://localhost:8000/api/scaniosampling/getproductcode_accessory`,
      {
        params: {
          ...payload,
        },
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      console.error("API Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
};

export const putProductcodeAccessory = async (
  data: UpdateProductcodeAccessoryPayload,
): Promise<APIResponse> => {
  try {
    const payload = {
      biz: data.biz,
      setting_pk: data.setting_pk,
      product_code: data.product_code,
      body_sn: data.body_sn,
      lens_sn1: data.lens_sn1,
      lens_sn2: data.lens_sn2,
      card_warrantee: data.card_warrantee,
    };
    const response = await axios.put(
      `http://localhost:8000/api/scaniosampling/putproductcode_accessory`,
      payload,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      console.error("API Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
};


export const addProductcodeAccessory = async (
  data: AddProductcodeAccessoryPayload,
): Promise<APIResponse> => {
  try {
    const payload = {
      biz: data.biz,
      product_code: data.product_code,
      body_sn: data.body_sn,
      lens_sn1: data.lens_sn1,
      lens_sn2: data.lens_sn2,
      card_warrantee: data.card_warrantee,
    };
    const response = await axios.post(
      `http://localhost:8000/api/scaniosampling/insertproductcode_accessory`,
      payload,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      console.error("API Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
};


export const getLeaderConfirm = async (data: GetLeaderConfirmPayload): Promise<APIResponse> => {
  try {
    const payload = {
      biz: data.biz,
      autho_pk: data.autho_pk,
      emp_id: data.emp_id,
      emp_name: data.emp_name,
    };
    const response = await axios.get(`http://localhost:8000/api/scaniosampling/getLeaderConfirm`, {
      params: {
        ...payload,
      },
    });


    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      console.error("API Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
};




export const addLeaderConfirm = async (data: GetLeaderConfirmPayload): Promise<APIResponse> => {
  try {
    const payload = {
      biz: data.biz,
      emp_id: data.emp_id,
    };
    const response = await axios.post(`http://localhost:8000/api/scaniosampling/insertLeaderConfirm`, payload);


    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      console.error("API Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
};


export const putLeaderConfirm = async (data: UpdateLeaderConfirmPayload): Promise<APIResponse> => {
  try {
    const payload = {
      biz: data.biz,
      autho_pk: data.autho_pk,
      emp_id: data.emp_id,
    };
    const response = await axios.put(`http://localhost:8000/api/scaniosampling/putLeaderConfirm`, payload);


    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      console.error("API Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
};


export const deleteLeaderConfirm = async (data: UpdateLeaderConfirmPayload): Promise<APIResponse> => {
  try {
    const payload = {
      biz: data.biz,
      autho_pk: data.autho_pk,
      emp_id: data.emp_id,
    };
    const response = await axios.put(`http://localhost:8000/api/scaniosampling/deleteLeaderConfirm`, payload);


    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      console.error("API Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
};



export const getProductcodeRobbery = async (
  data: GetProductcodeRobberyPayload,
): Promise<APIResponse> => {
  try {
    const payload = {
      biz: data.biz,
      setting_pk: data.setting_pk,
      product_code: data.product_code,
      flag_active: data.flag_active,
    };
    const response = await axios.get(
      `http://localhost:8000/api/scaniosampling/getproductcode_robbery`,
      {
        params: {
          ...payload,
        },
      },
    );


    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      console.error("API Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
};


export const putToleranceWeight = async (
  data: UpdateToleranceWeightPayload,
): Promise<APIResponse> => {
  try {
    const payload = {
      biz: data.biz,
      item_pk: data.item_pk,
      level_part: data.level_part,
      tolerance: data.tolerance,
      flag_active: data.flag_active,
      unit: data.unit,
    };
    const response = await axios.put(
      `http://localhost:8000/api/scaniosampling/puttolerance_weight`,
      payload,
    );


    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      console.error("API Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
};


export const addUploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);


    const response = await axios.post(
      `http://localhost:8000/api/scaniosampling/upload_excel_LeaderConfirm`,
      formData,
    );


    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      console.error("API Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
};
