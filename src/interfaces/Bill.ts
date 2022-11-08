import { BillItem } from "./BillItem";
import { Customer } from "./Customer";
import { User } from "./User";

export interface Bill {
    id: number;
    user?: User;
    customer?: Customer;
    orderId: number;
    createdDate: string;
    dueDate: string;
    items: BillItem[];
    cae: string;
    totalAmount: number;
}