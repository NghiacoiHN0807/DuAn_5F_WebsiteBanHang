import TableXuatXu from "./components/TableXuatXu";
import Container from "react-bootstrap/Container";
import QLSP from "./components/QuanLySanPham";
import DireactSale from "./components/DirectSale-ADM";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HeaderADM from "./layout/Header-ADM";
import FooterADM from "./layout/Footer-ADM";
import "./scss/App-ADM.scss";
import CartBillADM from "./components/Cart-Bill-ADM";
import OrderManagement from "./components/OrderManagement";
import OrderManagementTimeline from "./components/OrderManagement-Timeline";
import TimeLine2 from "./components/TimeLine2";

function AppADM() {
  return (
    <>
      <div className="app-container">
        <div className="row">
          <div className="col-2">
            <FooterADM />
          </div>
          <div className="col-10">
            <Container>
              <HeaderADM />
              <div className="my-3">
                <Routes>
                  <Route path="/home" element={<QLSP />} />
                  <Route path="/table-xuatXu" element={<TableXuatXu />} />
                  <Route path="/direct-sale" element={<DireactSale />} />
                  <Route path="/create-bill/:id" element={<CartBillADM />} />
                  <Route
                    path="/order-management"
                    element={<OrderManagement />}
                  />
                  <Route
                    path="/order-management-timeline/:id"
                    element={<OrderManagementTimeline />}
                  />
                  <Route path="/timeline" element={<TimeLine2 />} />
                </Routes>
              </div>
            </Container>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default AppADM;
