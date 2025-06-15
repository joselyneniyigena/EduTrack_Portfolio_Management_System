export const environment = {
    production: true,
    apiUrl: 'https://your-production-api.com/api',
    appName: 'Edu Track System',
    version: '1.0.0',
    features: {
        enableAnalytics: true,
        enableLogging: false,
        enableDebugMode: false
    },
    auth: {
        tokenKey: 'edu_track_token',
        refreshTokenKey: 'edu_track_refresh_token',
        tokenExpirationBuffer: 300000 // 5 minutes in milliseconds
    },
    api: {
        timeout: 30000, // 30 seconds
        retryAttempts: 3,
        retryDelay: 1000 // 1 second
    },
    pagination: {
        defaultPageSize: 10,
        maxPageSize: 100,
        pageSizeOptions: [5, 10, 25, 50, 100]
    },
    upload: {
        maxFileSize: 10485760, // 10MB in bytes
        allowedFileTypes: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'gif'],
        maxFiles: 5
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