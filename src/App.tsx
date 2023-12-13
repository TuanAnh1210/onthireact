import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Lists from "./pages/Lists";
import Add from "./pages/Add";
import Edit from "./pages/Edit";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<Lists />} />
        <Route path="products/add" element={<Add />} />
        <Route path="products/:id/edit" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
