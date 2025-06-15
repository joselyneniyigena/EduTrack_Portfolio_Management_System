import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response';
import { PageableResponse } from '../models/pageable-response';
import { ApiConfig } from '../config/api.config';


export interface QueryParams {
    page?: number;
    size?: number;
    sort?: string;
    direction?: 'ASC' | 'DESC';
    search?: string;
    [key: string]: any;
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly baseUrl = ApiConfig.BASE_URL;

    constructor(private http: HttpClient) { }

    get<T>(endpoint: string, params?: QueryParams): Observable<T> {
        // const httpParams = this.buildHttpParams(params);
        return this.http.get<T>(`${this.baseUrl}/${endpoint}`);
    }

    getPageable<T>(endpoint: string, params?: QueryParams): Observable<PageableResponse<T>> {
        const httpParams = this.buildHttpParams(params);
        return this.http.get<ApiResponse<PageableResponse<T>>>(`${this.baseUrl}/${endpoint}`, { params: httpParams })
            .pipe(map(response => response.data));
    }

    getById<T>(endpoint: string, id: number | string): Observable<T> {
        return this.http.get<ApiResponse<T>>(`${this.baseUrl}/${endpoint}/${id}`)
            .pipe(map(response => response.data));
    }

    post<T>(endpoint: string, data: any): Observable<T> {
        return this.http.post<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, data)
            .pipe(map(response => response.data));
    }

    put<T>(endpoint: string, id: number | string, data: any): Observable<T> {
        return this.http.put<ApiResponse<T>>(`${this.baseUrl}/${endpoint}/${id}`, data)
            .pipe(map(response => response.data));
    }

    patch<T>(endpoint: string, id: number | string, data: any): Observable<T> {
        return this.http.patch<ApiResponse<T>>(`${this.baseUrl}/${endpoint}/${id}`, data)
            .pipe(map(response => response.data));
    }

    delete<T>(endpoint: string, id: number | string): Observable<T> {
        return this.http.delete<ApiResponse<T>>(`${this.baseUrl}/${endpoint}/${id}`)
            .pipe(map(response => response.data));
    }

    upload<T>(endpoint: string, file: File, additionalData?: any): Observable<T> {
        const formData = new FormData();
        formData.append('file', file);

        if (additionalData) {
            Object.keys(additionalData).forEach(key => {
                formData.append(key, additionalData[key]);
            });
        }

        return this.http.post<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, formData)
            .pipe(map(response => response.data));
    }

    private buildHttpParams(params?: QueryParams): HttpParams {
        let httpParams = new HttpParams();

        if (params) {
            Object.keys(params).forEach(key => {
                const value = params[key];
                if (value !== null && value !== undefined && value !== '') {
                    httpParams = httpParams.set(key, value.toString());
                }
            });
        }

        return httpParams;
    }
}