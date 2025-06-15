import { Assessment } from "./assessment";

export interface LearningUnitAssessment {
    id?: number;
    assessment: Assessment;
    status: UnitAssessmentStatus;
    canEqual?: boolean;
    hashCode?: boolean;
    toString?: boolean;
}

export interface LearningUnitAssessmentBuilder {
    id: number;
    assessment: Assessment;
    status: UnitAssessmentStatus;
}

export enum UnitAssessmentStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}