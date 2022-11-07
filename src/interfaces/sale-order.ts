import { OrderItem } from "./order-item";
import { User } from "./User";
import { Customer } from "./Customer";
import { BranchOffice } from "./BranchOffice";

export interface SaleOrder {
    id: number;
    user: User;
    customer: Customer;
    createdDate: Date;
    branchOfficeId?: number;
    branchOffice?: BranchOffice;
    saleOrderStatus: string;
    statusDetail: string;
    saleOrderItems?: OrderItem[];
    totalAmount: number;
}