// import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  postAddCTSP,
  fetchCL,
  fetchMS,
  fetchSize,
  fetchSP,
  fetchLSP,
  fetchXX,
  fetchTayAo,
  fetchCoAo,
} from "../../services/ChiTietSPService";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ModelAddNew = (props) => {
  const { show, handleClose } = props;
  const [setMaCTSP, getMaCTSP] = useState("");
  const [setCL, getCL] = useState({});
  // const [setMS, getMS] = useState({});
  // const [setSize, getSize] = useState({});
  // const [setSP, getSP] = useState({});
  // const [setLoaiSP, getLoaiSP] = useState({});
  // const [setXX, getXX] = useState({});
  // const [setOngTayAo, getOngTayAo] = useState({});
  // const [setLoaiCoAo, getLoaiCoAo] = useState({});
  // const [setMota, getMota] = useState("");
  // const [setSoLuongTon, getSoLuongTon] = useState("");
  // const [setGiaNhap, getGiaNhap] = useState("");
  // const [setGiaBan, getGiaBan] = useState("");
  // const [setAnh, getAnh] = useState("");
  // const [setTrangThai, getTrangThai] = useState("");

  const [listCL, setListCL] = useState([]);
  // const [listMS, setListMS] = useState([]);
  // const [listSize, setListSize] = useState([]);
  // const [listSP, setListSP] = useState([]);
  // const [listLSP, setListLSP] = useState([]);
  // const [listXX, setListXX] = useState([]);
  // const [listTayAo, setListTayAo] = useState([]);
  // const [listCoAo, setListCoAo] = useState([]);

  useEffect(() => {
    getAllList();
  }, []);

  const getAllList = async () => {
    let resCL = await fetchCL();
    console.log("Data", resCL);
    setListCL(resCL);

    // let resMS = await fetchMS();
    // console.log("Data", resMS);
    // setListMS(resMS);

    // let resSize = await fetchSize();
    // console.log("Data", resSize);
    // setListSize(resSize);

    // let resSP = await fetchSP();
    // console.log("Data", resSP);
    // setListSP(resSP);

    // let resLSP = await fetchLSP();
    // console.log("Data", resLSP);
    // setListLSP(resLSP);

    // let resXX = await fetchXX();
    // console.log("Data", resXX);
    // setListXX(resXX);

    // let resTayAo = await fetchTayAo();
    // console.log("Data", resTayAo);
    // setListTayAo(resTayAo);

    // let resCoAo = await fetchCoAo();
    // console.log("Data", resCoAo);
    // setListCoAo(resCoAo);
  };

  // console.log(listCL);
  // console.log(listMS);

  const handleSave = async () => {
    //I want check console.log get all attributes
    console.log(
      "Check state: ",
      setMaCTSP,
      setCL
      // setMS,
      // setSize,
      // setSP,
      // setLoaiSP,
      // setXX,
      // setOngTayAo,
      // setLoaiCoAo,
      // setMota,
      // setSoLuongTon,
      // setGiaNhap,
      // setGiaBan,
      // setAnh,
      // setTrangThai
    );
    //And now add to DB
    //Check null
    if (
      getMaCTSP("") &&
      getCL({})
      // getMS({}) &&
      // getSize({}) &&
      // getSP({}) &&
      // getLoaiSP({}) &&
      // getXX({}) &&
      // getOngTayAo({}) &&
      // getLoaiCoAo({}) &&
      // getMota("") &&
      // getSoLuongTon("") &&
      // getGiaNhap("") &&
      // getGiaBan("") &&
      // getAnh("") &&
      // getTrangThai("")
    ) {
      handleClose();
      toast.warning("Khong dc de trong truong nao!");
    } else {
      let res = await postAddCTSP(
        setMaCTSP,
        setCL
        // setMS,
        // setSize,
        // setSP,
        // setLoaiSP,
        // setXX,
        // setOngTayAo,
        // setLoaiCoAo,
        // setMota,
        // setSoLuongTon,
        // setGiaNhap,
        // setGiaBan,
        // setAnh,
        // setTrangThai
      );
      console.log("Check res: ", res);
      if (res && res.idXx) {
        handleClose();
        getMaCTSP("");
        getCL({});
        // getMS({});
        // getSize({});
        // getSP({});
        // getLoaiSP({});
        // getXX({});
        // getOngTayAo({});
        // getLoaiCoAo({});
        // getMota("");
        // getSoLuongTon("");
        // getGiaNhap("");
        // getGiaBan("");
        // getAnh("");
        // getTrangThai("");
        toast.success("Them thanh cong!");
      } else {
        toast.error("Them that bai!");
      }
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            ADD NEW
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <Form>
              <Row>
                <Col>
                  <div className="mb-3">
                    <label className="form-label">Mã CTSP</label>
                    <input
                      value={setMaCTSP}
                      onChange={(event) => getMaCTSP(event.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </Col>
                <Col>
                  <div className="mb-3">
                    <label className="form-label">Chất liệu</label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(event) => getCL(event.target.value)}
                    >
                      {listCL.map((option, index) => (
                        <option key={index} value={listCL[index]}>
                          {option.tenCl}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </Col>
              </Row>

              {/* <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Màu sắc</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(event) => getMS(event.target.value)}
                      defaultValue={listMS[0]}
                    >
                      {listMS.map((option) => (
                        <option value={option}>{option.tenMs}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Size</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(event) => getSize(event.target.value)}
                      defaultValue={listSize[0]}
                    >
                      {listSize.map((option) => (
                        <option value={option}>{option.tenSize}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Sản phẩm</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(event) => getSP(event.target.value)}
                      defaultValue={listSP[0]}
                    >
                      {listSP.map((option) => (
                        <option value={option}>{option.tenSp}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Loại sản phẩm</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(event) => getLoaiSP(event.target.value)}
                      defaultValue={listLSP[0]}
                    >
                      {listLSP.map((option) => (
                        <option value={option}>{option.tenLsp}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Xuất xứ</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(event) => getXX(event.target.value)}
                      defaultValue={listXX[0]}
                    >
                      {listXX.map((option) => (
                        <option value={option}>{option.tenNuoc}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Tay áo</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(event) => getOngTayAo(event.target.value)}
                      defaultValue={listTayAo[0]}
                    >
                      {listTayAo.map((option) => (
                        <option value={option}>{option.loaiTayAo}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Cổ áo</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(event) => getLoaiCoAo(event.target.value)}
                      defaultValue={listCoAo[0]}
                    >
                      {listCoAo.map((option) => (
                        <option value={option}>{option.loaiCoAo}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Số lượng tồn</Form.Label>
                    <input
                      value={setSoLuongTon}
                      onChange={(event) => getSoLuongTon(event.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Giá nhập</Form.Label>
                    <input
                      value={setGiaNhap}
                      onChange={(event) => getGiaNhap(event.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Giá bán</Form.Label>
                    <input
                      value={setGiaBan}
                      onChange={(event) => getGiaBan(event.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Tải ảnh</Form.Label>
                    <input
                      value={setAnh}
                      onChange={(event) => getAnh(event.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Trạng thái</Form.Label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        defaultChecked={setTrangThai}
                        value={"1"}
                        onChange={(event) => getTrangThai(event.target.value)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Còn bán
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        defaultChecked={setTrangThai}
                        value={"0"}
                        onChange={(event) => getTrangThai(event.target.value)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        Ngừng kinh doanh
                      </label>
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Mô tả</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                </Col>
                <Col></Col>
              </Row> */}
            </Form>
          </div>
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
export default ModelAddNew;
