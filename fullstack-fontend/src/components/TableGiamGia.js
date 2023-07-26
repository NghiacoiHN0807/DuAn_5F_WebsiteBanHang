import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import ModelAddNewGiamGia from "./ModalsAddNewGiamGia";
import ModelConfirmGiamGia from "./ModelConfirmGiamGia";
import { getAll, getAllByTrangThai } from '../services/giamGiaService'
import { Form } from "react-bootstrap";
import TableGiamGiaScss from "../scss/TableGiamGiaScss.scss";
import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

const TableGiamGia = (props) => {

  const navigate = useNavigate();

  //Set value for table
  const [listGiamGia, setListGiamGia] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");

  //Set value for Model Add New is defalut
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalUpdate(false);
    setIsShowModalDelete(false);
  };
  // Show Data On Tables
  useEffect(() => {
    getGiamGia(0,5);
  }, []);

  //Next Page
  const handlePageClick = (event) => {
    getGiamGia(+event.selected, 5);
  };
  //Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isDataGiamGia, setDataGiamGia] = useState({});
  const handleDelete = (id) => {
    setIsShowModalDelete(true);
    setDataGiamGia(id);
  };

  const getGiamGia = async (page, size) => {
    let res = await getAll(page, size);
    if (res && res.content) {
      setListGiamGia(res.content);
      setTotalPages(res.totalPages);
    }
  };

  const [total, setTrangThai] = useState(0);


  const hi = async (e) => {
    const value = e.target.value;
    setTrangThai(value);
    if (value === "1") {
      let res = await getAll(0, 5);
      setListGiamGia(res.content);
      setTotalPages(res.totalPages);
    } else if (value === "2") {
      let res = await getAllByTrangThai(0, 5, 0);
      setListGiamGia(res.content);
      setTotalPages(res.totalPages);
    } else if (value === "3") {
      let res = await getAllByTrangThai(0, 5, 10);
      setListGiamGia(res.content);
      setTotalPages(res.totalPages);
    }
  };

    return (
      <>
        <div className="my-3 add-new">
          <samp>List Giam Gia</samp>
        </div>
        <div>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchKeyword(e.target.value)}/>
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
        <div className="d-flex justify-content-between">

          <div className="d-flex">
            <div className="d-flex align-items-center">
            <label>Trạng thái</label>
            <Form.Select aria-label="Default select example" onChange={(e) => hi(e)} className="m-3">
              <option value="1">Tất cả</option>
              <option value="2">Hoạt động</option>
              <option value="3">Ngưng hoạt động</option>
            </Form.Select>
            </div>
            <div className="d-flex align-items-center">
              <label>Ngày bắt đầu</label>
              <input type="date" id="inputPassword6" className="form-control m-3" aria-describedby="passwordHelpInline" />
            </div>
            <div className="d-flex align-items-center">
              <label>Ngày kết thúc</label>
              <input type="date" id="inputPassword6" className="form-control m-3" aria-describedby="passwordHelpInline" />
            </div>
          </div>
          <button
            className="btn btn-success m-25"
            onClick={() => setIsShowModalAddNew(true)}
          >
            Them
          </button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">#</th>
              {/* <th scope="col">Mã chương trình</th> */}
              <th scope="col">Tên chương trình</th>
              <th scope="col">Loại sản phẩm áp dụng</th>
              <th scope="col">Kiểu giảm giá</th>
              <th scope="col">Mức giảm giá</th>
              <th scope="col">Thời gian</th>
              <th scope="col">Đơn giá</th>
              <th scope="col">Giá sau giảm</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listGiamGia &&
              listGiamGia.length > 0 &&
              listGiamGia.filter((item) =>
              Object.values(item).some((value) =>
                String(value)
                  .toLowerCase()
                  .includes(searchKeyword.toLowerCase())
              )
            ).map((item, index) => {
                return (
                  <tr key={item.idGiamGia}>
                    <th scope="row">{index + 1}</th>
                    {/* <td>{item.maGiamGia}</td> */}
                    <td>{item.idGiamGia.tenChuongTrinh}</td>
                    <td>{item.idCtsp.isLsp.tenLsp}</td>
                    <td>{item.idGiamGia.mucGiamPhanTram === null ? "Tiền mặt" : "Phần trăm"}</td>
                    <td>{item.idGiamGia.mucGiamTienMat === null ? item.idGiamGia.mucGiamPhanTram + "%" : item.idGiamGia.mucGiamTienMat}</td>
                    <td>{item.idGiamGia.ngayBatDau + " - " + item.idGiamGia.ngayKetThuc}</td>
                    <td>{item.donGia}</td>
                    <td>{item.soTienConLai}</td>
                    <td>{item.trangThai === 0 ? 'Hoạt động' : 'Ngưng hoạt động'}</td>
                    <td>
                      <button className='btn btn-outline-primary mx-2' onClick={() => setIsShowModalUpdate(true)}>Update</button>
                      <button onClick={() => handleDelete(item)} className='btn btn-outline-danger mx-2'>
                        Delete
                      </button>
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
        {/* Add Model */}
        <ModelAddNewGiamGia show={isShowModalAddNew} handleClose={handleClose} />
        <ModelConfirmGiamGia
          show={isShowModalDelete}
          handleClose={handleClose}
          isDataGiamGia={isDataGiamGia}
          getGiamGia={getGiamGia}
        />
      </>
    );
  };
  export default TableGiamGia;
