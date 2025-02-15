import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/login"; // Ensure correct casing
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import TransactionDetails from "./components/TransactionDetails";
import FAQ from "./pages/FAQ";

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />
           <Route
  path="/transaction-details"
  element={
    <ProtectedRoute>
      <TransactionDetails />
    </ProtectedRoute>
  }
/>

          <Route
            path="/faq"
            element={
              <ProtectedRoute>
                <FAQ />
              </ProtectedRoute>
            }
          />

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Catch-all route for 404 - Redirect to Dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
          <Route path="/transactions" element={<Transactions />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
