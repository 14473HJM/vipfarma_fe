import { Laboratory } from "./Laboratory";

export interface Product{
    id: number;
    name: string;
    barcode?: number;
    laboratory?: string;
    prescriptionRequired?: boolean;
    prescription?: string;
    price: number;
}