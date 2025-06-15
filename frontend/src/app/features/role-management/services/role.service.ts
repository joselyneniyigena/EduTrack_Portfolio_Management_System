import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageableResponse } from '../../../core/models/pageable-response';
import { Role } from '../../../core/models/role';
import { RoleName } from '../../../core/models/role-name';
import { ApiService, QueryParams } from '../../../core/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly endpoint = 'roles';

  constructor(private apiService: ApiService) {}

  // Get all roles with pagination
  getRoles(params?: QueryParams): Observable<PageableResponse<Role>> {
    return this.apiService.getPageable<Role>(this.endpoint, params);
  }

  // Get all roles without pagination (for dropdowns)
  getAllRoles(): Observable<Role[]> {
    return this.apiService.get<Role[]>(`${this.endpoint}/all`);
  }

  // Get role by ID
  getRoleById(id: number): Observable<Role> {
    return this.apiService.getById<Role>(this.endpoint, id);
  }

  // Get role by name
  getRoleByName(roleName: string): Observable<Role> {
    return this.apiService.get<Role>(`${this.endpoint}/by-name/${roleName}`);
  }

  // Create new role
  createRole(role: Role): Observable<Role> {
    return this.apiService.post<Role>(this.endpoint, role);
  }

  // Update existing role
  updateRole(id: number, role: Role): Observable<Role> {
    return this.apiService.put<Role>(this.endpoint, id, role);
  }

  // Delete role
  deleteRole(id: number): Observable<void> {
    return this.apiService.delete<void>(this.endpoint, id);
  }

  // Check if role exists by name
  checkRoleExists(roleName: string): Observable<boolean> {
    return this.apiService.get<boolean>(`${this.endpoint}/exists/${roleName}`);
  }

  // Get role names (for autocomplete)
  getRoleNames(): Observable<RoleName[]> {
    return this.apiService.get<RoleName[]>(`${this.endpoint}/names`);
  }

  // Get roles assigned to a specific user
  getRolesByUserId(userId: number): Observable<Role[]> {
    return this.apiService.get<Role[]>(`${this.endpoint}/user/${userId}`);
  }

  // Get users assigned to a specific role
  getUsersByRoleId(roleId: number): Observable<any[]> {
    return this.apiService.get<any[]>(`${this.endpoint}/${roleId}/users`);
  }

  // Assign role to user
  assignRoleToUser(roleId: number, userId: number): Observable<void> {
    return this.apiService.post<void>(`${this.endpoint}/${roleId}/assign-user`, { userId });
  }

  // Remove role from user
  removeRoleFromUser(roleId: number, userId: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${roleId}/remove-user/${userId}`, roleId);
  }

  // Bulk assign roles to user
  assignRolesToUser(userId: number, roleIds: number[]): Observable<void> {
    return this.apiService.post<void>(`${this.endpoint}/bulk-assign-user`, { userId, roleIds });
  }

  // Get default roles (for new user registration)
  getDefaultRoles(): Observable<Role[]> {
    return this.apiService.get<Role[]>(`${this.endpoint}/defaults`);
  }

  // Search roles
  searchRoles(searchTerm: string): Observable<Role[]> {
    return this.apiService.get<Role[]>(`${this.endpoint}/search`, { q: searchTerm });
  }

  // Get role statistics
  getRoleStatistics(): Observable<any> {
    return this.apiService.get<any>(`${this.endpoint}/statistics`);
  }
}