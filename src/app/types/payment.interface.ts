export interface TPaymentInfo {
  transactionId: string;
  amount: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerAddress?: string;
  paidStatus?: string;
}
