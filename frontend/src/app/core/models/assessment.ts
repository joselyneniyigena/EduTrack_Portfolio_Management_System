import { TradeModule } from "../../features/trade/trade.module";
import { Term } from "./term";

export interface Assessment {
    id?: number;
    type: AssessmentType;
    dueDateTime: Date;
    term: Term;
    objective: string;
    startTime: Date;
    tradeModule: TradeModule;
    canEqual?: boolean;
    hashCode?: boolean;
    toString?: boolean;
    location: AssessmentLocation;
    category: AssessmentCategory;
}

export interface AssessmentBuilder {
    id: number;
    type: AssessmentType;
    dateTime: Date;
    category: AssessmentCategory;
    location: AssessmentLocation;
    term: Term;
    tradeModule: TradeModule;
}

export interface AssessmentType {
    id?: number;
    toString: string;
    value: string;
    fromString: string;
}

export interface AssessmentLocation {
    id?: number;
    toString: string;
    value: string;
    fromString: string;
}

export interface AssessmentCategory {
    id?: number;
    toString: string;
    value: string;
    fromString: string;
}