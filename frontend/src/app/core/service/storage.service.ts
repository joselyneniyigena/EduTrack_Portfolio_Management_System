import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser
import { User } from '../models/user'; // Assuming User model path is correct

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private readonly TOKEN_KEY = 'edu_track_token';
    private readonly REFRESH_TOKEN_KEY = 'edu_track_refresh_token';
    private readonly USER_KEY = 'edu_track_user';

    private isBrowser: boolean; // Flag to indicate if running in a browser

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        // Determine if the application is running in a browser environment
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    setToken(token: string): void {
        if (this.isBrowser) { // Only access localStorage if in a browser
            localStorage.setItem(this.TOKEN_KEY, token);
        }
    }

    getToken(): string | null {
        if (this.isBrowser) { // Only access localStorage if in a browser
            return localStorage.getItem(this.TOKEN_KEY);
        }
        return null; // Return null if not in browser (e.g., during SSR)
    }

    setRefreshToken(token: string): void {
        if (this.isBrowser) { // Only access localStorage if in a browser
            localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
        }
    }

    getRefreshToken(): string | null {
        if (this.isBrowser) { // Only access localStorage if in a browser
            return localStorage.getItem(this.REFRESH_TOKEN_KEY);
        }
        return null; // Return null if not in browser
    }

    setUser(user: User): void {
        if (this.isBrowser) { // Only access localStorage if in a browser
            localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        }
    }

    getUser(): User | null {
        if (this.isBrowser) { // Only access localStorage if in a browser
            const userStr = localStorage.getItem(this.USER_KEY);
            return userStr ? JSON.parse(userStr) : null;
        }
        return null; // Return null if not in browser
    }

    clearAuth(): void {
        if (this.isBrowser) { // Only access localStorage if in a browser
            localStorage.removeItem(this.TOKEN_KEY);
            localStorage.removeItem(this.REFRESH_TOKEN_KEY);
            localStorage.removeItem(this.USER_KEY);
        }
    }

    setItem(key: string, value: any): void {
        if (this.isBrowser) { // Only access localStorage if in a browser
            localStorage.setItem(key, JSON.stringify(value));
        }
    }

    getItem<T>(key: string): T | null {
        if (this.isBrowser) { // Only access localStorage if in a browser
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        }
        return null; // Return null if not in browser
    }

    removeItem(key: string): void {
        if (this.isBrowser) { // Only access localStorage if in a browser
            localStorage.removeItem(key);
        }
    }
}
