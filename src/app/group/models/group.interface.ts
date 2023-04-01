import { Student } from "src/app/student/models/students.interface";

export interface Group {
    id? : number;
    name: string;
    students: Student[];
}