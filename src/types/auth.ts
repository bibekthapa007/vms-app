export interface User {
  id: string;
  name?: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

export interface SigninResponse {
  user: User;
  token: string;
}

export interface SignupResponse {
  user: User;
  token: string;
}

export interface IAuthContext {
  state: IAuthState;
  actions: IAuthAction;
}

export interface IAuthState {
  user: User | null | undefined;
  initialLoading: boolean;
  isSigningIn: boolean;
  signinError: string;
  isSigningUp: boolean;
  signupError: string;
}

export interface IAuthAction {
  signin: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  logout: () => void;
}

export enum AuthActionType {
  INIT_SIGNIN = "INIT_SIGNIN",
  INIT_SIGNUP = "INIT_SIGNUP",
  SIGNIN_SUCCESSFUL = "SIGNIN_SUCCESSFUL",
  SIGNIN_FAILED = "SIGNIN_FAILED",
  SIGNUP_SUCCESSFUL = "SIGNIN_SUCCESSFUL",
  SIGNUP_FAILED = "SIGNUP_FAILED",
  INIT_FETCH_USER_DATA = "INIT_FETCH_USER_DATA",
  FETCH_USER_DATA_SUCCESSFUL = "FETCH_USER_DATA_SUCCESSFUL",
  FETCH_USER_DATA_FAILED = "FETCH_USER_DATA_FAILED",
  LOGOUT = "LOGOUT",
}

export interface AuthAction {
  type: AuthActionType;
  payload?: {
    user?: User;
    error?: string;
  };
}
