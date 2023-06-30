import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
// useLocation,
const Header = (props) => {
  // const location = useLocation();
  return (
    <>
      <Container>
        <Nav className="justify-content-end" activeKey="/home">
          <Nav.Item>
            <Nav.Link href="/home">Help</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Join Us</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2">Login</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
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
              <NavDropdown title="Setting">
                <NavDropdown.Item href="#">Login</NavDropdown.Item>
                <NavDropdown.Item href="#">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
