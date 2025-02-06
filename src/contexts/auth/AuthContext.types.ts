import { Dispatch, SetStateAction } from 'react';

export interface AuthContextType {
  userData: UserData | null;
  loading: boolean;
  setUserData: Dispatch<SetStateAction<UserData | null>>;
}

export interface UserData {
  isAuthenticated: boolean;
  user: {
    id: string;
    iat: number;
    exp: number;
    isAdmin: number;
  };
}
