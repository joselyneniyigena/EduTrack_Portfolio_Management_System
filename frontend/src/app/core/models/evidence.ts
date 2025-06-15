import { TraineeAssessment } from "./trainee-assessment";

export interface Evidence {
    id?: number;
    traineeAssessment: TraineeAssessment;
    type: string;
    content: string;
    canEqual?: boolean;
    hashCode?: boolean;
    toString?: boolean;
}

export interface EvidenceBuilder {
    id: number;
    type: string;
    content: string;
    traineeAssessment: TraineeAssessment;
}