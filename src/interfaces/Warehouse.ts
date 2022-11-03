import { BranchOffice } from "./BranchOffice";
import { Rack } from "./Rack";

export interface Warehouse {
    id: number;
    name: string;
    location: string;
    branchOffice: BranchOffice;
    racks: Rack[];
}