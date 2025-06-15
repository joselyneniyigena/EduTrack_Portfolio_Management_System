import { AcademicYear } from "./academic-year";

export interface Term {
    id?: number;
    status: string;
    academicYear: AcademicYear;
    startDate: Date;
    endDate: Date;
    toString: string;
    canEqual?: boolean;
    hashCode?: boolean;
}

export interface TermBuilder {
    id: number;
    startDate: Date;
    endDate: Date;
    academicYear: AcademicYear;
    status: string;
}