import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/layout";
import About from "./pages/about";
import Home from "./pages/Home";
import AdDetails from "./pages/AdDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ad/:id" element={<AdDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
