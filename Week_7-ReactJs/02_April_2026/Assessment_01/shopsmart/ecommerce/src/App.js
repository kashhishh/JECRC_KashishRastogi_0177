import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';

// Auth Pages
import Login from './pages/auth/Login';
import Registration from './pages/auth/Registration';

// Dashboard Pages
import DashboardHome from './pages/dashboard/DashboardHome';
import Analytics from './pages/dashboard/Analytics';
import Settings from './pages/dashboard/Settings';

// Product Pages
import Products from './pages/products/Products';
import ProductDetail from './pages/products/ProductDetail';
import Reviews from './pages/products/Reviews';
import Specs from './pages/products/Specs';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Route>

          {/* Dashboard Routes - Protected */}
          <Route 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Route>

          {/* Product Routes - Dynamic & Nested */}
          <Route element={<MainLayout />}>
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetail />}>
              <Route path="reviews" element={<Reviews />} />
              <Route path="specs" element={<Specs />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
