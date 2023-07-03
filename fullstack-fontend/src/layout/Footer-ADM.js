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
        </Nav>
      </footer>
    </>
  );
};
export default Footer;
