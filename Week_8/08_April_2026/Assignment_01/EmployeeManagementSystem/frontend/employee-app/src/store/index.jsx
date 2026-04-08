import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from './employeeSlice'
import authReducer from './authSlice'
import uiReducer from './uiSlice'

// Logger Middleware
const loggerMiddleware = (store) => (next) => (action) => {
  console.group(`%c ACTION: ${action.type}`, 'color: #4f9ef5; font-weight:bold')
  console.log('%c Prev State:', 'color: #9E9E9E', store.getState())
  console.log('%c Action:', 'color: #03A9F4', action)
  const result = next(action)
  console.log('%c Next State:', 'color: #4CAF50', store.getState())
  console.groupEnd()
  return result
}

// Load persisted state from localStorage
const loadState = () => {
  try {
    const serialized = localStorage.getItem('empState')
    return serialized ? JSON.parse(serialized) : undefined
  } catch { return undefined }
}

const store = configureStore({
  reducer: { employees: employeeReducer, auth: authReducer, ui: uiReducer },
  preloadedState: loadState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
})

// Persist state to localStorage on change
store.subscribe(() => {
  const { auth } = store.getState()
  localStorage.setItem('empState', JSON.stringify({ auth }))
})

export default store