import { Trainee } from "./trainee";

export interface TraineePromotion {
  id?: number;
  trainee: Trainee;
  status: string;
  trade: string;
  term: string;
  canEqual?: boolean;
  hashCode?: boolean;
  toString?: boolean;
}

export interface TraineePromotionBuilder {
  id: number;
  term: string;
  trade: string;
  status: string;
  trainee: Trainee;
}