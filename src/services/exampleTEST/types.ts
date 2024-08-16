export type TestItemType = {
  routeTypeId: number;
  routeType: string;
};

export type TestAPIResponseType = {
  success: boolean;
  data: TestItemType[];
  message: string;
};

export type TestAPIPostPayload = {
  routeType: string;
};
