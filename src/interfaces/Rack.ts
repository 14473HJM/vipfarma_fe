import { Locker } from "./Locker";

export interface Rack {
    id: number;
    name: string;
    warehouse: string;
    lockers: Locker[];
}