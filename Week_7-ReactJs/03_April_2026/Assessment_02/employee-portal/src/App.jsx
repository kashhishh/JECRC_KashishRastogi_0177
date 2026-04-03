import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { EmployeeProvider } from './contexts/EmployeeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import AdminView from './pages/AdminView/AdminView';
import EmployeeView from './pages/EmployeeView/EmployeeView';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <EmployeeProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminView />
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <EmployeeView />
              </ProtectedRoute>
            } />
          </Routes>
        </EmployeeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;