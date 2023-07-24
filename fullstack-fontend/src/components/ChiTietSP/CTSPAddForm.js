import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  postAddCTSP,
  fetchMS,
  fetchSize,
  fetchSP,
  fetchLSP,
  fetchTayAo,
  fetchCoAo,
  detailMS,
  detailSize,
  detailSP,
  detailLoaiSP,
  detailOngTayAo,
  detailLoaiCoAo,
} from "../../services/ChiTietSPService";
import { fetchXX, detailXX } from "../../services/xuatXuSevice";
import { fetchCL, detailCL } from "../../services/ChatLieuService";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ModelAddNew = (props) => {
  const { show, handleClose } = props;
  const [maCTSP, setMaCTSP] = useState("");
  const [chatLieu, setChatLieu] = useState("");
  const [mauSac, setMauSac] = useState("");
  const [size, setSize] = useState("");
  const [sanPham, setSanPham] = useState("");
  const [loaiSP, setLoaiSP] = useState("");
  const [xuatXu, setXuatXu] = useState("");
  const [tayAo, setTayAo] = useState("");
  const [coAo, setCoAo] = useState("");
  const [mota, setMota] = useState("");
  const [soLuongTon, setSoLuongTon] = useState("");
  const [giaNhap, setGiaNhap] = useState("");
  const [giaBan, setGiaBan] = useState("");
  const [trangThai, setTrangThai] = useState("");

  const [listCL, setListCL] = useState([]);
  const [listMS, setListMS] = useState([]);
  const [listSize, setListSize] = useState([]);
  const [listSP, setListSP] = useState([]);
  const [listLSP, setListLSP] = useState([]);
  const [listXX, setListXX] = useState([]);
  const [listTayAo, setListTayAo] = useState([]);
  const [listCoAo, setListCoAo] = useState([]);

  useEffect(() => {
    getAllList();
    return () => {
      // Cleanup
    };
  }, []);

  const getAllList = async () => {
    let resCL = await fetchCL();
    console.log("Data", resCL);
    setListCL(resCL);

    let resMS = await fetchMS();
    console.log("Data", resMS);
    setListMS(resMS);

    let resSize = await fetchSize();
    console.log("Data", resSize);
    setListSize(resSize);

    let resSP = await fetchSP();
    console.log("Data", resSP);
    setListSP(resSP);

    let resLSP = await fetchLSP();
    console.log("Data", resLSP);
    setListLSP(resLSP);

    let resXX = await fetchXX();
    console.log("Data", resXX);
    setListXX(resXX);

    let resTayAo = await fetchTayAo();
    console.log("Data", resTayAo);
    setListTayAo(resTayAo);

    let resCoAo = await fetchCoAo();
    console.log("Data", resCoAo);
    setListCoAo(resCoAo);
  };

  const selectCL = (event) => {
    const selectedValue = event.target.value;
    // setChatLieu(listCL.find((obj) => obj.idCl === Number(selectedValue)));
    setChatLieu(selectedValue);
  };

  const selectMS = (event) => {
    const selectedValue = event.target.value;
    // setMauSac(listMS.find((obj) => obj.idMs === Number(selectedValue)));
    setMauSac(selectedValue);
  };

  const selectSize = (event) => {
    const selectedValue = event.target.value;
    // setSize(listSize.find((obj) => obj.idSize === Number(selectedValue)));
    setSize(selectedValue);
  };

  const selectSP = (event) => {
    const selectedValue = event.target.value;
    // setSanPham(listSP.find((obj) => obj.idSp === Number(selectedValue)));
    setSanPham(selectedValue);
  };

  const selectLoaiSP = (event) => {
    const selectedValue = event.target.value;
    // setLoaiSP(listLSP.find((obj) => obj.idLoaisp === Number(selectedValue)));
    setLoaiSP(selectedValue);
  };

  const selectXX = (event) => {
    const selectedValue = event.target.value;
    // setXuatXu(listXX.find((obj) => obj.idXx === Number(selectedValue)));
    setXuatXu(selectedValue);
  };

  const selectTayAo = (event) => {
    const selectedValue = event.target.value;
    // setTayAo(listTayAo.find((obj) => obj.idTayAo === Number(selectedValue)));
    setTayAo(selectedValue);
  };

  const selectCoAo = (event) => {
    const selectedValue = event.target.value;
    // setCoAo(listCoAo.find((obj) => obj.idCoAo === Number(selectedValue)));
    setCoAo(selectedValue);
  };

  const handleSave = async () => {
    // get object chatlieu\
    const getObjChatLieu = await detailCL(chatLieu);
    const getObjMauSac = await detailMS(mauSac);
    const getObjSize = await detailSize(size);
    const getObjSanPham = await detailSP(sanPham);
    const getObjLoaiSP = await detailLoaiSP(loaiSP);
    const getObjXuatXu = await detailXX(xuatXu);
    const getObjTayAo = await detailOngTayAo(tayAo);
    const getObjCoAo = await detailLoaiCoAo(coAo);

    console.log("loaiSP", getObjLoaiSP);
    console.log("tayAo", getObjTayAo);

    // I want check console.log get all attributes
    console.log(
      "Check state: ",
      maCTSP,
      getObjChatLieu,
      getObjMauSac,
      getObjSize,
      getObjSanPham,
      getObjLoaiSP,
      getObjXuatXu,
      getObjTayAo,
      getObjCoAo,
      mota,
      soLuongTon,
      giaNhap,
      giaBan,
      trangThai
    );
    //And now add to DB
    //Check null

    if (
      setMaCTSP("") &&
      setChatLieu("") &&
      setMauSac("") &&
      setSize("") &&
      setSanPham("") &&
      setLoaiSP("") &&
      setXuatXu("") &&
      setTayAo("") &&
      setCoAo("") &&
      setMota("") &&
      setSoLuongTon("") &&
      setGiaNhap("") &&
      setGiaBan("") &&
      setTrangThai("")
    ) {
      handleClose();
      toast.warning("Some field is empty!");
    } else {
      let res = await postAddCTSP(
        maCTSP,
        getObjChatLieu,
        getObjMauSac,
        getObjSize,
        getObjSanPham,
        getObjLoaiSP,
        getObjXuatXu,
        getObjCoAo,
        getObjTayAo,
        mota,
        soLuongTon,
        giaNhap,
        giaBan,
        trangThai
      );

      console.log("Check res: ", res);
      if (res && res.idCtsp) {
        handleClose();
        setMaCTSP("");
        setChatLieu("");
        setMauSac("");
        setSize("");
        setSanPham("");
        setLoaiSP("");
        setXuatXu("");
        setTayAo("");
        setCoAo("");
        setMota("");
        setSoLuongTon("");
        setGiaNhap("");
        setGiaBan("");
        setTrangThai("");
        toast.success("Add ctsp successfully!");
      } else {
        toast.error("Add ctsp failed!");
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
                      value={maCTSP}
                      onChange={(event) => setMaCTSP(event.target.value)}
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
                      onChange={selectCL}
                      defaultValue={listCL.length > 0 ? listCL[0].idCl : null}
                    >
                      {listCL.map((option, index) => (
                        <option key={index} value={option.idCl}>
                          {option.tenCl}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Màu sắc</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={selectMS}
                      defaultValue={listMS.length > 0 ? listMS[0].idMs : null}
                    >
                      {listMS.map((option) => (
                        <option value={option.idMs}>{option.tenMs}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Size</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={selectSize}
                      defaultValue={
                        listSize.length > 0 ? listSize[0].idSize : null
                      }
                    >
                      {listSize.map((option) => (
                        <option value={option.idSize}>{option.tenSize}</option>
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
                      onChange={selectSP}
                      defaultValue={listSP.length > 0 ? listSP[0].idSp : null}
                    >
                      {listSP.map((option) => (
                        <option value={option.idSp}>{option.tenSp}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Loại sản phẩm</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={selectLoaiSP}
                      defaultValue={
                        listLSP.length > 0 ? listLSP[0].idLoaisp : null
                      }
                    >
                      {listLSP.map((option) => (
                        <option value={option.idLoaisp}>{option.tenLsp}</option>
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
                      onChange={selectXX}
                      defaultValue={listXX.length > 0 ? listXX[0].idXx : null}
                    >
                      {listXX.map((option) => (
                        <option value={option.idXx}>{option.tenNuoc}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Tay áo</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={selectTayAo}
                      defaultValue={
                        listTayAo.length > 0 ? listTayAo[0].idTayAo : null
                      }
                    >
                      {listTayAo.map((option) => (
                        <option value={option.idTayAo}>
                          {option.loaiTayAo}
                        </option>
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
                      onChange={selectCoAo}
                      defaultValue={
                        listCoAo.length > 0 ? listCoAo[0].idCoAo : null
                      }
                    >
                      {listCoAo.map((option) => (
                        <option value={option.idCoAo}>{option.loaiCoAo}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Số lượng tồn</Form.Label>
                    <input
                      value={soLuongTon}
                      onChange={(event) => setSoLuongTon(event.target.value)}
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
                      value={giaNhap}
                      onChange={(event) => setGiaNhap(event.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Giá bán</Form.Label>
                    <input
                      value={giaBan}
                      onChange={(event) => setGiaBan(event.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Trạng thái</Form.Label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        defaultChecked={trangThai}
                        value={"1"}
                        onChange={(event) => setTrangThai(event.target.value)}
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
                        defaultChecked={trangThai}
                        value={"0"}
                        onChange={(event) => setTrangThai(event.target.value)}
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
                <Col>
                  <Form.Group className="mb-3">
                    <div className="mb-3">
                      <label className="form-label">Mô tả</label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={mota}
                        onChange={(event) => setMota(event.target.value)}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
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
