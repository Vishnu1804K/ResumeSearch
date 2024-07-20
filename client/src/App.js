import { useEffect } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Templates from "./Pages/templates";
import Review from  "./Pages/Review";
import Comment from "./Pages/Comments";
function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://resumesearchmain.onrender.com/api/user/users');
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/templates/:id"
            element={
              <ProtectedRoute>
                <Templates />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/review" element ={<Review/>}/>
          <Route path="/comments/:id" element={<Comment/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute(props) {
  if (localStorage.getItem("ResumeUser")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}
