import { USER_ROLE } from '../user/user.constant';

// login user type
export type TLoginUser = {
  email: string;
  password: string;
};

// generate token types
export type TGenerateToken = {
  email: string;
  role: string;
};

// logged in user types
export type TLoggedUser = {
  email: string;
  role: string;
  id: string;
  iat: number;
  exp: number;
};

// auth interface
export type TUserRole = keyof typeof USER_ROLE;
