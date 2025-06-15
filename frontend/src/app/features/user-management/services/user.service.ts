import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageableResponse } from '../../../core/models/pageable-response';
import { User } from '../../../core/models/user';
import { ApiService, QueryParams } from '../../../core/service/api.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly endpoint = 'users';

    constructor(private apiService: ApiService) { }

    getUsers(params?: QueryParams): Observable<PageableResponse<User>> {
        return this.apiService.getPageable<User>(this.endpoint, params);
    }

    getUserById(id: number): Observable<User> {
        return this.apiService.getById<User>(this.endpoint, id);
    }

    createUser(user: User): Observable<User> {
        return this.apiService.post<User>(this.endpoint, user);
    }

    updateUser(id: number, user: User): Observable<User> {
        return this.apiService.put<User>(this.endpoint, id, user);
    }

    deleteUser(id: number): Observable<void> {
        return this.apiService.delete<void>(this.endpoint, id);
    }

    toggleUserStatus(id: number): Observable<User> {
        return this.apiService.patch<User>(`${this.endpoint}/${id}/toggle-status`, id, {});
    }

    resetPassword(id: number): Observable<void> {
        return this.apiService.post<void>(`${this.endpoint}/${id}/reset-password`, {});
    }
}