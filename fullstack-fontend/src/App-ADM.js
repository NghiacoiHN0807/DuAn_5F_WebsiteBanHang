import TableXuatXu from "./components/TableXuatXu";
import ViewChucVu from "./components/ViewChucVu";
import TableTKNhanVien from "./components/TableTKNhanVien";
import XuatXuMain from "./components/XuatXu/XuatXuMain";
import CTSPMain from "./components/ChiTietSP/CTSPMain";
import ChatLieuMain from "./components/ChatLieu/ChatLieuMain";
import LoaiCoAoMain from "./components/LoaiCoAo/LoaiCoAoMain";
import LoaiSPMain from "./components/LoaiSP/LoaiSPMain";
import MauSacMain from "./components/MauSac/MauSacMain";
import OngTayAoMain from "./components/OngTayAo/OngTayAoMain";
import SanPhamMain from "./components/SanPham/SanPhamMain";
import SizeMain from "./components/Size/SizeMain";
import Container from "react-bootstrap/Container";
import TableGiamGia from "./components/TableGiamGia";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import HeaderADM from "./layout/Header-ADM";
import FooterADM from "./layout/Footer-ADM";
import "./scss/App-ADM.scss";
import TableTaiKhoanKH from "./components/TaiKhoanKhachHang/TableTKKhachHang";
import ModelAddNewGiamGia from "./components/ModalsAddNewGiamGia";

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
                  <Route path="/home" element={<Home />} />
                  <Route
                    path="/quan-ly-san-pham/chat-lieu"
                    element={<ChatLieuMain />}
                  />
                  <Route
                    path="/quan-ly-san-pham/chi-tiet-san-pham"
                    element={<CTSPMain />}
                  />
                  <Route
                    path="/quan-ly-san-pham/loai-co-ao"
                    element={<LoaiCoAoMain />}
                  />
                  <Route
                    path="/quan-ly-san-pham/loai-san-pham"
                    element={<LoaiSPMain />}
                  />
                  <Route
                    path="/quan-ly-san-pham/mau-sac"
                    element={<MauSacMain />}
                  />
                  <Route
                    path="/quan-ly-san-pham/ong-tay-ao"
                    element={<OngTayAoMain />}
                  />
                  <Route
                    path="/quan-ly-san-pham/san-pham"
                    element={<SanPhamMain />}
                  />
                  <Route path="/quan-ly-san-pham/size" element={<SizeMain />} />
                  <Route
                    path="/quan-ly-san-pham/xuat-xu"
                    element={<XuatXuMain />}
                  />
                  <Route path="/table-chucVu" element={<ViewChucVu />} />
                  <Route path="/table-taiKhoan" element={<TableTKNhanVien />} />
                  <Route
                    path="/table-taiKhoanKH"
                    element={<TableTaiKhoanKH />}
                  />
                  <Route path="/quan-ly-giam-gia" element={<TableGiamGia/>}/>
                  <Route path="/admin/giam-gia" element={<TableGiamGia/>}/>
                  <Route path="/add/giam-gia" element={<ModelAddNewGiamGia/>}/>
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
