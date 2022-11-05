import { Warehouse } from "./Warehouse";
import { StockOrderItem } from "./StockOrderItem"

export interface StockOrder {
    id: number;
    purchaseOrderId: number;
    createdDate: string;
    endDate: string;
    stockOrderStatus: string;
    stockOrderItems: StockOrderItem[];
    statusComment: string;
    statusReason: string;
    warehouse: Warehouse;
}