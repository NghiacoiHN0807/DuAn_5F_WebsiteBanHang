import TableXuatXu from "./components/TableXuatXu";
import ViewChucVu from "./components/ViewChucVu";
import TableTKNhanVien from "./components/TableTKNhanVien";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import QLSP from "./components/QuanLySanPham";
import { ToastContainer } from "react-toastify";
import HeaderADM from "./layout/Header-ADM";
import FooterADM from "./layout/Footer-ADM";
import "./scss/App-ADM.scss";

function AppADM() {
  return (
    <>
      <div className="app-container">
        <div className="row">
          <div className="col-2">
            <FooterADM />
          </div>
          <div className="col-10">
            <Container>
              <HeaderADM />
              <div className="my-3">
                <Routes>
                  <Route path="/home" element={<QLSP />} />
                  <Route path="/table-xuatXu" element={<TableXuatXu />} />
                  <Route path="/table-chucVu" element={<ViewChucVu />} />
                  <Route path="/table-taiKhoan" element={<TableTKNhanVien />} />

                </Routes>
              </div>
            </Container>
          </div>
        </div>
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

export default AppADM;
