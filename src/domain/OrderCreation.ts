export interface OrderCreation {
  items: OrderCreationItem[];
}

export interface OrderCreationItem {
  name: string;
  quantity: number;
}