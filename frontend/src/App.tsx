import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import About from "./pages/About";
import Home from "./pages/Home";
import AdDetails from "./pages/AdDetails";
import NewAdForm from "./pages/NewAdForm";
import NewCategoryForm from "./pages/NewCategoryForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ad/:id" element={<AdDetails />} />
          <Route path="/ad/new" element={<NewAdForm />} />
          <Route path="/category/new" element={<NewCategoryForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
