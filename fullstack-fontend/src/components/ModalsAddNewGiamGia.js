// import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { add, addGiamGia, getAllLoaiSp } from "../services/giamGiaService";
import GiamGiaAdd from "../scss/GiamGiaAdd.scss";
import { useNavigate } from "react-router-dom";

const ModelAddNewGiamGia = (props) => {
  const { show, handleClose } = props;

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

  useEffect(() => {
    loadLoaiSps();
  }, []);

  const loadLoaiSps = async () => {
    const res = await getAllLoaiSp();
    setLoaiSps(res.content);
    console.log(res.content)
  }

  const [loaiSps, setLoaiSps] = useState([]);

  const { maGiamGia, tenChuongTrinh, ngayBatDau, ngayKetThuc, mucGiamPhanTram, mucGiamTienMat} = giamGia;

  const onInputChange = (e) => {
    setGiamGia({ ...giamGia, [e.target.name]: e.target.value });
  };

  const [selected, setSelected] = useState("");
  const changeHandler = e => {
    setSelected(e.target.value);
  };

  console.log(selected)

  const handleSave = async (e) => {
    e.preventDefault();
    if (giamGia.maGiamGia.trim().length < 1 
    || giamGia.tenChuongTrinh.trim().length < 1 
    || giamGia.ngayBatDau.trim().length < 1 
    || giamGia.ngayKetThuc.trim().length < 1) {
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
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>ADD NEW GIAM GIA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <form>
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Mã chương trình giảm giá</label>
                <div className="col-sm-10">
                  <input type={"text"} name='maGiamGia' value={maGiamGia} onChange={(e) => onInputChange(e)} className="form-control" id="inputPassword" />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Tên chương trình</label>
                <div className="col-sm-10">
                  <input type={"text"} name='tenChuongTrinh' value={tenChuongTrinh} onChange={(e) => onInputChange(e)} className="form-control" id="inputPassword" />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Áp dụng cho nhóm sản phẩm</label>
                <div className="col-sm-10">
                  <select className="form-select" aria-label="Default select example">
                    {loaiSps.map((loaisp) => {
                      return <option key={loaisp.idLoaisp} value={loaisp.idLoaisp}>{loaisp.tenLsp}</option>;
                    })}
                  </select>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Thiết lập giảm giá</label>
                <div className="col-sm-10">
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


              <div className="mb-3 row" aria-hidden={selected !== "phanTram" ? true : false}>
                <label className="col-sm-2 col-form-label">Mức giảm %</label>
                <div className="col-sm-10">
                  <input type={"number"} min={0} max={100} name='mucGiamPhanTram' value={mucGiamPhanTram} onChange={(e) => onInputChange(e)} className="form-control" id="inputPassword" />
                </div>
              </div>

              <div className="mb-3 row" aria-hidden={selected !== "mucGiam" ? true : false}>
                <label className="col-sm-2 col-form-label">Mức giảm tiền mặt</label>
                <div className="col-sm-10">
                  <input type={"number"} name='mucGiamTienMat' value={mucGiamTienMat} onChange={(e) => onInputChange(e)} className="form-control" id="inputPassword" />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Ngày bắt đầu</label>
                <div className="col-sm-10">
                  <input type={"date"} name='ngayBatDau' value={ngayBatDau} onChange={(e) => onInputChange(e)} className="form-control" id="inputPassword" />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Ngày kết thúc</label>
                <div className="col-sm-10">
                  <input type={"date"} name='ngayKetThuc' value={ngayKetThuc} onChange={(e) => onInputChange(e)} className="form-control" id="inputPassword" />
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleSave(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModelAddNewGiamGia;
