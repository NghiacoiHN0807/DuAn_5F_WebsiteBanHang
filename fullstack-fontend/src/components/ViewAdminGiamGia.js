import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";

export default function View() {

  const [totalPages, setTotalPages] = useState(0);

  const [giamGias, setGiamGias] = useState([]);

  const [loaiSps, setLoaiSps] = useState([]);

  // const {id} = useParams();

  useEffect(() => {
    loadGiamGias(1);
    loadLoaiSps();
  }, []);

  const loadLoaiSps = async () => {
    const res = await axios.get(`http://localhost:8080/loai-sp/api/views`);
    setLoaiSps(res.data.content);
    console.log(res.data.content)
  }

  const deleteGiamGia = async (id) => {
    const del = await axios.delete(`http://localhost:8080/giam-gia/api/remove/${id}`);
    loadGiamGias(0);
  }

  const loadGiamGias = async (page) => {
    const result = await axios.get(`http://localhost:8080/giam-gia/api/view?page=${page}`);
    console.log(result.data.content);
    setGiamGias(result.data.content);
    setTotalPages(result.data.totalPages);
  }

  const handlePageClick = (event) => {
    loadGiamGias(+event.selected);
  };

  const [loaiSp, setLoaiSp] = useState({
    idLoaisp: "",
    tenLsp: ""
  });

  const { idLoaisp, tenLsp } = loaiSp;

  let navigate = useNavigate();

  const [giamGia, setGiamGia] = useState({
    idGiamGia: "",
    maGiamGia: "",
    tenChuongTrinh: "",
    ngayBatDau: "",
    ngayKetThuc: "",
    mucGiamPhanTram: "",
    mucGiamTienMat: "",
    trangThai: 0
  });

  const { maGiamGia, tenChuongTrinh, ngayBatDau, ngayKetThuc, mucGiamPhanTram, mucGiamTienMat, trangThai } = giamGia;

  const onInputChange = (e) => {
    setGiamGia({ ...giamGia, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (giamGia.maGiamGia.length < 1) {
      // handleClose();
      toast.warning("Data is null");
    } else {
      let res = await axios.post("http://localhost:8080/giam-gia/api/insert", giamGia);
      console.log(res.data);
      if (res.data.status === "Ok!") {
        // handleClose();
        toast.success(res.data.message);
      }
      toast.error("You can't create a new giamGia");
    }
    loadGiamGias(0);
  }

  return (
    <>
      {/* <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      >
      <Modal.Header closeButton>
        <Modal.Title>ADD NEW XUAT XU</Modal.Title>
      </Modal.Header>
      <Modal.Body> */}
      <div className='container'>
        <h2 className='text-center'>Tạo chương trình giảm giá</h2>

        <form onSubmit={(e) => onSubmit(e)}>
          <div className="mb-3 row">
            <label for="maGiamGia" className="col-sm-2 col-form-label">Mã chương trình giảm giá</label>
            <div className="col-sm-10">
              <input type={"text"} name='maGiamGia' value={maGiamGia} onChange={(e) => onInputChange(e)} className="form-control" id="inputPassword" />
            </div>
          </div>

          <div className="mb-3 row">
            <label for="tenChuongTrinh" className="col-sm-2 col-form-label">Tên chương trình</label>
            <div className="col-sm-10">
              <input type={"text"} name='tenChuongTrinh' value={tenChuongTrinh} onChange={(e) => onInputChange(e)} className="form-control" id="inputPassword" />
            </div>
          </div>

          <div className="mb-3 row">
            <label for="inputPassword1" className="col-sm-2 col-form-label">Áp dụng cho nhóm sản phẩm</label>
            <div className="col-sm-10">
              <select className="form-select" aria-label="Default select example">
                {loaiSps.map((loaisp) => {
                  return <option value={loaisp.idLoaisp}>{loaisp.tenLsp}</option>;
                })}
              </select>
            </div>
          </div>

          <div className="mb-3 row">
            <label for="inputPassword2" className="col-sm-2 col-form-label">Thiết lập giảm giá</label>
            <div className="col-sm-10">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked />
                <label className="form-check-label" for="flexRadioDefault1">
                  Mức giảm
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                <label className="form-check-label" for="flexRadioDefault2">
                  Theo %
                </label>
              </div>
            </div>
          </div>


          <div className="mb-3 row">
            <label for="mucGiamPhanTram" className="col-sm-2 col-form-label">Mức giảm %</label>
            <div className="col-sm-10">
              <input type={"text"} name='mucGiamPhanTram' value={mucGiamPhanTram} onChange={(e) => onInputChange(e)} className="form-control" id="inputPassword" />
            </div>
          </div>

          <div className="mb-3 row">
            <label for="mucGiamTienMat" className="col-sm-2 col-form-label">Mức giảm tiền mặt</label>
            <div className="col-sm-10">
              <input type={"text"} name='mucGiamTienMat' value={mucGiamTienMat} onChange={(e) => onInputChange(e)} className="form-control" id="inputPassword" />
            </div>
          </div>

          <div className="mb-3 row">
            <label for="ngayBatDau" className="col-sm-2 col-form-label">Ngày bắt đầu</label>
            <div className="col-sm-10">
              <input type={"date"} name='ngayBatDau' value={ngayBatDau} onChange={(e) => onInputChange(e)} className="form-control" id="inputPassword" />
            </div>
          </div>

          <div className="mb-3 row">
            <label for="ngayKetThuc" className="col-sm-2 col-form-label">Ngày kết thúc</label>
            <div className="col-sm-10">
              <input type={"date"} name='ngayKetThuc' value={ngayKetThuc} onChange={(e) => onInputChange(e)} className="form-control" id="inputPassword" />
            </div>
          </div>
          <button type='submit' className='btn btn-outline-primary'>Add</button>
        </form>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Mã chương trình</th>
            <th scope="col">Tên chương trình</th>
            <th scope="col">Loại sản phẩm áp dụng</th>
            <th scope="col">Ngày bắt đầu</th>
            <th scope="col">Ngày kết thúc</th>
            <th scope="col">Kiểu giảm giá</th>
            <th scope="col">Mức giảm giá</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {giamGias.map((item, index) => {
            return <tr>
              <th scope="row">{index + 1}</th>
              <td>{item.idGiamGia}</td>
              <td>{item.maitem}</td>
              <td>{item.tenChuongTrinh}</td>
              <td>Null</td>
              <td>{item.ngayBatDau}</td>
              <td>{item.ngayKetThuc}</td>
              <td>Null</td>
              <td>{item.mucGiamTienMat}</td>
              <td>{item.trangThai === 0 ? 'Hoạt động' : 'Ngưng hoạt động'}</td>
              <td>
                <Link to={`/`} className='btn btn-outline-primary mx-2'>Update</Link>
                <button onClick={() => deleteGiamGia(item.idGiamGia)} className='btn btn-danger mx-2'>
                  Delete
                </button>
              </td>
            </tr>
          })}
        </tbody>
      </table>
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
    </>
  )
}
