import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postAddTaiKhoan } from "../services/taiKhoanService";
import { toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { chucVu } from "../services/chucVuService";
//QRcode
// import React, { } from 'react';
// import Webcam from 'react-webcam-qrcode';
// import QrReader from "react-qr-reader";

const ModelAddNewTKKH = (props) => {
  const { show, handleClose } = props;
  const [setMaTaiKhoan, getMaTaiKhoan] = useState("");
  const [setHo, getHo] = useState("");
  const [setTen, getTen] = useState("");
  const [setChucVu, getChucVu] = useState({});
  const [setSdt, getSdt] = useState("");
  const [setEmail, getEmail] = useState("");
  const [setSoCanCuoc, getSoCanCuoc] = useState("");


  //QRcode
  // const [result, setResult] = useState("No QR code detected");

  // const handleScan = (data) => {
  //   if (data) {
  //     setResult(data);
  //   }
  // };

  // const handleError = (error) => {
  //   console.error(error);
  // };

  //Webcam QR
  // const [scannedData, setScannedData] = useState('');

  // const handleScan = (data) => {
  //   if (data) {
  //     setScannedData(data);
  //   }
  // };

  const handleSave = async () => {
    //I want check console.log get ma and tenNuoc
    // console.log("Check state: ", setMaTaiKhoan, setHo, setTen, setSdt, setEmail, setMatKhau, setTrangThai);
    //And now add to DB
    //Check null
    if (
      getMaTaiKhoan("") &&
      getHo("") &&
      getTen("") &&
      getChucVu("") &&
      getSdt("") &&
      getEmail("") &&
      getSoCanCuoc("")
    ) {
      handleClose();
      toast.warning("Ma, Ten Or Trang Thai is null");
    } else {
      let res = await postAddTaiKhoan(
        setMaTaiKhoan,
        setHo,
        setTen,
        // setChucVu,
        setSdt,
        setEmail,
        setSoCanCuoc,
        0
      );
      console.log("Check res: ", res);
      if (res && res.idTaiKhoan) {
        handleClose();
        getMaTaiKhoan("");
        getHo("");
        getTen("");
        // getChucVu("");
        getSdt("");
        getEmail("");
        getSoCanCuoc("");
        toast.success("Tạo tài khoản thành công ");
      } else {
        toast.error("Tạo Tài Khoản Không Thành Công");
      }
    }
  };

  const [MyChucVu, setMyChucVu] = useState([]);



  const getAllChucVu = async () => {
    let rs = await chucVu(0);
    setMyChucVu(rs.content);
  };
  console.log(MyChucVu);

  useEffect(() => {
    getAllChucVu();
  }, []);

  return (
    <>
     {/* <div>
        <h2>QR Code Scanner</h2>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
        <p>Result: {result}</p>
      </div> */}
      {/* <div>
      <h2>QR Code Scanner</h2>
      <Webcam
        onQRCodeScanned={handleScan}
        facingMode="environment"
        showViewFinder={true}
        style={{ width: '100%' }}
      />
      <p>Scanned Data: {scannedData}</p>
    </div> */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size={"lg"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm Một Tài Khoản Nhân Viên Mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <div className="mb-3">
                  <label className="form-label">Mã Tài Khoản</label>
                  <Form.Control
                    className="mb-3"
                    value={setMaTaiKhoan}
                    onChange={(event) => getMaTaiKhoan(event.target.value)}
                    type="text"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Họ</label>
                  <Form.Control
                    value={setHo}
                    onChange={(event) => getHo(event.target.value)}
                    type="text"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Tên</label>
                  <Form.Control
                    value={setTen}
                    onChange={(event) => getTen(event.target.value)}
                    type="text"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Chức Vụ</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    {MyChucVu.map((item, index) => {
                      return <option value={item} onChange={(event) => getChucVu(event.target.value)}>{item.tenCv}</option>;
                    })}
                  </select>
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <label className="form-label">Số Điện Thoại</label>
                  <Form.Control
                    value={setSdt}
                    onChange={(event) => getSdt(event.target.value)}
                    type="text"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <Form.Control
                    value={setEmail}
                    onChange={(event) => getEmail(event.target.value)}
                    type="email"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Số Căn Cước</label>
                  <Form.Control
                    value={setSoCanCuoc}
                    onChange={(event) => getSoCanCuoc(event.target.value)}
                    type="text"
                  />
                </div>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSave()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModelAddNewTKKH;
