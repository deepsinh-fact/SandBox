import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Selectors
import { TBSelector } from "./Store/Reducers/TBSlice";  
import { MADSelector } from "./Store/Reducers/MADSlice";

// Custom hooks
import useGeolocation from "../src/hooks/useGeolocation";
import useNotifications from "../src/hooks/useNotifications";
import useDocumentTitle from "../src/hooks/useDocumentTitle";

// Components with lazy loading
const AdminLayout = lazy(() => import("./layouts/admin"));
const AuthLayout = lazy(() => import("./layouts/auth"));
const PrivateRoute = lazy(() => import("./layouts/PrivateRoute"));
const ProtectedAuthRoute = lazy(() => import("./layouts/ProtectedAuthRoute"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const App = () => {
  // Get state from Redux store
  const tbState = useSelector(TBSelector);
  const madState = useSelector(MADSelector);

  // Use custom hooks
  useGeolocation({ enableHighAccuracy: true });
  useNotifications(tbState, madState);
  useDocumentTitle();

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route element={<PrivateRoute />}>
          <Route path="admin/*" element={<AdminLayout />} />
          <Route path="view/*" element={<AdminLayout />} />
          <Route path="dashboard/*" element={<AdminLayout />} />
        </Route>
        <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
        <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;