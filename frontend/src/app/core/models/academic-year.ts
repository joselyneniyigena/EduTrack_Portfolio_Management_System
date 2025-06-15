export interface AcademicYear {
  id?: number;
  endDate: Date;
  status: AcademicYearStatus;
  year: string;
  startDate: Date;
  canEqual?: boolean;
  hashCode?: boolean;
  toString?: boolean;
}

export interface AcademicYearBuilder {
  id: number;
  year: string;
  startDate: Date;
  endDate: Date;
  status: AcademicYearStatus;
}

export enum AcademicYearStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  UPCOMING = 'UPCOMING',
  COMPLETED = 'COMPLETED'
}