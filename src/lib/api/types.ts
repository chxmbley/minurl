export type ApiResponse<T = unknown> = {
  ok: boolean;
  message: string;
  data: T;
};

export type MinifyUrlApiResponseData = {
  slug: string;
};

export type MinifyUrlApiResponse = ApiResponse<MinifyUrlApiResponseData>;
