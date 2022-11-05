export interface Product{
    id: number;
    name: string;
    barcode?: number;
    laboratory?: string;
    prescriptionRequired?: boolean;
    price: number;
}