import React, { useReducer, useContext, createContext, useMemo } from "react";

interface State {
  [x: string]: string | boolean | number | object | undefined;
}

interface Actions {
  [x: string]: (a: string) => void;
}

const INIT_STATE = {
  email: "",
  password: "",
  verifyEmail: "",
};

const AuthContext = createContext<[State, Actions]>([INIT_STATE, {}]);
AuthContext.displayName = "AuthContext";

function reducer(
  state: object,
  { type, payload }: { type: string; payload: string | boolean | number | object | undefined }
) {
  return {
    ...state,
    [type]: payload,
  };
}

type ProviderProps = {
  children: React.ReactNode;
};

const AuthContextProvider = (props: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const setEmail = (value: string): void => dispatch({ type: "email", payload: value });

  const setVerifyEmail = (value: string) => dispatch({ type: "verifyEmail", payload: value });

  const setPassword = (value: string) => dispatch({ type: "password", payload: value });

  return (
    <AuthContext.Provider value={useMemo(() => [state, { setEmail, setVerifyEmail, setPassword }], [state])}>
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

export { AuthContextProvider, useAuthContext };
