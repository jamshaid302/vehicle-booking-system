import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";

function App() {
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
