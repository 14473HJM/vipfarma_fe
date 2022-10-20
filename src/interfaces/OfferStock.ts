import { Product } from "./Product";

export interface OfferStock{
    id: number;
    product?: Product
    productId?: number;
    healthInsuranceId?: number;
    healthInsurancePlanId?: number;
    discountType?: string;
    discountValue?: number;
    finalPrice?: number;
    stock: number;
    




}