import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState, Fragment } from 'react';
// Icon styles
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar, Box, Chip, ListItemIcon, Menu, MenuItem, Tooltip, AppBar } from '@mui/material';
import { Logout, PersonAdd, Settings, ShareLocation } from '@mui/icons-material';
import logo5F from '../../assets/logo_5F.png';
// utils
import { bgBlur } from '../../utils/cssStyles';
// mocks_
import account from '../../_mock/account';
import { listProductOnCart } from '../../service/client/Detail-Cart';

const NAV_WIDTH = 0;

// const HEADER_MOBILE = 64;

// const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const SectionWithButton = styled('div')({
  marginTop: '110px',
});

const Header = () => {
  const [listData, setListData] = useState([]);

  const getLocalStore = localStorage.getItem('userFormToken');

  const fetchData = async () => {
    try {
      const getLocalStore = localStorage.getItem('userFormToken');
      // const authorities = getLocalStore ? JSON.parse(getLocalStore).taiKhoan : '';
      if (getLocalStore) {
        const authorities = JSON.parse(getLocalStore).taiKhoan;
        const getData = await listProductOnCart(authorities.idTaiKhoan);
        localStorage.setItem("numberInCart", getData.length)
        setListData(getData || []);
      }
      // const getData = await listProductOnCart(authorities.idTaiKhoan);
    } catch (error) {
      console.error(error);
      setListData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const [getNumberInCart, setNumberInCart] = useState(0);

  useEffect(() => {
    const getLocalStoreNumberInCart = localStorage.getItem("numberInCart");
  }, [fetchData]);

  // Handle select menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userFormToken');
    navigate('/');
  };

  // Select All Bill
  const handleSelectAllBill = () => {
    navigate(`/client/select-bill-client/${account.user.idTaiKhoan}`);
  };
  const handleProfile = () => {
    navigate(`/client/profile`);
  };
  const handleLocation = () => {
    navigate(`/client/address`);
  };
  return (
    <>
      <SectionWithButton>
        <StyledRoot>
          {/* <StyledToolbar> */}
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
                    <>
                      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Tooltip title="Account settings">
                          <Chip
                            avatar={<Avatar src="/static/images/avatar/1.jpg" />}
                            label={account.email}
                            onClick={handleClick}
                          />
                        </Tooltip>
                      </Box>
                      <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            '&:before': {
                              content: '""',
                              display: 'block',
                              position: 'absolute',
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: 'background.paper',
                              transform: 'translateY(-50%) rotate(45deg)',
                              zIndex: 0,
                            },
                          },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                      >
                        <MenuItem onClick={handleSelectAllBill}>
                          <ListItemIcon>
                            <PersonAdd fontSize="small" />
                          </ListItemIcon>
                          Hóa Đơn Của Tôi
                        </MenuItem>
                        <MenuItem onClick={handleProfile}>
                          <ListItemIcon>
                            <Settings fontSize="small" />
                          </ListItemIcon>
                          Thông Tin
                        </MenuItem>
                        <MenuItem onClick={handleLocation}>
                          <ListItemIcon>
                            <ShareLocation fontSize="small" />
                          </ListItemIcon>
                          Địa Chỉ
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                          <ListItemIcon>
                            <Logout fontSize="small" />
                          </ListItemIcon>
                          Đăng Xuất
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <Nav.Link href="/login" eventKey="link-2" className="nav-links">
                      Login
                    </Nav.Link>
                  )}
                </Nav.Item>
              </Nav>
            </Container>
          </div>
          <Navbar collapseOnSelect expand="lg">
            <Container>
              <img src={logo5F} alt="logo_5F" height={'50px'} />
              <Navbar.Brand href="#home">
                <Link to="/client/home" className={'nav-link'}>
                  Trang Chủ
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <NavLink to="/client/products" className={'nav-link'}>
                    Sản phẩm
                  </NavLink>
                  <Link to="/client/products-sale" className={'nav-link'}>
                    Giảm Giá
                  </Link>
                  <NavLink to="/client/contact" className={'nav-link'}>
                    Về Chúng Tôi
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
                  <Link to={getLocalStore ? '/client/cart' : '/client/cart-noaccount'} className={'nav-link'}>
                    <StyledBadge color="secondary">
                      <ShoppingCartIcon />
                    </StyledBadge>
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          {/* </StyledToolbar> */}
        </StyledRoot>
      </SectionWithButton>
    </>
  );
};
export default Header;
