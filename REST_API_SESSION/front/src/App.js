import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import User from "./pages/User";
import Produk from "./pages/Produk";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddProduk from "./pages/AddProduk";
import EditProduk from "./pages/EditProduk";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/add" element={<AddUser />} />
          <Route path="/user/edit/:id" element={<EditUser />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/produk/add" element={<AddProduk />} />
          <Route path="/produk/edit/:id" element={<EditProduk />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
