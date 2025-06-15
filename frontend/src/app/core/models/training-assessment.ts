import { LearningUnitAssessment } from "./learning-unit-assessment";
import { TraineePromotion } from "./trainee-module";

export interface TrainingAssessment {
    id?: number;
    learningUnitAssessment: LearningUnitAssessment;
    traineePromotion: TraineePromotion;
    status: string;
    startTime: Date;
    endTime: Date;
    canEqual?: boolean;
    hashCode?: boolean;
    toString?: boolean;
}

export interface TrainingAssessmentBuilder {
    id: number;
    learningUnitAssessment: LearningUnitAssessment;
    traineePromotion: TraineePromotion;
    startTime: Date;
    endTime: Date;
    status: string;
}