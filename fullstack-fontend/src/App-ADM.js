<<<<<<< HEAD
<<<<<<< HEAD
import ViewChucVu from "./components/ViewChucVu";
import TableTKNhanVien from "./components/TableTKNhanVien";
import XuatXuMain from "./components/XuatXu/XuatXuMain";
import CTSPMain from "./components/ChiTietSP/CTSPMain";
import ChatLieuMain from "./components/ChatLieu/ChatLieuMain";
import LoaiCoAoMain from "./components/LoaiCoAo/LoaiCoAoMain";
import LoaiSPMain from "./components/LoaiSP/LoaiSPMain";
import VeChungToi from "./components/web-online/VeChungToi";
import MauSacMain from "./components/MauSac/MauSacMain";
import OngTayAoMain from "./components/OngTayAo/OngTayAoMain";
import SanPhamMain from "./components/SanPham/SanPhamMain";
import AddNewSanPham from "./components/SanPham/ModelAdd";
import UpdateSanPham from "./components/SanPham/ModelUpdate";
import SizeMain from "./components/Size/SizeMain";
import TableGiamGia from "./components/TableGiamGia";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/web-online/Home";
=======
=======
>>>>>>> c6b89cf1 (push-new)
import TableXuatXu from "./components/TableXuatXu";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import QLSP from "./components/QuanLySanPham";
<<<<<<< HEAD
>>>>>>> 937f5ef96df61b780fe720386fbef1fa220fcb3e
=======
>>>>>>> c6b89cf1 (push-new)
import { ToastContainer } from "react-toastify";
import HeaderADM from "./layout/Header-ADM";
import FooterADM from "./layout/Footer-ADM";
import "./scss/App-ADM.scss";
<<<<<<< HEAD
import TableGiamGia from './components/TableGiamGia'
=======
>>>>>>> c6b89cf1 (push-new)

function AppADM() {
  return (
    <>
<<<<<<< HEAD
<<<<<<< HEAD
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
        >
          <HeaderADM />
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
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
              path="/quan-ly-san-pham/san-pham/them-san-pham"
              element={<AddNewSanPham />}
            />
            <Route
              path="/quan-ly-san-pham/san-pham/sua-san-pham/:id"
              element={<UpdateSanPham />}
            />
            <Route path="/quan-ly-san-pham/mau-sac" element={<MauSacMain />} />
            <Route
              path="/quan-ly-san-pham/ong-tay-ao"
              element={<OngTayAoMain />}
            />
            <Route
              path="/quan-ly-san-pham/san-pham"
              element={<SanPhamMain />}
            />
            <Route path="/quan-ly-san-pham/size" element={<SizeMain />} />
            <Route path="/quan-ly-san-pham/xuat-xu" element={<XuatXuMain />} />
            <Route path="/table-chucVu" element={<ViewChucVu />} />
            <Route path="/table-taiKhoan" element={<TableTKNhanVien />} />
            <Route path="/tai-khoan/them-tai-khoan" element={<AddTKNV />} />
            <Route path="/tai-khoan/detail/:id" element={<UpdateTkNV />} />
            <Route path="/quan-ly-giam-gia" element={<TableGiamGia />} />
            <Route path="/direct-sale" element={<DireactSale />} />
            <Route path="/create-bill/:id" element={<CartBillADM />} />
            <Route path="/ve-chung-toi" element={<VeChungToi />} />
            <Route
              path="/update/giam-gia/:id"
              element={<ModelUpdateNewGiamGia />}
            />
            <Route path="/order-management" element={<OrderManagement />} />
            <Route path="/add/giam-gia" element={<ModelAddNewGiamGia />} />
            <Route
              path="/order-management-timeline/:id"
              element={<OrderManagementTimeline />}
            />
            <Route
              path="/payment-online/vnpay-payment"
              element={<TableSucces />}
            />
            <Route path="/dia-chi" element={<TableAllDiaChi />} />
            <Route path="/dia-chi/add/:id" element={<AddDiaChi />} />
            <Route path="/dia-chi/detail/:id" element={<UpdateDiaChi />} />
            <Route path="/dia-chi/:id" element={<TableDiaChiByTK />} />
            <Route path="/tai-khoan-KH/them-tai-khoan" element={<AddTkKH />} />
            <Route path="/tai-khoan-KH/detail/:id" element={<UpdateTkKH />} />
            <Route path="/tai-Khoan-KH" element={<TableTaiKhoanKH />} />
          </Routes>
        </Box>
      </Box>

=======
=======
>>>>>>> c6b89cf1 (push-new)
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
<<<<<<< HEAD
                  <Route path="/admin-giam-gia" element={<TableGiamGia />} />
                  <Route path="/home" element={<QLSP />} />
=======
                  <Route path="/" element={<QLSP />} />
>>>>>>> c6b89cf1 (push-new)
                  <Route path="/table-xuatXu" element={<TableXuatXu />} />
                </Routes>
              </div>
            </Container>
          </div>
        </div>
      </div>
<<<<<<< HEAD
>>>>>>> 937f5ef96df61b780fe720386fbef1fa220fcb3e
=======
>>>>>>> c6b89cf1 (push-new)
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
