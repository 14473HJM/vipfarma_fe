import { healthInsurance } from "./healthInsurance";
import { healthInsurancePlan } from "./healthInsurancePlan";
import { Product } from "./Product";

export interface OfferStock{
    id: number;
    product: Product;
    productId?: number;
    healthInsurance: healthInsurance;
    healthInsurancePlan: healthInsurancePlan;
    discountType?: string;
    discountValue?: number;
    finalPrice?: number;
    stock: number;
    




}