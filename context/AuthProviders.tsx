import { User } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Session = {
  user: User;
};

type StatusType = "loading" | "updating" | "idle" | "error";

type AuthContextType = {
  session?: Session;
  status: StatusType;
  login: () => Promise<void>;
  signup: (u: User) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  status: "loading",
  login: (() => { }) as any,
  signup: (() => { }) as any,
  logout: (() => { }) as any,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const client = useQueryClient();
  const [session, setSession] = useState<Session>();
  const [status, setStatus] = useState<StatusType>("loading");

  const updateSession = async () => { };

  useEffect(() => {
    setStatus("loading");
    updateSession();
  }, []);

  const logout = useCallback(async () => {
    client.clear();
    setSession(undefined);
  }, []);

  const login = useCallback(async () => {
    setSession({
      user: {
        first_name: "John",
        last_name: "Doe",
        phone: "+251912345678",
        date_of_birth: "1990-01-01",
      },
    });
  }, []);

  const signup = useCallback(async (user: User) => {
    setSession({
      user,
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        signup,
        session,
        status,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useSession = () => useContext(AuthContext);
