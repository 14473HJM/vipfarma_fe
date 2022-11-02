import { healthInsurancePlan } from "./healthInsurancePlan";

export interface healthInsurance{
     id: number
     name: string
     number: string
     availablePlans: healthInsurancePlan[]

}