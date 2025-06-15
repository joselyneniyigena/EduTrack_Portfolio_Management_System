import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageableResponse } from '../../../core/models/pageable-response';
import { UserRole } from '../../../core/models/user';
import { ApiService, QueryParams } from '../../../core/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  private readonly endpoint = 'user-roles';

  constructor(private apiService: ApiService) {}

  // Get all user roles with pagination
  getUserRoles(params?: QueryParams): Observable<PageableResponse<UserRole>> {
    return this.apiService.getPageable<UserRole>(this.endpoint, params);
  }

  // Get user role by ID
  getUserRoleById(id: number): Observable<UserRole> {
    return this.apiService.getById<UserRole>(this.endpoint, id);
  }

  // Create new user role association
  createUserRole(userRole: UserRole): Observable<UserRole> {
    return this.apiService.post<UserRole>(this.endpoint, userRole);
  }

  // Update user role association
  updateUserRole(id: number, userRole: UserRole): Observable<UserRole> {
    return this.apiService.put<UserRole>(this.endpoint, id, userRole);
  }

  // Delete user role association
  deleteUserRole(id: number): Observable<void> {
    return this.apiService.delete<void>(this.endpoint, id);
  }

  // Get user roles by user ID
  getUserRolesByUserId(userId: number): Observable<UserRole[]> {
    return this.apiService.get<UserRole[]>(`${this.endpoint}/user/${userId}`);
  }

  // Get user roles by role ID
  getUserRolesByRoleId(roleId: number): Observable<UserRole[]> {
    return this.apiService.get<UserRole[]>(`${this.endpoint}/role/${roleId}`);
  }

  // Bulk create user roles
  bulkCreateUserRoles(userRoles: UserRole[]): Observable<UserRole[]> {
    return this.apiService.post<UserRole[]>(`${this.endpoint}/bulk`, userRoles);
  }

  // Bulk delete user roles by user ID
  bulkDeleteUserRolesByUserId(userId: number): Observable<void> {
    return this.apiService.delete<void>(this.endpoint+'/bulk/user/',userId);
  }

  // Update user roles for a specific user
  updateUserRolesForUser(userId: number, roleIds: number[]): Observable<UserRole[]> {
    return this.apiService.put<UserRole[]>(this.endpoint+'/user/${userId}/roles', userId, { roleIds });
  }

  // Check if user has specific role
  checkUserHasRole(userId: number, roleId: number): Observable<boolean> {
    return this.apiService.get<boolean>(`${this.endpoint}/check/${userId}/${roleId}`);
  }

  // Get users with specific role
  getUsersWithRole(roleId: number, params?: QueryParams): Observable<PageableResponse<UserRole>> {
    return this.apiService.getPageable<UserRole>(`${this.endpoint}/role/${roleId}/users`, params);
  }

  // Get roles for specific user
  getRolesForUser(userId: number): Observable<UserRole[]> {
    return this.apiService.get<UserRole[]>(`${this.endpoint}/user/${userId}/roles`);
  }
}