import { createContext, useContext, useReducer, useCallback } from "react";

const EmployeeContext = createContext(null);

const INITIAL = [
  { id: 1, name: "Alice Johnson",  email: "alice@company.com",  department: "Engineering", role: "Senior Dev",   salary: 95000, status: "Active" },
  { id: 2, name: "Bob Smith",      email: "bob@company.com",    department: "Marketing",   role: "Manager",      salary: 85000, status: "Active" },
  { id: 3, name: "Carol Williams", email: "carol@company.com",  department: "HR",          role: "HR Specialist", salary: 72000, status: "Active" },
  { id: 4, name: "David Brown",    email: "david@company.com",  department: "Finance",     role: "Analyst",      salary: 78000, status: "Inactive" },
  { id: 5, name: "Eva Martinez",   email: "eva@company.com",    department: "Engineering", role: "Junior Dev",   salary: 68000, status: "Active" },
];

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return { ...state, employees: [...state.employees, { ...action.payload, id: Date.now() }] };
    case "UPDATE":
      return { ...state, employees: state.employees.map((e) => e.id === action.payload.id ? action.payload : e) };
    case "DELETE":
      return { ...state, employees: state.employees.filter((e) => e.id !== action.payload) };
    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "SET_FILTER":
      return { ...state, filterDept: action.payload };
    default:
      return state;
  }
}

export function EmployeeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    employees: INITIAL,
    searchQuery: "",
    filterDept: "All",
  });

  const addEmployee    = useCallback((emp) => dispatch({ type: "ADD",    payload: emp }),   []);
  const updateEmployee = useCallback((emp) => dispatch({ type: "UPDATE", payload: emp }),   []);
  const deleteEmployee = useCallback((id)  => dispatch({ type: "DELETE", payload: id }),    []);
  const setSearch      = useCallback((q)   => dispatch({ type: "SET_SEARCH", payload: q }), []);
  const setFilter      = useCallback((d)   => dispatch({ type: "SET_FILTER", payload: d }), []);

  const filteredEmployees = state.employees
    .filter((e) => state.filterDept === "All" || e.department === state.filterDept)
    .filter((e) =>
      e.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      e.email.toLowerCase().includes(state.searchQuery.toLowerCase())
    );

  const departments = ["All", ...new Set(state.employees.map((e) => e.department))];

  return (
    <EmployeeContext.Provider value={{
      employees: state.employees,
      filteredEmployees,
      departments,
      searchQuery: state.searchQuery,
      filterDept: state.filterDept,
      addEmployee, updateEmployee, deleteEmployee, setSearch, setFilter,
    }}>
      {children}
    </EmployeeContext.Provider>
  );
}

export const useEmployees = () => {
  const ctx = useContext(EmployeeContext);
  if (!ctx) throw new Error("useEmployees must be used inside EmployeeProvider");
  return ctx;
};