import { Locker } from "./Locker";
import { Product } from "./Product";

export interface Stock {
    id: number;
    product: Product;
    createdDate: string;
    endDate: string;
    dueDate: string;
    initialStock: number;
    availableStock: number;
    stockStatus: string;
    locker: Locker;
}