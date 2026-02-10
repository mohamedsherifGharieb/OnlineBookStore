export type OrderItem = {
  eBookId: string;
  eBookTitle: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}


export type Order = {
  id: string;
  storeName: string;
  totalAmount: number;
  status: string;
  orderDate: string;
  completedDate: string | null;
  cancelledDate: string | null;
  shippingAddress: string;
  items: OrderItem[];
}