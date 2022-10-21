import { HealthInsurancePlan } from "./HealthInsurancePlan";


export interface HealthInsurance{
      id: number,
      name: string,
      number?: number,
      healthInsurancePlan: HealthInsurancePlan
}
