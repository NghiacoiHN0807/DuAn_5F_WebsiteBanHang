import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postAddTaiKhoan } from "../services/taiKhoanService";
import { toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { chucVu } from "../services/chucVuService";
const ModelAddNewTKKH = (props) => {
  const { show, handleClose } = props;
  const [setMaTaiKhoan, getMaTaiKhoan] = useState("");
  const [setHo, getHo] = useState("");
  const [setTen, getTen] = useState("");
  const [setSdt, getSdt] = useState("");
  const [setEmail, getEmail] = useState("");


  const handleSave = async () => {
    //I want check console.log get ma and tenNuoc
    // console.log("Check state: ", setMaTaiKhoan, setHo, setTen, setSdt, setEmail, setMatKhau, setTrangThai);
    //And now add to DB
    //Check null
    if (
      getMaTaiKhoan("") &&
      getHo("") &&
      getTen("") &&
      getSdt("") &&
      getEmail("") 
    ) {
      handleClose();
      toast.warning("Ma, Ten Or Trang Thai is null");
    } else {
      let res = await postAddTaiKhoan(
        setMaTaiKhoan,
        setHo,
        setTen,

        setSdt,
        setEmail,
        
        0
      );
      // console.log("Check res: ", res);
      if (res && res.idTaiKhoan) {
        handleClose();
        getMaTaiKhoan("");
        getHo("");
        getTen("");

        getSdt("");
        getEmail("");
      
        toast.success("A Tài khoản is created successfully");
      } else {
        toast.error("You can't create a new Tài Khoản");
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
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size={"lg"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm Một Tài Khoản Mới</Modal.Title>
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
                {/* <div className="mb-3">
                  <label className="form-label">Chức Vụ</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    {MyChucVu.map((item, index) => {
                      return <option value={item.tenCv}>{item.tenCv}</option>;
                    })}
                  </select>
                </div> */}
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
