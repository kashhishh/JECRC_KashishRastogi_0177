import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./features/employees/employeeSlice";

const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});

export default store;