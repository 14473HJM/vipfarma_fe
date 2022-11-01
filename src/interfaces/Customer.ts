import { healthInsurance } from "./healthInsurance"
import { healthInsurancePlan } from "./healthInsurancePlan"

export interface Customer{
    id: number
    name: string
    lastName: string
    identificationType: string,
    identification: string,
    address: string,
    healthInsurance: healthInsurance,
    healthInsurancePlan: healthInsurancePlan
}