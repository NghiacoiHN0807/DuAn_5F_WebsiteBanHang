import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import logo5F from "../assets/logo_5F.png";
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
          <img src={logo5F} alt="logo_5F" height={"50px"} />
          <Navbar.Brand href="#home">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className={"nav-link"}>
                Shope
              </NavLink>
              <NavLink to="/" className={"nav-link"}>
                Sale
              </NavLink>
              <NavLink to="/table-xuatXu" className={"nav-link"}>
                Table Xuat Xu
              </NavLink>
            </Nav>
            <Nav>
              <Form className="d-flex search-form">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 search-input"
                  aria-label="Search"
                />
                <Button variant="outline-success" className="search-button">
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="xs" />
                </Button>
              </Form>
              <NavLink to="/table-xuatXu" className={"nav-link"}>
                <FontAwesomeIcon icon={faHeart} size="lg" />
              </NavLink>
              <NavLink to="/table-xuatXu" className={"nav-link"}>
                <FontAwesomeIcon icon={faCartShopping} size="lg" />{" "}
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
