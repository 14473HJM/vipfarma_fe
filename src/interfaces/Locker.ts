import { Product } from "./Product";
import { Rack } from "./Rack";

export interface Locker {
    id: number;
    product: Product;
    rack: Rack;
    stockCapacity: number;
    occupiedCapacity: number;
    currentStock: number;
    branchOfficeId: number;
}