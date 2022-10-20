import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { getUserData, signin as signinFn, signup as signupFn } from "../../api";
import {
  IAuthState,
  IAuthContext,
  AuthAction,
  AuthActionType,
} from "../../types/auth";

const initialState: IAuthState = {
  user: null,
  initialLoading: true,
  isSigningIn: false,
  signinError: "",
  isSigningUp: false,
  signupError: "",
};

const initialContext: IAuthContext = {
  state: {
    user: null,
    initialLoading: true,
    isSigningIn: false,
    signinError: "",
    isSigningUp: false,
    signupError: "",
  },
  actions: {
    signin: () => undefined,
    signup: () => undefined,
    logout: () => undefined,
  },
};

const reducer = (state: IAuthState, action: AuthAction): IAuthState => {
  const { type, payload } = action;
  switch (type) {
    case AuthActionType.INIT_FETCH_USER_DATA:
      return {
        ...state,
        initialLoading: true,
      };

    case AuthActionType.FETCH_USER_DATA_SUCCESSFUL:
      return {
        ...state,
        initialLoading: false,
        user: payload?.user,
      };

    case AuthActionType.FETCH_USER_DATA_FAILED:
      return {
        ...state,
        initialLoading: false,
        user: null,
      };

    case AuthActionType.INIT_SIGNIN:
      return {
        ...state,
        isSigningIn: true,
      };

    case AuthActionType.SIGNIN_SUCCESSFUL:
      return {
        ...state,
        user: payload?.user,
        isSigningIn: false,
        signinError: "",
      };

    case AuthActionType.SIGNIN_FAILED:
      return {
        ...state,
        user: null,
        isSigningIn: false,
        signinError: payload?.error as string,
      };

    case AuthActionType.INIT_SIGNUP:
      return {
        ...state,
        isSigningUp: true,
      };

    case AuthActionType.SIGNUP_SUCCESSFUL:
      return {
        ...state,
        user: payload?.user,
        isSigningUp: false,
        signupError: "",
      };

    case AuthActionType.SIGNUP_FAILED:
      return {
        ...state,
        user: null,
        isSigningIn: false,
        signinError: payload?.error as string,
      };

    case AuthActionType.LOGOUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<IAuthContext>(initialContext);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          dispatch({ type: AuthActionType.INIT_FETCH_USER_DATA });
          const user = await getUserData();
          if (user) {
            dispatch({
              type: AuthActionType.FETCH_USER_DATA_SUCCESSFUL,
              payload: { user },
            });
          } else {
            dispatch({
              type: AuthActionType.FETCH_USER_DATA_FAILED,
            });
          }
        } else {
          dispatch({
            type: AuthActionType.FETCH_USER_DATA_FAILED,
          });
        }
      } catch (error: Error | any) {
        dispatch({
          type: AuthActionType.FETCH_USER_DATA_FAILED,
        });
      }
    };

    fetchUserData();
  }, []);

  // used the useCallback hook to prevent the function from being recreated after a re-render
  const signin = useCallback(async (email: string, password: string) => {
    try {
      dispatch({ type: AuthActionType.INIT_SIGNIN });
      const loginResponse = await signinFn(email, password);
      if (loginResponse) {
        const { user, token } = loginResponse;
        localStorage.setItem("token", token);
        dispatch({ type: AuthActionType.SIGNIN_SUCCESSFUL, payload: { user } });
        window.location.href = "/";
      } else {
        dispatch({
          type: AuthActionType.SIGNIN_FAILED,
          payload: { error: "Login failed" },
        });
      }
    } catch (error: Error | any) {
      dispatch({
        type: AuthActionType.SIGNIN_FAILED,
        payload: { error: error.message || "Login failed" },
      });
    }
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
    try {
      dispatch({ type: AuthActionType.INIT_SIGNIN });
      const loginResponse = await signupFn(email, password);
      if (loginResponse) {
        const { user, token } = loginResponse;
        localStorage.setItem("token", token);

        dispatch({
          type: AuthActionType.SIGNIN_SUCCESSFUL,
          payload: { user },
        });
        window.location.href = "/";
      } else {
        dispatch({
          type: AuthActionType.SIGNIN_FAILED,
          payload: { error: "Login failed" },
        });
      }
    } catch (error: Error | any) {
      dispatch({
        type: AuthActionType.SIGNIN_FAILED,
        payload: { error: error.message || "Login failed" },
      });
    }
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: AuthActionType.LOGOUT });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }, []);

  const value = useMemo(
    () => ({ state, actions: { signin, signup, logout } }),
    [signin, signup, logout, state]
  );

  return (
    <AuthContext.Provider value={value}>
      {state.initialLoading ? <div>Initial Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuthState = () => {
  const { state } = useContext(AuthContext);
  return state;
};
export const useAuthActions = () => {
  const { actions } = useContext(AuthContext);
  return actions;
};

export default AuthProvider;
