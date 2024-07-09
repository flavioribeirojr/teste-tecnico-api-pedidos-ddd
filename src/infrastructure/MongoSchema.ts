import mongoose, { Schema } from 'mongoose';
import { OrderStatus } from '../domain/OrderStatus';

export const Order = mongoose.model('Order', new Schema<{
  items: {
    name: string;
    quantity: number;
  }[];
  status: OrderStatus;
}>({
  items: [{
    name: String,
    quantity: Number,
  }],
  status: String,
}));