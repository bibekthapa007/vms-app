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
  message: string;
  error?: string | null;
}

export interface SignupResponse {
  user: User;
  token: string;
  message: string;
  error?: string | null;
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
