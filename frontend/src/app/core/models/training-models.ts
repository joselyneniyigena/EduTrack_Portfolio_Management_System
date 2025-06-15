export interface Trainer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  specialization?: string;
  department?: string;
  experienceYears?: number;
  qualifications?: string;
  bio?: string;
  isActive: boolean;
  dateJoined: Date;
  lastLogin?: Date;
  assignedCourses?: Course[];
  assignedTrainees?: number;
  profileImageUrl?: string;
  skills?: string[];
  languages?: string[];
  availability?: TrainerAvailability[];
}

export interface Course {
  id: number;
  name: string;
  code: string;
  description?: string;
  duration?: number;
  status: 'ACTIVE' | 'INACTIVE' | 'COMPLETED' | 'DRAFT';
  startDate?: Date;
  endDate?: Date;
  maxTrainees?: number;
  enrolledTrainees?: number;
}

export interface TrainerAvailability {
  id: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface TrainerStats {
  totalTrainees: number;
  activeCourses: number;
  completedCourses: number;
  averageRating: number;
  totalSessions: number;
  upcomingSessions: number;
}

export interface TrainerCreateRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  specialization?: string;
  department?: string;
  experienceYears?: number;
  qualifications?: string;
  bio?: string;
  isActive?: boolean;
  skills?: string[];
  languages?: string[];
}

export interface TrainerUpdateRequest extends Partial<TrainerCreateRequest> {
  id: number;
}

export interface TrainerSearchParams {
  searchTerm?: string;
  department?: string;
  specialization?: string;
  isActive?: boolean;
  experienceYearsMin?: number;
  experienceYearsMax?: number;
  skills?: string[];
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}

export interface TrainerAssignmentRequest {
  trainerId: number;
  courseId: number;
  assignmentDate?: Date;
  notes?: string;
}

export interface TrainerPerformanceReport {
  trainerId: number;
  period: string;
  totalSessions: number;
  averageAttendance: number;
  averageRating: number;
  completionRate: number;
  feedback: TrainerFeedback[];
}

export interface TrainerFeedback {
  id: number;
  traineeId: number;
  courseId: number;
  rating: number;
  comment: string;
  date: Date;
}

export interface TrainerSchedule {
  id: number;
  trainerId: number;
  courseId: number;
  sessionDate: Date;
  startTime: string;
  endTime: string;
  location?: string;
  sessionType: 'LECTURE' | 'LAB' | 'WORKSHOP' | 'ASSESSMENT';
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED';
}