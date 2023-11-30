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
import { Avatar, Box, Chip, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';
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
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title="Account settings">
                      <Chip
                        avatar={<Avatar src="/static/images/avatar/1.jpg" />}
                        label={account.displayName}
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
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Thông Tin
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Đăng Xuất
                    </MenuItem>
                  </Menu>
                  {/* <Chip
                    avatar={<Avatar src="/static/images/avatar/1.jpg" />}
                    label={account.displayName}
                    onClick={handleClick}
                  />

                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem onClick={handleClose}>Hóa Đơn</MenuItem>
                    <MenuItem onClick={handleClose}>Thông Tin</MenuItem>
                    <MenuItem onClick={handleLogout}>Đăng Xuất</MenuItem>
                  </Menu> */}
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
              <NavLink to="/client/products" className={'nav-link'}>
                Sản phẩm
              </NavLink>
            </Nav>
            <Nav>
              <Form className="d-flex search-form">
                <Form.Control type="search" placeholder="Search" className="me-2 search-input" aria-label="Search" />
                <Button variant="outline-success" className="search-button">
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="xs" />
                </Button>
              </Form>
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={4} color="secondary">
                  <MailIcon />
                </StyledBadge>
              </IconButton>
              <Link to="/client/cart" className={'nav-link'}>
                <StyledBadge badgeContent={listData && listData.length} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
