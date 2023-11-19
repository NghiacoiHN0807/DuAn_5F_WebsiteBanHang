import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useMemo, useState } from 'react';

// Icon styles
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import MailIcon from '@mui/icons-material/Mail';

import logo5F from '../../assets/logo_5F.png';

// mocks_
import account from '../../_mock/account';
import { listProductOnCart } from '../../service/client/Detail-Cart';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    // right: -3,
    // top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    // padding: '0 4px',
  },
}));

const Header = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getLocalStore = localStorage.getItem('userFormToken');
        const authorities = getLocalStore ? JSON.parse(getLocalStore).taiKhoan : '';
        const getData = await listProductOnCart(authorities.idTaiKhoan);
        setListData(getData || []);
      } catch (error) {
        console.error(error);
        setListData([]);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userFormToken');
    navigate('/');
  };
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
              {localStorage.getItem('userFormToken') ? (
                <Nav.Link onClick={handleLogout} eventKey="link-2" className="nav-links">
                  {account.displayName}
                </Nav.Link>
              ) : (
                <Nav.Link href="/login" eventKey="link-2" className="nav-links">
                  Login
                </Nav.Link>
              )}
            </Nav.Item>
          </Nav>
        </Container>
      </div>
      <Navbar collapseOnSelect expand="lg" bg="while" variant="while">
        <Container>
          <img src={logo5F} alt="logo_5F" height={'50px'} />
          <Navbar.Brand href="#home">
            <Link to="/client/home" className={'nav-link'}>
              Home
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className={'nav-link'}>
                Shope
              </Link>
              <NavLink to="/" className={'nav-link'}>
                Sale
              </NavLink>
            </Nav>
            <Nav>
              <Form className="d-flex search-form">
                <Form.Control type="search" placeholder="Search" className="me-2 search-input" aria-label="Search" />
                <Button variant="outline-success" className="search-button">
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="xs" />
                </Button>
              </Form>
              {/* <NavLink to="/table-xuatXu" className={'nav-link'}> */}
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={4} color="secondary">
                  <MailIcon />
                </StyledBadge>
              </IconButton>
              {/* </NavLink> */}
              <Link to="/client/cart" className={'nav-link'}>
                {/* <IconButton aria-label="cart"> */}
                <StyledBadge badgeContent={listData && listData.length} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
                {/* </IconButton> */}
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
