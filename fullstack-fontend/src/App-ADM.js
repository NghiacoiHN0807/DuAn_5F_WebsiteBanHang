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
import TableGiamGia from "./components/TableGiamGia";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import HeaderADM from "./layout/Header-ADM";
import SideBar from "./layout/SideBar-ADM";
import FooterADM from "./layout/Footer-ADM";
import "./scss/App-ADM.scss";
import TableTaiKhoanKH from "./components/TaiKhoanKhachHang/TableTKKhachHang";
import CartBillADM from "./components/Cart-Bill-ADM";
import OrderManagement from "./components/OrderManagement";
import OrderManagementTimeline from "./components/OrderManagement-Timeline";
import DireactSale from "./components/DirectSale-ADM";
import { Box } from "@mui/system";
import { AppBar, Toolbar } from "@mui/material";

const drawerWidth = 240;

function AppADM() {
  return (
    <>
      <Box sx={{ display: "flex" }} className="box">
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <HeaderADM />
        </AppBar>
        <Box
          component="nav"
          sx={{
            backgroundColor: "white",
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
          }}
          aria-label="mailbox folders"
        >
          <SideBar />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
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
            <Route path="/table-taiKhoanKH" element={<TableTaiKhoanKH />} />
            <Route path="/quan-ly-giam-gia" element={<TableGiamGia />} />
            <Route path="/direct-sale" element={<DireactSale />} />
            <Route path="/create-bill/:id" element={<CartBillADM />} />
            <Route path="/order-management" element={<OrderManagement />} />
            <Route
              path="/order-management-timeline/:id"
              element={<OrderManagementTimeline />}
            />
          </Routes>
          <Toolbar />
          <FooterADM />
        </Box>
      </Box>

      {/* <div className="row">
        <div className="col-2">
          <SideBar />
        </div>
        <div className="col-">
          <HeaderADM />
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
            <Route path="/table-taiKhoanKH" element={<TableTaiKhoanKH />} />
            <Route path="/quan-ly-giam-gia" element={<TableGiamGia />} />
            <Route path="/direct-sale" element={<DireactSale />} />
            <Route path="/create-bill/:id" element={<CartBillADM />} />
            <Route path="/order-management" element={<OrderManagement />} />
            <Route
              path="/order-management-timeline/:id"
              element={<OrderManagementTimeline />}
            />
          </Routes>
        </div>
      </div> */}

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
