import { Group } from "src/app/group/models/group.interface";

export interface Student {
    id? : number;
    name: string;
    birthdate: Date;
    number: number;
    group: Group;
}