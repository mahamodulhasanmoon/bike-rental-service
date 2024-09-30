type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TPaymentSession = {
  result: boolean;
  payment_url: string;
};

export type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  token?: string;
  paymentSession?: TPaymentSession;
  meta?: TMeta;
  data: T;
};
