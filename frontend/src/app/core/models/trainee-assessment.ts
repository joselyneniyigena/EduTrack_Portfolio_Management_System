import { LearningUnitAssessment } from "./learning-unit-assessment";
import { TraineePromotion } from "./trainee-module";

export interface TraineeAssessment {
  id?: number;
  learningUnitAssessment: LearningUnitAssessment;
  traineePromotion: TraineePromotion;
  status: string;
  endTime: Date;
  canEqual?: boolean;
  hashCode?: boolean;
  toString?: boolean;
}

export interface TraineeAssessmentBuilder {
  id: number;
  learningUnitAssessment: LearningUnitAssessment;
  traineePromotion: TraineePromotion;
  endTime: Date;
  status: string;
}
