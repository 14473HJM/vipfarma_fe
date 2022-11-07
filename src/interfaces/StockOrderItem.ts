import { Locker } from "./Locker";
import { Product } from "./Product";

export interface StockOrderItem {
    id: number;
    stockOrderId: number;
    product: Product;
    requiredQuantity: number;
    receivedQuantity: number;
    rejectedQuantity: number;
    actualQuantity: number;
    stockOrderItemStatus: string;
    lockersToSave: Locker[];
    lockersAvailables: Locker[];
}