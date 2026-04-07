import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

const MOCK_USERS = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@company.com",
    password: "admin123",
    role: "admin",
    department: "Management",
    avatar: "AU",
  },
  {
    id: 2,
    name: "Alice Johnson",
    email: "alice@company.com",
    password: "alice123",
    role: "employee",
    department: "Engineering",
    avatar: "AJ",
  },
  {
    id: 3,
    name: "Bob Smith",
    email: "bob@company.com",
    password: "bob123",
    role: "employee",
    department: "Marketing",
    avatar: "BS",
  },
  {
    id: 4,
    name: "Carol Williams",
    email: "carol@company.com",
    password: "carol123",
    role: "employee",
    department: "HR",
    avatar: "CW",
  },
];

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 700));

    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (found) {
      const { password: _pw, ...safeUser } = found;
      setUser(safeUser);
      setLoading(false);
      return { success: true, role: safeUser.role };
    }

    setError("Invalid email or password. Please try again.");
    setLoading(false);
    return { success: false };
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const isAdmin    = user?.role === "admin";
  const isEmployee = user?.role === "employee";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin,
        isEmployee,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};