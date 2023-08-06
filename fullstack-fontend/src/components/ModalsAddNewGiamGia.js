import * as React from 'react';
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { addGiamGia } from "../services/giamGiaService";
import "../scss/GiamGiaAdd.scss";
import { useNavigate } from "react-router-dom";
import SelectAllTransferList from "./TableGiamGiaAdd";


const ModelAddNewGiamGia = (props) => {
  const { handleClose } = props;
  // console.log(dataSanPham)
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

  const { tenChuongTrinh, ngayBatDau, ngayKetThuc, mucGiamPhanTram, mucGiamTienMat } = giamGia;

  const onInputChange = (e) => {
    setGiamGia({ ...giamGia, [e.target.name]: e.target.value });
  };

  const [selected, setSelected] = useState("");
  const changeHandler = e => {
    setSelected(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (
      giamGia.tenChuongTrinh.trim().length < 1 ||
      giamGia.ngayBatDau.trim().length < 1 ||
      giamGia.ngayKetThuc.trim().length < 1
    ) {
      toast.warning("Data is null!");
    } else {
      let res = await addGiamGia(giamGia);
      console.log(res.status);
      if (res.status === "Ok!") {
        handleClose();
        navigate("/admin-giam-gia");
        toast.success(res.message + "!");
      } else {
        toast.error("You can't create a new giamGia!");
      }
    }
  };

  
  return (
    <>
    <Modal.Header>
      <Modal.Title className='text-center m-25 w-100'>ADD NEW GIAM GIA</Modal.Title>
    </Modal.Header>
      <div className="d-flex justify-content-around">
        <div className="content-left">
          <Modal.Body>
            <div className="body-add-new">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Tên chương trình</label>
                  <input type="text" className="form-control" value={tenChuongTrinh} onChange={(e) => onInputChange(e)} id="exampleFormControlInput1" placeholder="Tên chương trình" />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Thiết lập giảm giá</label>
                  <div>
                    <div className="form-check">
                      <input className="form-check-input" onChange={(e) => changeHandler(e)} type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={"mucGiam"} checked={selected === "mucGiam"} />
                      <label className="form-check-label">
                        Mức giảm
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" onChange={(e) => changeHandler(e)} type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={"phanTram"} checked={selected === "phanTram"} />
                      <label className="form-check-label">
                        Theo %
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-3" aria-hidden={selected !== "phanTram"}>
                  <label htmlFor="exampleFormControlInput1" className="form-label">Mức giảm %</label>
                  <input type="number" min={0} max={100} name='mucGiamPhanTram' value={mucGiamPhanTram} onChange={(e) => onInputChange(e)} id="exampleFormControlInput1" className="form-control" placeholder="Mức giảm %" />
                </div>

                <div className="mb-3" aria-hidden={selected !== "mucGiam"}>
                  <label htmlFor="exampleFormControlInput1" className="form-label">Mức giảm tiền mặt</label>
                  <input type="number" name='mucGiamTienMat' value={mucGiamTienMat} onChange={(e) => onInputChange(e)} id="exampleFormControlInput1" className="form-control" placeholder="Mức giảm tiền mặt" />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Ngày bắt đầu</label>
                  <input type="date" name='ngayBatDau' value={ngayBatDau} onChange={(e) => onInputChange(e)} id="exampleFormControlInput1" className="form-control" placeholder="Ngày bắt đầu" />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Ngày kết thúc</label>
                  <input type="date" name='ngayKetThuc' value={ngayKetThuc} onChange={(e) => onInputChange(e)} id="exampleFormControlInput1" className="form-control" placeholder="Ngày kết thúc" />
                </div>

                <button onClick={(e) => handleSave(e)} className="btn bg-primary text-light d-flex align-items-end">Thêm</button>
              </form>
            </div>
          </Modal.Body>
        </div>

        <div className="content-right">
          <SelectAllTransferList />
        </div>
      </div>
    </>
  );
};

export default ModelAddNewGiamGia;
