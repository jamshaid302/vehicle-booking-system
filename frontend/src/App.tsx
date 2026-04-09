import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { initAuth } from "./auth/initAuth";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initAuth().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/customers" element={<CustomerList />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
