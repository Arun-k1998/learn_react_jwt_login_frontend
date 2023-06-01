import "./App.css";
import Home from "./Pages/user/Home";
import Login from "./Pages/user/Loign";
import signup from "./Pages/user/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfile from "./Pages/user/UserProfile";
import adminLogin from './Pages/admin/login'
import AdminHome from './Pages/admin/Home'
import Update from "./Pages/admin/Update";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((store)=> store.user.userToken)

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route Component={signup} path="/signUp" />
          <Route Component={Home} path="/home" />
          <Route Component={Login} path="/login" />
          <Route Component={UserProfile}  path="/profile"/>
          <Route Component={adminLogin} path="/admin/login" />
          <Route Component={AdminHome} path="/admin/home" />
          <Route Component={Update} path="/admin/userUpdate" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
