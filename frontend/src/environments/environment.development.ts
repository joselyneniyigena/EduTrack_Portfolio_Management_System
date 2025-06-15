export const environment = {
  production: false,
  apiUrl: 'http://localhost:8083/edu-track/api',
  appName: 'Education Track System (DEV)',
  version: '1.0.0-dev',
  features: {
    enableAnalytics: false,
    enableLogging: true,
    enableDebugMode: true
  },
  auth: {
    tokenKey: 'edu_track_token_dev',
    refreshTokenKey: 'edu_track_refresh_token_dev',
    tokenExpirationBuffer: 300000 // 5 minutes in milliseconds
  },
  api: {
    timeout: 60000, // 60 seconds for development
    retryAttempts: 1,
    retryDelay: 500 // 0.5 seconds
  },
  pagination: {
    defaultPageSize: 5,
    maxPageSize: 50,
    pageSizeOptions: [5, 10, 25, 50]
  },
  upload: {
    maxFileSize: 20971520, // 20MB in bytes for development
    allowedFileTypes: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'gif', 'txt'],
    maxFiles: 10
  },
  ui: {
    theme: 'azure-blue',
    sidenavMode: 'side',
    sidenavOpened: true,
    language: 'en',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: '24h'
  }
};