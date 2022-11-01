import { BranchOffice } from "./BranchOffice";

export interface User {
    id: number;
    userName: string;
    email: string;
    password: string;
    userRole: string;
    branchOffice: BranchOffice;
}