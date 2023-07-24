import XuatXuMain from "./components/XuatXu/XuatXuMain";
import CTSPMain from "./components/ChiTietSP/CTSPMain";
import ChatLieuMain from "./components/ChatLieu/ChatLieuMain";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import HeaderADM from "./layout/Header-ADM";
import FooterADM from "./layout/Footer-ADM";
import "./scss/App-ADM.scss";

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
                  <Route path="/home" element={<Home />} />
                  <Route
                    path="/quan-ly-san-pham/xuat-xu"
                    element={<XuatXuMain />}
                  />
                  <Route
                    path="/quan-ly-san-pham/chi-tiet-san-pham"
                    element={<CTSPMain />}
                  />
                  <Route
                    path="/quan-ly-san-pham/chat-lieu"
                    element={<ChatLieuMain />}
                  />
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
