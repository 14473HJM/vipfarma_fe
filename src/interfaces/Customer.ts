import { healthInsurancePlan } from "./healthInsurancePlan";
import { healthInsurance } from "./healthInsurance";


export interface Customer{
    id: number;
    name: string;
    lastName: string;
    identificationType: string;
    identification: string;
    address: string;
    healthInsurance: healthInsurance;
    healthInsurancePlan: healthInsurancePlan;
    healthInsuranceId?: number;
    healthInsurancePlanId?: number;
}