import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider }     from "./contexts/AuthContext";
import { ThemeProvider }    from "./contexts/ThemeContext";
import { EmployeeProvider } from "./contexts/EmployeeContext";
import { UIProvider }       from "./contexts/UIContext";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar         from "./components/Navbar";
import Sidebar        from "./components/Sidebar";
import Modal          from "./components/Modal";
import Notification   from "./components/Notification";

import LoginPage     from "./pages/LoginPage";
import Dashboard     from "./pages/Dashboard";
import EmployeesPage from "./pages/EmployeePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage  from "./pages/SettingsPage";
import AdminPanel    from "./pages/AdminPanel";

function Layout({ children }) {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="content-area">
        <Sidebar />
        <main className="main-content">{children}</main>
      </div>
      <Modal />
      <Notification />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <EmployeeProvider>
          <UIProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                <Route path="/dashboard" element={
                  <ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>
                }/>
                <Route path="/employees" element={
                  <ProtectedRoute><Layout><EmployeesPage /></Layout></ProtectedRoute>
                }/>
                <Route path="/analytics" element={
                  <ProtectedRoute><Layout><AnalyticsPage /></Layout></ProtectedRoute>
                }/>
                <Route path="/settings" element={
                  <ProtectedRoute><Layout><SettingsPage /></Layout></ProtectedRoute>
                }/>

                {/* Admin-only route */}
                <Route path="/admin" element={
                  <ProtectedRoute adminOnly><Layout><AdminPanel /></Layout></ProtectedRoute>
                }/>
              </Routes>
            </BrowserRouter>
          </UIProvider>
        </EmployeeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}