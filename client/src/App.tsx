import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import { Signup } from "./pages/auth/Signup";
import { Login } from "./pages/auth/Login";
import { useCurrentUser } from "./api/user";
import { Blank } from "./pages/Blank";
import Dashboard from "./pages/Dashboard";
import { New } from "./pages/New";

function App() {
  const { data: currentUser, isLoading, isError } = useCurrentUser();
  const location = useLocation();

  useEffect(() => {
    console.log('Current path:', location.pathname);
    console.log('Current user:', currentUser);
    console.log('Is loading:', isLoading);
    console.log('Is error:', isError);
  }, [location, currentUser, isLoading, isError]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={currentUser ? <Navigate to="/dashboard" /> : <Blank />}
        />
        <Route
          path="/signup"
          element={currentUser ? <Navigate to="/dashboard" /> : <Signup />}
        />
        <Route
          path="/login"
          element={currentUser ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={
            currentUser ? (
              <Dashboard currentUser={currentUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/new"
          element={
            currentUser ? (
              <New />
            ) : (
              <Navigate to="/login" state={{ from: location }} replace />
            )
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;