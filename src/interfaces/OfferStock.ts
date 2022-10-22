import { HealthInsurance } from "./HealthInsurance";
import { HealthInsurancePlan } from "./HealthInsurancePlan";
import { Product } from "./Product";

export interface OfferStock{
    id: number;
    product: Product;
    productId?: number;
    healthInsurance: HealthInsurance;
    healthInsurancePlan: HealthInsurancePlan;
    discountType?: string;
    discountValue?: number;
    finalPrice?: number;
    stock: number;
    




}