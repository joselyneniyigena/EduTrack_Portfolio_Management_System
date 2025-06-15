import { environment } from "../../../environments/environment";

export class AppConfig {
  static readonly APP_NAME = environment.appName;
  static readonly VERSION = environment.version;
  static readonly API_URL = environment.apiUrl;
  static readonly PRODUCTION = environment.production;

  // Authentication Configuration
  static readonly AUTH_CONFIG = {
    TOKEN_KEY: environment.auth.tokenKey,
    REFRESH_TOKEN_KEY: environment.auth.refreshTokenKey,
    TOKEN_EXPIRATION_BUFFER: environment.auth.tokenExpirationBuffer
  };

  // API Configuration
  static readonly API_CONFIG = {
    TIMEOUT: environment.api.timeout,
    RETRY_ATTEMPTS: environment.api.retryAttempts,
    RETRY_DELAY: environment.api.retryDelay
  };

  // Pagination Configuration
  static readonly PAGINATION_CONFIG = {
    DEFAULT_PAGE_SIZE: environment.pagination.defaultPageSize,
    MAX_PAGE_SIZE: environment.pagination.maxPageSize,
    PAGE_SIZE_OPTIONS: environment.pagination.pageSizeOptions
  };

  // Upload Configuration
  static readonly UPLOAD_CONFIG = {
    MAX_FILE_SIZE: environment.upload.maxFileSize,
    ALLOWED_FILE_TYPES: environment.upload.allowedFileTypes,
    MAX_FILES: environment.upload.maxFiles
  };

  // UI Configuration
  static readonly UI_CONFIG = {
    THEME: environment.ui.theme,
    SIDENAV_MODE: environment.ui.sidenavMode,
    SIDENAV_OPENED: environment.ui.sidenavOpened,
    LANGUAGE: environment.ui.language,
    DATE_FORMAT: environment.ui.dateFormat,
    TIME_FORMAT: environment.ui.timeFormat
  };

  // Feature Flags
  static readonly FEATURES = {
    ANALYTICS_ENABLED: environment.features.enableAnalytics,
    LOGGING_ENABLED: environment.features.enableLogging,
    DEBUG_MODE_ENABLED: environment.features.enableDebugMode
  };

  // Validation Rules
  static readonly VALIDATION = {
    PASSWORD_MIN_LENGTH: 8,
    USERNAME_MIN_LENGTH: 3,
    EMAIL_PATTERN: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    PHONE_PATTERN: /^[\+]?[1-9][\d]{0,15}$/,
    ROLE_NAME_PATTERN: /^[A-Z_]+$/
  };

  // Date/Time Formats
  static readonly DATE_FORMATS = {
    DISPLAY: 'dd/MM/yyyy',
    API: 'yyyy-MM-dd',
    DATETIME_DISPLAY: 'dd/MM/yyyy HH:mm',
    DATETIME_API: 'yyyy-MM-ddTHH:mm:ss'
  };

  // Error Messages
  static readonly ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network connection error. Please check your internet connection.',
    SERVER_ERROR: 'Server error occurred. Please try again later.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    FORBIDDEN: 'Access denied. Please contact your administrator.',
    NOT_FOUND: 'The requested resource was not found.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    SESSION_EXPIRED: 'Your session has expired. Please log in again.'
  };

  // Success Messages
  static readonly SUCCESS_MESSAGES = {
    SAVE_SUCCESS: 'Data saved successfully.',
    UPDATE_SUCCESS: 'Data updated successfully.',
    DELETE_SUCCESS: 'Data deleted successfully.',
    LOGIN_SUCCESS: 'Welcome! You have been logged in successfully.',
    LOGOUT_SUCCESS: 'You have been logged out successfully.',
    PASSWORD_RESET: 'Password reset instructions have been sent to your email.'
  };

  // Application Routes
  static readonly ROUTES = {
    LOGIN: '/auth/login',
    DASHBOARD: '/dashboard',
    USERS: '/users',
    ROLES: '/roles',
    COURSES: '/courses',
    ASSESSMENTS: '/assessments',
    TRAINING: '/training',
    PROFILE: '/profile'
  };

  // Local Storage Keys
  static readonly STORAGE_KEYS = {
    USER_PREFERENCES: 'user_preferences',
    THEME: 'selected_theme',
    LANGUAGE: 'selected_language',
    SIDEBAR_STATE: 'sidebar_state'
  };
}