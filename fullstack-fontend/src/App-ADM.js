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
import AddNewSanPham from "./components/SanPham/ModelAdd";
import UpdateSanPham from "./components/SanPham/ModelUpdate";
import SizeMain from "./components/Size/SizeMain";
import TableGiamGia from "./components/TableGiamGia";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/web-online/Home";
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
  Typography,
} from "@mui/material";
import { useState } from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import LoyaltyOutlinedIcon from "@mui/icons-material/LoyaltyOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AddTKNV from "./forms/Models-AddTKNV";
import UpdateTkNV from "./forms/ModelUpdateTKNV";
import { Image } from "react-bootstrap";
import logo5F from "./assets/logo_5F.png";
import ModelAddNewGiamGia from "./components/ModalsAddNewGiamGia";
import ModelUpdateNewGiamGia from "./components/ModalsUpdateNewGiamGia";
import TableSucces from "./components/Payment-Succes";
// import paymentOnSuccess from "./components/Payment-Succes";
import AddTkKH from "./components/TaiKhoanKhachHang/AddTkKH";
import UpdateTkKH from "./components/TaiKhoanKhachHang/UpdateTkKH";
import TableAllDiaChi from "./components/DiaChi/TableAllDiaChi";
import TableDiaChiByTK from "./components/DiaChi/TableDiaChiByTK";
import AddDiaChi from "./components/DiaChi/AddDiaChi";
import UpdateDiaChi from "./components/DiaChi/UpdateDiaChi";

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
  const [open1, setOpen1] = useState(false);

  const handleClickDropdown = () => {
    setOpen(!open);
  };

  const handleClickDropdown1 = () => {
    setOpen1(!open1);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Image src={logo5F} style={{ width: "100px", height: "auto" }} />
      </Toolbar>
      <Divider />
      <List>
        {[
          { text: "Quản Lý Hóa Đơn", link: "/order-management" },
          { text: "Bán Hàng Tại Quầy", link: "/direct-sale" },
          { text: "Khuyến Mãi", link: "/quan-ly-giam-gia" },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.link}
              onClick={() => handleLinkClick(item.text)}
              sx={{
                color: activeLink === item.text ? "cornflowerblue" : "inherit",
                borderRadius: "15px",
                backgroundColor:
                  activeLink === item.text ? "rgb(240, 240, 240)" : "inherit",
                "&:hover": {
                  backgroundColor: "rgb(240, 240, 240)",
                  borderRadius: "15px",
                },
              }}
            >
              <ListItemIcon>
                {index === 0 ? (
                  <ReceiptOutlinedIcon color="action" />
                ) : index === 1 ? (
                  <ShoppingCartOutlinedIcon color="action" />
                ) : (
                  <LoyaltyOutlinedIcon color="action" />
                )}
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body1" sx={{ fontSize: 14 }}>
                  {item.text}
                </Typography>
              </ListItemText>
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
          <ListItemText
            primary="Sản Phẩm"
            primaryTypographyProps={{ variant: "body1", fontSize: 14 }}
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {[
              { text: "Sản Phẩm", link: "/quan-ly-san-pham/san-pham" },
              { text: "Màu Sắc", link: "/quan-ly-san-pham/mau-sac" },
              { text: "Chất Liệu", link: "/quan-ly-san-pham/chat-lieu" },
              { text: "Loại Cổ Áo", link: "/quan-ly-san-pham/loai-co-ao" },
              {
                text: "Loại Sản Phẩm",
                link: "/quan-ly-san-pham/loai-san-pham",
              },
              { text: "Ống Tay Áo", link: "/quan-ly-san-pham/ong-tay-ao" },
              { text: "Size", link: "/quan-ly-san-pham/size" },
              { text: "Xuất Xứ", link: "/quan-ly-san-pham/xuat-xu" },
            ].map((item, index) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.link}
                  onClick={() => handleLinkClick(item.text)}
                  sx={{
                    pl: 4,
                    borderRadius: "15px",
                    backgroundColor:
                      activeLink === item.text
                        ? "rgb(240, 240, 240)"
                        : "inherit",
                    "&:hover": {
                      backgroundColor: "rgb(240, 240, 240)",
                      borderRadius: "15px",
                    },
                  }}
                >
                  <ListItemIcon>
                    <FiberManualRecordOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1" sx={{ fontSize: "14px" }}>
                      {item.text}
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
      <Divider />
      <List>
        <ListItemButton onClick={handleClickDropdown1}>
          <ListItemIcon>
            <GroupsOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            primary="Tài Khoản"
            primaryTypographyProps={{ variant: "body1", fontSize: 14 }}
          />
          {open1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {[
              { text: "Nhân Viên", link: "/table-taiKhoan" },
              { text: "Khách Hàng", link: "/tai-Khoan-KH" },
              { text: "Địa Chỉ", link: "/dia-chi" },
            ].map((item, index) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.link}
                  onClick={() => handleLinkClick(item.text)}
                  sx={{
                    pl: 4,
                    borderRadius: "15px",
                    backgroundColor:
                      activeLink === item.text
                        ? "rgb(240, 240, 240)"
                        : "inherit",
                    "&:hover": {
                      backgroundColor: "rgb(240, 240, 240)",
                      borderRadius: "15px",
                    },
                  }}
                >
                  <ListItemIcon>
                    <FiberManualRecordOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1" sx={{ fontSize: "14px" }}>
                      {item.text}
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
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
