import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, AdminRoute } from './routes/guards';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import AppLayout from './components/layout/AppLayout';
import Home from './pages/user/Home';
import SectionDesigns from './pages/user/SectionDesigns';
import DesignDetail from './pages/user/DesignDetail';
import Wishlist from './pages/user/Wishlist';
import Profile from './pages/user/Profile';
import ContactForm from './pages/user/ContactForm';

import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSections from './pages/admin/AdminSections';
import AdminDesigns from './pages/admin/AdminDesigns';
import AdminReviews from './pages/admin/AdminReviews';
import AdminSuggestions from './pages/admin/AdminSuggestions';

export default function App() {
  return (
    <Routes>
      {/* Public auth pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<ContactForm />} />

      {/* Normal user app (any authenticated user) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="sections/:slug" element={<SectionDesigns />} />
          <Route path="designs/:id" element={<DesignDetail />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Super admin only */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="sections" element={<AdminSections />} />
          <Route path="designs" element={<AdminDesigns />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="suggestions" element={<AdminSuggestions />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
