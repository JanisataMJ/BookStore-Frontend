export const BIZ_PLANT = {
   IM_C: "IM-C",
  } as const;


export type BizPlant = (typeof BIZ_PLANT)[keyof typeof BIZ_PLANT];
