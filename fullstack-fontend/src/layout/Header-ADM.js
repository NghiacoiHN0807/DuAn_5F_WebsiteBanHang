import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const Header = (props) => {
  // const location = useLocation();
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="while" variant="while">
        <Container>
          <Navbar.Collapse id="responsive-navbar-nav">
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
