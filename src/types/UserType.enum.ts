export enum UserType {
  ADMIN = 'ADM',
  CLIENT = 'CLIENT',
}

export interface JwtPayload {
  sub: string;
  email: string;
  type: UserType;
  iat?: number;
  exp?: number;
}
