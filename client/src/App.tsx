import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { Signup } from "./pages/auth/Signup";
import { Login } from "./pages/auth/Login";
import { Dashboard } from "./pages/Dashboard";
import { useCurrentUser } from "./api/user";
import { Blank } from "./pages/Blank";

function App() {
  const { data: currentUser } = useCurrentUser();

  console.log(currentUser);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Blank />} />
        <Route path="/signup" element={ <Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Layout>
  );
}

export default App;
