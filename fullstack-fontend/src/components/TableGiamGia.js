import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import ModelConfirmGiamGia from "./ModelConfirmGiamGia";
import { getAll, getAllByTrangThai } from '../services/giamGiaService'
import { Form } from "react-bootstrap";
import TableGiamGiaScss from "../scss/TableGiamGiaScss.scss";
import { Link } from "react-router-dom";
import { Chip } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { Navigate } from "react-router-dom";

const TableGiamGia = (props) => {

  //Set value for table
  const [listGiamGia, setListGiamGia] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");

  //Set value for Model Add New is defalut
  const handleClose = () => {
    setIsShowModalDelete(false);
  };
  // Show Data On Tables
  useEffect(() => {
    getGiamGia(0, 5);
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

  const hi = async (e) => {
    const value = e.target.value;
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

  function formatCurrency(price) {
    if (!price) return "0";
  
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });
  
    return formatter.format(price);
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
  
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };
  

  return (
    <>
      <div className="my-3 add-new">
        <samp>List Giam Gia</samp>
      </div>
      <div>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchKeyword(e.target.value)} />
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
        <Link
          className="btn btn-success m-25"
          to={'/add/giam-gia'}
        >
          Them
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">#</th>
            {/* <th scope="col">Mã chương trình</th> */}
            <th scope="col">Tên chương trình</th>
            <th scope="col">Loại sản phẩm áp dụng</th>
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
                <tr key={item.idGiamGia} className="text-center">
                  <th scope="row">{index + 1}</th>
                  {/* <td>{item.maGiamGia}</td> */}
                  <td>{item.idGiamGia.tenChuongTrinh}</td>
                  <td>{item.idCtsp.idSp.tenSp}</td>
                  <td>{item.idGiamGia.mucGiamTienMat === null ? item.idGiamGia.mucGiamPhanTram + "%" : formatCurrency(item.idGiamGia.mucGiamTienMat)}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <Chip label={formatDate(item.idGiamGia.ngayBatDau) + " - " + formatDate(item.idGiamGia.ngayKetThuc)} className="bg-info" />
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                    {formatCurrency(item.donGia)}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      {formatCurrency(item.soTienConLai)}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      {item.trangThai === 0 ? <Chip label="Hoạt động" className="bg-success text-light" /> : <Chip label="Ngưng hoạt động" className="bg-danger text-light" />}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <button className='btn btn-outline-primary mx-2'>Update</button>
                      <div onClick={() => handleDelete(item)}>
                      <FontAwesomeIcon icon={faTrash} style={{color: "#db451f",}} />
                      </div>
                    </div>
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
