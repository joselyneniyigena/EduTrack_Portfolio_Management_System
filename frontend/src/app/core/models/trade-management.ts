import { ModuleCourse } from "./module-course";

export interface Sector {
  id: number;
  abbreviation: string;
  description: string;
  name: string;
  rtqfLevel: RTQFLevel;
}

export interface Trade {
  id: number;
  abbreviation: string;
  sector: Sector;
  description: string;
  name: string;
}

export interface RTQFLevel {
  id: number;
  description: string;
  name: string;
}

export interface SectorCreateRequest {
  name: string;
  abbreviation: string;
  description: string;
  rtqfLevelId: number;
}

export interface TradeCreateRequest {
  name: string;
  abbreviation: string;
  description: string;
  sectorId: number;
}

export interface RTQFLevelCreateRequest {
  name: string;
  description: string;
}

export interface QueryParams {
  page?: number;
  size?: number;
  sort?: string;
  direction?: 'ASC' | 'DESC';
  search?: string;
  [key: string]: any;
}

export interface TradeModule {
    id?: number;
    tradeModuleId: string;
    trade: Trade;
    module: ModuleCourse;
    canEqual?: boolean;
    hashCode?: boolean;
    toString?: boolean;
}

export interface TradeModuleBuilder {
    id: number;
    module: ModuleCourse;
    trade: Trade;
    tradeModule: TradeModule;
}