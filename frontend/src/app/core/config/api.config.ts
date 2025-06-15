import { environment } from "../../../environments/environment";

export class ApiConfig {
  static readonly BASE_URL = environment.apiUrl;
  // Authentication Endpoints
  static readonly AUTH = {
    LOGIN: 'auth/authenticate',
    REGISTER: 'auth/signup',
    REFRESH: 'auth/refresh',
    LOGOUT: 'auth/logout',
    FORGOT_PASSWORD: 'auth/forgot-password',
    RESET_PASSWORD: 'auth/reset-password',
    VERIFY_EMAIL: 'auth/verify-email'
  };

  // User Management Endpoints
  static readonly USERS = {
    BASE: 'users',
    BY_ID: (id: number) => `users/${id}`,
    TOGGLE_STATUS: (id: number) => `users/${id}/toggle-status`,
    RESET_PASSWORD: (id: number) => `users/${id}/reset-password`,
    ROLES: (id: number) => `users/${id}/roles`
  };

  // Role Management Endpoints
  static readonly ROLES = {
    BASE: 'roles',
    ALL: 'roles/all',
    BY_ID: (id: number) => `roles/${id}`,
    BY_NAME: (name: string) => `roles/by-name/${name}`,
    EXISTS: (name: string) => `roles/exists/${name}`,
    NAMES: 'roles/names',
    STATISTICS: 'roles/statistics',
    ASSIGN_USER: (roleId: number) => `roles/${roleId}/assign-user`,
    REMOVE_USER: (roleId: number, userId: number) => `roles/${roleId}/remove-user/${userId}`,
    BULK_ASSIGN: 'roles/bulk-assign-user',
    DEFAULTS: 'roles/defaults',
    SEARCH: 'roles/search'
  };

  // Course Management Endpoints
  static readonly COURSES = {
    BASE: 'courses',
    BY_ID: (id: number) => `courses/${id}`,
    MODULES: 'courses/modules',
    SCHOOL_PROFILES: 'courses/school-profiles'
  };

  // Assessment Endpoints
  static readonly ASSESSMENTS = {
    BASE: 'assessments',
    BY_ID: (id: number) => `assessments/${id}`,
    TRAINEE_ASSESSMENTS: 'assessments/trainee-assessments',
    BY_TRAINEE: (traineeId: number) => `assessments/trainee/${traineeId}`,
    SUBMIT: (id: number) => `assessments/${id}/submit`,
    GRADE: (id: number) => `assessments/${id}/grade`
  };

  // Training Endpoints
  static readonly TRAINING = {
    TRAINERS: 'training/trainers',
    TRAINEES: 'training/trainees',
    PROMOTIONS: 'training/promotions',
    ASSESSMENTS: 'training/assessments'
  };

  // Academic Year Endpoints
  static readonly ACADEMIC_YEARS = {
    BASE: 'academic-years',
    BY_ID: (id: number) => `academic-years/${id}`,
    ACTIVE: 'academic-years/active',
    SET_ACTIVE: (id: number) => `academic-years/${id}/set-active`
  };

  // Learning Unit Endpoints
  static readonly LEARNING_UNITS = {
    BASE: 'learning-units',
    BY_ID: (id: number) => `learning-units/${id}`,
    BY_MODULE: (moduleId: number) => `learning-units/module/${moduleId}`,
    ASSESSMENTS: 'learning-units/assessments'
  };

  // Evidence Endpoints
  static readonly EVIDENCE = {
    BASE: 'evidence',
    BY_ID: (id: number) => `evidence/${id}`,
    BY_ASSESSMENT: (assessmentId: number) => `evidence/assessment/${assessmentId}`,
    UPLOAD: 'evidence/upload'
  };

  // Trade Endpoints
  static readonly TRADES = {
    BASE: 'trades',
    BY_ID: (id: number) => `trades/${id}`,
    BY_SECTOR: (sectorId: number) => `trades/sector/${sectorId}`,
    MODULES: 'trades/modules'
  };

  // Sector Endpoints
  static readonly SECTORS = {
    BASE: 'sectors',
    BY_ID: (id: number) => `sectors/${id}`,
    BY_RTQF_LEVEL: (level: string) => `sectors/rtqf-level/${level}`
  };

  // Dashboard Endpoints
  static readonly DASHBOARD = {
    STATS: 'dashboard/stats',
    ACTIVITIES: 'dashboard/activities',
    ASSESSMENT_ANALYTICS: 'dashboard/assessment-analytics',
    ENROLLMENT_ANALYTICS: 'dashboard/enrollment-analytics',
    TRAINER_DATA: (id: number) => `dashboard/trainer/${id}`,
    TRAINEE_DATA: (id: number) => `dashboard/trainee/${id}`
  };

  // File Upload Endpoints
  static readonly FILES = {
    UPLOAD: 'files/upload',
    DOWNLOAD: (id: string) => `files/download/${id}`,
    DELETE: (id: string) => `files/delete/${id}`
  };

  // Notification Endpoints
  static readonly NOTIFICATIONS = {
    BASE: 'notifications',
    MARK_READ: (id: number) => `notifications/${id}/read`,
    MARK_ALL_READ: 'notifications/mark-all-read'
  };

  // Reports Endpoints
  static readonly REPORTS = {
    USERS: 'reports/users',
    ASSESSMENTS: 'reports/assessments',
    TRAINING_PROGRESS: 'reports/training-progress',
    EXPORT: (type: string) => `reports/export/${type}`
  };
   static readonly TRAINERS = {
    GET_ALL: 'trainers',
    GET_BY_ID: 'trainers',
    CREATE: 'trainers',
    UPDATE: 'trainers',
    DELETE: 'trainers',
    ACTIVATE: 'trainers/activate',
    DEACTIVATE: 'trainers/deactivate',
    ASSIGN_COURSE: 'trainers/assign-course',
    UNASSIGN_COURSE: 'trainers/unassign-course',
    GET_COURSES: 'trainers/courses',
    AVAILABLE_COURSES: 'trainers/available-courses',
    GET_TRAINEES: 'trainers/trainees',
    ASSIGN_TRAINEE: 'trainers/assign-trainee',
    UNASSIGN_TRAINEE: 'trainers/unassign-trainee',
    GET_STATS: 'trainers/stats',
    PERFORMANCE_REPORT: 'trainers/performance-report',
    GET_FEEDBACK: 'trainers/feedback',
    GET_SCHEDULE: 'trainers/schedule',
    CREATE_SESSION: 'trainers/schedule/session',
    UPDATE_SESSION: 'trainers/schedule/session',
    CANCEL_SESSION: 'trainers/schedule/cancel-session',
    GET_AVAILABILITY: 'trainers/availability',
    UPDATE_AVAILABILITY: 'trainers/availability',
    GET_DEPARTMENTS: 'trainers/departments',
    GET_SPECIALIZATIONS: 'trainers/specializations',
    GET_SKILLS: 'trainers/skills',
    GET_LANGUAGES: 'trainers/languages',
    EXPORT: 'trainers/export',
    EXPORT_REPORT: 'trainers/export-report',
    IMPORT: 'trainers/import',
    IMPORT_TEMPLATE: 'trainers/import-template',
    UPLOAD_IMAGE: 'trainers/upload-image',
    DELETE_IMAGE: 'trainers/delete-image',
    CHECK_EMAIL: 'trainers/check-email',
    CHECK_PHONE: 'trainers/check-phone'
  };
}

// src/app/shared/constants/app-constants.ts
export class AppConstants {
  // Application Information
  static readonly APP_NAME = 'Edu Track System';
  static readonly APP_VERSION = '1.0.0';
  static readonly COMPANY_NAME = 'Your Organization';

  // User Roles
  static readonly ROLES = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    ADMIN: 'ADMIN',
    TRAINER: 'TRAINER',
    TRAINEE: 'TRAINEE',
    GUEST: 'GUEST'
  };

  // Assessment Types
  static readonly ASSESSMENT_TYPES = {
    QUIZ: 'QUIZ',
    EXAM: 'EXAM',
    PROJECT: 'PROJECT',
    ASSIGNMENT: 'ASSIGNMENT',
    PRACTICAL: 'PRACTICAL'
  };

  // Assessment Status
  static readonly ASSESSMENT_STATUS = {
    DRAFT: 'DRAFT',
    PUBLISHED: 'PUBLISHED',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
    GRADED: 'GRADED',
    CANCELLED: 'CANCELLED'
  };

  // User Status
  static readonly USER_STATUS = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    SUSPENDED: 'SUSPENDED',
    PENDING: 'PENDING'
  };

  // Academic Year Status
  static readonly ACADEMIC_YEAR_STATUS = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    UPCOMING: 'UPCOMING',
    COMPLETED: 'COMPLETED'
  };

  // Module Types
  static readonly MODULE_TYPES = {
    CORE: 'CORE',
    ELECTIVE: 'ELECTIVE',
    FOUNDATION: 'FOUNDATION'
  };

  // Grade Levels
  static readonly GRADE_LEVELS = {
    A: 'A',
    B: 'B',
    C: 'C',
    D: 'D',
    F: 'F'
  };

  // File Types
  static readonly FILE_TYPES = {
    IMAGE: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'],
    DOCUMENT: ['pdf', 'doc', 'docx', 'txt', 'rtf'],
    SPREADSHEET: ['xls', 'xlsx', 'csv'],
    PRESENTATION: ['ppt', 'pptx'],
    ARCHIVE: ['zip', 'rar', '7z']
  };

  // Pagination
  static readonly PAGINATION = {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [5, 10, 25, 50, 100]
  };

  // Date Formats
  static readonly DATE_FORMATS = {
    DISPLAY: 'dd/MM/yyyy',
    API: 'yyyy-MM-dd',
    DATETIME: 'dd/MM/yyyy HH:mm'
  };

  // Validation Patterns
  static readonly PATTERNS = {
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    PHONE: /^[\+]?[1-9][\d]{0,15}$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    ROLE_NAME: /^[A-Z_]+$/,
    USERNAME: /^[a-zA-Z0-9._-]+$/
  };

  // Theme Colors
  static readonly COLORS = {
    PRIMARY: '#0078d4',
    SECONDARY: '#6c757d',
    SUCCESS: '#28a745',
    WARNING: '#ffc107',
    DANGER: '#dc3545',
    INFO: '#17a2b8'
  };
}