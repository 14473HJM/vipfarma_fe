import { OrderItem } from "./order-item";
import { User } from "./User";
import { Customer } from "./Customer";

export interface SaleOrder {
    id: number;
    user: User;
    customer: Customer;
    createdDate: Date;
    saleOrderStatus: string;
    statusDetail: string;
    orderItems?: OrderItem;
    totalAmount: number;
}
