import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
// useLocation,
const Header = (props) => {
  // const location = useLocation();
  return (
    <>
      <div className="gray-background">
        <Container>
          <Nav className="justify-content-end" activeKey="/home">
            <Nav.Item>
              <Nav.Link href="/home" className="nav-links">
                Help
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <span className="nav-separator">|</span>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1" className="nav-links">
                Join Us
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <span className="nav-separator">|</span>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2" className="nav-links">
                Login
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </div>
      <Navbar collapseOnSelect expand="lg" bg="while" variant="while">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className={"nav-link"}>
                Home
              </NavLink>
              <NavLink to="/table-xuatXu" className={"nav-link"}>
                Table Xuat Xu
              </NavLink>
            </Nav>
            <Nav>
              <NavLink to="/table-xuatXu" className={"nav-link"}>
                <FontAwesomeIcon icon={faHeart} size="lg" />
              </NavLink>
              <NavLink to="/table-xuatXu" className={"nav-link"}>
                <FontAwesomeIcon icon={faCartShopping} size="lg" />
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
