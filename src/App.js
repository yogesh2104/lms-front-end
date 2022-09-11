import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./Login";
import Navbar from "./Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import Register from "./Register";
import AdminPage from "./AdminPage";
import AdminRoute from "./AdminRoutes";
import Home from "./Home";
import UserRoute from "./UserRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateNewBook from "./CreateNewBook";
import EditBookDetails from "./EditBookDetails";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <UserRoute>
              <Home />
            </UserRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
        <Route
          path="/new-book"
          element={
            <AdminRoute>
              <CreateNewBook />
            </AdminRoute>
          }
        />
         <Route
          path="/edit-book/:id"
          element={
            <AdminRoute>
              <EditBookDetails />
            </AdminRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
    </div>
  );
}

export default App;
