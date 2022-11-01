import { BillItem } from "./BillItem";
import { Customer } from "./Customer";

export interface Bill {
    id: number;
    customer?: Customer;
    orderId: number;
    createdDate: string;
    dueDate: string;
    items: BillItem[];
    cae: string;
    totalAmount: number;
}