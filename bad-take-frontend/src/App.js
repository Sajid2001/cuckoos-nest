import Navbar from "./Components/Navbar";
import Homepage from "./Pages/Homepage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ProfilePage from "./Pages/ProfilePage";
import { useAuthContext } from "./Hooks/useAuthContext";
import Feedpage from "./Pages/Feedpage";
import SearchPage from "./Pages/SearchPage";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/login" element={!user ? <LoginPage/> : <Navigate to = '/'/>}/>
          <Route path="/register" element={!user ? <RegisterPage/>: <Navigate to = '/'/>}/>
          <Route
            path="/"
            element={user ? <Homepage /> : <Navigate to = '/login'/>}
            >
            <Route path="/" element={<Navigate replace to="feed"/>} />
            <Route path="feed" element={<Feedpage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="search" element={<SearchPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
