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
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import HeaderADM from "./layout/Header-ADM";
import "./scss/App-ADM.scss";
import TableTaiKhoanKH from "./components/TaiKhoanKhachHang/TableTKKhachHang";
import CartBillADM from "./components/Cart-Bill-ADM";
import OrderManagement from "./components/OrderManagement";
import OrderManagementTimeline from "./components/OrderManagement-Timeline";
import DireactSale from "./components/DirectSale-ADM";
import { Box } from "@mui/system";
import {
  AppBar,
  Collapse,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { ExpandLess, ExpandMore, StarBorder } from "@material-ui/icons";
import ModelAddNewGiamGia from "./components/ModalsAddNewGiamGia";

const drawerWidth = 240;

function AppADM(props) {
  const [activeLink, setActiveLink] = useState(""); // Khởi tạo state cho liên kết được kích hoạt

  const handleLinkClick = (link) => {
    setActiveLink(link); // Cập nhật giá trị của state khi liên kết được kích hoạt
  };
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [open, setOpen] = useState(false);

  const handleClickDropdown = () => {
    setOpen(!open);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          { text: "Quản Lý Hóa Đơn", link: "/order-management" },
          { text: "Bán Hàng Tại Quầy", link: "/direct-sale" },
          { text: "Quản Lý Nhân Viên", link: "/quan-ly-nhan-vien" },
          { text: "Khuyến Mãi", link: "/admin/giam-gia" },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.link}
              onClick={() => handleLinkClick(item.text)}
              sx={{
                backgroundColor:
                  activeLink === item.text ? "rgb(240, 240, 240)" : "inherit",
                "&:hover": {
                  backgroundColor: "rgb(240, 240, 240)",
                  borderRadius: "15px",
                },
              }}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItemButton onClick={handleClickDropdown}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Sản Phẩm" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
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
            <Route path="/admin/giam-gia" element={<TableGiamGia />} />
            <Route path="/add/giam-gia" element={<ModelAddNewGiamGia />} />
            <Route
              path="/order-management-timeline/:id"
              element={<OrderManagementTimeline />}
            />
          </Routes>
        </Box>
      </Box>

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