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
            title="Product Management"
            id="basic-nav-dropdown"
            className="link-footer"
          >
            <NavLink to="/table-xuatXu" className={"nav-link"}>
              Table Xuat Xu
            </NavLink>
            <NavLink to="/table-ctsp" className={"nav-link"}>
              Table CTSP
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
        </Nav>
      </footer>
    </>
  );
};
export default Footer;
