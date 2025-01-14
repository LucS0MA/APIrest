import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdDetails from "./pages/AdDetails";
import NewAdForm from "./pages/NewAdForm";
import NewCategoryForm from "./pages/NewCategoryForm";
import SearchResultPage from "./pages/SearchResultsPage";
import SearchCategoryPage from "./pages/SearchCategoryPage";
import AdModification from "./pages/AdModification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateAdPage from "./pages/UpdateAdPage";
import SingleFileUploader from "./pages/TestFileUpload";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ad/:id" element={<AdDetails />} />
          <Route path="/ad/new" element={<NewAdForm />} />
          <Route path="/ad/update/:id" element={<UpdateAdPage />} />
          <Route path="/category/new" element={<NewCategoryForm />} />
          <Route path="/searchAd/:keyword" element={<SearchResultPage />} />
          <Route path="/searchCat/:keyword" element={<SearchCategoryPage />} />
          <Route path="/ad/modif/:id" element={<AdModification />} />
          <Route path="testimg" element={<SingleFileUploader />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
      <ToastContainer theme="colored" position="bottom-right" />
    </>
  );
}

export default App;
