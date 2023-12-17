import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import logoFB from '../../assets/logo-facebook.png';
import logoYTB from '../../assets/logo-youtube.png';
import logoIG from '../../assets/logo-instargram.png';
import logo5F from '../../assets/logo_5F.png';


const Footer = () => (
  <>
    <footer>
      <div className="container nav-container-footer" style={{ paddingTop: '15px' }}>
        <div className="row">
          <div className="col-3">
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Link eventKey="disabled" disabled className="nav-links text-light">
                Đăng Ký và Đăng Nhập %F Store
              </Nav.Link>
              <Nav.Link href="/home" className="nav-links text-light">
                Đăng Ký
              </Nav.Link>
              <Nav.Link eventKey="link-1" className="nav-links text-light">
                Đăng Nhập
              </Nav.Link>
            </Nav>
          </div>
          <div className="col-3">
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Link eventKey="disabled" disabled className="nav-links text-light">
                Trang Chủ
              </Nav.Link>
              <Nav.Link href="/home" className="nav-links text-light">
                Sản Phẩm
              </Nav.Link>
              <Nav.Link eventKey="link-1" className="nav-links text-light">
                Giảm Giá
              </Nav.Link>
              <Nav.Link eventKey="link-2" className="nav-links text-light">
                Sản Phẩm Đang Được Giảm Giá
              </Nav.Link>
            </Nav>
          </div>
          <div className="col-3">
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Link eventKey="disabled" disabled className="nav-links text-light">
                Về Chúng Tôi
              </Nav.Link>
              <Nav.Link href="/home" className="nav-links text-light">
                Liện Hệ
              </Nav.Link>
              <Nav.Link eventKey="link-1" className="nav-links text-light">
                Chi Tiết Sản Phẩm
              </Nav.Link>

            </Nav>
          </div>
          <div className="col-3">
            <div className="logo">
              <img src={logo5F} alt="logo_5F" height={'50px'} style={{ filter: 'grayscale(100%)' }} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="location">
            <FontAwesomeIcon icon={faLocationDot} size="xs" style={{ color: '#ffffff' }} />
            <div className="location-text">
              <p>Ha Noi, Viet Nam</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </>
);
export default Footer;
