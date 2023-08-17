import "./scss/App.scss";
import "./scss/Home.scss";
import Header from "./layout/Header";
import TableXuatXu from "./components/TableXuatXu";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import Home from "./components/web-online/Home";
import { ToastContainer } from "react-toastify";
import Footer from "./layout/Footer";
import TableTaiKhoanKH from "./components/TaiKhoanKhachHang/TableTKKhachHang";

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <div className="my-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/table-xuatXu" element={<TableXuatXu />} />
              <Route path="/table-taiKhoanKH" element={<TableTaiKhoanKH />} />
            </Routes>
          </div>
        </Container>
        <Footer />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
