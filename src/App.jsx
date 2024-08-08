import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Registr from "./components/Registr";
import Home from "./components/Home";
import styles from "./App.module.css";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  function ProtectedRoute({ isAuthenticated, children }) {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  }

  return (
    <div className={styles.box}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registr" element={<Registr />} />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={!!token}>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
