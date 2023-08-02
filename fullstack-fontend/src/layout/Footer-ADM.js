<<<<<<< HEAD
import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import logo5F from "../assets/logo_5F.png";
import { NavLink } from "react-router-dom";

const Footer = (props) => {
  return (
    <footer>
      <Nav defaultActiveKey="/home" className="flex-column">
        <div className="logo-container">
          <Nav.Link href="/home">
            <img src={logo5F} alt="logo_5F" height={"50px"} />
          </Nav.Link>
        </div>
        <NavDropdown
          title="Quản lý sản phẩm"
          id="basic-nav-dropdown"
          className="link-footer"
        >
          <NavDropdown.Item as={NavLink} to="/quan-ly-san-pham/chi-tiet-san-pham">
            Chi tiết sản phẩm
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/table-taiKhoanKH">
            Table Tai Khoan KH
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/quan-ly-san-pham/xuat-xu">
            Xuất xứ
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/quan-ly-san-pham/chat-lieu">
            Chất liệu
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item as={NavLink} to="/quan-ly-san-pham/loai-co-ao">
            Loại cổ áo
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/quan-ly-san-pham/loai-san-pham">
            Loại sản phẩm
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/quan-ly-san-pham/mau-sac">
            Màu sắc
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/quan-ly-san-pham/ong-tay-ao">
            Ống tay áo
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/quan-ly-san-pham/san-pham">
            Sản phẩm
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/quan-ly-san-pham/size">
            Size
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Link as={NavLink} to="/employee-manager" className={"nav-link"}>
          Employee manager
        </Nav.Link>
        <Nav.Link as={NavLink} to="/customer-management" className={"nav-link"}>
          Customer management
        </Nav.Link>
        <Nav.Link as={NavLink} to="/sales-statistics" className={"nav-link"}>
          Sales statistics
        </Nav.Link>
      </Nav>
    </footer>
=======
import Nav from "react-bootstrap/Nav";
import logoFB from "../assets/logo-facebook.png";
import logoYTB from "../assets/logo-youtube.png";
import logoIG from "../assets/logo-instargram.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Footer = (props) => {
  return (
    <>
      <footer>
        <div className="container nav-container-footer">
          <div className="row">
            <div className="col-2">
              <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link eventKey="disabled" disabled className="nav-links">
                  FIND OUR STORE
                </Nav.Link>
                <Nav.Link href="/home" className="nav-links">
                  SIGN IN
                </Nav.Link>
                <Nav.Link eventKey="link-1" className="nav-links">
                  SIGN UP
                </Nav.Link>
              </Nav>
            </div>
            <div className="col-2">
              <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link eventKey="disabled" disabled className="nav-links">
                  GET HELP
                </Nav.Link>
                <Nav.Link href="/home" className="nav-links">
                  SEND FEEDBACK
                </Nav.Link>
                <Nav.Link eventKey="link-1" className="nav-links">
                  Link
                </Nav.Link>
                <Nav.Link eventKey="link-2" className="nav-links">
                  Link
                </Nav.Link>
              </Nav>
            </div>
            <div className="col-2">
              <Nav defaultActiveKey="/home" className="flex-column">
                {" "}
                <Nav.Link eventKey="disabled" disabled className="nav-links">
                  ABOUT ME
                </Nav.Link>
                <Nav.Link href="/home" className="nav-links">
                  NEWS
                </Nav.Link>
                <Nav.Link eventKey="link-1" className="nav-links">
                  SALES
                </Nav.Link>
                <Nav.Link eventKey="link-2" className="nav-links">
                  PRODUCTS
                </Nav.Link>
              </Nav>
            </div>
            <div className="col-6">
              <Nav.Link type="" className="social-link">
                <img src={logoFB} alt="logofb" className="social-icon" />
              </Nav.Link>
              <Nav.Link type="" className="social-link">
                <img src={logoIG} alt="logoig" className="social-icon" />
              </Nav.Link>
              <Nav.Link type="" className="social-link">
                <img src={logoYTB} alt="logoytb" className="social-icon" />
              </Nav.Link>
            </div>
          </div>
          <div className="row">
            <div className="location">
              <FontAwesomeIcon
                icon={faLocationDot}
                size="xs"
                style={{ color: "#ffffff" }}
              />
              <div className="location-text">
                <p>Ha Noi, Viet Nam</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
>>>>>>> 4ba9354355f59fb770f67a2e7eaba5e897ca122e
  );
};

export default Footer;
