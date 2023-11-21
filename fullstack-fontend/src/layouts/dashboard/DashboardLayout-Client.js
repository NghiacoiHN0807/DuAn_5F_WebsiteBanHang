import { Outlet } from 'react-router-dom';
import Footer from '../client/Footer';
import Header from '../client/Header';
// @mui
//

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function DashboardLayoutClient() {
  return (
    // <StyledRoot>
    //   <Main>
    <>
      <Header />
      <Outlet />
      <Footer />
    </>

    //   </Main>
    // </StyledRoot>
  );
}
