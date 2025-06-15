export interface ModuleCourse {
    id?: number;
    type: ModuleType;
    competence: string;
    name: string;
    credits: number;
    passMark: number;
    canEqual?: boolean;
    hashCode?: boolean;
    toString?: boolean;
}

export interface ModuleCourseBuilder {
    id: number;
    name: string;
    type: ModuleType;
    competence: string;
    credits: number;
    passMark: number;
}

export enum ModuleType {
    CORE = 'CORE',
    ELECTIVE = 'ELECTIVE',
    FOUNDATION = 'FOUNDATION'
}