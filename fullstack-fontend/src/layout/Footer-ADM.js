import Nav from "react-bootstrap/Nav";
import logo5F from "../assets/logo_5F.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";

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
<<<<<<< HEAD
            title="Product Management"
            id="basic-nav-dropdown"
            className="link-footer"
          >
            <NavLink to="/table-xuatXu" className={"nav-link"}>
              Table Xuat Xu
            </NavLink>
            <NavLink to="/home" className={"nav-link"}>
              Product details
            </NavLink>
            <NavLink to="/home" className={"nav-link"}>
              Product details
            </NavLink>
            <NavDropdown.Divider />
            <NavLink to="/home" className={"nav-link"}>
              Product details
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
=======
            title="Dropdown"
            id="basic-nav-dropdown"
            className="link-footer"
          >
            <NavDropdown.Item href="#action/3.1">
              <NavLink to="/table-xuatXu" className={"nav-link"}>
                Table Xuat Xu
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/home" className="link-footer">
            Active
          </Nav.Link>
          <Nav.Link eventKey="link-1" className="link-footer">
            Link
          </Nav.Link>
          <Nav.Link eventKey="link-2" className="link-footer">
            Link
          </Nav.Link>
>>>>>>> c6b89cf1 (push-new)
        </Nav>
      </footer>
    </>
  );
};
export default Footer;
<<<<<<< HEAD
// import React from "react";
// import { Nav, NavDropdown } from "react-bootstrap";
// import logo5F from "../assets/logo_5F.png";
// import { NavLink } from "react-router-dom";

// const Footer = (props) => {
//   return (
//     <footer>
//       <Nav defaultActiveKey="/home" className="flex-column">
//         <div className="logo-container">
//           <Nav.Link href="/home">
//             <img src={logo5F} alt="logo_5F" height={"50px"} />
//           </Nav.Link>
//         </div>
//         <NavDropdown
//           title="Quản lý sản phẩm"
//           id="basic-nav-dropdown"
//           className="link-footer"
//         >
//           <NavDropdown.Item as={NavLink} to="/quan-ly-san-pham/chi-tiet-san-pham">
//             Chi tiết sản phẩm
//           </NavDropdown.Item>
//           <NavDropdown.Item as={NavLink} to="/table-taiKhoanKH">
//             Table Tai Khoan KH
//           </NavDropdown.Item>
//           <NavDropdown.Item as={NavLink} to="/quan-ly-san-pham/xuat-xu">
//             Xuất xứ
//           </NavDropdown.Item>
//           <NavDropdown.Item as={NavLink} to="/quan-ly-san-pham/chat-lieu">
//             Chất liệu
//           </NavDropdown.Item>
//           <NavDropdown.Divider />
//           <NavDropdown.Item as={NavLink} to="/quan-ly-san-pham/loai-co-ao">
//             Loại cổ áo
//           </NavDropdown.Item>
//           <NavDropdown.Item as={NavLink} to="/quan-ly-san-pham/loai-san-pham">
//             Loại sản phẩm
//           </NavDropdown.Item>
//           <NavDropdown.Item as={NavLink} to="/quan-ly-san-pham/mau-sac">
//             Màu sắc
//           </NavDropdown.Item>
//           <NavDropdown.Item as={NavLink} to="/quan-ly-san-pham/ong-tay-ao">
//             Ống tay áo
//           </NavDropdown.Item>
//           <NavDropdown.Item as={NavLink} to="/quan-ly-san-pham/san-pham">
//             Sản phẩm
//           </NavDropdown.Item>
//           <NavDropdown.Item as={NavLink} to="/quan-ly-san-pham/size">
//             Size
//           </NavDropdown.Item>
//         </NavDropdown>
//         <Nav.Link as={NavLink} to="/employee-manager" className={"nav-link"}>
//           Employee manager
//         </Nav.Link>
//         <Nav.Link as={NavLink} to="/customer-management" className={"nav-link"}>
//           Customer management
//         </Nav.Link>
//         <Nav.Link as={NavLink} to="/sales-statistics" className={"nav-link"}>
//           Sales statistics
//         </Nav.Link>
//       </Nav>
//     </footer>

// export default Footer;
=======
>>>>>>> c6b89cf1 (push-new)
