import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postUpdateTaiKhoan } from "../services/taiKhoanService";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import { chucVu } from "../services/chucVuService";

const ModalUpdate = (props) => {
  const { show, handleClose, handleUpdateTable, isDataTaiKhoanKH } = props;
  const [idTaiKhoan, setIdTaiKhoan] = useState("");
  const [maTaiKhoan, setMaTaiKhoan] = useState("");
  const [ho, setHo] = useState("");
  const [ten, setTen] = useState("");
  const [sdt, setSdt] = useState("");
  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [trangThai, setTrangThai] = useState("");

  const handleUpdate = async () => {
    if (setMaTaiKhoan("") && setTen("")) {
      handleClose();
      toast.warning("Mã hoặc tên không được để trống!");
    } else {
      let res = await postUpdateTaiKhoan(
        idTaiKhoan,
        maTaiKhoan,
        ho,
        ten,
        sdt,
        email,
        matKhau,
        trangThai
      );
      console.log("check", res);
      if (res) {
        handleClose();
        toast.success("Sửa thành công!");
        handleUpdateTable({
          idTaiKhoan: res.idTaiKhoan,
          maTaiKhoan: res.maTaiKhoan,
          ho: res.ho,
          ten: res.ten,
          sdt: res.sdt,
          email: res.email,
          matKhau: res.matKhau,
          trangThai: res.trangThai,
        });
      }
    }
  };

  useEffect(() => {
    if (show) {
      setIdTaiKhoan(Number(isDataTaiKhoanKH.idTaiKhoan));
      setMaTaiKhoan(isDataTaiKhoanKH.maTaiKhoan);
      setHo(isDataTaiKhoanKH.ho);
      setTen(isDataTaiKhoanKH.ten);
      setSdt(isDataTaiKhoanKH.sdt);
      setEmail(isDataTaiKhoanKH.email);
      setMatKhau(isDataTaiKhoanKH.matKhau);
      setTrangThai(Number(isDataTaiKhoanKH.trangThai));
    }
  }, [isDataTaiKhoanKH, show]);
  // console.log("trangThai", trangThai);
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
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Xuất xứ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <Form>
              <Row>
                <Col>
                  <div className="mb-3">
                    <label className="form-label">Ma</label>
                    <input
                      value={maTaiKhoan}
                      onChange={(event) => setMaTaiKhoan(event.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Họ</label>
                    <input
                      value={ho}
                      onChange={(event) => setHo(event.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Tên</label>
                    <input
                      value={ten}
                      onChange={(event) => setTen(event.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Số Điện Thoại</label>
                    <input
                      value={sdt}
                      onChange={(event) => setSdt(event.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Chức Vụ</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      {MyChucVu.map((item, index) => {
                        return <option value={item.tenCv}>{item.tenCv}</option>;
                      })}
                    </select>
                  </div>
                </Col>
                <Col>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      type="email"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mật Khẩu</label>
                    <input
                      value={matKhau}
                      onChange={(event) => setMatKhau(event.target.value)}
                      type="password"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Trạng Thái</label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        checked={Number(trangThai) === 0}
                        value={"0"}
                        onChange={(event) => setTrangThai(event.target.value)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Chưa Kích Hoạt
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        checked={Number(trangThai) === 1}
                        value={"1"}
                        onChange={(event) => setTrangThai(event.target.value)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        Đang Hoạt Động
                      </label>
                    </div>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => handleUpdate()}>
            Lưu Thay Đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUpdate;
