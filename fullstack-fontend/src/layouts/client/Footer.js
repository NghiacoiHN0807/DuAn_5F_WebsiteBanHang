import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import logoFB from '../../assets/logo-facebook.png';
import logoYTB from '../../assets/logo-youtube.png';
import logoIG from '../../assets/logo-instargram.png';

const Footer = () => (
  <>
    <footer>
      <div className="container nav-container-footer" style={{ paddingTop: '15px' }}>
        <div className="row">
          <div className="col-3">
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Link eventKey="disabled" disabled className="nav-links text-light">
                FIND OUR STORE
              </Nav.Link>
              <Nav.Link href="/home" className="nav-links text-light">
                SIGN IN
              </Nav.Link>
              <Nav.Link eventKey="link-1" className="nav-links text-light">
                SIGN UP
              </Nav.Link>
            </Nav>
          </div>
          <div className="col-3">
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Link eventKey="disabled" disabled className="nav-links text-light">
                GET HELP
              </Nav.Link>
              <Nav.Link href="/home" className="nav-links text-light">
                SEND FEEDBACK
              </Nav.Link>
              <Nav.Link eventKey="link-1" className="nav-links text-light">
                Link
              </Nav.Link>
              <Nav.Link eventKey="link-2" className="nav-links text-light">
                Link
              </Nav.Link>
            </Nav>
          </div>
          <div className="col-3">
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Link eventKey="disabled" disabled className="nav-links text-light">
                ABOUT ME
              </Nav.Link>
              <Nav.Link href="/home" className="nav-links text-light">
                NEWS
              </Nav.Link>
              <Nav.Link eventKey="link-1" className="nav-links text-light">
                SALES
              </Nav.Link>
              <Nav.Link eventKey="link-2" className="nav-links text-light">
                PRODUCTS
              </Nav.Link>
            </Nav>
          </div>
          <div className="col-3">
            <Nav.Link type="" className="social-link">
              <img src={logoFB} alt="logofb" className="social-icon" />
            </Nav.Link>
            <Nav.Link type="" className="social-link">
              <img src={logoIG} alt="logoig" className="social-icon" />
            </Nav.Link>
            <Nav.Link type="" className="social-link">
              <img src={logoYTB} alt="logoytb" className="social-icon" />
            </Nav.Link>
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
