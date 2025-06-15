import { Role } from "./role";

export interface User {
    id?: number;
    enabled: boolean;
    email: string;
    userReference: string;
    lastName: string;
    address: string;
    username: string;
    phoneNumber: string;
    userRoles: UserRole[];
    firstName: string;
    password?: string;
    registrationDate?: Date;
    lastModifiedDate?: Date;
    accountNonExpired?: boolean;
    credentialsNonExpired?: boolean;
    accountNonLocked?: boolean;
    profileImage?:any
}

export interface UserRole {
    id?: number;
    role: Role;
    user: User;
}

export interface UserRoleBuilder {
    id: number;
    role: Role;
    user: User;
}

export interface UserBuilder {
    userReference: string;
    id: number;
    username: string;
    password: string;
    email: string;
    userRoles: UserRole[];
    enabled: boolean;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    registrationDate: Date;
}