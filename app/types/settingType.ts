export interface GlobalPayload {
    biz: string;
}
export interface GetToleranceWeightPayload extends GlobalPayload {
    item_pk?: number;
    level_part?: string;
    tolerance?: number;
    unit?: string;
    flag_active?: boolean;
}


export interface GetProductcodeAccessoryPayload extends GlobalPayload {
    setting_pk?: number;
    product_code?: string;
    body_sn?: boolean;
    lens_sn1?: boolean;
    lens_sn2?: boolean;
    card_warrantee?: boolean;
}


export interface AddProductcodeAccessoryPayload extends GlobalPayload {
    setting_pk?: number;
    product_code?: string;
    body_sn?: boolean;
    lens_sn1?: boolean;
    lens_sn2?: boolean;
    card_warrantee?: boolean;
}


export interface GetProductcodeRobberyPayload extends GlobalPayload {
    setting_pk?: number;
    product_code?: string;
    flag_active?: boolean;
}


export interface UpdateProductcodeRobberyPayload extends GlobalPayload {
    setting_pk?: number;
    product_code?: string;
    flag_active?: boolean;
}


export interface GetLeaderConfirmPayload extends GlobalPayload {
    autho_pk?: number;
    emp_id?: string;
    emp_name?: string;
    flag_active?: boolean;
}


export interface UpdateLeaderConfirmPayload extends GlobalPayload {
    autho_pk?: number;
    emp_id?: string;
    emp_name?: string;
    flag_active?: boolean;
}


export interface AddLeaderConfirmPayload extends GlobalPayload {
    autho_pk?: number;
    emp_id?: string;
    emp_name?: string;
    flag_active?: boolean;
}


export interface UpdateToleranceWeightPayload extends GlobalPayload {
    item_pk?: number;
    level_part?: string;
    tolerance?: number;
    unit?: string;
    flag_active?: boolean;
}


export interface UpdateProductcodeAccessoryPayload extends GlobalPayload {
    setting_pk?: number;
    product_code?: string;
    body_sn?: boolean;
    lens_sn1?: boolean;
    lens_sn2?: boolean;
    card_warrantee?: boolean;
}


export interface AddProductcodeAccessoryPayload extends GlobalPayload {
    setting_pk?: number;
    product_code?: string;
    body_sn?: boolean;
    lens_sn1?: boolean;
    lens_sn2?: boolean;
    card_warrantee?: boolean;
}
