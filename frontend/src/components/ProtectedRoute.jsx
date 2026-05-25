import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Spinner label="Restoring your workspace..." />
      </main>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

