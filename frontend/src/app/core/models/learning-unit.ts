import { ModuleCourse } from "./module-course";

export interface LearningUnit {
    id?: number;
    name: string;
    objective: string;
    description: string;
    learningOutcome: string;
    module: ModuleCourse;
    canEqual?: boolean;
    hashCode?: boolean;
    toString?: boolean;
}

export interface LearningUnitBuilder {
    id: number;
    name: string;
    objective: string;
    description: string;
    learningOutcome: string;
    module: ModuleCourse;
}