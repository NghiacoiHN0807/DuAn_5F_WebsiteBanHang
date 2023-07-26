import { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import {
  fetchAllCTSP,
  postAddCTSP,
  putUpdateCTSP,
} from "../../services/ChiTietSPService";
import { fetchXX, detailXX } from "../../services/XuatXuService";
import { fetchCL, detailCL } from "../../services/ChatLieuService";
import { fetchCoAo, detailCoAo } from "../../services/LoaiCoAoService";
import { fetchLSP, detailLSP } from "../../services/LoaiSPService";
import { fetchMS, detailMS } from "../../services/MauSacService";
import { fetchTayAo, detailTayAo } from "../../services/OngTayAoService";
import { fetchSP, detailSP } from "../../services/SanPhamService";
import { fetchSize, detailSize } from "../../services/SizeService";
import ModelConfirm from "./CTSPComfirm";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
  Row,
} from "react-bootstrap";

const ChiTietSP = (props) => {
  // get object and list
  const [idCtsp, setIdCtsp] = useState("");
  const [maCTSP, setMaCTSP] = useState("");
  const [chatLieu, setChatLieu] = useState("");
  const [mauSac, setMauSac] = useState("");
  const [size, setSize] = useState("");
  const [sanPham, setSanPham] = useState("");
  const [loaiSP, setLoaiSP] = useState("");
  const [xuatXu, setXuatXu] = useState("");
  const [tayAo, setTayAo] = useState("");
  const [coAo, setCoAo] = useState("");
  const [moTa, setMoTa] = useState("");
  const [soLuongTon, setSoLuongTon] = useState("");
  const [giaBan, setGiaBan] = useState("");
  const [trangThai, setTrangThai] = useState("1");

  const [listCL, setListCL] = useState([]);
  const [listMS, setListMS] = useState([]);
  const [listSize, setListSize] = useState([]);
  const [listSP, setListSP] = useState([]);
  const [listLSP, setListLSP] = useState([]);
  const [listXX, setListXX] = useState([]);
  const [listTayAo, setListTayAo] = useState([]);
  const [listCoAo, setListCoAo] = useState([]);

  //Set value for table
  const [listCTSP, setListCTSP] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isDataCTSP, setDataCTSP] = useState({});

  // set key word
  const [searchKeyword, setSearchKeyword] = useState("");

  //Set value for Model Add New is defalut
  const handleClose = () => {
    setIsShowModalDelete(false);
  };
  // Show Data On Tables
  useEffect(() => {
    getAllList();
    getCTSP(0);

    return () => {
      // Cleanup
    };
  }, []);

  const handleDetail = (chiTietSP) => {
    setIdCtsp(Number(chiTietSP.idCtsp));
    setMaCTSP(chiTietSP.maCtsp);
    setChatLieu(chiTietSP.idCl.idCl);
    setMauSac(chiTietSP.idMs.idMs);
    setSize(chiTietSP.idSize.idSize);
    setSanPham(chiTietSP.idSp.idSp);
    setLoaiSP(chiTietSP.idLsp.idLoaisp);
    setXuatXu(chiTietSP.idXx.idXx);
    setTayAo(chiTietSP.idTayAo.idTayAo);
    setCoAo(chiTietSP.idCoAo.idCoAo);
    setMoTa(chiTietSP.moTa);
    setSoLuongTon(chiTietSP.soLuongTon);
    setGiaBan(chiTietSP.giaBan);
    setTrangThai(Number(chiTietSP.trangThai));
  };

  // Get all list
  const getAllList = async () => {
    let resCL = await fetchCL();
    setListCL(resCL);

    let resMS = await fetchMS();
    setListMS(resMS);

    let resSize = await fetchSize();
    setListSize(resSize);

    let resSP = await fetchSP();
    setListSP(resSP);

    let resLSP = await fetchLSP();
    setListLSP(resLSP);

    let resXX = await fetchXX();
    setListXX(resXX);

    let resTayAo = await fetchTayAo();
    setListTayAo(resTayAo);

    let resCoAo = await fetchCoAo();
    setListCoAo(resCoAo);

    setChatLieu(resCL[0].idCl);
    setMauSac(resMS[0].idMs);
    setSize(resSize[0].idSize);
    setSanPham(resSP[0].idSp);
    setLoaiSP(resLSP[0].idLoaisp);
    setXuatXu(resXX[0].idXx);
    setTayAo(resTayAo[0].idTayAo);
    setCoAo(resCoAo[0].idCoAo);
  };

  // set select value
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

  const handleAdd = async () => {
    // get object all\
    const getObjChatLieu = await detailCL(chatLieu);
    const getObjMauSac = await detailMS(mauSac);
    const getObjSize = await detailSize(size);
    const getObjSanPham = await detailSP(sanPham);
    const getObjLoaiSP = await detailLSP(loaiSP);
    const getObjXuatXu = await detailXX(xuatXu);
    const getObjTayAo = await detailTayAo(tayAo);
    const getObjCoAo = await detailCoAo(coAo);
    if (
      maCTSP.trim() === "" ||
      moTa.trim() === "" ||
      soLuongTon.trim() === "" ||
      giaBan.trim() === "" ||
      trangThai.trim() === ""
    ) {
      handleClose();
      toast.warning("Không được để trống trường nào!");
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
        moTa,
        soLuongTon,
        giaBan,
        trangThai
      );

      console.log("Check res: ", res);
      if (res && res.idCtsp) {
        handleClose();
        setMaCTSP("");
        setChatLieu(listCL[0].idCl);
        setMauSac(listMS[0].idMs);
        setSize(listSize[0].idSize);
        setSanPham(listSP[0].idSp);
        setLoaiSP(listLSP[0].idLoaisp);
        setXuatXu(listXX[0].idXx);
        setTayAo(listCoAo[0].idCoAo);
        setCoAo(listTayAo[0].idTayAo);
        setMoTa("");
        setSoLuongTon("");
        setGiaBan("");
        setTrangThai("");
        toast.success("Thêm thành công!");
        getCTSP(0);
      } else {
        toast.error("Thêm thất bại!");
      }
    }
  };

  const getCTSP = async (page) => {
    let res = await fetchAllCTSP(page);
    console.log("Data", res);
    if (res && res.content) {
      setListCTSP(res.content);
      console.log("Data", res);
      setTotalPages(res.totalPages);
    }
  };

  //Next Page
  const handlePageClick = (event) => {
    getCTSP(+event.selected);
  };
  //Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const handleDelete = (maCtsp) => {
    console.log("Check delete: ", maCtsp);
    setIsShowModalDelete(true);
    setDataCTSP(maCtsp);
  };

  //Update
  const handleUpdate = async () => {
    // get object chatlieu\
    const getObjChatLieu = await detailCL(chatLieu);
    const getObjMauSac = await detailMS(mauSac);
    const getObjSize = await detailSize(size);
    const getObjSanPham = await detailSP(sanPham);
    const getObjLoaiSP = await detailLSP(loaiSP);
    const getObjXuatXu = await detailXX(xuatXu);
    const getObjTayAo = await detailTayAo(tayAo);
    const getObjCoAo = await detailCoAo(coAo);

    //And now add to DB
    //Check null

    if (isNaN(idCtsp)) {
      toast.warning("Hãy chọn 1 chi tiết sản phẩm để update!");
    } else if (
      maCTSP.trim() === "" ||
      moTa.trim() === "" ||
      isNaN(soLuongTon) ||
      isNaN(giaBan) ||
      isNaN(trangThai)
    ) {
      toast.warning("Không được để trường nào!");
    } else {
      let res = await putUpdateCTSP(
        idCtsp,
        maCTSP,
        getObjChatLieu,
        getObjMauSac,
        getObjSize,
        getObjSanPham,
        getObjLoaiSP,
        getObjXuatXu,
        getObjCoAo,
        getObjTayAo,
        moTa,
        soLuongTon,
        giaBan,
        trangThai
      );

      console.log("Check res: ", res);
      if (res && res.idCtsp) {
        handleClose();
        setIdCtsp("");
        setMaCTSP("");
        setChatLieu(listCL[0].idCl);
        setMauSac(listMS[0].idMs);
        setSize(listSize[0].idSize);
        setSanPham(listSP[0].idSp);
        setLoaiSP(listLSP[0].idLoaisp);
        setXuatXu(listXX[0].idXx);
        setTayAo(listCoAo[0].idCoAo);
        setCoAo(listTayAo[0].idTayAo);
        setMoTa("");
        setSoLuongTon("");
        setGiaBan("");
        setTrangThai("");
        toast.success("Sửa thành công!");
        getCTSP(0);
      } else {
        toast.error("Sửa thất bại!");
      }
    }
  };

  // filter
  const handleFillter = (eventKey) => {
    // eventKey === "All"
  };

  return (
    <>
      <div className="filter-and-search">
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <NavDropdown
                  title="Chất liệu"
                  id="navbarScrollingDropdown"
                  onSelect={handleFillter}
                >
                  <NavDropdown.Item eventKey={"All"}>All</NavDropdown.Item>
                  {listCL.map((option) => (
                    <NavDropdown.Item eventKey={option.idCl}>
                      {option.tenCl}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
                <NavDropdown
                  title="Loại cổ áo"
                  id="navbarScrollingDropdown"
                  onSelect={handleFillter}
                >
                  <NavDropdown.Item eventKey={"All"}>All</NavDropdown.Item>
                  {listCoAo.map((option) => (
                    <NavDropdown.Item eventKey={option.idCoAo}>
                      {option.loaiCoAo}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
                <NavDropdown
                  title="Loại sản phẩm"
                  id="navbarScrollingDropdown"
                  onSelect={handleFillter}
                >
                  <NavDropdown.Item eventKey={"All"}>All</NavDropdown.Item>
                  {listLSP.map((option) => (
                    <NavDropdown.Item eventKey={option.idLoaisp}>
                      {option.tenLsp}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
                <NavDropdown
                  title="Ống tay áo"
                  id="navbarScrollingDropdown"
                  onSelect={handleFillter}
                >
                  <NavDropdown.Item eventKey={"All"}>All</NavDropdown.Item>
                  {listTayAo.map((option) => (
                    <NavDropdown.Item eventKey={option.idTayAo}>
                      {option.loaiTayAo}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
                <NavDropdown
                  title="Sản phẩm"
                  id="navbarScrollingDropdown"
                  onSelect={handleFillter}
                >
                  <NavDropdown.Item eventKey={"All"}>All</NavDropdown.Item>
                  {listSP.map((option) => (
                    <NavDropdown.Item eventKey={option.idSp}>
                      {option.tenSp}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
                <NavDropdown
                  title="Size"
                  id="navbarScrollingDropdown"
                  onSelect={handleFillter}
                >
                  <NavDropdown.Item eventKey={"All"}>All</NavDropdown.Item>
                  {listSize.map((option) => (
                    <NavDropdown.Item eventKey={option.idSize}>
                      {option.tenSize}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
                <NavDropdown
                  title="Xuất xứ"
                  id="navbarScrollingDropdown"
                  onSelect={"All"}
                >
                  <NavDropdown.Item>All</NavDropdown.Item>
                  {listXX.map((option) => (
                    <NavDropdown.Item eventKey={option.idXx}>
                      {option.tenNuoc}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
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
              <Form.Group className="mb-3">
                <Form.Label>Chất liệu</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={selectCL}
                >
                  {listMS.map((option) => (
                    <option
                      value={option.idCl}
                      selected={chatLieu === option.idCl}
                    >
                      {option.tenCl}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Màu sắc</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={selectMS}
                >
                  {listMS.map((option) => (
                    <option
                      value={option.idMs}
                      selected={mauSac === option.idMs}
                    >
                      {option.tenMs}
                    </option>
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
                >
                  {listSize.map((option) => (
                    <option
                      value={option.idSize}
                      selected={size === option.idSize}
                    >
                      {option.tenSize}
                    </option>
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
                >
                  {listSP.map((option) => (
                    <option
                      value={option.idSp}
                      selected={sanPham === option.idSp}
                    >
                      {option.tenSp}
                    </option>
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
                >
                  {listLSP.map((option) => (
                    <option
                      value={option.idLoaisp}
                      selected={loaiSP === option.idLoaisp}
                    >
                      {option.tenLsp}
                    </option>
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
                >
                  {listXX.map((option) => (
                    <option
                      value={option.idXx}
                      selected={xuatXu === option.idXx}
                    >
                      {option.tenNuoc}
                    </option>
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
                >
                  {listTayAo.map((option) => (
                    <option
                      value={option.idTayAo}
                      selected={tayAo === option.idTayAo}
                    >
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
                >
                  {listCoAo.map((option) => (
                    <option
                      value={option.idCoAo}
                      selected={coAo === option.idCoAo}
                    >
                      {option.loaiCoAo}
                    </option>
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
                <Form.Label>Giá bán</Form.Label>
                <input
                  value={giaBan}
                  onChange={(event) => setGiaBan(event.target.value)}
                  type="text"
                  className="form-control"
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <div className="mb-3">
                  <label className="form-label">Mô tả</label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={moTa}
                    onChange={(event) => setMoTa(event.target.value)}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="my-3 add-new">
        <samp>List CTSP</samp>
        <div>
          <button className="btn btn-success" onClick={() => handleAdd()}>
            Add
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => handleUpdate()}
          >
            Update
          </button>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã CTSP</th>
            <th>Chất liệu</th>
            <th>Màu sắc</th>
            <th>Size</th>
            <th>Sản phẩm</th>
            <th>Loại sản phẩm</th>
            <th>Xuất xứ</th>
            <th>Cổ áo</th>
            <th>Số lượng tồn</th>
            <th>Giá bán</th>
            <th>Trạng thái</th>
            <th>Mô tả</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          {listCTSP &&
            listCTSP.length > 0 &&
            listCTSP
              .filter((item) =>
                Object.values(item).some((value) =>
                  String(value)
                    .toLowerCase()
                    .includes(searchKeyword.toLowerCase())
                )
              )
              .map((item, index) => {
                return (
                  <tr
                    key={`ChiTietSP-${index}`}
                    onClick={() => handleDetail(item)}
                  >
                    <td>{index + 1}</td>
                    <td>{item.maCtsp}</td>
                    <td>{item.idCl.tenCl}</td>
                    <td>{item.idMs.tenMs}</td>
                    <td>{item.idSize.tenSize}</td>
                    <td>{item.idSp.tenSp}</td>
                    <td>{item.idXx.tenNuoc}</td>
                    <td>{item.idTayAo.loaiTayAo}</td>
                    <td>{item.idCoAo.loaiCoAo}</td>
                    <td>{item.soLuongTon}</td>
                    <td>{item.giaBan}</td>
                    <td>{item.trangThai === 1 ? "Con" : "Het"}</td>
                    <td>{item.moTa}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(item)}
                        type="button"
                        className="btn btn-outline-danger"
                      >
                        Delete
                      </button>{" "}
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        //Class form
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />

      <ModelConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        isDataCTSP={isDataCTSP}
        getCTSP={getCTSP}
      />
    </>
  );
};
export default ChiTietSP;
