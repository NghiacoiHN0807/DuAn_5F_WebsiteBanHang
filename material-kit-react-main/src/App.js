import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// import Container from 'react-bootstrap/Container';
// routes
import Router from './routes';
// import RouterClient from './routes-client';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
// import Footer from './layouts/client/Footer';
// import Header from './layouts/client/Header';
// SCSS
import './scss/App.scss';
import './scss/Home.scss';
// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
