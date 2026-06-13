import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import RequestPickup from "./RequestPickup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pickup-request" element={<RequestPickup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
