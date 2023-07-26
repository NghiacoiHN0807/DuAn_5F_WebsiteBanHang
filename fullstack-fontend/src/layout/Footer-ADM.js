import Nav from "react-bootstrap/Nav";
import logo5F from "../assets/logo_5F.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import {NavLink} from "react-router-dom";

const Footer = (props) => {
  return (
    <>
      <footer>
        <Nav defaultActiveKey="/home" className="flex-column">
          <div className="logo-container">
            <Nav.Link href="/home">
              <img src={logo5F} alt="logo_5F" height={"50px"} />
            </Nav.Link>
          </div>
          <NavDropdown
            color="black"
            title="Quản lý sản phẩm"
            id="basic-nav-dropdown"
            className="link-footer"
          >
            <NavLink
              to="/quan-ly-san-pham/chi-tiet-san-pham"
              className={"nav-link"}
            >
              Chi tiết sản phẩm
            </NavLink>
<<<<<<< HEAD
            <NavLink to="/quan-ly-san-pham/xuat-xu" className={"nav-link"}>
              Xuất xứ
=======
            <NavLink to="/table-taiKhoanKH" className={"nav-link"}>
              Table Tai Khoan KH
            </NavLink>
            <NavLink to="/home" className={"nav-link"}>
              Product details
>>>>>>> origin/nhanh_khach_hang_By_Phuc
            </NavLink>
            <NavLink to="/quan-ly-san-pham/chat-lieu" className={"nav-link"}>
              Chất liệu
            </NavLink>
            <NavDropdown.Divider />
            <NavLink to="/quan-ly-san-pham/loai-co-ao" className={"nav-link"}>
              Loại cổ áo
            </NavLink>
            <NavLink
              to="/quan-ly-san-pham/loai-san-pham"
              className={"nav-link"}
            >
              Loại sản phẩm
            </NavLink>
            <NavLink to="/quan-ly-san-pham/mau-sac" className={"nav-link"}>
              Màu sắc
            </NavLink>
            <NavLink to="/quan-ly-san-pham/ong-tay-ao" className={"nav-link"}>
              Ống tay áo
            </NavLink>
            <NavLink to="/quan-ly-san-pham/san-pham" className={"nav-link"}>
              Sản phẩm
            </NavLink>
            <NavLink to="/quan-ly-san-pham/size" className={"nav-link"}>
              Size
            </NavLink>
          </NavDropdown>
          <NavLink to="/home" className={"nav-link"}>
            Employee manager
          </NavLink>
          <NavLink to="/home" className={"nav-link"}>
            Customer management
          </NavLink>
          <NavLink to="/home" className={"nav-link"}>
            Sales statistics
          </NavLink>
        </Nav>
      </footer>
    </>
  );
};
export default Footer;
