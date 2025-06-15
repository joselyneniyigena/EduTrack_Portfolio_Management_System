export interface Role {
  id?: number;
  roleName: string;
  name: string;
  description?: string;
  userCount?: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}