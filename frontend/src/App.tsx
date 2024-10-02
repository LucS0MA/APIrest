import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import About from "./pages/About";
import Home from "./pages/Home";
import AdDetails from "./pages/AdDetails";
import NewAdForm from "./pages/NewAdForm";
import NewCategory from "./pages/NewCategory";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ad/:id" element={<AdDetails />} />
          <Route path="/new" element={<NewAdForm />} />
          <Route path="/newCategory" element={<NewCategory />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
